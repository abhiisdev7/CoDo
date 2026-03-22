import { UserProfileCard } from "@/components/common/user-profile-card"
import { ToolkitHomeFooter } from "@/components/toolkit-home/toolkit-home-footer"
import { ToolkitHomeHero } from "@/components/toolkit-home/toolkit-home-hero"
import { ToolkitHomeWorkspace } from "@/components/toolkit-home/toolkit-home-workspace"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col">
      <header className="flex flex-row-reverse p-8">
        <UserProfileCard />
      </header>
      <main className="p-8 space-y-8">
        <ToolkitHomeHero />
        <ToolkitHomeWorkspace />
      </main>
      <ToolkitHomeFooter />
    </div>
  )
}
