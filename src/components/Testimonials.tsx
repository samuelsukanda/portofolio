import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Star, Quotes, CaretLeft, CaretRight } from "@phosphor-icons/react"
import { testimonials } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"

export function Testimonials() {
  const reduce = useReducedMotion()
  const { t, L } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (reduce || paused) return
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [reduce, paused])

  const go = (dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section id="testimonials" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          align="center"
          tone="rose"
        />

        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-card">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-card border border-line bg-surface p-8 shadow-sm md:p-10"
              >
                <Quotes size={28} weight="fill" className="text-accent/30" />
                <p className="mt-4 text-lg leading-relaxed text-ink md:text-xl">
                  {L(current.review)}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-accent-ink">
                      {current.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{current.name}</p>
                      <p className="text-sm text-ink-2">
                        {L(current.position)}, {current.company}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex gap-0.5"
                    aria-label={t.testimonials.rating.replace("{n}", String(current.rating))}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        weight="fill"
                        className={i < current.rating ? "text-amber-400" : "text-ink-3"}
                      />
                    ))}
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((tst, i) => (
                <button
                  key={tst.name}
                  type="button"
                  aria-label={`${t.testimonials.view} ${tst.name}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-7 bg-accent" : "w-2 bg-surface-2 hover:bg-ink-3"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.testimonials.prev}
                className="flex size-10 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.testimonials.next}
                className="flex size-10 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
