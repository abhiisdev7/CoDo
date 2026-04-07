"use client"

import { motion, type HTMLMotionProps } from "@/components/animated/motion"
import type { Variants } from "motion/react"

import { staggerItemComfortable, staggerItemCompact, staggerParent } from "./variants"

export type StaggerPreset = "comfortable" | "compact"

const itemByPreset: Record<StaggerPreset, Variants> = {
  comfortable: staggerItemComfortable,
  compact: staggerItemCompact,
}

type StaggerRootProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "variants"> & {
  variants?: Variants
}

export function StaggerRoot({ variants, children, ...rest }: StaggerRootProps) {
  const v = variants ?? staggerParent
  return (
    <motion.div variants={v} initial="hidden" animate="visible" {...rest}>
      {children}
    </motion.div>
  )
}

type StaggerItemTags = "div" | "li"

const staggerItemTags: Record<StaggerItemTags, typeof motion.div | typeof motion.li> = {
  div: motion.div,
  li: motion.li,
}

type StaggerItemProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "variants" | "custom"
> & {
  as?: StaggerItemTags
  preset?: StaggerPreset
  index: number
  variants?: Variants
}

export function StaggerItem({
  as = "div",
  preset = "comfortable",
  index,
  variants,
  children,
  ...rest
}: StaggerItemProps) {
  const v = variants ?? itemByPreset[preset]
  const Component = staggerItemTags[as]
  return (
    <Component variants={v} custom={index} {...(rest as Record<string, unknown>)}>
      {children}
    </Component>
  )
}
