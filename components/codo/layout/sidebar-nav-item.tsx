"use client"

import Link from "next/link"
import { motion, type Variants } from "@/components/animated"
import { Badge } from "@ui/badge"
import { cn } from "@/lib/utils"

export type SidebarNavItemProps = {
  href: string
  label: string
  isActive?: boolean
  leading?: React.ReactNode
  badge?: number
  className?: string
  isTag?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  variants?: Variants
  custom?: number
}

export function SidebarNavItem({
  href,
  label,
  isActive = false,
  leading,
  badge,
  className,
  isTag = false,
  onMouseEnter,
  onMouseLeave,
  variants,
  custom,
}: SidebarNavItemProps) {
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-4 py-3 transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary/10 text-primary",
        className,
      )}
    >
      {leading}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {badge !== undefined ? (
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={cn(
            "ml-auto shrink-0 text-xs rounded-sm",
            isActive && "bg-primary/20 text-primary hover:bg-primary/30",
          )}
        >
          {badge}
        </Badge>
      ) : null}
      {isActive && isTag ? <span className="size-1 rounded-full bg-primary" aria-hidden /> : null}
    </Link>
  )

  if (variants) {
    return (
      <motion.li
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        variants={variants}
        custom={custom}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        {content}
      </motion.li>
    )
  }

  return (
    <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {content}
    </li>
  )
}
