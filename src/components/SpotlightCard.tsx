import { useRef, type ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "motion/react"

type SpotlightCardProps = {
  children: ReactNode
  spotSize?: number
}

export function SpotlightCard({ children, spotSize = 280 }: SpotlightCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 150, damping: 28, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 150, damping: 28, mass: 0.4 })
  const glowBg = useMotionTemplate`radial-gradient(${spotSize}px at ${sx}% ${sy}%, var(--glow), transparent 70%)`

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 100)
    my.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <div ref={ref} onMouseMove={onMove}>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBg }}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  )
}
