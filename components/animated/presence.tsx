"use client"

import { motion, type HTMLMotionProps } from "@/components/animated/motion"

import { directionalSlideVariants } from "./variants"

type PresenceSlideXProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>

/** Month / view swap: slides horizontally while cross-fading */
export function PresenceSlideX({ children, ...rest }: PresenceSlideXProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type BlurFadeListItemProps = Omit<
  HTMLMotionProps<"li">,
  "initial" | "animate" | "exit" | "transition" | "layout"
> & {
  index: number
}

/** List row with layout + blur enter/exit (e.g. checklist items) */
export function BlurFadeListItem({ index, className, children, ...rest }: BlurFadeListItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
      transition={{
        duration: 0.24,
        ease: "easeOut",
        delay: Math.min(index * 0.04, 0.2),
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.li>
  )
}

type BlurFadeSpanProps = Omit<
  HTMLMotionProps<"span">,
  "initial" | "animate" | "exit" | "transition"
>

/** Inline title swap with blur cross-fade */
export function BlurFadeSpan({ children, ...rest }: BlurFadeSpanProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -6, filter: "blur(10px)" }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.span>
  )
}

type DirectionalSlideProps = Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "animate" | "exit" | "custom" | "transition"
> & {
  direction: 1 | -1
}

/** Panel that enters/exits on a horizontal axis (custom direction for AnimatePresence) */
export function DirectionalSlide({ direction, children, ...rest }: DirectionalSlideProps) {
  return (
    <motion.div
      custom={direction}
      variants={directionalSlideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.26, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
