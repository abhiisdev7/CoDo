/**
 * Task text parser: parses input like "Finish report @tomorrow !high #work *daily"
 * into a typed object. Use symbols for speed:
 *
 * - Dates (@): @today, @tomorrow, @next_week (word boundary; not email@work)
 * - Priority (!): !high, !medium, !low (last wins)
 * - Tags (#): #word e.g. #personal, #work (collect all)
 * - Recurring (*): *daily, *weekly, *monthly (last wins)
 */

import { addDays, addWeeks, startOfDay, startOfWeek } from "date-fns"

export type ParseTaskResult = {
  title: string
  date: Date | null
  priority: "low" | "medium" | "high" | null
  tags: string[]
  recurrence: "daily" | "weekly" | "monthly" | null
}

const PRIORITY_TOKENS = ["low", "medium", "high"] as const
const RECURRENCE_TOKENS = ["daily", "weekly", "monthly"] as const

type TokenKind = "date" | "priority" | "tag" | "recurrence"

type Token = {
  kind: TokenKind
  raw: string
  start: number
  end: number
}

function isWordBoundaryBefore(s: string, i: number): boolean {
  return i === 0 || /\s/.test(s[i - 1]!)
}

function extractTokens(input: string): Token[] {
  const tokens: Token[] = []
  const len = input.length
  let i = 0

  while (i < len) {
    if (isWordBoundaryBefore(input, i)) {
      if (input[i] === "@") {
        const rest = input.slice(i + 1)
        const match = rest.match(/^(today|tomorrow|next_week)\b/)
        if (match) {
          const raw = match[1]!
          const end = i + 1 + match[0]!.length
          tokens.push({ kind: "date", raw, start: i, end })
          i = end
          continue
        }
      }
      if (input[i] === "!") {
        const rest = input.slice(i + 1)
        const match = rest.match(/^(high|medium|low)\b/i)
        if (match) {
          const raw = match[1]!.toLowerCase()
          const end = i + 1 + match[0]!.length
          tokens.push({ kind: "priority", raw, start: i, end })
          i = end
          continue
        }
      }
      if (input[i] === "#") {
        const rest = input.slice(i + 1)
        const match = rest.match(/^([a-zA-Z0-9_-]+)/)
        if (match) {
          const raw = match[1]!.toLowerCase()
          const end = i + 1 + match[0]!.length
          tokens.push({ kind: "tag", raw, start: i, end })
          i = end
          continue
        }
      }
      if (input[i] === "*") {
        const rest = input.slice(i + 1)
        const match = rest.match(/^(daily|weekly|monthly)\b/i)
        if (match) {
          const raw = match[1]!.toLowerCase()
          const end = i + 1 + match[0]!.length
          tokens.push({ kind: "recurrence", raw, start: i, end })
          i = end
          continue
        }
      }
    }
    i++
  }

  return tokens
}

export function resolveDate(token: string | undefined, refDate: Date): Date | null {
  if (!token) return null
  const normalized = token.toLowerCase()
  if (normalized === "today") return startOfDay(refDate)
  if (normalized === "tomorrow") return startOfDay(addDays(refDate, 1))
  if (normalized === "next_week") {
    return startOfWeek(addWeeks(refDate, 1), { weekStartsOn: 0 })
  }
  return null
}

function buildTitle(input: string, tokens: Token[]): string {
  if (tokens.length === 0) return input.trim().replace(/\s+/g, " ")
  const sorted = [...tokens].sort((a, b) => a.start - b.start)
  const parts: string[] = []
  let lastEnd = 0
  for (const t of sorted) {
    if (t.start > lastEnd) {
      parts.push(input.slice(lastEnd, t.start))
    }
    lastEnd = Math.max(lastEnd, t.end)
  }
  if (lastEnd < input.length) parts.push(input.slice(lastEnd))
  return parts.join("").trim().replace(/\s+/g, " ") || ""
}

export function parseTaskText(input: string, refDate: Date = new Date()): ParseTaskResult {
  const tokens = extractTokens(input)

  let dateToken: string | undefined
  let priority: ParseTaskResult["priority"] = null
  const tags: string[] = []
  let recurrence: ParseTaskResult["recurrence"] = null

  for (const t of tokens) {
    switch (t.kind) {
      case "date":
        dateToken = t.raw
        break
      case "priority":
        if ((PRIORITY_TOKENS as readonly string[]).includes(t.raw)) {
          priority = t.raw as ParseTaskResult["priority"]
        }
        break
      case "tag":
        tags.push(t.raw)
        break
      case "recurrence":
        if ((RECURRENCE_TOKENS as readonly string[]).includes(t.raw)) {
          recurrence = t.raw as ParseTaskResult["recurrence"]
        }
        break
    }
  }

  const title = buildTitle(input, tokens)
  const date = resolveDate(dateToken, refDate)

  return {
    title,
    date,
    priority,
    tags,
    recurrence,
  }
}
