"use client"

import { FadeIn } from "@/components/animated"

export function ToolkitHomeHero() {
  return (
    <div className="mx-auto max-w-3xl px-1 text-center">
      <FadeIn
        as="p"
        y={8}
        duration={0.35}
        className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
      >
        - CoDo -
      </FadeIn>
      <FadeIn
        as="h1"
        y={12}
        duration={0.4}
        delay={0.05}
        className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
      >
        Build with <em className="text-primary italic">clarity.</em>
      </FadeIn>
    </div>
  )
}
