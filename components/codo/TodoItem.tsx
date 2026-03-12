import { CircleCheckIcon } from "@icons/circle-check-animated-icon"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@ui/item"
import { Calendar, Circle, GripVertical, ListTree, Trash2 } from "lucide-react"

export function TodoItem() {
  return (
    <Item className="bg-background shadow-sm rounded-xl">
      {/* Drag handle & checkbox */}
      <div className="flex gap-2">
        <GripVertical className="text-muted-foreground cursor-grab" />
        <Circle className="text-muted-foreground hover:text-primary" />
        <CircleCheckIcon className="text-muted-foreground hover:text-primary" />
      </div>
      <ItemContent>
        <ItemTitle>Daily Financial Review and Expense Tracking Overview</ItemTitle>
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
            <span className="size-3 rounded-full bg-blue-500"></span>
            <span>Work</span>
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="secondary">High</Badge>
        <Button variant="destructive" size="icon-sm">
          <Trash2 />
        </Button>
      </ItemActions>
    </Item>
  )
}
