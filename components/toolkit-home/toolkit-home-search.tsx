"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { useKeyPress } from "@/hooks/use-key-press"
import { isMac } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { FadeIn } from "@/components/animated"
import * as React from "react"

type ToolkitHomeSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function ToolkitHomeSearch({ value, onChange }: ToolkitHomeSearchProps) {
  const searchInput = React.useRef<HTMLInputElement>(null)

  useKeyPress(["ctrl", "k"], (e) => {
    e.preventDefault()
    searchInput.current?.focus()
  })

  return (
    <FadeIn
      className="w-full max-w-2xl"
      y={12}
      duration={0.4}
      delay={0.08}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
    >
      <InputGroup className="h-14 rounded-full border-border bg-card px-1 shadow-lg">
        <InputGroupAddon align="inline-start" className="pl-4">
          <SearchIcon className="size-5 text-muted-foreground" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          ref={searchInput}
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
            <Kbd className="hidden sm:inline-flex">{isMac() ? "⌘" : "Ctrl"}</Kbd>
            <Kbd className="hidden sm:inline-flex">k</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </FadeIn>
  )
}
