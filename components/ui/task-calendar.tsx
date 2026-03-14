"use client"

import * as React from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const

export type CalendarTask = {
  date: Date | string
  title: string
  color?: string
}

const TASK_COLOR_MAP: Record<string, string> = {
  "chart-1": "bg-chart-1/20 text-chart-1 dark:bg-chart-1/30 dark:text-chart-1",
  "chart-2": "bg-chart-2/20 text-chart-2 dark:bg-chart-2/30 dark:text-chart-2",
  "chart-3": "bg-chart-3/20 text-chart-3 dark:bg-chart-3/30 dark:text-chart-3",
  "chart-4": "bg-chart-4/20 text-chart-4 dark:bg-chart-4/30 dark:text-chart-4",
  "chart-5": "bg-chart-5/20 text-chart-5 dark:bg-chart-5/30 dark:text-chart-5",
  yellow: "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-400",
  pink: "bg-pink-500/20 text-pink-700 dark:bg-pink-500/30 dark:text-pink-400",
  destructive: "bg-destructive/20 text-destructive dark:bg-destructive/30 dark:text-destructive",
}

const DEFAULT_TASK_COLOR = TASK_COLOR_MAP["chart-1"] ?? "bg-chart-1/20 text-chart-1"

function getTaskColorClass(color?: string): string {
  if (!color) return DEFAULT_TASK_COLOR
  return TASK_COLOR_MAP[color] ?? DEFAULT_TASK_COLOR
}

function normalizeTaskDate(d: Date | string): Date {
  return typeof d === "string" ? new Date(d) : d
}

type TaskCalendarProps = {
  tasks: CalendarTask[]
  onDayClick?: (date: Date) => void
  onTaskClick?: (task: CalendarTask) => void
  month?: Date
  onMonthChange?: (date: Date) => void
  className?: string
}

export function TaskCalendar({
  tasks,
  onDayClick,
  onTaskClick,
  month: controlledMonth,
  onMonthChange,
  className,
}: TaskCalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState(() => new Date())
  const month = controlledMonth ?? internalMonth
  const setMonth = React.useCallback(
    (next: Date) => {
      if (onMonthChange) onMonthChange(next)
      else setInternalMonth(next)
    },
    [onMonthChange]
  )

  const goToToday = React.useCallback(() => {
    const today = new Date()
    setMonth(today)
  }, [setMonth])

  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd })
  const weeks = React.useMemo(() => {
    const w: Date[][] = []
    for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7))
    return w
  }, [days])

  const tasksByDay = React.useMemo(() => {
    const map = new Map<string, CalendarTask[]>()
    for (const task of tasks) {
      const d = normalizeTaskDate(task.date)
      const key = format(d, "yyyy-MM-dd")
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(task)
    }
    return map
  }, [tasks])

  return (
    <div className={cn("flex w-full flex-col gap-4 bg-background p-4 rounded-xl border", className)}>
      <header
        className="flex flex-wrap items-center justify-between gap-2"
        aria-label="Calendar navigation">
        <h2 className="text-lg font-bold tabular-nums">
          {format(month, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMonth(subMonths(month, 1))}
            aria-label="Previous month"
            className={cn(buttonVariants({ variant: "ghost" }), "size-8")}>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            aria-label="Go to today">
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMonth(addMonths(month, 1))}
            aria-label="Next month"
            className={cn(buttonVariants({ variant: "ghost" }), "size-8")}>
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </header>

      <div
        role="grid"
        aria-label={format(month, "MMMM yyyy")}
        className="grid w-full grid-cols-7 gap-2">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            role="columnheader"
            className="rounded-md text-center text-[0.8rem] font-normal uppercase text-muted-foreground select-none">
            {label}
          </div>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={format(month, "yyyy-MM")}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="col-span-7 grid grid-cols-7 gap-2">
            {days.map((day) => {
              const dayKey = format(day, "yyyy-MM-dd")
              const dayTasks = tasksByDay.get(dayKey) ?? []
              const isCurrentMonth = isSameMonth(day, month)
              const isTodayDate = isToday(day)

              return (
                <DayCell
                  key={dayKey}
                  day={day}
                  isCurrentMonth={isCurrentMonth}
                  isToday={isTodayDate}
                  tasks={dayTasks}
                  onDayClick={onDayClick}
                  onTaskClick={onTaskClick}
                />
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

type DayCellProps = {
  day: Date
  isCurrentMonth: boolean
  isToday: boolean
  tasks: CalendarTask[]
  onDayClick?: (date: Date) => void
  onTaskClick?: (task: CalendarTask) => void
}

function DayCell({
  day,
  isCurrentMonth,
  isToday,
  tasks,
  onDayClick,
  onTaskClick,
}: DayCellProps) {
  return (
    <motion.div
      role="gridcell"
      aria-label={format(day, "EEEE, MMMM d, yyyy")}
      layout
      initial={false}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "flex min-h-24 flex-col gap-1 rounded-xl border hover:border-2 p-2 bg-muted/20 transition-colors",
        isCurrentMonth ? "text-foreground" : "text-muted-foreground/70 border-muted",
        isToday && "border-primary border-2"
      )}
      onClick={() => onDayClick?.(day)}>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full text-sm font-medium tabular-nums font-sans",
            isToday
              ? "bg-primary text-primary-foreground"
              : "bg-transparent"
          )}>
          {format(day, "d")}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
        {tasks.map((task, i) => (
          <motion.button
            key={`${normalizeTaskDate(task.date).toISOString()}-${i}`}
            type="button"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: i * 0.03 }}
            className={cn(
              "truncate rounded-md px-1.5 py-0.5 text-left text-xs font-medium transition-opacity hover:opacity-90",
              getTaskColorClass(task.color)
            )}
            onClick={(e) => {
              e.stopPropagation()
              onTaskClick?.(task)
            }}>
            {task.title}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
