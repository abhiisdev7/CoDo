"use client"

import type { ToolkitTool } from "@/lib/tools-registry"
import { FadeIn } from "@/components/animated"
import Link from "next/link"
import { Badge } from "@ui/badge"

type ToolkitHomeToolCardProps = {
  tool: ToolkitTool
  index: number
}

export function ToolkitHomeToolCard({ tool, index }: ToolkitHomeToolCardProps) {
  const Icon = tool.icon

  return (
    <FadeIn y={8} duration={0.25} delay={index * 0.04} transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <Link
        href={tool.slug}
        className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl bg-card p-4 text-center shadow-sm transition-colors hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background relative border hover:border-primary group"
      >
        {tool?.badge !== null && (
          <Badge
            variant="outline"
            className="rounded-sm absolute top-2 right-2 bg-primary/20 border-primary"
          >
            {tool?.badge}
          </Badge>
        )}
        <span
          className="flex size-12 items-center justify-center rounded-lg border border-border bg-background text-primary transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
          aria-hidden
        >
          <Icon className="size-6" />
        </span>
        <span className="text-sm font-medium leading-tight text-foreground">{tool.title}</span>
      </Link>
    </FadeIn>
  )
}
