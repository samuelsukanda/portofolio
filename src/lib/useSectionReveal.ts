import { useEffect, useRef, type RefObject } from "react"

/**
 * Adds the `.is-visible` class when the element enters the viewport.
 * Pair with the `.section-reveal` CSS class for scroll-triggered transitions.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.1,
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.unobserve(el)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
