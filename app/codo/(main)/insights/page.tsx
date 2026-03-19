import { PageHeaderTitle } from "@/components/codo/shared/page-header-title"
import { InsightCard } from "@/components/codo/insights/insight-card"
import { InsightStackedBarChart } from "@/components/codo/insights/insight-stacked-bar-chart"
import { InsightPriorityRadialChart } from "@/components/codo/insights/insight-priority-radial-chart"
import { FocusPeakInsightCard } from "@/components/codo/insights/focus-peak-insight-card"
import { InsightsSectionWithMotion } from "@/components/codo/insights/insights-section-with-motion"
import { For } from "@/components/utils/For"
import { CircleCheckBig, TrendingUp, TriangleAlert, Zap } from "lucide-react"

const INSIGHTS = [
  {
    icon: (
      <span className="p-2 bg-amber-100 dark:bg-amber-900/50 size-14 flex-center text-amber-600 dark:text-amber-300 rounded-xl">
        <Zap className="fill-amber-600 dark:fill-amber-300" />
      </span>
    ),
    label: "Active Streak",
    value: "04",
    description: "Days completing tasks in a row. Keep it up!",
  },
  {
    icon: (
      <span className="p-2 bg-purple-100 dark:bg-purple-900/50 size-14 flex-center text-purple-600 dark:text-purple-300 rounded-xl">
        <CircleCheckBig />
      </span>
    ),
    label: "Tasks Completed",
    value: "17",
    description: "Highest number of tasks finished this week.",
  },
  {
    icon: (
      <span className="p-2 bg-emerald-100 dark:bg-emerald-900/50 size-14 flex-center text-emerald-600 dark:text-emerald-300 rounded-xl">
        <TrendingUp />
      </span>
    ),
    label: "Velocity",
    value: "95%",
    description: "Time spent focused versus distracted.",
  },
  {
    icon: (
      <span className="p-2 bg-rose-100 dark:bg-rose-900/50 size-14 flex-center text-rose-600 dark:text-rose-300 rounded-xl">
        <TriangleAlert />
      </span>
    ),
    label: "Interruptions",
    value: "02",
    description: "Context switches detected today.",
  },
]

export default function Insights() {
  return (
    <main className="p-8 max-w-6xl mx-auto space-y-8 min-h-full">
      <PageHeaderTitle
        title="Productivity Insights"
        description="Deep analysis of your local focus patterns and velocity."
      />
      <InsightsSectionWithMotion>
        <For each={INSIGHTS} render={(insight, i) => <InsightCard key={i} {...insight} />} />
        <InsightStackedBarChart />
        <div className="col-span-3 space-y-4">
          <InsightPriorityRadialChart />
          <FocusPeakInsightCard />
        </div>
      </InsightsSectionWithMotion>
    </main>
  )
}
