import { DeleteAction, TaskCompletionStatus, TaskRecurrence } from "./codo-constants"
import { codoDB, type CodoDb, type SubTask, type Tag, type Task } from "./codo-db"
import { tagsService } from "./codo-tags-service"

export type NewTaskInput = Pick<Task, "title" | "dueDate" | "priority"> &
  Partial<Omit<Task, "id" | "title" | "dueDate" | "priority" | "createdAt" | "updatedAt">>

export type NewSubTaskInput = Pick<SubTask, "title"> &
  Partial<Omit<SubTask, "id" | "taskId" | "title">>

export type TaskWithResolvedTags = Task & { tags: Tag[] }
export type TaskWithAllResolved = TaskWithResolvedTags & { subTasks: SubTask[] }

class TasksService {
  private readonly db: CodoDb
  private readonly tasks: CodoDb["tasks"]
  private readonly subTasks: CodoDb["subTasks"]

  constructor(db: CodoDb) {
    this.db = db
    this.tasks = db.tasks
    this.subTasks = db.subTasks
  }

  static nowIso() {
    return new Date().toISOString()
  }

  private async nextTaskSortIndex(): Promise<number> {
    const last = await this.tasks.orderBy("sortIndex").last()
    return (last?.sortIndex ?? -1) + 1
  }

  private async pickTagsByIds(tagIds: number[]): Promise<Tag[]> {
    const allTags = await tagsService.getTags()

    const byId = new Map<number, Tag>()
    for (const t of allTags) {
      if (t.id !== undefined) byId.set(t.id, t)
    }

    const out: Tag[] = []
    const seen = new Set<number>()

    for (const id of tagIds) {
      if (seen.has(id)) continue

      const tag = byId.get(id)
      if (tag) {
        seen.add(id)
        out.push(tag)
      }
    }

    return out
  }

  async addTask(input: NewTaskInput): Promise<number> {
    const ts = TasksService.nowIso()
    const sortIndex =
      input.sortIndex !== undefined ? input.sortIndex : await this.nextTaskSortIndex()
    const tagIds = (await this.pickTagsByIds(input.tagIds ?? [])).map((t) => t.id!)

    const id = await this.tasks.add({
      title: input.title,
      description: input.description,
      status: input.status ?? TaskCompletionStatus.NotStarted,
      dueDate: input.dueDate,
      priority: input.priority,
      sortIndex,
      recurrence: input.recurrence ?? TaskRecurrence.None,
      deleted: DeleteAction.NotDeleted,
      createdAt: ts,
      updatedAt: ts,
      tagIds,
    })

    if (id === undefined) throw new Error("codo: add task did not return an id")
    return id
  }

  async getActiveTasks(): Promise<TaskWithAllResolved[]> {
    const rows = await this.tasks.where("deleted").equals(DeleteAction.NotDeleted).toArray()
    rows.sort((a, b) => a.sortIndex - b.sortIndex)
    return await Promise.all(
      rows.map(async (row) => ({
        ...row,
        tags: await this.pickTagsByIds(row.tagIds),
        subTasks: await this.getSubTasksByTaskId(row.id!),
      })),
    )
  }

  async getDeletedTasks(): Promise<Task[]> {
    const rows = await this.tasks.where("deleted").equals(DeleteAction.Deleted).toArray()
    rows.sort((a, b) => a.sortIndex - b.sortIndex)
    return await Promise.all(
      rows.map(async (row) => ({
        ...row,
        tags: await this.pickTagsByIds(row.tagIds),
      })),
    )
  }

  async getAllTasks(): Promise<TaskWithAllResolved[]> {
    const rows = await this.tasks.toArray()
    rows.sort((a, b) => a.sortIndex - b.sortIndex)

    return await Promise.all(
      rows.map(async (row) => ({
        ...row,
        tags: await this.pickTagsByIds(row.tagIds),
        subTasks: await this.getSubTasksByTaskId(row.id!),
      })),
    )
  }

  async getTaskById(id: number): Promise<(Task & { tags: Tag[] }) | null> {
    const task = await this.tasks.get(id)
    if (!task) return null

    const tags = await this.pickTagsByIds(task.tagIds)
    return { ...task, tags }
  }

  async updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>) {
    const { tagIds: nextTagIds, ...rest } = updates
    const patch: Partial<Omit<Task, "id" | "createdAt">> = { ...rest }

    if (nextTagIds !== undefined) {
      patch.tagIds = (await this.pickTagsByIds(nextTagIds)).map((t) => t.id!)
    }

    return await this.tasks.update(id, {
      ...patch,
      updatedAt: TasksService.nowIso(),
    })
  }

  async setTaskTags(taskId: number, tagIds: number[]) {
    return await this.updateTask(taskId, { tagIds })
  }

  async addTagToTask(taskId: number, tagId: number) {
    const task = await this.getTaskById(taskId)
    if (!task) return
    const tagIds = [...task.tagIds]
    if (!tagIds.includes(tagId)) tagIds.push(tagId)
    return await this.updateTask(taskId, { tagIds })
  }

  async removeTagFromTask(taskId: number, tagId: number) {
    const task = await this.getTaskById(taskId)
    if (!task) return
    const tagIds = task.tagIds.filter((id) => id !== tagId)
    return await this.updateTask(taskId, { tagIds })
  }

  async deleteTask(id: number) {
    await this.db.transaction("rw", this.tasks, this.subTasks, async () => {
      await this.tasks.update(id, {
        deleted: DeleteAction.Deleted,
        updatedAt: TasksService.nowIso(),
      })
      await this.subTasks.where({ taskId: id }).delete()
    })
  }

  async reorderTasks(orderedTaskIds: number[]) {
    const ts = TasksService.nowIso()

    await this.db.transaction("rw", this.tasks, async () => {
      for (let i = 0; i < orderedTaskIds.length; i++) {
        await this.tasks.update(orderedTaskIds[i], { sortIndex: i, updatedAt: ts })
      }
    })
  }

  async moveTask(taskId: number, toIndex: number) {
    const ordered = await this.getActiveTasks()
    const ids = ordered.map((t) => t.id!)

    const from = ids.indexOf(taskId)
    if (from === -1) return

    const bounded = Math.max(0, Math.min(toIndex, ids.length - 1))
    const [id] = ids.splice(from, 1)
    ids.splice(bounded, 0, id)
    await this.reorderTasks(ids)
  }

  async getSubTasksByTaskId(taskId: number): Promise<SubTask[]> {
    const rows = await this.subTasks.where({ taskId }).toArray()
    return rows.sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
  }

  async addSubTask(taskId: number, input: NewSubTaskInput): Promise<number> {
    const id = await this.subTasks.add({
      taskId,
      title: input.title,
      status: input.status ?? TaskCompletionStatus.NotStarted,
    })

    if (id === undefined) throw new Error("codo: add subtask did not return an id")
    return id
  }

  async updateSubTask(id: number, updates: Partial<Omit<SubTask, "id" | "taskId">>) {
    return await this.subTasks.update(id, updates)
  }

  async deleteSubTask(id: number) {
    return await this.subTasks.delete(id)
  }
}

export const tasksService = new TasksService(codoDB)
