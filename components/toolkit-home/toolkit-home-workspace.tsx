"use client"

import { ToolkitHomeCoreToolkit } from "@/components/toolkit-home/toolkit-home-core-toolkit"
import { ToolkitHomeRecentTools } from "@/components/toolkit-home/toolkit-home-recent-tools"
import { ToolkitHomeSearch } from "@/components/toolkit-home/toolkit-home-search"
import { TOOLS } from "@/lib/tools-registry"
import * as React from "react"

export function ToolkitHomeWorkspace() {
  const [query, setQuery] = React.useState("")
  const filtered = React.useMemo(() => TOOLS, [])

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
