import { FocusModeItem } from "@/components/codo/focus-mode-task"
import { FocusModeTimer } from "@/components/codo/focus-mode-timer"

export default function FocusMode() {
  return (
    <main className="flex items-center justify-around w-screen h-screen">
      <FocusModeTimer />
      <FocusModeItem />
    </main>
  )
}
