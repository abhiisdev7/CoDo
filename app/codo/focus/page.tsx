import { FocusModeTask } from "@/components/codo/focus-mode-task"
import { FocusModeTimer } from "@/components/codo/focus-mode-timer"
import { FocusModeActions } from "@/components/codo/focus-mode-actions"

export default function FocusMode() {
  return (
    <main className="flex items-center justify-evenly w-screen h-screen relative">
      <FocusModeTimer />
      <FocusModeTask />
      <FocusModeActions />
    </main>
  )
}
