import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Blockquote({ children, className }: { children: ReactNode, className?: string }) {
  return <blockquote className={cn("border-l-2 pl-6 italic", className)}>{children}</blockquote>
}
