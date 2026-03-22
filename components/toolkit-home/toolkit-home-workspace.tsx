"use client"

import { ToolkitHomeCoreToolkit } from "@/components/toolkit-home/toolkit-home-core-toolkit"
import { ToolkitHomeRecentTools } from "@/components/toolkit-home/toolkit-home-recent-tools"
import { ToolkitHomeSearch } from "@/components/toolkit-home/toolkit-home-search"
import { CORE_TOOLS } from "@/lib/toolkit/registry"
import type { ToolkitTool } from "@/lib/toolkit/registry"
import * as React from "react"

function filterCoreTools(tools: ToolkitTool[], query: string): ToolkitTool[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return tools
  }
  return tools.filter((t) => {
    if (t.title.toLowerCase().includes(q)) {
      return true
    }
    if (t.slug.includes(q)) {
      return true
    }
    return t.keywords.some((k) => k.includes(q))
  })
}

export function ToolkitHomeWorkspace() {
  const [query, setQuery] = React.useState("")
  const filtered = React.useMemo(() => filterCoreTools(CORE_TOOLS, query), [query])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12">
      <ToolkitHomeSearch value={query} onChange={setQuery} />
      <div className="w-full space-y-10">
        <ToolkitHomeCoreToolkit tools={filtered} />
        <ToolkitHomeRecentTools />
      </div>
    </div>
  )
}
