"use client"

import { StaggerItem, StaggerRoot } from "@/components/animated"
import { TaskListItem } from "./task-list-item"

export function TaskListWithMotion() {
  return (
    <StaggerRoot className="space-y-4">
      <StaggerItem index={0} preset="compact">
        <TaskListItem sortEnabled />
      </StaggerItem>
      <StaggerItem index={1} preset="compact">
        <TaskListItem />
      </StaggerItem>
      <StaggerItem index={2} preset="compact">
        <TaskListItem />
      </StaggerItem>
    </StaggerRoot>
  )
}
