"use client"

import { PieChart } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

export const description = "Task priority mix: low, medium, high"

type PriorityDatum = {
  name: string
  high: number
  medium: number
  low: number
}

const chartData: PriorityDatum[] = [{ name: "priority", high: 4, medium: 6, low: 10 }]

const chartConfig = {
  high: {
    label: "High",
    color: "var(--chart-3)",
  },
  medium: {
    label: "Medium",
    color: "var(--chart-2)",
  },
  low: {
    label: "Low",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function PriorityMixRadialChart() {
  const d = chartData[0]
  const total = d.high + d.medium + d.low

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Task priority mix
        </CardTitle>
        <CardDescription>Breakdown by priority level</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={360}
            innerRadius={70}
            outerRadius={120}
          >
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
              defaultIndex={1}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <ChartLegend content={<ChartLegendContent />} />
            <RadialBar
              dataKey="high"
              stackId="a"
              cornerRadius={4}
              fill="var(--color-high)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="medium"
              stackId="a"
              cornerRadius={4}
              fill="var(--color-medium)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="low"
              stackId="a"
              cornerRadius={4}
              fill="var(--color-low)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground flex gap-4">
          {Object.entries(chartConfig).map(([k, o]) => (
            <span key={o.color}>
              <span
                className="size-2 mr-1 inline-block rounded-xs"
                style={{ background: o.color }}
              />
              {o.label} ({d?.[k as keyof typeof d]})
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
