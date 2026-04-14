import { Dexie, type EntityTable } from "dexie"
import { DeleteAction, TaskCompletionStatus, TaskPriority, TaskRecurrence } from "./codo-constants"

interface Tag {
  id?: number
  label: string
  color: string
  deleted?: DeleteAction
}

interface SubTask {
  id?: number
  taskId: number
  title: string
  status: TaskCompletionStatus
}

interface Task {
  id?: number
  title: string
  description?: string
  status: TaskCompletionStatus
  dueDate?: string
  priority?: TaskPriority
  sortIndex: number
  recurrence?: TaskRecurrence
  deleted?: DeleteAction
  createdAt: string
  updatedAt: string
  tagIds: number[]
}

interface MetaRow {
  key: string
  value: string
}

const codoDB = new Dexie("codo") as Dexie & {
  tags: EntityTable<Tag, "id">
  tasks: EntityTable<Task, "id">
  subTasks: EntityTable<SubTask, "id">
  meta: EntityTable<MetaRow, "key">
}

codoDB.version(1).stores({
  tags: "++id, label, deleted",
  meta: "key",
  tasks:
    "++id, status, dueDate, priority, sortIndex, recurrence, deleted, createdAt, updatedAt, *tagIds",
  subTasks: "++id, taskId, title, status",
})

export type CodoDb = typeof codoDB
export type { MetaRow, Tag, Task, SubTask }
export { codoDB }
