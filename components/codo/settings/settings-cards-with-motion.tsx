"use client"

import { motion, type Variants } from "motion/react"
import { SettingsAppearance } from "./settings-appearance"
import { SettingsMomentumGoal } from "./settings-momentum-goal"
import { SettingsTagManagement } from "./settings-tag-management"
import { SettingsSupport } from "./settings-support"
import { SettingsDataControls } from "./settings-data-controls"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.06 : 0,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
}

export function SettingsCardsWithMotion() {
  return (
    <motion.div
      className="flex flex-col gap-4 pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants} custom={0}>
        <SettingsAppearance />
      </motion.div>
      <motion.div variants={cardVariants} custom={1}>
        <SettingsMomentumGoal />
      </motion.div>
      <motion.div variants={cardVariants} custom={2}>
        <SettingsTagManagement />
      </motion.div>
      <motion.div variants={cardVariants} custom={3}>
        <SettingsSupport />
      </motion.div>
      <motion.div variants={cardVariants} custom={4}>
        <SettingsDataControls />
      </motion.div>
    </motion.div>
  )
}
