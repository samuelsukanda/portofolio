import { motion } from "motion/react"
import type { ComponentType, ElementType } from "react"
import { ArrowUpRight, Code, HardDrives, Palette, Wrench } from "@phosphor-icons/react"
import { services, type IconProps } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"
import { SpotlightCard } from "./SpotlightCard"
import { useSectionReveal } from "../lib/useSectionReveal"

const iconMap: Record<string, ElementType> = {
  code: Code,
  server: HardDrives,
  palette: Palette,
  wrench: Wrench,
}

export function Services() {
  const { t, L } = useLang()
  const sectionRef = useSectionReveal<HTMLElement>()

  return (
    <section id="services" ref={sectionRef} className="section-reveal border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
          tone="blue"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = (iconMap[service.icon] ?? Code) as ComponentType<IconProps>
            return (
              <motion.div
                key={service.title.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-card border border-line bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-md"
              >
                <SpotlightCard spotSize={300}>
                  <div className="relative flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-surface-2 text-ink transition-colors duration-300 group-hover:text-accent">
                      <Icon size={24} weight="bold" />
                    </span>
                    <ArrowUpRight
                      size={20}
                      weight="bold"
                      className="text-ink-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </div>
                  <h3 className="relative mt-5 text-lg font-semibold tracking-tight">
                    {L(service.title)}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink-2">
                    {L(service.description)}
                  </p>
                  <ul className="relative mt-4 space-y-2">
                    {service.features.map((f) => (
                      <li key={L(f)} className="flex items-center gap-2 text-sm text-ink-2">
                        <span className="size-1 rounded-full bg-accent" />
                        {L(f)}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    {t.services.discuss}
                    <ArrowUpRight size={14} weight="bold" />
                  </a>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
