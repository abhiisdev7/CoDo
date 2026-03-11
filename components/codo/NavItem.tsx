import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type NavItemProps = {
  href: string
  label: string
  isActive?: boolean
  leading?: React.ReactNode
  badge?: number
  className?: string
}

export function NavItem({
  href,
  label,
  isActive = false,
  leading,
  badge,
  className,
}: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-primary/10 text-primary",
          className,
        )}
      >
        {leading}
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {badge !== undefined && (
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={cn(
              "ml-auto shrink-0 text-xs",
              isActive && "bg-primary/20 text-primary hover:bg-primary/30",
            )}
          >
            {badge}
          </Badge>
        )}
      </Link>
    </li>
  )
}
