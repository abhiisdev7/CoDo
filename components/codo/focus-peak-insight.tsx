import { Target } from "lucide-react"
import { InsightCard } from "./insight-card"

export function FocusPeakInsight() {
  return (
    <InsightCard
      icon={
        <span className="p-2 bg-fuchsia-100 dark:bg-fuchsia-900/50 size-14 flex-center text-violet-600 dark:text-rose-300 rounded-xl">
          <Target className="" />
        </span>
      }
      label="Peak Focus - Most active on this week."
      value="March 15"
    />
  )
}
