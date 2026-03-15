import { Target } from "lucide-react"
import { InsightCard } from "./insight-card"

export function FocusPeakInsight() {
  return (
    <InsightCard
      icon={
        <div className="size-14 flex-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/50 dark:text-purple-400">
          <Target />
        </div>
      }
      label="Peak Focus - Most active on this week."
      value="March 15"
    />
  )
}
