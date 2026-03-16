export const VALID_VIEWS = [
  "inbox",
  "today",
  "upcoming",
  "overdue",
  "completed",
  "insights",
  "settings",
] as const

export type ViewSlug = (typeof VALID_VIEWS)[number]

export function isValidView(slug: string): slug is ViewSlug {
  return (VALID_VIEWS as readonly string[]).includes(slug)
}
