"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldTitle } from "@ui/field"
import { useTheme } from "next-themes"

import { AnimatedThemeSwitch } from "@/components/common/AnimatedThemeSwitch"

export function SettingsAppearance() {
  const { resolvedTheme, setTheme } = useTheme()
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
        <FieldGroup className="gap-4">
          <Field orientation="responsive" className="bg-muted p-4 rounded-xl">
            <FieldContent>
              <FieldTitle>Appearance Mode</FieldTitle>
              <FieldDescription>Switch between light and dark.</FieldDescription>
            </FieldContent>
            <AnimatedThemeSwitch
              checked={resolvedTheme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
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
