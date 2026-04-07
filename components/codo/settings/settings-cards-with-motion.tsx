"use client"

import { StaggerItem, StaggerRoot } from "@/components/animated"
import { SettingsAppearance } from "./settings-appearance"
import { SettingsMomentumGoal } from "./settings-momentum-goal"
import { SettingsTagManagement } from "./settings-tag-management"
import { SettingsSupport } from "./settings-support"
import { SettingsDataControls } from "./settings-data-controls"

export function SettingsCardsWithMotion() {
  return (
    <StaggerRoot className="flex flex-col gap-4 pb-8">
      <StaggerItem index={0} preset="comfortable">
        <SettingsAppearance />
      </StaggerItem>
      <StaggerItem index={1} preset="comfortable">
        <SettingsMomentumGoal />
      </StaggerItem>
      <StaggerItem index={2} preset="comfortable">
        <SettingsTagManagement />
      </StaggerItem>
      <StaggerItem index={3} preset="comfortable">
        <SettingsSupport />
      </StaggerItem>
      <StaggerItem index={4} preset="comfortable">
        <SettingsDataControls />
      </StaggerItem>
    </StaggerRoot>
  )
}
