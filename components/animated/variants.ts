import type { Variants } from "motion/react"

import { EASE_OUT_EXPO } from "./transitions"

/** Parent: staggers direct children (default spacing) */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

/** Child: rises into place (larger vertical offset) */
export const staggerItemComfortable: Variants = {
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

/** Child: subtler vertical motion */
export const staggerItemCompact: Variants = {
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

/** Tighter stagger timing (e.g. dense nav lists) */
export const staggerParentDense: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
}

/** Child: slides in horizontally; optional `hover` for light emphasis */
export const staggerItemSlideIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.04 : 0,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
  hover: { scale: 1.01 },
}

/** Opacity-only reveal */
export const reveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

/** Opacity + slight drop from above */
export const revealLift: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

/** Short opacity fade (e.g. section labels) */
export const revealLabel: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

/** For `AnimatePresence` + directional navigation (custom = 1 | -1) */
export const directionalSlideVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction === 1 ? 28 : -28,
    filter: "blur(6px)",
  }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction === 1 ? -28 : 28,
    filter: "blur(6px)",
  }),
}

/** Staggered list rows with optional reduced-motion flattening */
export function createStaggerListReveal(reduceMotion: boolean | null): {
  parent: Variants
  child: Variants
} {
  return {
    parent: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.06,
          delayChildren: reduceMotion ? 0 : 0.04,
        },
      },
    },
    child: {
      hidden: {
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 8,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduceMotion ? 0 : 0.28,
          ease: EASE_OUT_EXPO,
        },
      },
    },
  }
}
