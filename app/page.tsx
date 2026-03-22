import { UserProfileCard } from "@/components/common/user-profile-card"

export default function HomePage() {
  return (
    <main className="p-8">
      <header className="flex flex-row-reverse">
        <UserProfileCard />
      </header>
    </main>
  )
}
