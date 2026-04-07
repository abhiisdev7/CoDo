"use client"

import { Button } from "@ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"

import { Bell, ShieldCheck } from "lucide-react"
import { FadeIn } from "@/components/animated"

export function HeaderActions() {
  return (
    <div className="flex gap-2">
      <FadeIn delay={0.06} duration={0.35} transition={{ ease: [0.22, 1, 0.36, 1] }}>
        <NotificationsAction />
      </FadeIn>
      <FadeIn delay={0.11} duration={0.35} transition={{ ease: [0.22, 1, 0.36, 1] }}>
        <AuthSettingsAction />
      </FadeIn>
    </div>
  )
}

export function NotificationsAction() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-lg" variant="outline" className="relative">
          <Bell />
          <div className="size-2.5 bg-green-400 rounded-full absolute -top-0.5 -right-0.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Notifications</TooltipContent>
    </Tooltip>
  )
}

export function AuthSettingsAction() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-lg" variant="outline">
          <ShieldCheck />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Security</TooltipContent>
    </Tooltip>
  )
}
