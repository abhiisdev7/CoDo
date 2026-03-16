"use client"

import { motion } from "motion/react"

export function TaskViewContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col justify-between gap-8 min-h-full"
    >
      {children}
    </motion.div>
  )
}
