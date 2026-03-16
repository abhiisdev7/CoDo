import { CodoSidebar } from "@/components/codo/codo-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <CodoSidebar />
      <section className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-muted p-6 scrollbar-hide">
        {children}
      </section>
    </div>
  )
}
