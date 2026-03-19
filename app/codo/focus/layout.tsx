import { ReactNode } from "react"
import { Meteors } from "@ui/meteors"
import Image from "next/image"

export default function FocusModeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden">
      <Image
        src="/images/focus-mode-bg.png"
        alt="Meteors falling on calm city"
        className="absolute inset-0 -z-100 object-cover w-full h-full pointer-events-none grayscale-100 opacity-50"
        draggable={false}
        decoding="async"
        aria-hidden="true"
        fill
        priority
      />
      <div className="pointer-events-none absolute inset-0 z-0">
        <Meteors number={30} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
