import { Handshake, Check } from "@phosphor-icons/react"
import { capabilities } from "../lib/data"
import { useLang } from "../lib/i18n"
import { Reveal, RevealItem } from "./Reveal"
import { CountUp } from "./CountUp"
import { useSectionReveal } from "../lib/useSectionReveal"

export function About() {
  const { t, L } = useLang()
  const sectionRef = useSectionReveal<HTMLElement>()
  const stats = [
    { value: 2, suffix: "+", label: t.about.statYears },
    { value: 4, suffix: "+", label: t.about.statProjects },
    { value: 12, suffix: "+", label: t.about.statTech },
  ]

  return (
    <section id="about" ref={sectionRef} className="section-reveal relative border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <Reveal>
          <RevealItem className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {t.about.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">{t.about.belief}</p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12">
          <RevealItem>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-card border border-line bg-surface p-6 text-center shadow-sm"
                >
                  <p className="text-gradient-accent text-4xl font-semibold tracking-tight md:text-5xl">
                    <CountUp value={String(s.value)} />
                    {s.suffix}
                  </p>
                  <p className="mt-2 text-sm text-ink-2">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealItem>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <RevealItem className="flex h-full flex-col">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t.about.expertise}
              </h3>
              <div className="mt-5 space-y-5">
                {capabilities.map((cap) => (
                  <div key={cap.group.id} className="rounded-card border border-line bg-surface p-5">
                    <p className="text-sm font-semibold">{L(cap.group)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {cap.items.map(L).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </RevealItem>
          </Reveal>

          <Reveal delay={0.15}>
            <RevealItem className="flex h-full flex-col">
              <h3
                className="font-mono text-xs uppercase tracking-[0.18em] text-transparent"
                aria-hidden
              >
                {t.about.expertise}
              </h3>
              <div className="mt-5" aria-hidden />
              <div className="flex items-start gap-3 rounded-card border border-line bg-surface p-5">
                <Handshake size={20} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold">{t.about.basedIn}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.about.remoteNote}</p>
                </div>
              </div>

              <div className="mt-6 rounded-card border border-line bg-surface p-5">
                <p className="text-sm font-semibold">{t.about.howIWork}</p>
                <ul className="mt-3 space-y-2.5 text-sm text-ink-2">
                  <li className="flex items-start gap-2.5">
                    <Check size={14} weight="bold" className="mt-1 shrink-0 text-accent" />
                    {t.about.workItem1}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={14} weight="bold" className="mt-1 shrink-0 text-accent" />
                    {t.about.workItem2}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={14} weight="bold" className="mt-1 shrink-0 text-accent" />
                    {t.about.workItem3}
                  </li>
                </ul>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
