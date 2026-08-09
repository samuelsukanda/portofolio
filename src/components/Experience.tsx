import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experience } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"
import { useSectionReveal } from "../lib/useSectionReveal"

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const { t, L } = useLang()
  const sectionRef = useSectionReveal<HTMLElement>()
  const listRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLLIElement>("li")
    if (!items?.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, x: -36 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      )

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section-reveal border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
          tone="blue"
        />

        <div className="relative mt-12">
          <div
            ref={lineRef}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent/50 via-line to-transparent"
            aria-hidden
          />
          <ol ref={listRef} className="space-y-8">
            {experience.map((exp) => (
              <li key={exp.period} className="relative pl-10">
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
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-2">{L(exp.description)}</p>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
