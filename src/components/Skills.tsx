import { motion, useReducedMotion } from "motion/react"
import { skills } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"
import { SpotlightCard } from "./SpotlightCard"

export function Skills() {
  const reduce = useReducedMotion()
  const { t, L } = useLang()

  return (
    <section id="skills" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          description={t.skills.description}
          tone="blue"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-card border border-line bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-md"
              >
                <SpotlightCard spotSize={240}>
                  <span className="relative flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-2xl text-ink transition-colors duration-300 group-hover:text-accent">
                    <Icon />
                  </span>
                  <h3 className="relative mt-4 text-base font-semibold">{skill.name}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-ink-2">
                    {L(skill.description)}
                  </p>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
