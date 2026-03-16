import { FocusModeTimer } from "@/components/codo/focus-mode/focus-mode-timer"
import { FocusModeTask } from "@/components/codo/focus-mode/focus-mode-task"
import { FocusModeActions } from "@/components/codo/focus-mode/focus-mode-actions"

export default function FocusMode() {
  return (
    <main className="flex items-center justify-evenly w-screen h-screen relative">
      <FocusModeTimer />
      <FocusModeTask />
      <FocusModeActions />
    </main>
  )
}
