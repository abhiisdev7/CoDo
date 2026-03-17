"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Button } from "@ui/button"
import { X } from "lucide-react"
import { AddNewTag } from "./add-new-tag"
import { PlusIcon } from "@/components/ui/icons/plus-animated-icon"

export function SettingsTagManagement() {
  const [tags, setTags] = useState<{ id: string; name: string; color: string }[]>([
    { id: "work", name: "Work", color: "#0f172a" },
    { id: "personal", name: "Personal", color: "#10b981" },
    { id: "fitness", name: "Fitness", color: "#f59e0b" },
  ])

  function handleDeleteTag(id: string) {
    setTags((current) => current.filter((t) => t.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Management</CardTitle>
        <CardDescription>Curate the labels you use to organize tasks.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-none"
          >
            <span
              className="size-3.5 rounded-full border border-border"
              style={{ backgroundColor: tag.color }}
              aria-hidden="true"
            />
            <span>{tag.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-6 rounded-full"
              aria-label={`Remove tag ${tag.name}`}
              onClick={() => handleDeleteTag(tag.id)}
            >
              <X className="size-3.5" />
            </Button>
          </span>
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
