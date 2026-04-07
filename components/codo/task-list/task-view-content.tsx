"use client"

import { FadeIn } from "@/components/animated"

export function TaskViewContent({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn
      className="flex flex-col justify-between gap-8 min-h-full"
      y={8}
      duration={0.25}
      transition={{ ease: "easeOut" }}
    >
      {children}
    </FadeIn>
  )
}
