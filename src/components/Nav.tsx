import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion, useMotionValue } from "motion/react"
import { List, X, ArrowUpRight } from "@phosphor-icons/react"
import { navLinks, profile } from "../lib/data"
import { useLang } from "../lib/i18n"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const { t } = useLang()
  const progress = useMotionValue(0)

  useEffect(() => {
    const updateProgress = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      progress.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [progress])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const updateActive = () => {
      const probe = window.scrollY + window.innerHeight * 0.4
      let current = ""
      for (const link of navLinks) {
        const el = document.querySelector<HTMLElement>(link.href)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= probe) current = link.href
      }
      setActive(current)
    }
    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 ${scrolled ? "shadow-sm" : ""}`}>
      <div className="border-b border-line bg-bg">
        <nav className="container-site flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2" aria-label={t.nav.home}>
            <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-accent-ink">
              {profile.initials}
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link.href ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{t.nav[link.key]}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contact"
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2 text-sm font-medium text-bg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] md:inline-flex"
            >
              {t.nav.contactCta}
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink-2 lg:hidden"
            >
              {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-line lg:hidden"
            >
              <div className="container-site flex flex-col gap-1 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    {t.nav[link.key]}
                    <ArrowUpRight size={14} weight="bold" className="text-ink-3" />
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-accent-ink"
                >
                  {t.nav.contactCta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="h-0.5 origin-left bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </header>
  )
}
