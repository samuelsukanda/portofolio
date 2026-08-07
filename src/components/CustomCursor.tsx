import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

export function CustomCursor() {
  const reduce = useReducedMotion()
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 500, damping: 28, mass: 0.1 })
  const ringY = useSpring(dotY, { stiffness: 500, damping: 28, mass: 0.1 })
  const ringScale = useSpring(1, { stiffness: 300, damping: 20 })
  const dotScale = useSpring(1, { stiffness: 300, damping: 20 })
  const isTouchDevice = useRef(false)

  useEffect(() => {
    if (reduce) return
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice.current) return

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onDown = () => {
      ringScale.set(0.75)
      dotScale.set(0.6)
    }

    const onUp = () => {
      ringScale.set(1)
      dotScale.set(1)
    }

    const onEnterInteractive = () => {
      ringScale.set(1.8)
      dotScale.set(0.4)
    }

    const onLeaveInteractive = () => {
      ringScale.set(1)
      dotScale.set(1)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)

    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive)
        el.addEventListener("mouseleave", onLeaveInteractive)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Initial bind
    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive)
      el.addEventListener("mouseleave", onLeaveInteractive)
    })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      observer.disconnect()
    }
  }, [reduce, dotX, dotY, ringScale, dotScale])

  if (reduce) return null
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-accent/50 mix-blend-difference"
        style={{ x: ringX, y: ringY, scale: ringScale }}
        aria-hidden
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, scale: dotScale }}
        aria-hidden
      />
    </>
  )
}
