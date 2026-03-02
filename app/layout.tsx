import React from "react"

import "@/css/globals.css"
import { ThemeProvider } from "@/components/context/theme-provider"
import { fontSans, fontSerif } from "@/lib/fonts"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
