"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Badge } from "@ui/badge"
import { Slider } from "@ui/slider"
import { Field, FieldDescription, FieldGroup, FieldTitle } from "@ui/field"

export function SettingsMomentumGoal() {
  const [dailyTarget, setDailyTarget] = useState<number[]>([4])

  const value = dailyTarget[0] ?? 4

  return (
    <Card>
      <CardHeader>
        <CardTitle>Momentum Goal</CardTitle>
        <CardDescription>Set a realistic daily target to keep your streak alive.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="vertical">
            <div className="flex items-center justify-between gap-3">
              <FieldTitle>Daily Target</FieldTitle>
              <Badge variant="outline" className="text-xs font-medium">
                {value} {value === 1 ? "task" : "tasks"}
              </Badge>
            </div>
            <FieldDescription>How many tasks do you aim to complete each day?</FieldDescription>
            <div className="mt-4">
              <Slider
                min={1}
                max={20}
                value={dailyTarget}
                onValueChange={(next) => {
                  setDailyTarget(next)
                  if (next[0] != null) {
                    console.log({ dailyTarget: next[0] })
                  }
                }}
              />
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
