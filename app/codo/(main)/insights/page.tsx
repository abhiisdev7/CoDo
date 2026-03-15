import { HeaderTitle } from "@/components/codo/header-title";
import { For } from "@/components/utils/For";
import { CircleCheckBig, TrendingUp, TriangleAlert, Zap } from "lucide-react";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"

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
  }
];

type InsightCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
};

function InsightCard({ icon, label, value, description }: InsightCardProps) {
  return (<Tooltip>
    <TooltipTrigger asChild>
      <div className="p-5 bg-background shadow rounded-2xl flex gap-3 items-start">
        {icon}
        <div>
          <span className="text-muted-foreground">{label}</span>
          <span className="block text-2xl mt-1 font-extrabold leading-tight">{value}</span>
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent>{description}</TooltipContent>
  </Tooltip>);
}

export default function Insights() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-10 min-h-full">
      <HeaderTitle
        title="Productivity Insights"
        description="Deep analysis of your local focus patterns and velocity."
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <For each={INSIGHTS}
          render={(insight, i) => <InsightCard key={i} {...insight} />} />
      </section>
    </main>
  );
}
