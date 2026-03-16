import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"
import { ReactNode } from "react"

type InsightCardProps = {
  icon: ReactNode
  label: string
  value: string
  description?: string
}

export function InsightCard({ icon, label, value, description }: InsightCardProps) {
  if (!description) {
    return (
      <div className="p-5 bg-card shadow-sm rounded-2xl flex gap-3 items-start col-span-2">
        {icon}
        <div>
          <span className="text-muted-foreground">{label}</span>
          <span className="block text-2xl mt-1 font-extrabold leading-tight">{value}</span>
        </div>
      </div>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="p-5 bg-card shadow-sm rounded-2xl flex gap-3 items-start col-span-2">
          {icon}
          <div>
            <span className="text-muted-foreground">{label}</span>
            <span className="block text-2xl mt-1 font-extrabold leading-tight">{value}</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{description}</TooltipContent>
    </Tooltip>
  )
}
