"use client"

import { Kbd } from "@/components/ui/kbd"
import { useKeyPress } from "@/hooks/use-key-press"
import { InputGroup, InputGroupInput, InputGroupText } from "@ui/input-group"
import { Search } from "lucide-react"
import { useRef } from "react"

export function TaskSearchInput() {
  const searchRef = useRef<HTMLInputElement>(null)

  useKeyPress("/", (e) => {
    e.preventDefault()
    searchRef.current?.focus()
  })

  return (
    <InputGroup className="px-6 py-8 bg-background dark:bg-background shadow-sm border-0 rounded-xl">
      <InputGroupText>
        <Search className="size-5" />
      </InputGroupText>
      <InputGroupInput
        ref={searchRef}
        placeholder="Search tasks, tags, or focus areas... (Press / to focus)"
      />
      <InputGroupText>
        <Kbd className="rounded-sm">/</Kbd>
      </InputGroupText>
    </InputGroup>
  )
}
