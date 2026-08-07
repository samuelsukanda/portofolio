import { type ReactNode } from "react"

type TooltipProps = {
  label: string
  children: ReactNode
  side?: "top" | "bottom"
  className?: string
}

export function Tooltip({ label, children, side = "top", className }: TooltipProps) {
  return (
    <span className={`group/tooltip relative inline-flex ${className ?? ""}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 font-mono text-[11px] font-medium text-bg opacity-0 shadow-md transition-opacity duration-200 group-hover/tooltip:opacity-100 ${
          side === "top" ? "bottom-full mb-2" : "top-full mt-2"
        }`}
      >
        {label}
      </span>
    </span>
  )
}
