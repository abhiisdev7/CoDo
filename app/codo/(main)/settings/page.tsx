"use client"

import { useState } from "react"

import { HeaderTitle } from "@/components/codo/header-title"
import { AddNewTag } from "@/components/codo/add-new-tag"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { Slider } from "@ui/slider"
import { Switch } from "@ui/switch"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldTitle } from "@ui/field"
import { ChevronRight, Download, HelpCircle, Upload } from "lucide-react"
import { PlusIcon } from "@/components/ui/icons/plus-animated-icon"

export default function Settings() {
  return (
    <main className="w-xl mx-auto flex h-full flex-col gap-8">
      <HeaderTitle title="Settings" description="Configure your local productivity engine." />
      <div className="flex flex-col gap-4">
        <AppearanceSettings />
        <MomentumGoalSettings />
        <TagManagement />
        <Support />
        <DataControls />
      </div>
    </main>
  )
}

function AppearanceSettings() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [accent, setAccent] = useState("red")

  const accents = [
    { id: "blue", className: "bg-blue-500" },
    { id: "green", className: "bg-emerald-500" },
    { id: "orange", className: "bg-orange-500" },
    { id: "pink", className: "bg-pink-500" },
    { id: "indigo", className: "bg-indigo-500" },
    { id: "violet", className: "bg-violet-500" },
    { id: "red", className: "bg-red-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interface & Theme</CardTitle>
        <CardDescription>Tune how CoDo looks and feels on this device.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="responsive" className="bg-muted p-4 rounded-xl">
            <FieldContent>
              <FieldTitle>Appearance Mode</FieldTitle>
              <FieldDescription>Switch between light and dark.</FieldDescription>
            </FieldContent>
            <Switch
              checked={isDarkMode}
              onCheckedChange={(checked) => {
                setIsDarkMode(checked)
                console.log({
                  appearanceMode: checked ? "dark" : "light",
                })
              }}
            />
          </Field>

          <Field orientation="vertical" className="bg-muted p-4 rounded-xl">
            <FieldContent>
              <FieldTitle>System Accent</FieldTitle>
              <FieldDescription>
                Choose the accent color used across the interface.
              </FieldDescription>
            </FieldContent>
            <div className="mt-3 flex flex-wrap gap-3">
              {accents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-selected={accent === item.id}
                  onClick={() => {
                    setAccent(item.id)
                    console.log({ accent: item.id })
                  }}
                  className="group inline-flex items-center justify-center rounded-full border border-transparent p-1 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[selected=true]:border-primary data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40"
                  aria-label={`Set accent color to ${item.id}`}
                >
                  <span className={`size-7 rounded-full ${item.className}`} />
                </button>
              ))}
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

function MomentumGoalSettings() {
  const [dailyTarget, setDailyTarget] = useState<number[]>([4])

  const value = dailyTarget[0] ?? 4

  return (
    <Card>
      <CardHeader>
        <CardTitle>Momentum Goal</CardTitle>
        <CardDescription>Set a realistic daily target to keep your streak alive.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="vertical">
            <div className="flex items-center justify-between gap-3">
              <FieldTitle>Daily Target</FieldTitle>
              <Badge variant="outline" className="text-xs font-medium">
                {value} {value === 1 ? "task" : "tasks"}
              </Badge>
            </div>
            <FieldDescription>How many tasks do you aim to complete each day?</FieldDescription>
            <div className="mt-4">
              <Slider
                min={1}
                max={20}
                value={dailyTarget}
                onValueChange={(next) => {
                  setDailyTarget(next)
                  if (next[0] != null) {
                    console.log({ dailyTarget: next[0] })
                  }
                }}
              />
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

function TagManagement() {
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

function Support() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          type="button"
          onClick={() => console.log("open-help-and-documentation")}
          className="flex w-full items-center gap-3 rounded-xl bg-muted px-4 py-3 text-left outline-none transition hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <HelpCircle className="size-4" />
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-sm font-medium">Help &amp; Documentation</span>
            <span className="text-xs text-muted-foreground">
              Learn how to use features and shortcuts.
            </span>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </CardContent>
    </Card>
  )
}

function DataControls() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Data Controls</CardTitle>
        <CardDescription>Export, import, or reset your local productivity data.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
          <div className="flex flex-1 flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => console.log("export-data")}>
              <Download className="mr-2 size-4" />
              Export data
            </Button>
            <Button type="button" variant="outline" onClick={() => console.log("import-data")}>
              <Upload className="mr-2 size-4" />
              Import data
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            className="@md:w-auto w-full"
            onClick={() => {
              const confirmed = window.confirm(
                "This will permanently clear all local CoDo data on this device. Continue?",
              )

              if (confirmed) {
                console.log("destroy-all-data")
              } else {
                console.log("cancel-destroy-all-data")
              }
            }}
          >
            Destroy all data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
