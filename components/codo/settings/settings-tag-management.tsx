"use client"

import { PlusIcon } from "@/components/ui/icons/plus-animated-icon"
import { For } from "@/components/utils/For"
import { tagsService } from "@services/codo/codo-tags-service"
import { Button } from "@ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { useLiveQuery } from "dexie-react-hooks"
import { X } from "lucide-react"
import { AddNewTag } from "./add-new-tag"

export function SettingsTagManagement() {
  const tags = useLiveQuery(() => tagsService.getTags(), [])

  if (!tags) return <></>

  function handleDeleteTag(id: number) {
    tagsService.deleteTag(id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Management</CardTitle>
        <CardDescription>Curate the labels you use to organize tasks.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <For
          each={tags}
          render={(tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-none capitalize"
            >
              <span
                className="size-3.5 rounded-full border border-border"
                style={{ backgroundColor: tag.color }}
                aria-hidden="true"
              />
              <span>{tag.label}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 rounded-full"
                aria-label={`Remove tag ${tag.label}`}
                onClick={() => handleDeleteTag(tag.id)}
              >
                <X className="size-3.5" />
              </Button>
            </span>
          )}
        />
        <AddNewTag>
          <Button className="border-dashed rounded-full" variant="outline">
            <PlusIcon /> Add New Tag
          </Button>
        </AddNewTag>
      </CardContent>
    </Card>
  )
}
