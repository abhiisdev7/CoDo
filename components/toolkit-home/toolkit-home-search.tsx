"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { motion, useReducedMotion } from "motion/react"
import { SearchIcon } from "lucide-react"
import * as React from "react"

const SEARCH_INPUT_ID = "toolkit-home-search-input"

type ToolkitHomeSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function ToolkitHomeSearch({ value, onChange }: ToolkitHomeSearchProps) {
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === "k") {
        const t = e.target as HTMLElement | null
        if (t?.closest?.('[data-slot="input-group"]')) {
          return
        }
        e.preventDefault()
        document.getElementById(SEARCH_INPUT_ID)?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPod|iPad/i.test(navigator.platform)

  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <InputGroup className="h-14 rounded-full border-border bg-card px-1 shadow-lg">
        <InputGroupAddon align="inline-start" className="pl-4">
          <SearchIcon className="size-5 text-muted-foreground" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          id={SEARCH_INPUT_ID}
          type="search"
          placeholder="Search tools, commands, or documentation..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          aria-label="Search tools"
          className="text-base"
        />
        <InputGroupAddon align="inline-end" className="pr-4">
          <KbdGroup>
            <Kbd className="hidden sm:inline-flex">{isMac ? "⌘" : "Ctrl"}</Kbd>
            <Kbd className="hidden sm:inline-flex">K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </motion.div>
  )
}
