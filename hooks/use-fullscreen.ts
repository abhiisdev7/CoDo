"use client"

import React, { useState, useEffect, useCallback } from "react"

type DocumentWith<T> = Document & T

export function useFullscreen(targetRef: React.MutableRefObject<(Document & {}) | unknown>) {
  const [isFullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      switch (true) {
        case "exitFullscreen" in document:
          document.exitFullscreen()
          break
        case "mozCancelFullScreen" in document:
          ;(
            document as DocumentWith<{
              mozCancelFullScreen: () => void
            }>
          ).mozCancelFullScreen()
          break
        case "webkitExitFullscreen" in document:
          ;(
            document as DocumentWith<{
              webkitExitFullscreen: () => void
            }>
          ).webkitExitFullscreen()
          break
        case "msExitFullscreen" in document:
          ;(
            document as DocumentWith<{
              msExitFullscreen: () => void
            }>
          ).msExitFullscreen()
          break
        default:
          console.log("Fullscreen API is not supported.")
          break
      }
    } else {
      const el = targetRef.current
      if (el && typeof el === "object") {
        switch (true) {
          case "requestFullscreen" in el:
            ;(el as unknown as { requestFullscreen: () => void }).requestFullscreen()
            break
          case "mozRequestFullScreen" in el:
            ;(el as unknown as { mozRequestFullScreen: () => void }).mozRequestFullScreen()
            break
          case "webkitRequestFullscreen" in el:
            ;(el as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
            break
          case "msRequestFullscreen" in el:
            ;(el as unknown as { msRequestFullscreen: () => void }).msRequestFullscreen()
            break
          default:
            console.log("Fullscreen API is not supported.")
            break
        }
      }
    }

    setFullscreen((prevState) => !prevState)
  }, [isFullscreen, targetRef])

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(!!document.fullscreenElement)
  }, [])

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [handleFullscreenChange])

  return { isFullscreen, toggleFullscreen }
}
