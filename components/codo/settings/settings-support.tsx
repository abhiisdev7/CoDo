"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card"
import { ChevronRight, HelpCircle } from "lucide-react"
import Link from "next/link"

export function SettingsSupport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href="/codo/documentation"
          type="button"
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
        </Link>
      </CardContent>
    </Card>
  )
}
