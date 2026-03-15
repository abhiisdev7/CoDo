"use client"

import { ChevronLeft, ChevronRight, ListTodo, Lock } from "lucide-react"
import React, { useCallback, useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card"
import { CircularCheckbox } from "@ui/circular-checkbox"
import { CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"

export interface SubStep {
  id: string
  label: string
  completed?: boolean
}

export interface FocusModeTaskData {
  id: string
  title: string
  subSteps: SubStep[]
}

export interface FocusModeTaskProps {
  tasks?: FocusModeTaskData[]
  onFinish?: (taskId: string) => void
}

const MOCK_TASKS: FocusModeTaskData[] = [
  {
    id: "1",
    title: "Daily Financial Review and Expense Tracking",
    subSteps: [
      {
        id: "1-1",
        label: "Review completed tasks and evaluate their impact on productivity.",
        completed: true,
      },
      {
        id: "1-2",
        label: "Categorize yesterday's expenses and update the budget sheet.",
        completed: false,
      },
      { id: "1-3", label: "Reconcile bank transactions with your tracking app.", completed: false },
      { id: "1-4", label: "Set spending limits for the rest of the week.", completed: false },
    ],
  },
  {
    id: "2",
    title: "Deep Work: Project Proposal Draft",
    subSteps: [
      { id: "2-1", label: "Outline the problem statement and objectives.", completed: false },
      { id: "2-2", label: "Draft the methodology and timeline sections.", completed: false },
      { id: "2-3", label: "Add budget and resource requirements.", completed: false },
    ],
  },
  {
    id: "3",
    title: "Learning Block: React Patterns",
    subSteps: [
      { id: "3-1", label: "Watch one video on compound components.", completed: true },
      { id: "3-2", label: "Build a small accordion using the pattern.", completed: false },
      { id: "3-3", label: "Note down questions for the team.", completed: false },
    ],
  },
]

function SubTaskItem({
  subStep,
  onToggle,
}: {
  subStep: SubStep
  onToggle: (id: string, checked: boolean) => void
}) {
  const done = subStep.completed ?? false
  const handleChange = useCallback(
    (value: boolean | "indeterminate") => onToggle(subStep.id, value === true),
    [subStep.id, onToggle],
  )

  return (
    <li
      className={cn(
        "p-2 border rounded-xl flex gap-2 items-center hover:border-primary/50 shadow-sm transition-colors",
        done && "border-primary/60 text-muted-foreground bg-muted/30",
      )}
    >
      <CircularCheckbox checked={done} onCheckedChange={handleChange} />
      <p className={cn("flex-1 text-sm", done && "line-through")}>{subStep.label}</p>
    </li>
  )
}

const SubTaskItemMemo = React.memo(SubTaskItem)

function TaskCardContent({
  task,
  onToggleStep,
  onFinish,
}: {
  task: FocusModeTaskData
  onToggleStep: (taskId: string, stepId: string, checked: boolean) => void
  onFinish: (taskId: string) => void
}) {
  const handleToggle = useCallback(
    (stepId: string, checked: boolean) => onToggleStep(task.id, stepId, checked),
    [task.id, onToggleStep],
  )
  const allDone = useMemo(
    () => task.subSteps.length > 0 && task.subSteps.every((s) => s.completed),
    [task.subSteps],
  )

  return (
    <div key={task.id} className="flex flex-col gap-6 overflow-hidden min-w-0">
      <CardHeader className="pb-0">
        <CardDescription>Main Mission</CardDescription>
        <CardTitle className="pr-8">{task.title}</CardTitle>
        <CardAction>
          <Button
            size="sm"
            variant={allDone ? "default" : "secondary"}
            onClick={() => onFinish(task.id)}
            className="gap-1.5"
          >
            <CheckCircle className="size-4" />
            Finish
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <ListTodo size={16} className="inline-block mr-1" />
          Sub Tasks
        </CardDescription>
        <ul className="space-y-2 mt-3">
          {task.subSteps.map((subStep) => (
            <SubTaskItemMemo key={subStep.id} subStep={subStep} onToggle={handleToggle} />
          ))}
        </ul>
      </CardContent>
    </div>
  )
}

function FocusTaskFooterNav({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  isLocked,
}: {
  onPrev: () => void
  onNext: () => void
  canGoPrev: boolean
  canGoNext: boolean
  isLocked: boolean
}) {
  return (
    <div className="flex justify-between w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" disabled={isLocked} aria-pressed={isLocked}>
            <Lock className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Lock this task to prevent changes
          <br />
          while in Focus Mode.
        </TooltipContent>
      </Tooltip>
      <div className="space-x-2 flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={onPrev}
              disabled={!canGoPrev}
              aria-label="Previous task"
            >
              <ChevronLeft className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Previous Task</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={onNext}
              disabled={!canGoNext}
              aria-label="Next task"
            >
              <ChevronRight className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Next Task</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export function FocusModeTask({ tasks = MOCK_TASKS, onFinish }: FocusModeTaskProps) {
  const [taskList, setTaskList] = useState<FocusModeTaskData[]>(() =>
    tasks.map((t) => ({ ...t, subSteps: t.subSteps.map((s) => ({ ...s })) })),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lockedTaskId, setLockedTaskId] = useState<string | null>(null)

  const currentTask = taskList[currentIndex] ?? null
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < taskList.length - 1

  const handlePrev = useCallback(() => {
    if (!canGoPrev) return
    setCurrentIndex((i) => Math.max(0, i - 1))
  }, [canGoPrev])

  const handleNext = useCallback(() => {
    if (!canGoNext) return
    setCurrentIndex((i) => Math.min(taskList.length - 1, i + 1))
  }, [canGoNext, taskList.length])

  const handleToggleStep = useCallback((taskId: string, stepId: string, checked: boolean) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id !== taskId
          ? task
          : {
              ...task,
              subSteps: task.subSteps.map((s) =>
                s.id !== stepId ? s : { ...s, completed: checked },
              ),
            },
      ),
    )
  }, [])

  const handleFinish = useCallback(
    (taskId: string) => {
      onFinish?.(taskId)
    },
    [onFinish],
  )

  if (taskList.length === 0) return null

  return (
    <Card className="w-full max-w-md">
      {currentTask && (
        <TaskCardContent
          task={currentTask}
          onToggleStep={handleToggleStep}
          onFinish={handleFinish}
        />
      )}
      <CardFooter className="flex justify-between">
        <FocusTaskFooterNav
          onPrev={handlePrev}
          onNext={handleNext}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          isLocked={lockedTaskId === currentTask?.id}
        />
      </CardFooter>
    </Card>
  )
}
