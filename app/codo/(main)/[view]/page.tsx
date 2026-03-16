import { PromptInput } from "@/components/codo/prompt-input"
import { SearchInput } from "@/components/codo/search-input"
import { TodoItem } from "@/components/codo/todo-item"
import { TaskCalendar, type CalendarTask } from "@/components/ui/task-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs"
import { Calendar, CalendarFold, ListTodo } from "lucide-react"
import { notFound } from "next/navigation"
import { HeaderTitle } from "@/components/codo/header-title"

const MOCK_CALENDAR_TASKS: CalendarTask[] = [
  { date: new Date(2026, 2, 12), title: "bnm,.", color: "yellow" },
  { date: new Date(2026, 2, 12), title: "ghnm", color: "pink" },
  { date: new Date(2026, 2, 21), title: "gnm", color: "yellow" },
]

const VALID_VIEWS = [
  "inbox",
  "today",
  "upcoming",
  "overdue",
  "completed",
  "insights",
  "settings",
] as const

type ViewSlug = (typeof VALID_VIEWS)[number]

function isValidView(slug: string): slug is ViewSlug {
  return (VALID_VIEWS as readonly string[]).includes(slug)
}

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
    <div className="w-3xl mx-auto flex flex-col justify-between gap-8 min-h-full">
      <div className="space-y-8">
        <Tabs defaultValue="">
          <HeaderSection />
          <TabsContent value="" className="mt-6 space-y-8">
            <SearchInput />
            <div className="space-y-4">
              <TodoItem sortEnabled />
              <TodoItem />
              <TodoItem />
            </div>
          </TabsContent>
          <TabsContent value="calendar" className="mt-6">
            <TaskCalendar tasks={MOCK_CALENDAR_TASKS} />
          </TabsContent>
        </Tabs>
      </div>
      <PromptInput />
    </div>
  )
}

function HeaderSection() {
  return (
    <div className="flex justify-between">
      <HeaderTitle title="My Tasks" description="2 Tasks active." />
      <div className="flex gap-2">
        <TabsList>
          <TabsTrigger value="rearrange">
            <Calendar />
          </TabsTrigger>
          <TabsTrigger value="">
            <ListTodo />
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarFold />
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  )
}
