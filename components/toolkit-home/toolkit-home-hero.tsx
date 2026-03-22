"use client"

import { motion, useReducedMotion } from "motion/react"

export function ToolkitHomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="mx-auto max-w-3xl px-1 text-center">
      <motion.p
        className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        The Zen Architect
      </motion.p>
      <motion.h1
        className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        Build with <em className="text-primary italic">clarity.</em>
      </motion.h1>
    </div>
  )
}
