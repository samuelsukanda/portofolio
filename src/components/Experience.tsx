import { motion, useReducedMotion } from "motion/react"
import { experience } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"

export function Experience() {
  const reduce = useReducedMotion()
  const { t, L } = useLang()

  return (
    <section id="experience" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
          tone="blue"
        />

        <div className="relative mt-12">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-line to-transparent"
            aria-hidden
          />
          <ol className="space-y-8">
            {experience.map((exp, i) => (
              <motion.li
                key={exp.period}
                className="relative pl-10"
                initial={reduce ? false : { opacity: 0, x: -24 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="absolute left-0 top-1.5 flex size-4 items-center justify-center">
                  <span className="size-3 rounded-full border-2 border-accent bg-bg" />
                </span>
                <div className="rounded-card border border-line bg-surface p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                        {exp.period}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold">{L(exp.role)}</h3>
                      <p className="text-sm text-ink-2">{L(exp.place)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{L(exp.description)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
