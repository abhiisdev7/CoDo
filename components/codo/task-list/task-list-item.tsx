import { For } from "@/components/utils/For"
import { TaskCompletionStatus } from "@/services/codo/codo-constants"
import { TaskWithAllResolved } from "@/services/codo/codo-tasks-service"
import { useSortable } from "@dnd-kit/react/sortable"
import { DeleteIcon } from "@icons/delete-animated-icon"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { CircularCheckbox } from "@ui/circular-checkbox"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@ui/item"
import { Calendar, GripVertical, ListTree } from "lucide-react"
import { TaskEditModel } from "./task-edit-model"

export function TaskListItem({
  sortEnabled,
  id,
  index,
  task,
}: {
  sortEnabled?: boolean
  id: number
  index: number
  task: TaskWithAllResolved
}) {
  const { ref } = useSortable({ id, index })
  const completedSubTasks =
    task?.subTasks.filter((t) => t.status === TaskCompletionStatus.Completed).length ?? 0

  return (
    <Item className="shadow-sm rounded-xl bg-card" ref={ref}>
      <div className="flex gap-2 items-center">
        {sortEnabled && <GripVertical className="text-muted-foreground cursor-grab" />}
        <CircularCheckbox />
      </div>
      <ItemContent>
        <ItemTitle className="text-sm leading-normal">{task.title}</ItemTitle>
        <ItemDescription className="flex gap-4 text-xs mt-2">
          <span className="flex items-center gap-2 text-destructive">
            <Calendar className="size-3" />
            <span className="">{new Date(task?.dueDate).toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-2">
            <ListTree className="size-3" />
            <span>
              {completedSubTasks}/{task?.subTasks.length}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <For
              each={task?.tags}
              render={(tag, i) => (
                <span key={tag.id ?? i} className="flex items-center gap-1">
                  <span
                    className="size-2 rounded-full inline-block"
                    style={{ backgroundColor: tag.color }}
                  ></span>
                  <span>{tag.label}</span>
                </span>
              )}
            />
          </span>
          <Badge variant="secondary" className="bg-destructive/20 text-destructive capitalize">
            {task.priority}
          </Badge>
          {/* <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
            Low
          </Badge>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
            Medium
          </Badge> */}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <TaskEditModel />
        <Button variant="destructive" size="icon-sm">
          <DeleteIcon />
        </Button>
      </ItemActions>
    </Item>
  )
}
