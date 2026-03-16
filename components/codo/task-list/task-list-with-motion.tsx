"use client"

import { motion, type Variants } from "motion/react"
import { TaskListItem } from "./task-list-item"

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.06 : 0,
      duration: 0.22,
      ease: "easeOut",
    },
  }),
}

export function TaskListWithMotion() {
  return (
    <motion.div className="space-y-4" variants={listVariants} initial="hidden" animate="visible">
      <motion.div variants={listItemVariants} custom={0}>
        <TaskListItem sortEnabled />
      </motion.div>
      <motion.div variants={listItemVariants} custom={1}>
        <TaskListItem />
      </motion.div>
      <motion.div variants={listItemVariants} custom={2}>
        <TaskListItem />
      </motion.div>
    </motion.div>
  )
}
