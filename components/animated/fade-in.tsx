"use client"

import type { Transition } from "motion/react"

import { motion, useReducedMotion, type HTMLMotionProps } from "@/components/animated/motion"

import { EASE_OUT_EXPO } from "./transitions"

const tags = {
  div: motion.div,
  main: motion.main,
  section: motion.section,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
  aside: motion.aside,
  span: motion.span,
  button: motion.button,
} as const

export type FadeInTag = keyof typeof tags

type FadeInOwnProps<T extends FadeInTag> = {
  as?: T
  /** Vertical offset when entering (`mode="fadeUp"` only) */
  y?: number
  delay?: number
  duration?: number
  /** `fade`: opacity only; `fadeUp`: opacity + translateY */
  mode?: "fade" | "fadeUp"
  /** Skip enter animation (combined with `prefers-reduced-motion`) */
  disabled?: boolean
  transition?: Partial<Transition>
}

export type FadeInProps = FadeInOwnProps<FadeInTag> &
  Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition">

export function FadeIn({
  as,
  mode = "fadeUp",
  y = 8,
  delay = 0,
  duration = 0.35,
  disabled = false,
  transition: transitionOverride,
  children,
  ...rest
}: FadeInProps) {
  const reduceMotion = useReducedMotion()
  const skip = disabled || reduceMotion
  const tag = (as ?? "div") as FadeInTag
  const Component = tags[tag]

  const to = transitionOverride ?? {}
  const baseDelay = to.delay ?? delay
  const transition: Transition = {
    duration: to.duration ?? duration,
    ease: to.ease ?? EASE_OUT_EXPO,
    ...to,
    delay: skip ? 0 : baseDelay,
  }

  return (
    <Component
      initial={skip ? false : mode === "fade" ? { opacity: 0 } : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Component>
  )
}
