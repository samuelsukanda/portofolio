import { useEffect, useRef, useState, useCallback } from "react"
import { useReducedMotion } from "motion/react"

type TextScrambleProps = {
  text: string
  className?: string
  delay?: number
  active?: boolean
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function TextScramble({ text, className, delay = 0, active = true }: TextScrambleProps) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? text : "")
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const scramble = useCallback(() => {
    const length = text.length
    const duration = 800
    const revealDuration = 600
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / (duration + revealDuration), 1)
      const revealIndex = Math.floor(progress * length * 1.2)

      let result = ""
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          result += " "
        } else if (i < revealIndex) {
          result += text[i]
        } else if (elapsed > 0) {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      setDisplay(result)

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text])

  useEffect(() => {
    if (reduce) {
      setDisplay(text)
      return
    }
    if (!active) return

    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay, reduce, text, active])

  useEffect(() => {
    if (!started || reduce) return
    return scramble()
  }, [started, scramble, reduce])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
