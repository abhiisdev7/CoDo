"use client"

import { Button } from "@/components/ui/button"
import { TOOLS, toolHref } from "@/lib/tools-registry"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Plus } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"

export function ToolkitHomeRecentTools() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="recent-tools-heading"
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Tools</CardTitle>
          <CardDescription>Quickly jump back into your most used utilities.</CardDescription>
          <CardAction className="flex flex-wrap items-center gap-2">
            {TOOLS.slice(0, 3).map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.slug} href={toolHref(tool.slug)}>
                  <Button variant="secondary" size="lg">
                    <Icon className="size-4 text-primary" aria-hidden />
                    {tool.title}
                  </Button>
                </Link>
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
          </CardAction>
        </CardHeader>
      </Card>
    </motion.section>
  )
}
