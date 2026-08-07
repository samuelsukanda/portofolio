import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

type CountUpProps = {
  value: string
  className?: string
}

export function CountUp({ value, className }: CountUpProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(reduce ? value : "0")

  const match = value.match(/^(-?\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(String(Math.round(target * eased)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, value, reduce])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
