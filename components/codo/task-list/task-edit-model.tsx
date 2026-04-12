import { CalendarWithTime } from "@/components/ui/calendar-with-time"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DeleteIcon } from "@icons/delete-animated-icon"
import { SquarePenIcon } from "@icons/square-pen-animated-icon"
import { Button } from "@ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@ui/dialog"
import { Item, ItemActions, ItemContent, ItemTitle } from "@ui/item"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover"
import { ScrollArea } from "@ui/scroll-area"
import { CalendarIcon, CalendarSync, Goal, Save } from "lucide-react"
import { useState } from "react"
import { RepeatContent } from "./task-prompt-input"

export function TaskEditModel() {
  const [date, setDate] = useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon-sm">
          <SquarePenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-132">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Momentum</DialogTitle>
        </DialogHeader>

        <h4 className="text-xl text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a response.
        </h4>
        <Textarea
          value={
            "Review daily financial transactions and track expenses to maintain accurate records. Monitor spending against budgets, identify variances, and highlight key financial insights. Use the review to ensure financial discipline and inform short-term financial decisions."
          }
          className="border-none"
        />

        <div className="flex justify-between items-center bg-card p-3 rounded-md mt-4">
          <h5>Sub-Steps Breakdown 👇🏻</h5>
          <Button>AI Breakdown</Button>
        </div>
        <ScrollArea className="max-h-72">
          <SubTask />
          <SubTask />
        </ScrollArea>

        <div className="flex justify-end">
          <Button variant="outline" className="border-dashed">
            Add Step
          </Button>
        </div>

        <div className="flex justify-between mt-4 [&>div]:space-y-1 [&_p]:uppercase [&_p]:text-xs [&_p]:tracking-wider [&_p]:text-muted-foreground gap-2">
          <div>
            <p>Timeline</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="">
                  <CalendarIcon /> {date?.toLocaleString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarWithTime date={date} setDate={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <p>Recurrence</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">
                  <Goal />
                  One-off
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <RepeatContent />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <p>Urgency</p>
            <Button variant="secondary">
              <CalendarSync />
              Low Intensity
            </Button>
          </div>
        </div>

        <Separator className="my-2" />
        <Button>
          <Save />
          Update Momentum
        </Button>
      </DialogContent>
    </Dialog>
  )
}

function SubTask() {
  return (
    <Item>
      <ItemContent>
        <ItemTitle>Summarize findings and recommend short-term financial actions</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="icon-sm">
          <SquarePenIcon />
        </Button>
        <Button variant="destructive" size="icon-sm">
          <DeleteIcon />
        </Button>
      </ItemActions>
    </Item>
  )
}
