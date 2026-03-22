import { TaskListWithMotion } from "@/components/codo/task-list/task-list-with-motion"
import { TaskPromptInput } from "@/components/codo/task-list/task-prompt-input"
import { TaskSearchInput } from "@/components/codo/task-list/task-search-input"
import { TaskViewContent } from "@/components/codo/task-list/task-view-content"
import { TaskViewHeader } from "@/components/codo/task-list/task-view-header"
import { CalendarTask, TaskCalendar } from "@/components/ui/task-calendar"
import { Tabs, TabsContent } from "@ui/tabs"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{ view: string }>
}

export const VALID_VIEWS = [
  "inbox",
  "today",
  "upcoming",
  "overdue",
  "completed",
  "insights",
  "settings",
] as const

export type ViewSlug = (typeof VALID_VIEWS)[number]

export function isValidView(slug: string): slug is ViewSlug {
  return (VALID_VIEWS as readonly string[]).includes(slug)
}

export function generateStaticParams() {
  return VALID_VIEWS.map((view) => ({ view }))
}

export const MOCK_CALENDAR_TASKS: CalendarTask[] = [
  { date: new Date(2026, 2, 12), title: "bnm,.", color: "yellow" },
  { date: new Date(2026, 2, 12), title: "ghnm", color: "pink" },
  { date: new Date(2026, 2, 21), title: "gnm", color: "yellow" },
]

export default async function ViewPage({ params }: PageProps) {
  const { view: viewSlug } = await params

  if (!isValidView(viewSlug)) {
    notFound()
  }

  return (
    <div className="p-8 pb-0 w-3xl mx-auto min-h-full">
      <TaskViewContent>
        <div className="space-y-8">
          <Tabs defaultValue="">
            <TaskViewHeader />
            <TabsContent value="" className="mt-6 space-y-8">
              <TaskSearchInput />
              <TaskListWithMotion />
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
