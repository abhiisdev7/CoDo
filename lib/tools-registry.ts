import type { LucideIcon } from "lucide-react"
import { Braces, FileEdit, KeyRound, Layers, Palette, Regex, Terminal } from "lucide-react"

export type ToolkitTool = {
  slug: string
  title: string
  description: string
  keywords: string[]
  icon: LucideIcon
  isCore: boolean
  badge: "Beta" | "New" | null
}

export const TOOLS: ToolkitTool[] = [
  {
    slug: "codo",
    title: "CoDo Task",
    description: "Task management and productivity tracking.",
    keywords: ["tasks", "todo", "collaborate", "management", "productivity"],
    icon: KeyRound,
    isCore: true,
    badge: "Beta",
  },
  {
    slug: "api-tester",
    title: "API Tester",
    description: "Send requests and inspect responses.",
    keywords: ["api", "http", "rest", "request", "test"],
    icon: Layers,
    isCore: true,
    badge: null,
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON payloads.",
    keywords: ["json", "format", "validate", "pretty"],
    icon: Braces,
    isCore: true,
    badge: null,
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    description: "Write and preview Markdown content.",
    keywords: ["markdown", "md", "documentation", "docs"],
    icon: FileEdit,
    isCore: true,
    badge: null,
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions against sample text.",
    keywords: ["regex", "pattern", "match"],
    icon: Regex,
    isCore: true,
    badge: null,
  },
  {
    slug: "color-picker",
    title: "Color Picker",
    description: "Pick colors and copy values to the clipboard.",
    keywords: ["color", "palette", "hex", "rgb"],
    icon: Palette,
    isCore: true,
    badge: null,
  },
  {
    slug: "shell-gen",
    title: "Shell Gen",
    description: "Generate shell commands from descriptions.",
    keywords: ["shell", "bash", "terminal", "script"],
    icon: Terminal,
    isCore: false,
    badge: null,
  },
  {
    slug: "jwt-debug",
    title: "JWT Debug",
    description: "Decode and inspect JSON Web Tokens.",
    keywords: ["jwt", "token", "auth", "decode"],
    icon: KeyRound,
    isCore: false,
    badge: null,
  },
]

/** Resolve navigation URL for a tool slug (CoDo app vs toolkit utilities). */
export function toolHref(slug: string): string {
  if (slug === "codo") {
    return "/codo"
  }
  return `/tools/${slug}`
}
