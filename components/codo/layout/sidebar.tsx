"use client"

import {
  HoverScale,
  motion,
  reveal,
  revealLabel,
  revealLift,
  staggerItemSlideIn,
  staggerParentDense,
} from "@/components/animated"
import { For } from "@/components/utils/For"
import { tagsService } from "@/services/codo/codo-tags-service"
import { BadgeAlertIcon } from "@icons/badge-alert-animated-icon"
import { CalendarDaysIcon } from "@icons/calendar-animated-icon"
import { ChartPieIcon } from "@icons/chart-pie-animated-icon"
import { CircleCheckIcon } from "@icons/circle-check-animated-icon"
import { ClockIcon } from "@icons/clock-animated-icon"
import { FlameIcon } from "@icons/flame-animated-icon"
import { LoaderPinwheelIcon } from "@icons/pinwheel-animated-icon"
import { PlusIcon } from "@icons/plus-animated-icon"
import { SettingsIcon } from "@icons/settings-animated-icon"
import { Button } from "@ui/button"
import { ScrollArea } from "@ui/scroll-area"
import { useLiveQuery } from "dexie-react-hooks"
import { usePathname, useSearchParams } from "next/navigation"
import { useRef, type ComponentType } from "react"
import { AddNewTag } from "../settings/add-new-tag"
import { SidebarNavItem } from "./sidebar-nav-item"

export interface IconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

const systemNav = [
  { href: "/codo/inbox", label: "Inbox", icon: FlameIcon, badge: 2 },
  { href: "/codo/today", label: "Today", icon: CalendarDaysIcon },
  { href: "/codo/upcoming", label: "Upcoming", icon: ClockIcon },
  { href: "/codo/overdue", label: "Overdue", icon: BadgeAlertIcon, badge: 2 },
  { href: "/codo/completed", label: "Completed", icon: CircleCheckIcon },
] as const

const tagsNav = [
  { label: "Work", href: "?tag=work", color: "bg-blue-500" },
  { label: "Personal", href: "?tag=personal", color: "bg-emerald-500" },
  { label: "Fitness", href: "?tag=fitness", color: "bg-amber-500" },
] as const

const footerNav = [
  { href: "/codo/focus", label: "Focus Mode", icon: LoaderPinwheelIcon },
  { href: "/codo/insights", label: "Insights", icon: ChartPieIcon },
  { href: "/codo/settings", label: "Settings", icon: SettingsIcon },
  // { href: "/codo/documentation", label: "Documentation", icon: CircleHelpIcon },
] as const

type IconComponent = ComponentType<{
  ref?: React.RefObject<IconHandle | null>
  "aria-hidden"?: boolean
}>

type SystemNavEntry = (typeof systemNav)[number]
type FooterNavEntry = (typeof footerNav)[number]
type IconNavEntry = SystemNavEntry | FooterNavEntry

function getBadge(item: IconNavEntry): number | undefined {
  const withBadge = item as { badge?: number }
  return typeof withBadge.badge === "number" ? withBadge.badge : undefined
}

export function CodoSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tag = searchParams.get("tag") ?? ""

  return (
    <motion.aside
      className="flex h-dvh min-w-64 max-w-[300px] flex-col justify-between border-r border-border bg-card p-6"
      initial="hidden"
      animate="visible"
      variants={reveal}
      aria-label="CoDo navigation"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <Logo />
        <nav className="flex min-h-0 flex-1 flex-col gap-12" aria-label="Main">
          <SystemSection pathname={pathname} />
          <TagsSection activeTag={tag} />
        </nav>
      </div>
      <FooterSection pathname={pathname} />
    </motion.aside>
  )
}

function Logo() {
  return (
    <motion.div
      className="flex items-center gap-3"
      variants={revealLift}
      initial="hidden"
      animate="visible"
    >
      <HoverScale
        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        aria-hidden
      >
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="size-1.5 rounded-sm bg-current opacity-90" />
          ))}
        </div>
      </HoverScale>
      <span className="font-semibold text-xl text-foreground">CoDo</span>
    </motion.div>
  )
}

function IconNavItem({
  item,
  isActive,
  index = 0,
}: {
  item: IconNavEntry
  isActive: boolean
  index?: number
}) {
  const iconRef = useRef<IconHandle>(null)
  const Icon = item.icon as IconComponent

  return (
    <SidebarNavItem
      href={item.href}
      label={item.label}
      isActive={isActive}
      leading={<Icon ref={iconRef} aria-hidden />}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      badge={getBadge(item)}
      variants={staggerItemSlideIn}
      custom={index}
    />
  )
}

function SystemSection({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col gap-2">
      <motion.h2
        className="px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        variants={revealLabel}
        initial="hidden"
        animate="visible"
      >
        System
      </motion.h2>
      <motion.ul
        className="flex flex-col gap-0.5"
        variants={staggerParentDense}
        initial="hidden"
        animate="visible"
      >
        {systemNav.map((item, i) => (
          <IconNavItem key={item.href} item={item} isActive={pathname === item.href} index={i} />
        ))}
      </motion.ul>
    </div>
  )
}

function TagsSection({ activeTag }: { activeTag: string }) {
  const tags = useLiveQuery(() => tagsService.getTags())

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <motion.h2
        className="px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        variants={revealLabel}
        initial="hidden"
        animate="visible"
      >
        Tags
      </motion.h2>
      <ScrollArea className="min-h-0 flex-1 pr-2">
        <motion.ul
          className="flex flex-col gap-0.5"
          variants={staggerParentDense}
          initial="hidden"
          animate="visible"
        >
          <For
            each={tags}
            render={(tag) => (
              <SidebarNavItem
                key={tag.id}
                href={`?tag=${tag.label}`}
                label={tag.label}
                leading={
                  <span
                    className={"size-3 shrink-0 rounded-full"}
                    style={{ background: tag.color }}
                    aria-hidden
                  />
                }
                isTag
                isActive={activeTag === tag.label.toLowerCase()}
                variants={staggerItemSlideIn}
                custom={tag.id}
              />
            )}
          />
        </motion.ul>
        <AddNewTag>
          <Button className="border-dashed mt-2 w-full" variant="outline">
            <PlusIcon /> Add New Tag
          </Button>
        </AddNewTag>
      </ScrollArea>
    </div>
  )
}

function FooterSection({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Settings">
      <motion.ul
        className="flex flex-col gap-0.5"
        variants={staggerParentDense}
        initial="hidden"
        animate="visible"
      >
        {footerNav.map((item, i) => (
          <IconNavItem key={item.href} item={item} isActive={pathname === item.href} index={i} />
        ))}
      </motion.ul>
    </nav>
  )
}
