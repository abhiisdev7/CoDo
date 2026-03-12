import { SearchInput } from "@/components/codo/SearchInput"
import { PromptInput } from "@/components/codo/PromptInput"
import { TodoItem } from "@/components/codo/TodoItem"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarFold, ListTodo } from "lucide-react"
import { notFound } from "next/navigation"

const VALID_VIEWS = [
  "inbox",
  "today",
  "upcoming",
  "overdue",
  "completed",
  "focus",
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
        <HeaderTitle />
        <SearchInput />
        <div className="space-y-4">
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
      </div>
      <PromptInput />
    </div>
  )
}

function HeaderTitle() {
  return (
    <div className="flex justify-between">
      <header>
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground">2 tasks active.</p>
      </header>
      <div className="flex gap-2">
        <Button variant="default" size="icon-lg">
          <Calendar />
        </Button>
        <Button variant="default" size="icon-lg">
          <ListTodo />
        </Button>
        <Button variant="default" size="icon-lg">
          <CalendarFold />
        </Button>
      </div>
    </div>
  )
}
