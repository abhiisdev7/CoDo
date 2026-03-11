import { CodoSidebar } from "@/components/codo/CodoSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <CodoSidebar />
      <section className="flex flex-1 flex-col overflow-y-auto bg-muted p-6">{children}</section>
    </div>
  )
}
