"use client"

import { motion, type HTMLMotionProps } from "@/components/animated/motion"

import { springSnappy } from "./transitions"

type HoverScaleProps = Omit<HTMLMotionProps<"div">, "whileHover" | "transition"> & {
  scale?: number
}

export function HoverScale({ children, scale = 1.03, ...rest }: HoverScaleProps) {
  return (
    <motion.div whileHover={{ scale }} transition={springSnappy} {...rest}>
      {children}
    </motion.div>
  )
}
