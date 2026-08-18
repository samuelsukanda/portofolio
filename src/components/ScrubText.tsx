import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrubText({
  children,
  className = "",
}: {
  children: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = children.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const wordEls = el.querySelectorAll<HTMLElement>(".scrub-word")
    if (!wordEls.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 90%",
            scrub: 0.5,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [children])

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${i}-${word}`} className="scrub-word inline-block">
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  )
}