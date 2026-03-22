import Link from "next/link"

import { getAllToolkitTools, toolkitToolHref } from "@/lib/toolkit/registry"

export default function ToolkitIndexPage() {
  const tools = getAllToolkitTools()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">All modules</h1>
        <p className="mt-2 text-muted-foreground">Every utility available from the toolkit home.</p>
        <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <li key={tool.slug}>
                <Link
                  href={toolkitToolHref(tool.slug)}
                  className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{tool.title}</span>
                    <span className="block text-sm text-muted-foreground">{tool.description}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-8">
          <Link
            href="/"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Back to toolkit home
          </Link>
        </p>
      </div>
    </div>
  )
}
