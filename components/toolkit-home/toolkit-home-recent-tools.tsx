"use client"

import { FadeIn } from "@/components/animated"
import { Button } from "@/components/ui/button"
import { TOOLS } from "@/lib/tools-registry"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"

export function ToolkitHomeRecentTools() {
  return (
    <FadeIn
      as="section"
      y={8}
      duration={0.35}
      delay={0.15}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
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
                <Link key={tool.slug} href={tool.slug}>
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
    </FadeIn>
  )
}
