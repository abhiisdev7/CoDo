export enum DeleteAction {
  Deleted = 1,
  NotDeleted = 0,
}

export enum TaskCompletionStatus {
  NotStarted = "not_started",
  Completed = "completed",
  Pending = "pending",
  InProgress = "in_progress",
  Deferred = "deferred",
  Cancelled = "cancelled",
  Blocked = "blocked",
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export enum TaskRecurrence {
  None = "none",
  OneOff = "one_off",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}
