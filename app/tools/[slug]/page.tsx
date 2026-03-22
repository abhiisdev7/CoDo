import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { TOOLS } from "@/lib/tools-registry"
import { ArrowLeft } from "lucide-react"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return TOOLS.filter((t) => t.slug !== "codo").map((t) => ({ slug: t.slug }))
}

export default async function ToolkitToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = TOOLS.find((t) => t.slug === slug)

  if (!tool || slug === "codo") {
    notFound()
  }

  const Icon = tool.icon

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Button variant="ghost" className="mb-8 -ml-2 gap-2" asChild>
          <Link href="/tools">
            <ArrowLeft className="size-4" aria-hidden />
            All modules
          </Link>
        </Button>
        <div className="flex items-start gap-4">
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm"
            aria-hidden
          >
            <Icon className="size-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{tool.title}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
            <p className="pt-2 text-sm text-muted-foreground">
              This utility is coming soon. Navigation is live; functionality will land here next.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
