import { Fragment } from "react"
import { motion } from "motion/react"
import { useLang } from "../lib/i18n"

type Tone = "blue" | "emerald" | "violet" | "amber" | "rose"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  tone?: Tone
  titleClassName?: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.1 } },
}

const charReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
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
  titleClassName = "",
}: SectionHeadingProps) {
  const { lang } = useLang()
  const alignCls = align === "center" ? "mx-auto text-center" : ""
  const words = title.split(" ")

  return (
    <motion.div
      key={lang}
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
      <h2 className={`mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl ${titleClassName}`}>
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && <span className="inline-block w-[0.28em]" aria-hidden />}
            <span className="inline-block whitespace-nowrap align-bottom">
              {word.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-[0.15em] -mb-[0.15em]"
                >
                  <motion.span className="inline-block will-change-transform" variants={charReveal}>
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
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
