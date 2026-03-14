import { ReactNode } from "react"
import { Meteors } from "@ui/meteors"

export default function FocusModeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Meteors number={30} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
