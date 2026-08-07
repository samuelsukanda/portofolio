import { motion, useReducedMotion } from "motion/react"

type Tone = "blue" | "emerald" | "violet" | "amber" | "rose"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  tone?: Tone
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "blue",
}: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const alignCls = align === "center" ? "mx-auto text-center" : ""

  return (
    <motion.div
      className={`tone-${tone} max-w-2xl ${alignCls}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--sec)]">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-2">{description}</p>
      )}
    </motion.div>
  )
}
