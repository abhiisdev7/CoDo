"use client"

import { setupCodo } from "@/services/codo/codo-setup"
import { Card, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import PageLoader from "../ui/page-loader"

export function CodoDbBootstrap({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const runSetup = async () => {
      try {
        await setupCodo()
        if (!cancelled) setReady(true)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)))
      }
    }

    void runSetup()

    return () => {
      cancelled = true
    }
  }, [])

  if (error != null) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
        <div className="flex flex-col items-center gap-3">
          <AlertTriangle className="text-destructive mb-2" size={40} />
          <h2 className="text-lg font-semibold">Failed to initialize Codo Tool</h2>
          <p className="text-muted-foreground max-w-sm">
            Sorry, something went wrong while setting up Codo. Please try refreshing the page or
            check your network connection.
            {error?.message ? (
              <span className="block mt-2 text-xs text-destructive/70">{error.message}</span>
            ) : null}
          </p>
        </div>
      </main>
    )
  }

  if (!ready) {
    return <PageLoader />
  }

  return <>{children}</>
}
