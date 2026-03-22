import { useEffect } from "react"

type KeyCombo = string | string[]

// Helper to normalize event to a key-combo string format (e.g. "ctrl+k", "meta+shift+r")
function getComboFromEvent(e: KeyboardEvent): string {
  const keys = [
    e.ctrlKey ? "ctrl" : null,
    e.metaKey ? "meta" : null,
    e.altKey ? "alt" : null,
    e.shiftKey ? "shift" : null,
    e.key && !["Control", "Meta", "Alt", "Shift"].includes(e.key) ? e.key.toLowerCase() : null,
  ].filter(Boolean)
  return keys.join("+")
}

/**
 * Fires the callback when the given key or key combination is pressed.
 *
 * @param keyCombo - Key or array of combined keys (e.g., "k", "ctrl+k", ["meta", "k"])
 * @param callback - Function to execute when key or combination is pressed
 * @param opts - Optional: { eventType: "keydown"|"keyup" }
 */
export function useKeyPress(
  keyCombo: KeyCombo,
  callback: (e: KeyboardEvent) => void,
  opts?: { eventType?: "keydown" | "keyup" },
) {
  useEffect(() => {
    const normalizedCombos = Array.isArray(keyCombo)
      ? [keyCombo.map((k) => k.toLowerCase()).join("+")]
      : [keyCombo.toLowerCase()]

    const eventType = opts?.eventType || "keydown"

    const handler = (e: KeyboardEvent) => {
      const combo = getComboFromEvent(e)
      if (normalizedCombos.includes(combo)) {
        callback(e)
      }
    }
    window.addEventListener(eventType, handler)
    return () => window.removeEventListener(eventType, handler)
    // ignore callback identity for now (caller can wrap in useCallback if needed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyCombo, opts?.eventType])
}
