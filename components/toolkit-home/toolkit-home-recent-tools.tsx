"use client"

import { Button } from "@/components/ui/button"
import { RECENT_TOOLS, toolkitToolHref } from "@/lib/toolkit/registry"
import { motion, useReducedMotion } from "motion/react"
import { Plus } from "lucide-react"
import Link from "next/link"

export function ToolkitHomeRecentTools() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="rounded-2xl border border-border bg-muted/40 p-6 shadow-sm"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="recent-tools-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md space-y-1">
          <h2
            id="recent-tools-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Recent Tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Quickly jump back into your most used utilities.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {RECENT_TOOLS.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.slug}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.2 + index * 0.05 }}
              >
                <Link href={toolkitToolHref(tool.slug)}>
                  <Button variant="secondary" size="lg">
                    <Icon className="size-4 text-primary" aria-hidden />
                    {tool.title}
                  </Button>
                </Link>
              </motion.div>
            )
          })}
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="border-dashed"
            aria-label="Add a tool to recent"
            asChild
          >
            <Link href="/tools">
              <Plus className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
