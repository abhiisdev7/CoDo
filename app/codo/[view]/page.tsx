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

  const title = viewSlug.charAt(0).toUpperCase() + viewSlug.slice(1)

  return (
    <div className="w-3xl bg-red-500 mx-auto">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="text-muted-foreground">View: {viewSlug}</p>
    </div>
  )
}
