import { Suspense } from "react"
import { CodoSidebar } from "@/components/codo/layout/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Suspense fallback={<div className="min-w-64 max-w-[300px] border-r border-border bg-background animate-pulse" />}>
        <CodoSidebar />
      </Suspense>
      <section className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-muted scrollbar-hide">
        {children}
      </section>
    </div>
  )
}
