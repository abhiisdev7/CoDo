"use client"

import { FadeIn } from "@/components/animated"

export function InsightsSectionWithMotion({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn
      as="section"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4"
      y={8}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </FadeIn>
  )
}
