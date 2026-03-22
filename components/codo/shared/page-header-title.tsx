"use client"

import { motion, useReducedMotion } from "motion/react"

export function PageHeaderTitle({
  title,
  description = "",
}: {
  title: string
  description?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <header>
      <motion.h1
        className="scroll-m-20 pb-2 text-3xl font-sans font-bold tracking-tight first:mt-0"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h1>
      {description ? (
        <motion.p
          className="text-xl text-muted-foreground"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {description}
        </motion.p>
      ) : null}
    </header>
  )
}
