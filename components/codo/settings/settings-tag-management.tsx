"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Button } from "@ui/button"
import { AddNewTag } from "./add-new-tag"
import { PlusIcon } from "@/components/ui/icons/plus-animated-icon"

export function SettingsTagManagement() {
  const [tags, setTags] = useState<{ id: string; name: string; color: string }[]>([
    { id: "work", name: "Work", color: "#0f172a" },
    { id: "personal", name: "Personal", color: "#10b981" },
    { id: "fitness", name: "Fitness", color: "#f59e0b" },
  ])

  function handleDeleteTag(id: string) {
    const tag = tags.find((t) => t.id === id)
    setTags((current) => current.filter((t) => t.id !== id))
    console.log({ action: "delete-tag", tag })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Management</CardTitle>
        <CardDescription>Curate the labels you use to organize tasks.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            type="button"
            variant="outline"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-none"
            onClick={() => {
              console.log({ action: "select-tag", tag })
            }}
          >
            <span
              className="size-3.5 rounded-full border border-border"
              style={{ backgroundColor: tag.color }}
              aria-hidden="true"
            />
            <span>{tag.name}</span>
          </Button>
        ))}
        <AddNewTag>
          <Button className="border-dashed rounded-full" variant="outline">
            <PlusIcon /> Add New Tag
          </Button>
        </AddNewTag>
      </CardContent>
    </Card>
  )
}
