"use client"

import { PageHeaderTitle } from "@/components/codo/shared/page-header-title"
import { SettingsCardsWithMotion } from "@/components/codo/settings/settings-cards-with-motion"

export default function Settings() {
  return (
    <main className="p-8 w-xl mx-auto flex h-full flex-col gap-8">
      <PageHeaderTitle title="Settings" description="Configure your local productivity engine." />
      <SettingsCardsWithMotion />
    </main>
  )
}
