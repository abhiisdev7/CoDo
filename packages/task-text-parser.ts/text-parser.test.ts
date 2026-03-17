import { describe, expect, test } from "bun:test"
import { parseTaskText, resolveDate } from "./text-parser"

const refDate = new Date(2026, 2, 13) // 2026-03-13, Friday

describe("parseTaskText", () => {
  test("parses full example: Finish report @tomorrow !high #work *daily", () => {
    const result = parseTaskText("Finish report @tomorrow !high #work *daily", refDate)
    expect(result.title).toBe("Finish report")
    expect(result.date).toBeTruthy()
    expect(result.date!.getDate()).toBe(14)
    expect(result.priority).toBe("high")
    expect(result.tags).toEqual(["work"])
    expect(result.recurrence).toBe("daily")
  })

  test("collects multiple tags", () => {
    const result = parseTaskText("Task #work #personal #fitness", refDate)
    expect(result.title).toBe("Task")
    expect(result.tags).toEqual(["work", "personal", "fitness"])
  })

  test("does not treat email as date", () => {
    const result = parseTaskText("Email user@host and send", refDate)
    expect(result.title).toBe("Email user@host and send")
    expect(result.date).toBeNull()
  })

  test("parses @today as empty title and date today", () => {
    const result = parseTaskText("@today", refDate)
    expect(result.title).toBe("")
    expect(result.date).toBeTruthy()
    expect(result.date!.getDate()).toBe(refDate.getDate())
  })

  test("returns all null/empty for empty string", () => {
    const result = parseTaskText("", refDate)
    expect(result.title).toBe("")
    expect(result.date).toBeNull()
    expect(result.priority).toBeNull()
    expect(result.tags).toEqual([])
    expect(result.recurrence).toBeNull()
  })

  test("last priority wins", () => {
    const result = parseTaskText("Task !low !high !medium", refDate)
    expect(result.priority).toBe("medium")
  })

  test("last recurrence wins", () => {
    const result = parseTaskText("Task *daily *monthly *weekly", refDate)
    expect(result.recurrence).toBe("weekly")
  })

  test("resolves @next_week with refDate", () => {
    const result = parseTaskText("Review @next_week", refDate)
    expect(result.date).toBeTruthy()
    expect(result.date!.getDay()).toBe(0)
    expect(result.date!.getDate()).toBe(15)
  })

  test("normalizes priority and recurrence to lowercase", () => {
    const result = parseTaskText("Task !HIGH #Work *WEEKLY", refDate)
    expect(result.priority).toBe("high")
    expect(result.tags).toEqual(["work"])
    expect(result.recurrence).toBe("weekly")
  })
})

describe("resolveDate", () => {
  test("resolves today", () => {
    const d = resolveDate("today", refDate)
    expect(d).toBeTruthy()
    expect(d!.getDate()).toBe(13)
  })

  test("resolves tomorrow", () => {
    const d = resolveDate("tomorrow", refDate)
    expect(d).toBeTruthy()
    expect(d!.getDate()).toBe(14)
  })

  test("resolves next_week", () => {
    const d = resolveDate("next_week", refDate)
    expect(d).toBeTruthy()
    expect(d!.getDay()).toBe(0)
  })

  test("returns null for unknown", () => {
    expect(resolveDate("next month", refDate)).toBeNull()
    expect(resolveDate(undefined, refDate)).toBeNull()
  })
})
