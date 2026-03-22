"use client"

import { PageHeaderTitle } from "@/components/codo/shared/page-header-title"
import { Button } from "@/components/ui/button"
import { TOOLS, toolHref } from "@/lib/tools-registry"
import { ArrowLeft } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"

export default function ToolsPage() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.main
      className="mx-auto flex min-h-full max-w-3xl flex-col gap-8 px-8 pb-0 pt-8"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <PageHeaderTitle
        title="All modules"
        description="Every utility available from the toolkit home."
      />

      <Button variant="secondary" asChild className="w-max" size="sm">
        <Link href="/">
          <ArrowLeft aria-hidden />
          Back to toolkit home
        </Link>
      </Button>

      <motion.ul
        className="divide-y overflow-hidden rounded-xl border border-border bg-card"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.06,
              delayChildren: reduceMotion ? 0 : 0.04,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <motion.li
              key={tool.slug}
              variants={{
                hidden: {
                  opacity: reduceMotion ? 1 : 0,
                  y: reduceMotion ? 0 : 8,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: reduceMotion ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                },
              }}
            >
              <Link
                href={toolHref(tool.slug)}
                className={`flex gap-4 px-4 py-4 transition-colors hover:bg-muted focus:bg-muted focus:outline-0`}
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary"
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-foreground">{tool.title}</span>
                  <span className="block text-sm text-muted-foreground">{tool.description}</span>
                </span>
              </Link>
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.main>
  )
}
