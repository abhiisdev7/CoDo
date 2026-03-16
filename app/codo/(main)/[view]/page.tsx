import { TaskViewHeader } from "@/components/codo/task-list/task-view-header"
import { TaskViewContent } from "@/components/codo/task-list/task-view-content"
import { TaskPromptInput } from "@/components/codo/task-list/task-prompt-input"
import { TaskSearchInput } from "@/components/codo/task-list/task-search-input"
import { TaskListWithMotion } from "@/components/codo/task-list/task-list-with-motion"
import { TaskCalendar } from "@/components/ui/task-calendar"
import { Tabs, TabsContent } from "@ui/tabs"
import { notFound } from "next/navigation"
import { VALID_VIEWS, isValidView } from "@/lib/codo/views"
import { MOCK_CALENDAR_TASKS } from "@/lib/codo/mock-tasks"

type PageProps = {
  params: Promise<{ view: string }>
}

export function generateStaticParams() {
  return VALID_VIEWS.map((view) => ({ view }))
}

export default async function ViewPage({ params }: PageProps) {
  const { view: viewSlug } = await params

  if (!isValidView(viewSlug)) {
    notFound()
  }

  return (
    <div className="p-8 w-3xl mx-auto min-h-full">
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
