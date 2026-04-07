"use client"

/**
 * Single import surface for Motion primitives used outside composable wrappers
 * (e.g. icon SVG paths, layout, useAnimation).
 *
 * SSR: this module is client-only (`"use client"`). Server Components should not
 * import it directly—use files under `components/animated/` that are marked
 * client, or pass static HTML from the server and wrap interactivity in a child
 * client component.
 */
export {
  AnimatePresence,
  MotionConfig,
  motion,
  motionValue,
  useAnimation,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

export type { HTMLMotionProps, MotionValue, Transition, Variants } from "motion/react"
