"use client"

import { format, subDays } from "date-fns"
import { ListTodo, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "Day-wise tasks: total vs completed per day"

export type DayTaskDatum = {
  day: string
  dateLabel: string
  total: number
  completed: number
  remaining: number
}

function buildLast7DaysData(): DayTaskDatum[] {
  const today = new Date()
  return Array.from({ length: 8 }, (_, i) => {
    const d = subDays(today, 6 - i)
    const total = [4, 6, 3, 8, 5, 7, 4][i] ?? 4
    const completed = [2, 4, 2, 5, 3, 6, 2][i] ?? 2
    return {
      day: format(d, "EEE"),
      dateLabel: format(d, "MMM d"),
      total,
      completed,
      remaining: total - completed,
    }
  })
}

const chartData = buildLast7DaysData()

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-3)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function InsightsStackedBarChart() {
  const totalTasks = chartData.reduce((s, d) => s + d.total, 0)
  const totalCompleted = chartData.reduce((s, d) => s + d.completed, 0)
  const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0

  return (
    <Card className="col-span-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          Tasks per day
        </CardTitle>
        <CardDescription>Total tasks and completed count for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-border/50" />
            <XAxis dataKey="dateLabel" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="completed" stackId="a" fill="var(--chart-3)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="remaining" stackId="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <TrendingUp className="h-4 w-4" />
          {completionRate}% of tasks completed this week
        </div>
        <div className="leading-none text-muted-foreground">
          {totalCompleted} of {totalTasks} tasks done in the last 7 days
        </div>
      </CardFooter>
    </Card>
  )
}
