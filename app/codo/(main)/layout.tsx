import { Suspense } from "react"
import { CodoSidebar } from "@/components/codo/layout/sidebar"
import PageLoader from "@ui/page-loader"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Suspense fallback={<PageLoader />}>
        <CodoSidebar />
      </Suspense>
      <section className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-hide">
        {children}
      </section>
    </div>
  )
}
