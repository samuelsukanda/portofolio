import { useRef } from "react"
import type { ComponentType } from "react"
import { motion, useInView } from "motion/react"
import { skills, type IconProps } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"
import { SpotlightCard } from "./SpotlightCard"
import { useSectionReveal } from "../lib/useSectionReveal"

function SkillCard({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  const { L } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const Icon = skill.icon as ComponentType<IconProps>

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-card border border-line bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-md"
    >
      <SpotlightCard spotSize={240}>
        <div className="relative flex items-center justify-between gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-2xl text-ink transition-colors duration-300 group-hover:text-accent">
            <Icon />
          </span>
        </div>
        <h3 className="relative mt-4 text-base font-semibold">{skill.name}</h3>
        <p className="relative mt-1.5 text-sm leading-relaxed text-ink-2">
          {L(skill.description)}
        </p>
        <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
            initial={{ width: "0%" }}
            animate={{ width: inView ? "100%" : "0%" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export function Skills() {
  const { t } = useLang()
  const sectionRef = useSectionReveal<HTMLElement>()

  return (
    <section id="skills" ref={sectionRef} className="section-reveal border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          description={t.skills.description}
          tone="blue"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
