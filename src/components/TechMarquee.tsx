import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import { skills } from "../lib/data"

export function TechMarquee() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const halfWidth = useRef(0)
  const speed = 30

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let v = x.get()
    v -= (speed * delta) / 1000
    if (halfWidth.current && v <= -halfWidth.current) {
      v += halfWidth.current
    }
    x.set(v)
  })

  const onLoad = () => {
    if (trackRef.current) {
      halfWidth.current = trackRef.current.scrollWidth / 2
    }
  }

  const items = skills.map((s) => {
    const Icon = s.icon
    return (
      <div
        key={s.name}
        className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
      >
        <Icon className="text-base" />
        <span>{s.name}</span>
      </div>
    )
  })

  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"
        aria-hidden
      />

      <motion.div
        ref={trackRef}
        className="flex w-max gap-4"
        style={{ x }}
        onAnimationStart={onLoad}
        onViewportEnter={onLoad}
        aria-label="Technology stack"
      >
        <div className="flex gap-4">{items}</div>
        <div className="flex gap-4" aria-hidden>{items}</div>
      </motion.div>
    </div>
  )
}
