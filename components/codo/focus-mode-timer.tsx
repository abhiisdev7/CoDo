"use client"

import { CircleCheck, Pause, Play, RotateCcw } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { SlidingNumber } from "@/components/ui/sliding-number"
import { cn } from "@/lib/utils"

const DEFAULT_DURATION = 25 * 60

function getHMS(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return {
    hours: h,
    minutes: m,
    seconds: s,
    hoursStr: String(h).padStart(2, "0"),
    minutesStr: String(m).padStart(2, "0"),
    secondsStr: String(s).padStart(2, "0"),
  }
}

function formatTimeA11y(totalSeconds: number): string {
  const { hours, minutes, seconds } = getHMS(totalSeconds)
  const parts = [hours, minutes, seconds].map((n) => String(n).padStart(2, "0"))
  return parts.join(":")
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex min-w-20 items-center justify-center rounded-2xl border border-border bg-card px-4 py-6 shadow-sm sm:min-w-24 sm:px-5 sm:py-8",
          "ring-1 ring-black/5 dark:ring-white/5",
        )}
      >
        <span className="text-5xl font-semibold text-foreground sm:text-6xl md:text-7xl">
          <SlidingNumber value={value} padStart />
        </span>
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function FocusModeTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedDurationSeconds, setSelectedDurationSeconds] = useState(DEFAULT_DURATION)
  const [showCompleted, setShowCompleted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setRemainingSeconds(selectedDurationSeconds)
    setShowCompleted(false)
  }, [selectedDurationSeconds])

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsRunning(false)
          setShowCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  useEffect(() => {
    if (!showCompleted) return
    const t = setTimeout(() => setShowCompleted(false), 2800)
    return () => clearTimeout(t)
  }, [showCompleted])

  return (
    <section
      className="flex flex-col items-center gap-8 py-8 font-heading"
      aria-label="Focus mode timer"
    >
      {/* Digit-based time display: Hours : Minutes : Seconds */}
      <div
        className="relative flex flex-col items-center gap-6"
        aria-live="polite"
        aria-atomic
        aria-label={`${formatTimeA11y(remainingSeconds)} remaining`}
      >
        <AnimatePresence mode="wait">
          {showCompleted ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.05,
                }}
                className="rounded-full bg-primary/15 p-4 dark:bg-primary/25"
              >
                <CircleCheck className="size-12 text-primary" strokeWidth={2} aria-hidden />
              </motion.span>
              <span className="text-xl font-semibold text-foreground">Time&apos;s up!</span>
            </motion.div>
          ) : (
            <motion.div
              key="time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative flex items-end gap-2 rounded-2xl p-6 sm:gap-3 sm:p-8">
                {/* Shine border: always in DOM, visibility toggled to prevent layout shift */}
                <ShineBorder
                  borderWidth={2}
                  duration={14}
                  shineColor={["var(--primary)", "var(--primary-50)", "var(--primary)"]}
                  className={cn(
                    "rounded-2xl transition-opacity duration-200",
                    isRunning ? "visible opacity-100" : "invisible opacity-0",
                  )}
                />
                <div className="relative z-10 flex items-end gap-2 sm:gap-3">
                  <TimeBlock value={getHMS(remainingSeconds).hours} label="Hours" />
                  <span
                    className="pb-4 text-4xl font-medium tabular-nums text-muted-foreground sm:pb-6 sm:text-5xl md:text-6xl"
                    aria-hidden
                  >
                    :
                  </span>
                  <TimeBlock value={getHMS(remainingSeconds).minutes} label="Minutes" />
                  <span
                    className="pb-4 text-4xl font-medium tabular-nums text-muted-foreground sm:pb-6 sm:text-5xl md:text-6xl"
                    aria-hidden
                  >
                    :
                  </span>
                  <TimeBlock value={getHMS(remainingSeconds).seconds} label="Seconds" />
                </div>
              </div>
              {isRunning && (
                <motion.span
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  In progress
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          {isRunning ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="default" size="lg" onClick={pause} aria-label="Pause timer">
                <Pause className="size-5" />
                Pause
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="default"
                size="lg"
                onClick={start}
                disabled={remainingSeconds === 0}
                aria-label="Start timer"
              >
                <Play className="size-5" />
                Start
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Button variant="outline" size="lg" onClick={reset} aria-label="Reset timer">
          <RotateCcw className="size-5" />
          Reset
        </Button>
      </div>
    </section>
  )
}
