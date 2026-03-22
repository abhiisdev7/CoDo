import type { LucideIcon } from "lucide-react"
import {
  Braces,
  Code2,
  FileEdit,
  ImageIcon,
  KeyRound,
  Layers,
  Palette,
  Regex,
  Terminal,
} from "lucide-react"

export type ToolkitTool = {
  slug: string
  title: string
  description: string
  keywords: string[]
  icon: LucideIcon
}

const tools: ToolkitTool[] = [
  {
    slug: "api-tester",
    title: "API Tester",
    description: "Send requests and inspect responses.",
    keywords: ["api", "http", "rest", "request", "test"],
    icon: Layers,
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON payloads.",
    keywords: ["json", "format", "validate", "pretty"],
    icon: Braces,
  },
  {
    slug: "css-editor",
    title: "CSS Editor",
    description: "Edit and preview CSS snippets.",
    keywords: ["css", "stylesheet", "style"],
    icon: Code2,
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    description: "Write and preview Markdown content.",
    keywords: ["markdown", "md", "documentation", "docs"],
    icon: FileEdit,
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions against sample text.",
    keywords: ["regex", "pattern", "match"],
    icon: Regex,
  },
  {
    slug: "color-picker",
    title: "Color Picker",
    description: "Pick colors and copy values to the clipboard.",
    keywords: ["color", "palette", "hex", "rgb"],
    icon: Palette,
  },
  {
    slug: "shell-gen",
    title: "Shell Gen",
    description: "Generate shell commands from descriptions.",
    keywords: ["shell", "bash", "terminal", "script"],
    icon: Terminal,
  },
  {
    slug: "jwt-debug",
    title: "JWT Debug",
    description: "Decode and inspect JSON Web Tokens.",
    keywords: ["jwt", "token", "auth", "decode"],
    icon: KeyRound,
  },
  {
    slug: "svg-opti",
    title: "SVG Opti",
    description: "Optimize SVG markup for the web.",
    keywords: ["svg", "vector", "optimize", "image"],
    icon: ImageIcon,
  },
]

const slugSet = new Set(tools.map((t) => t.slug))

export function getToolkitToolBySlug(slug: string): ToolkitTool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function isValidToolkitSlug(slug: string): boolean {
  return slugSet.has(slug)
}

export function getAllToolkitTools(): ToolkitTool[] {
  return [...tools]
}

export const CORE_TOOL_SLUGS = [
  "api-tester",
  "json-formatter",
  "css-editor",
  "markdown-editor",
  "regex-tester",
  "color-picker",
] as const

export const RECENT_TOOL_SLUGS = ["shell-gen", "jwt-debug", "svg-opti"] as const

export const CORE_TOOLS: ToolkitTool[] = CORE_TOOL_SLUGS.map((slug) => {
  const t = getToolkitToolBySlug(slug)
  if (!t) throw new Error(`Missing core tool: ${slug}`)
  return t
})

export const RECENT_TOOLS: ToolkitTool[] = RECENT_TOOL_SLUGS.map((slug) => {
  const t = getToolkitToolBySlug(slug)
  if (!t) throw new Error(`Missing recent tool: ${slug}`)
  return t
})

export const ALL_TOOL_SLUGS = tools.map((t) => t.slug)

export function toolkitToolHref(slug: string): string {
  return `/tools/${slug}`
}
