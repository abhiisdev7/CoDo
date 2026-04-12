import { DeleteIcon } from "@icons/delete-animated-icon"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { CircularCheckbox } from "@ui/circular-checkbox"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@ui/item"
import { Calendar, GripVertical, ListTree } from "lucide-react"
import { TaskEditModel } from "./task-edit-model"

export function TaskListItem({ sortEnabled }: { sortEnabled?: boolean }) {
  return (
    <Item className="shadow-sm rounded-xl bg-card">
      <div className="flex gap-2 items-center">
        {sortEnabled && <GripVertical className="text-muted-foreground cursor-grab" />}
        <CircularCheckbox />
      </div>
      <ItemContent>
        <ItemTitle className="text-sm leading-normal">
          Daily Financial Review and Expense Tracking Overview
        </ItemTitle>
        <ItemDescription className="flex gap-4 text-xs mt-2">
          <span className="flex items-center gap-2 text-destructive">
            <Calendar className="size-3" />
            <span className="">Jan 31, 2026</span>
          </span>
          <span className="flex items-center gap-2">
            <ListTree className="size-3" />
            <span>0/3</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-blue-500"></span>
            <span>Work</span>
          </span>
          <Badge variant="secondary" className="bg-destructive/20 text-destructive">
            High
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
            Low
          </Badge>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
            Medium
          </Badge>
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
