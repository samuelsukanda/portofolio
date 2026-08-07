import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"

const ease = [0.16, 1, 0.3, 1] as const
const welcomeLetters = "WELCOME".split("")

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<"enter" | "exit">("enter")
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduce) {
      onComplete()
      return
    }

    const duration = 1600
    const start = performance.now()
    let raf = 0

    const updateCount = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))
      if (progress < 1) {
        raf = requestAnimationFrame(updateCount)
      }
    }
    raf = requestAnimationFrame(updateCount)

    const enterTimer = setTimeout(() => setPhase("exit"), 1800)
    const exitTimer = setTimeout(() => onComplete(), 2600)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
    }
  }, [reduce, onComplete])

  if (reduce) return null

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease }}
        >
          {/* WELCOME Staggered Text - Minimalist & Professional */}
          <div className="relative z-10 flex items-center justify-center gap-1 pl-[0.3em]">
            {welcomeLetters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.06,
                  ease,
                }}
                className="font-sans text-xl font-semibold uppercase tracking-[0.3em] text-ink"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Counter & Progress Line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="relative z-10 mt-6 flex flex-col items-center gap-2.5"
          >
            <div className="font-mono text-xs font-medium text-ink-3">
              <span className="text-accent">{count}</span>%
            </div>

            {/* Progress Bar */}
            <div className="h-0.5 w-36 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-accent"
                style={{ width: `${count}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
