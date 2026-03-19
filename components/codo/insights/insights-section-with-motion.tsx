"use client"

import { motion } from "motion/react"

export function InsightsSectionWithMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}
