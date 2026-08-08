import { useEffect, useRef, useState } from "react"
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react"
import { ArrowDownRight, ArrowUpRight, ArrowRight } from "@phosphor-icons/react"
import { profile } from "../lib/data"
import { useLang } from "../lib/i18n"
import { Tooltip } from "./Tooltip"
import { BlurImage } from "./BlurImage"
import { ParticleGrid } from "./ParticleGrid"

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 350, damping: 25, mass: 0.1 })
  const sy = useSpring(my, { stiffness: 350, damping: 25, mass: 0.1 })
  const glowBg = useMotionTemplate`radial-gradient(600px at ${sx}% ${sy}%, var(--glow), transparent 70%)`

  const handleMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(((e.clientX - rect.left) / rect.width) * 100)
    my.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={reduce ? undefined : handleMove}
      className="relative overflow-hidden"
    >
      {/* Particle grid background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <ParticleGrid />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBg }}
        aria-hidden
      />

      {!reduce && (
        <>
          <div
            className="pointer-events-none absolute -left-24 top-24 size-72 animate-float rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-32 bottom-0 size-80 animate-float-delay rounded-full bg-accent-2/10 blur-3xl"
            aria-hidden
          />
        </>
      )}

      <div className="container-site relative grid min-h-[calc(100dvh-4rem)] items-center gap-14 pt-24 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-10">
        <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            {t.hero.headlineStart} <TypeWriter words={t.hero.words} reduce={reduce} />
            {t.hero.headlineEnd}
          </motion.h1>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 ease-out hover:bg-accent"
            >
              {t.hero.viewWork}
              <ArrowDownRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 ease-out hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              {t.hero.contact}
              <ArrowUpRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">
              {t.hero.findMe}
            </span>
            {profile.socials.map((social) => (
              <Tooltip key={social.label} label={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-accent"
                >
                  {social.label}
                  <ArrowRight
                    size={13}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              </Tooltip>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  )
}

function TypeWriter({ words, reduce }: { words: readonly string[]; reduce: boolean | null }) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) {
      setText(words[0] ?? "")
      return
    }
    const word = words[index % words.length]
    let timeout: number | undefined
    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && text === "") {
      setDeleting(false)
      setIndex((v) => (v + 1) % words.length)
    } else {
      timeout = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 40 : 90,
      )
    }
    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, words, reduce])

  return (
    <span className="text-gradient-accent italic">
      {text}
      <span
        aria-hidden
        className="ml-1 inline-block h-[0.95em] w-[3px] translate-y-[0.12em] rounded-full bg-current align-baseline"
        style={{ animation: "cursor-blink 1.1s steps(2) infinite" }}
      />
    </span>
  )
}

function ProfileCard() {
  const { L } = useLang()

  return (
    <div className="relative mx-auto max-w-md">
      <div
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20 blur-xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-card border border-line bg-surface shadow-md">
        <div className="relative aspect-[9/10]">
          <BlurImage
            src="/images/hero.svg"
            alt="Foto Samuel Sukanda"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-lg font-semibold text-white">{profile.name}</p>
            <p className="text-sm text-white/80">{L(profile.role)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
