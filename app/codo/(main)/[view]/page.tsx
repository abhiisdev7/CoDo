"use client"

import { TaskListWithMotion } from "@/components/codo/task-list/task-list-with-motion"
import { TaskPromptInput } from "@/components/codo/task-list/task-prompt-input"
import { TaskSearchInput } from "@/components/codo/task-list/task-search-input"
import { TaskViewContent } from "@/components/codo/task-list/task-view-content"
import { TaskViewHeader } from "@/components/codo/task-list/task-view-header"
import { CalendarTask, TaskCalendar } from "@/components/ui/task-calendar"
import { tasksService } from "@/services/codo/codo-tasks-service"
import { Tabs, TabsContent } from "@ui/tabs"
import { useLiveQuery } from "dexie-react-hooks"
import { useParams } from "next/navigation"
import PageLoader from "@ui/page-loader"

export const VALID_VIEWS = [
  "inbox",
  "today",
  "upcoming",
  "overdue",
  "completed",
  "insights",
  "settings",
  PageLoader,
] as const

export type ViewSlug = (typeof VALID_VIEWS)[number]

export function isValidView(slug: string) {
  return (VALID_VIEWS as readonly string[]).includes(slug)
}

export const MOCK_CALENDAR_TASKS: CalendarTask[] = [
  { date: new Date(2026, 2, 12), title: "bnm,.", color: "yellow" },
  { date: new Date(2026, 2, 12), title: "ghnm", color: "pink" },
  { date: new Date(2026, 2, 21), title: "gnm", color: "yellow" },
]

export default function ViewPage() {
  const params = useParams<{ view: string | string[] }>()
  const tasks = useLiveQuery(() => tasksService.getActiveTasks())

  if (!params?.view) {
    return null
  }

  if (!tasks) return <></>

  return (
    <div className="p-8 pb-0 w-3xl mx-auto min-h-full">
      <TaskViewContent>
        <div className="space-y-8">
          <Tabs defaultValue="">
            <TaskViewHeader />
            <TabsContent value="" className="mt-6 space-y-8">
              <TaskSearchInput />
              <TaskListWithMotion tasks={tasks} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-6">
              <TaskCalendar tasks={MOCK_CALENDAR_TASKS} />
            </TabsContent>
          </Tabs>
        </div>
        <TaskPromptInput />
      </TaskViewContent>
    </div>
  )
}
