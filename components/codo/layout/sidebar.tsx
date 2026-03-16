"use client"

import { cn } from "@/lib/utils"
import { BadgeAlertIcon } from "@icons/badge-alert-animated-icon"
import { CalendarDaysIcon } from "@icons/calendar-animated-icon"
import { ChartPieIcon } from "@icons/chart-pie-animated-icon"
import { CircleCheckIcon } from "@icons/circle-check-animated-icon"
import { CircleHelpIcon } from "@icons/circle-help-animated-icon"
import { ClockIcon } from "@icons/clock-animated-icon"
import { FlameIcon } from "@icons/flame-animated-icon"
import { LoaderPinwheelIcon } from "@icons/pinwheel-animated-icon"
import { SettingsIcon } from "@icons/settings-animated-icon"
import { motion, type Variants } from "motion/react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRef, type ComponentType } from "react"
import { AddNewTag } from "../settings/add-new-tag"
import { Button } from "@ui/button"
import { PlusIcon } from "@icons/plus-animated-icon"
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
  { href: "/codo/documentation", label: "Documentation", icon: CircleHelpIcon },
] as const

const sidebarVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

const logoVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
}

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.04 : 0,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
  hover: { scale: 1.01 },
}

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
      className="flex min-w-64 max-w-[300px] flex-col justify-between border-r border-border bg-background p-6"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      aria-label="CoDo navigation"
    >
      <div className="flex flex-col gap-6">
        <Logo />
        <nav className="flex flex-col gap-12" aria-label="Main">
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
      variants={logoVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        aria-hidden
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="size-1.5 rounded-sm bg-current opacity-90" />
          ))}
        </div>
      </motion.div>
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
      variants={listItemVariants}
      custom={index}
    />
  )
}

function SystemSection({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col gap-2">
      <motion.h2
        className="px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        variants={sectionHeaderVariants}
        initial="hidden"
        animate="visible"
      >
        System
      </motion.h2>
      <motion.ul
        className="flex flex-col gap-0.5"
        variants={listVariants}
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
  return (
    <div className="flex flex-col gap-2">
      <motion.h2
        className="px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        variants={sectionHeaderVariants}
        initial="hidden"
        animate="visible"
      >
        Tags
      </motion.h2>
      <motion.ul
        className="flex flex-col gap-0.5"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {tagsNav.map((tag, i) => (
          <SidebarNavItem
            key={tag.href}
            href={tag.href}
            label={tag.label}
            leading={<span className={cn("size-3 shrink-0 rounded-full", tag.color)} aria-hidden />}
            isTag
            isActive={activeTag === tag.label.toLowerCase()}
            variants={listItemVariants}
            custom={i}
          />
        ))}
        <AddNewTag>
          <Button className="mt-2 border-dashed" variant="outline">
            <PlusIcon /> Add New Tag
          </Button>
        </AddNewTag>
      </motion.ul>
    </div>
  )
}

function FooterSection({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Settings">
      <motion.ul
        className="flex flex-col gap-0.5"
        variants={listVariants}
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
