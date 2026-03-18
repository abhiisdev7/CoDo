"use client"

import * as React from "react"
import { flushSync } from "react-dom"

import { Switch } from "@ui/switch"

import { cn } from "@/lib/utils"

type AnimatedThemeSwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof Switch>,
  "checked" | "onCheckedChange" | "className"
> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  duration?: number
  className?: string
  switchClassName?: string
}

export function AnimatedThemeSwitch({
  className,
  switchClassName,
  duration = 400,
  checked,
  onCheckedChange,
  ...switchProps
}: AnimatedThemeSwitchProps) {
  const clickPointRef = React.useRef<{ x: number; y: number } | null>(null)

  const startThemeTransition = React.useCallback(
    (nextChecked: boolean) => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

      const point = clickPointRef.current
      // Clear early so a subsequent toggle without pointer/keyboard position doesn't reuse stale coords.
      clickPointRef.current = null

      const x = point?.x ?? window.innerWidth / 2
      const y = point?.y ?? window.innerHeight / 2
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight

      const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y))

      const applyTheme = () => {
        document.documentElement.classList.toggle("dark", nextChecked)
        localStorage.setItem("theme", nextChecked ? "dark" : "light")
        onCheckedChange(nextChecked)
      }

      if (prefersReducedMotion || typeof document.startViewTransition !== "function") {
        applyTheme()
        return
      }

      const transition = document.startViewTransition(() => {
        flushSync(applyTheme)
      })

      const ready = transition?.ready
      if (ready && typeof ready.then === "function") {
        ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
            },
            {
              duration,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          )
        })
      }
    },
    [duration, onCheckedChange],
  )

  const { onPointerDown, onKeyDown, ...rest } = switchProps

  return (
    <Switch
      checked={checked}
      onCheckedChange={(nextChecked) => startThemeTransition(nextChecked)}
      onPointerDown={(e) => {
        clickPointRef.current = { x: e.clientX, y: e.clientY }
        onPointerDown?.(e)
      }}
      onKeyDown={(e) => {
        // For keyboard toggles we don't get pointer coords; use element center instead.
        if (e.key === "Enter" || e.key === " ") {
          const rect = e.currentTarget.getBoundingClientRect()
          clickPointRef.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }
        }
        onKeyDown?.(e)
      }}
      className={cn(switchClassName, className)}
      {...rest}
    />
  )
}
