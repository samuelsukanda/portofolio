import { Star, Quotes } from "@phosphor-icons/react"
import { testimonials } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  useCarousel,
} from "./motion-primitives/carousel"

function Dots() {
  const { index, itemsCount, setIndex } = useCarousel()

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: itemsCount }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => setIndex(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === index ? "w-7 bg-accent" : "w-2 bg-surface-2 hover:bg-ink-3"
          }`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const { t, L } = useLang()

  return (
    <section id="testimonials" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          align="center"
          tone="rose"
        />

        <Carousel className="mx-auto mt-14 max-w-3xl">
          <CarouselContent>
            {testimonials.map((tst) => (
              <CarouselItem key={tst.name}>
                <blockquote className="rounded-card border border-line bg-surface p-8 shadow-sm md:p-10">
                  <Quotes size={28} weight="fill" className="text-accent/30" />
                  <p className="mt-4 text-lg leading-relaxed text-ink md:text-xl">
                    {L(tst.review)}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-accent-ink">
                        {tst.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{tst.name}</p>
                        <p className="text-sm text-ink-2">
                          {L(tst.position)}, {tst.company}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex gap-0.5"
                      aria-label={t.testimonials.rating.replace("{n}", String(tst.rating))}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          weight="fill"
                          className={i < tst.rating ? "text-amber-400" : "text-ink-3"}
                        />
                      ))}
                    </div>
                  </div>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation alwaysShow />
          <Dots />
        </Carousel>
      </div>
    </section>
  )
}
