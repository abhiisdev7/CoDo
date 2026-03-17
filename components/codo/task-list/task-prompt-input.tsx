"use client"

import { parseTaskText } from "@/packages/task-text-parser.ts"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/utils/Switch"
import { cn } from "@/lib/utils"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { Calendar } from "@ui/calendar"
import { Popover, PopoverAnchor, PopoverContent } from "@ui/popover"
import { Separator } from "@ui/separator"
import { Textarea } from "@ui/textarea"
import { format } from "date-fns"
import { Calendar as CalendarIcon, CalendarSearch, Goal, Info, Repeat } from "lucide-react"
import { Dispatch, SetStateAction, useMemo, useState, type ReactNode } from "react"
import { PlusIcon } from "@ui/icons/plus-animated-icon"

type PanelType = "date" | "repeat" | "priority" | "date_picker" | null

export function TaskPromptInput() {
  const [panel, setPanel] = useState<PanelType>(null)
  const [inputValue, setInputValue] = useState("")
  const parsed = useMemo(() => parseTaskText(inputValue), [inputValue])

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  const dateLabel = parsed.date
    ? isSameDay(parsed.date, today)
      ? "Today"
      : isSameDay(parsed.date, tomorrow)
        ? "Tomorrow"
        : format(parsed.date, "EEE")
    : "Today"
  const dateBadge = parsed.date ? format(parsed.date, "dd-MM-yy") : format(today, "dd-MM-yy")
  const priorityLabel = parsed.priority
    ? parsed.priority.charAt(0).toUpperCase() + parsed.priority.slice(1)
    : "Medium"
  const recurrenceLabel = parsed.recurrence
    ? parsed.recurrence.charAt(0).toUpperCase() + parsed.recurrence.slice(1)
    : "One-off"

  return (
    <Popover open={panel !== null} onOpenChange={() => setPanel(null)}>
      <PopoverAnchor asChild>
        <div className="rounded-xl bg-background space-y-2 shadow-sm relative mb-8">
          <div className="flex gap-2 p-2 pb-0">
            <Textarea
              className="resize-none border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-background!"
              placeholder="Type task... (e.g. 'Pay bills @tomorrow !high #personal *daily')"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button size="icon-lg">
              <PlusIcon />
            </Button>
          </div>
          <Separator className="py-0 my-1" />
          <div className="flex justify-between p-2 pt-1">
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setPanel("date")}>
                <CalendarSearch /> {dateLabel}
                <Badge variant="secondary">{dateBadge}</Badge>
              </Button>
              <Button variant="outline" onClick={() => setPanel("repeat")}>
                <Repeat /> {recurrenceLabel}
              </Button>
              <Button variant="outline" onClick={() => setPanel("priority")}>
                <Goal /> {priorityLabel}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon-sm" className="bg-muted-foreground/20" />
              <Button variant="secondary" size="icon-sm" className="bg-muted-foreground/20" />
              <Button variant="secondary" size="icon-sm" className="bg-muted-foreground/20" />
              <Separator orientation="vertical" className="h-7!" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon-sm" variant="secondary">
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>How to!</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </PopoverAnchor>
      <PopoverContent
        side="top"
        align="start"
        className={cn("rounded-xl p-3", panel !== "date_picker" && "w-50")}
        sideOffset={8}
      >
        <Switch
          value={panel!}
          components={{
            date: <DateContent setPanel={setPanel} />,
            repeat: <RepeatContent />,
            priority: <PriorityContent />,
            date_picker: <Calendar mode="single" />,
          }}
          defaultComponent={<></>}
        />
      </PopoverContent>
    </Popover>
  )
}

function PromptMenuItem({
  label,
  hint,
  icon,
  active,
  onPress,
}: {
  label: string
  hint?: string
  icon?: ReactNode
  active?: boolean
  onPress?: () => void
}) {
  return (
    <Button
      variant="ghost"
      onClick={onPress}
      size="sm"
      className={cn("w-full justify-between px-2 font-normal", active && "bg-accent")}
      data-active={active ? "true" : undefined}
    >
      <span className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </span>
      {hint ? <span className="text-xs italic text-muted-foreground">{hint}</span> : null}
    </Button>
  )
}

function DateContent({ setPanel }: { setPanel: Dispatch<SetStateAction<PanelType>> }) {
  return (
    <div className="flex flex-col gap-1">
      <PromptMenuItem
        label="Today"
        hint="Fri"
        icon={<CalendarIcon className="size-4 text-muted-foreground" />}
      />
      <PromptMenuItem
        label="Tomorrow"
        hint="Sat"
        icon={<CalendarIcon className="size-4 text-muted-foreground" />}
      />
      <PromptMenuItem
        label="Next Week"
        hint="Mon"
        icon={<CalendarIcon className="size-4 text-muted-foreground" />}
      />
      <Separator className="my-1" />
      <PromptMenuItem
        label="Custom Date..."
        active
        icon={<CalendarIcon className="size-4 text-primary" />}
        onPress={() => setPanel("date_picker")}
      />
    </div>
  )
}

function PriorityContent() {
  return (
    <div className="flex flex-col gap-1">
      <PromptMenuItem label="Low" icon={<span className="size-2.5 rounded-full bg-sky-400" />} />
      <PromptMenuItem
        label="Medium"
        active
        icon={<span className="size-2.5 rounded-full bg-amber-400" />}
      />
      <PromptMenuItem label="High" icon={<span className="size-2.5 rounded-full bg-rose-500" />} />
    </div>
  )
}

function RepeatContent() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-1.5 text-sm text-primary">
        <span className="text-base leading-none">×</span>
        <span className="font-medium">One-off</span>
      </div>
      <div className="flex flex-col gap-1">
        <PromptMenuItem label="Daily" icon={<Repeat className="size-4 text-muted-foreground" />} />
        <PromptMenuItem label="Weekly" icon={<Repeat className="size-4 text-muted-foreground" />} />
        <PromptMenuItem
          label="Monthly"
          icon={<Repeat className="size-4 text-muted-foreground" />}
        />
      </div>
    </div>
  )
}
