"use client"

import { useFullscreen } from "@hooks/use-fullscreen"
import { Button } from "@ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"
import { motion } from "motion/react"
import { Maximize, Minimize, X } from "lucide-react"
import { useEffect, useRef } from "react"

export function FocusModeActions() {
  const documentRef = useRef<HTMLElement | null>(null)
  const { isFullscreen, toggleFullscreen } = useFullscreen(documentRef)

  useEffect(() => {
    documentRef.current = document.documentElement
  }, [])

  return (
    <motion.div
      className="absolute top-12 right-12 space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: 0.15 }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-lg" onClick={toggleFullscreen} variant="outline">
            {isFullscreen ? <Minimize /> : <Maximize />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isFullscreen ? "Exit " : ""}Full Screen</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon-lg" variant="outline">
            <X />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Exist Focus Mode</TooltipContent>
      </Tooltip>
    </motion.div>
  )
}
