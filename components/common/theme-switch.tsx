"use client"

import { Button } from "@/components/ui/button"
import { Eclipse, SunDim } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
      <SunDim className="dark:hidden" />
      <Eclipse className="hidden dark:inline-block" />
    </Button>
  )
}
