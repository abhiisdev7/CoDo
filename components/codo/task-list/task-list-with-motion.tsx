"use client"

import { AnimatePresence, StaggerItem, StaggerRoot } from "@/components/animated"
import { TaskWithAllResolved } from "@/services/codo/codo-tasks-service"
import Image from "next/image"
import { TaskListItem } from "./task-list-item"

export function TaskListWithMotion({ tasks }: { tasks: TaskWithAllResolved[] }) {
  if (tasks.length === 0) {
    return (
      <AnimatePresence>
        <div className="flex flex-1 min-h-[55vh] w-full flex-col items-center justify-center gap-4 py-16">
          <Image
            height={300}
            width={300}
            src="/gifs/all-done.gif"
            alt="All tasks done gif"
            className="rounded-xl"
          />
          <div className="text-center text-muted-foreground text-lg font-medium">
            You’re all caught up! <br /> Start by adding a new task.
          </div>
        </div>
      </AnimatePresence>
    )
  }

  return (
    <StaggerRoot className="space-y-4">
      {tasks.map((task, idx) => (
        <StaggerItem key={task.id} index={idx} preset="compact">
          <TaskListItem sortEnabled={true} id={task.id!} index={idx} task={task} />
        </StaggerItem>
      ))}
    </StaggerRoot>
  )
}
