"use client"

import { ToolkitHomeToolCard } from "@/components/toolkit-home/toolkit-home-tool-card"
import type { ToolkitTool } from "@/lib/tools-registry"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"

type ToolkitHomeCoreToolkitProps = {
  tools: ToolkitTool[]
}

export function ToolkitHomeCoreToolkit({ tools }: ToolkitHomeCoreToolkitProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="space-y-6"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      aria-labelledby="core-toolkit-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          id="core-toolkit-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Core Toolkit
        </h2>
        <Link
          href="/tools"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          View all modules
        </Link>
      </div>
      {tools.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
          No tools match your search. Try a different keyword.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool, index) => (
            <ToolkitHomeToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      )}
    </motion.section>
  )
}
