import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowUp } from "@phosphor-icons/react"
import { useLang } from "../lib/i18n"

export function BackToTop() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const radius = 21
  const circumference = 2 * Math.PI * radius
  const dash = useTransform(scrollYProgress, (v) => circumference - v * circumference)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label={t.footer.backToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-30 flex size-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-lg transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <circle cx="24" cy="24" r="21" fill="none" stroke="var(--line)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dash }}
            />
          </svg>
          <ArrowUp size={17} weight="bold" className="relative" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
