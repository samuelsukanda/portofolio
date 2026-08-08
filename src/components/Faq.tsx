import { Plus } from "@phosphor-icons/react"
import { faqs } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"

export function Faq() {
  const { t, L } = useLang()

  return (
    <section id="faq" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          description={t.faq.description}
          tone="emerald"
          titleClassName="text-ink"
        />

        <div className="mt-12 grid gap-4">
          {faqs.map((f) => (
            <details
              key={f.q.en}
              className="group rounded-card border border-line bg-surface px-5 py-4 transition-colors duration-300 open:border-accent/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink sm:text-base">
                {L(f.q)}
                <Plus
                  size={18}
                  weight="bold"
                  aria-hidden
                  className="shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-2">{L(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
