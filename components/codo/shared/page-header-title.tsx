"use client"

import { FadeIn } from "@/components/animated"

export function PageHeaderTitle({
  title,
  description = "",
}: {
  title: string
  description?: string
}) {
  return (
    <header>
      <FadeIn
        as="h1"
        y={12}
        duration={0.4}
        className="scroll-m-20 pb-2 text-3xl font-sans font-bold tracking-tight first:mt-0"
      >
        {title}
      </FadeIn>
      {description ? (
        <FadeIn as="p" y={8} duration={0.35} delay={0.1} className="text-xl text-muted-foreground">
          {description}
        </FadeIn>
      ) : null}
    </header>
  )
}
