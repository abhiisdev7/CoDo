"use client"

import { StaggerItem, StaggerRoot } from "@/components/animated"
import { TaskListItem } from "./task-list-item"

type Task = {
  id: number
  title: string
  dueDate: string
  tags: string
  priority: "High" | "Medium" | "Low"
  subTasks: Task[]
}

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Daily Financial Review and Expense Tracking Overview",
    dueDate: "Jan 31, 2026",
    tags: "Work",
    priority: "High",
    subTasks: [
      {
        id: 101,
        title: "Collect Receipts",
        dueDate: "Jan 31, 2026",
        tags: "Work",
        priority: "Medium",
        subTasks: [],
      },
      {
        id: 102,
        title: "Update Spreadsheet",
        dueDate: "Jan 31, 2026",
        tags: "Work",
        priority: "Low",
        subTasks: [],
      },
      {
        id: 103,
        title: "Review Budget",
        dueDate: "Jan 31, 2026",
        tags: "Work",
        priority: "Medium",
        subTasks: [],
      },
    ],
  },
  {
    id: 2,
    title: "Prepare Project Proposal",
    dueDate: "Feb 2, 2026",
    tags: "Work",
    priority: "Medium",
    subTasks: [
      {
        id: 201,
        title: "Initial Draft",
        dueDate: "Jan 30, 2026",
        tags: "Work",
        priority: "Low",
        subTasks: [],
      },
    ],
  },
  {
    id: 3,
    title: "Weekly Team Meeting",
    dueDate: "Feb 5, 2026",
    tags: "Meetings",
    priority: "Low",
    subTasks: [
      {
        id: 301,
        title: "Draft Agenda",
        dueDate: "Feb 4, 2026",
        tags: "Meetings",
        priority: "Medium",
        subTasks: [],
      },
      {
        id: 302,
        title: "Send Invites",
        dueDate: "Feb 2, 2026",
        tags: "Meetings",
        priority: "Low",
        subTasks: [],
      },
    ],
  },
  {
    id: 4,
    title: "Complete Personal Tax Return",
    dueDate: "Apr 10, 2026",
    tags: "Personal",
    priority: "High",
    subTasks: [
      {
        id: 401,
        title: "Gather Documents",
        dueDate: "Apr 1, 2026",
        tags: "Personal",
        priority: "Medium",
        subTasks: [],
      },
      {
        id: 402,
        title: "Fill Online Form",
        dueDate: "Apr 5, 2026",
        tags: "Personal",
        priority: "High",
        subTasks: [],
      },
    ],
  },
  {
    id: 5,
    title: "Plan Weekend Trip",
    dueDate: "Feb 10, 2026",
    tags: "Leisure",
    priority: "Medium",
    subTasks: [
      {
        id: 501,
        title: "Book Hotel",
        dueDate: "Feb 5, 2026",
        tags: "Leisure",
        priority: "Medium",
        subTasks: [],
      },
      {
        id: 502,
        title: "Pack Bags",
        dueDate: "Feb 9, 2026",
        tags: "Leisure",
        priority: "Low",
        subTasks: [],
      },
    ],
  },
]

export function TaskListWithMotion() {
  return (
    <StaggerRoot className="space-y-4">
      {MOCK_TASKS.map((task, idx) => (
        <StaggerItem key={task.id} index={idx} preset="compact">
          <TaskListItem
            sortEnabled={true}
            id={task.id}
            index={idx}
            // If your TaskListItem component supports more props in the future, pass extra info here.
            // Example: title={task.title} dueDate={task.dueDate} ...
          />
        </StaggerItem>
      ))}
    </StaggerRoot>
  )
}
