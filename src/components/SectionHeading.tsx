import { Fragment } from "react"
import { motion } from "motion/react"

type Tone = "blue" | "emerald" | "violet" | "amber" | "rose"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  tone?: Tone
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const maskReveal = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "blue",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "mx-auto text-center" : ""
  const words = title.split(" ")

  return (
    <motion.div
      className={`tone-${tone} max-w-2xl ${alignCls}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {eyebrow && (
        <motion.p
          variants={fade}
          className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--sec)]"
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
              <motion.span className="inline-block will-change-transform" variants={maskReveal}>
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h2>
      {description && (
        <motion.p variants={fade} className="mt-4 text-base leading-relaxed text-ink-2">
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
