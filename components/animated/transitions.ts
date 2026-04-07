import type { Transition } from "motion/react"

/** Primary UI easing — smooth deceleration used across toolkit and CoDo surfaces */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

export const springSnappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
}

export function transitionEaseOut(
  duration: number,
  delay = 0,
  ease: Transition["ease"] = EASE_OUT_EXPO,
): Transition {
  return { duration, delay, ease }
}
