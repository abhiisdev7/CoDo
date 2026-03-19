"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldTitle } from "@ui/field"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

import { AnimatedThemeSwitch } from "@/components/common/animated-theme-switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { For } from "@/components/utils/For"

const themeOptions = [
  { id: "default", label: "Default", preview: "oklch(0.6 0.1 185)" },
  { id: "corporate", label: "Corporate", preview: "oklch(0.48 0.20 260.47)" },
  { id: "slack", label: "Slack", preview: "oklch(0.37 0.14 323.40)" },
  { id: "perplexity", label: "Perplexity", preview: "oklch(0.72 0.12 210.36)" },
  { id: "claude", label: "Claude", preview: "oklch(0.62 0.14 39.15)" },
  { id: "marshmallow", label: "Marshmallow", preview: "oklch(0.80 0.14 348.82)" },
  { id: "clean-slate", label: "Clean Slate", preview: "oklch(0.59 0.20 277.06)" },
  { id: "spotify", label: "Spotify", preview: "oklch(0.67 0.17 153.85)" },
  { id: "summer", label: "Summer", preview: "oklch(0.70 0.17 28.12)" },
  { id: "vscode", label: "VS Code", preview: "oklch(0.71 0.15 239.15)" },
]

export function SettingsAppearance() {
  const { resolvedTheme, setTheme } = useTheme()
  const hasMountedRef = useRef(false)
  const [codoTheme, setCodoTheme] = useState(() => {
    if (typeof document === "undefined") return "default"
    const current = document.documentElement.getAttribute("data-codo-theme")
    return current ?? "default"
  })

  useEffect(() => {
    const root = document.documentElement
    const linkId = "codo-theme-link"

    const linkEl =
      (document.getElementById(linkId) as HTMLLinkElement | null) ??
      (() => {
        const el = document.createElement("link") as HTMLLinkElement
        el.id = linkId
        el.rel = "stylesheet"
        document.head.appendChild(el)
        return el
      })()

    if (codoTheme === "default") {
      root.removeAttribute("data-codo-theme")
      linkEl.removeAttribute("href")
    } else {
      root.setAttribute("data-codo-theme", codoTheme)
      linkEl.href = `/themes/${codoTheme}-theme.css`
    }

    if (hasMountedRef.current) console.log({ theme: codoTheme })
    hasMountedRef.current = true
  }, [codoTheme])

  const handleThemeChange = (nextId: (typeof themeOptions)[number]["id"]) => {
    setCodoTheme(nextId)
  }

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
              <FieldTitle>Theme Palette</FieldTitle>
              <FieldDescription>Choose a color palette for the application.</FieldDescription>
            </FieldContent>
            <div role="radiogroup" aria-label="Select theme palette" className="flex gap-3">
              <For
                each={themeOptions}
                render={({ id, label, preview }) => (
                  <Tooltip key={id}>
                    <TooltipTrigger asChild>
                      <button
                        className="size-5 rounded-full relative"
                        style={{ backgroundColor: preview }}
                        type="button"
                        role="radio"
                        aria-checked={codoTheme === id}
                        data-selected={codoTheme === id}
                        onClick={() => handleThemeChange(id)}
                      >
                        {codoTheme === id && (
                          <div className="absolute size-2 bg-background rounded-full inset-1/2 -translate-1/2" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                )}
              />
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
