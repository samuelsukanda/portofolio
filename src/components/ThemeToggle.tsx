import { useEffect, useRef, useState } from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "motion/react"
import { useLang } from "../lib/i18n"

export function ThemeToggle() {
  const { t } = useLang()
  const btnRef = useRef<HTMLButtonElement>(null)
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  )

  const handleToggle = () => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void
    }
    if (doc.startViewTransition && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const root = document.documentElement
      root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`)
      root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`)
      doc.startViewTransition(() => setDark((v) => !v))
      return
    }
    setDark((v) => !v)
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleToggle}
      aria-label={dark ? t.theme.toLight : t.theme.toDark}
      className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex"
        >
          {dark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
