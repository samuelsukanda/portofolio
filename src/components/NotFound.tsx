import { motion } from "motion/react"
import { ArrowLeft } from "@phosphor-icons/react"
import { useLang } from "../lib/i18n"

export function NotFound() {
  const { t } = useLang()

  return (
    <main className="container-site grid min-h-[100dvh] place-items-center py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <p className="text-gradient-accent font-mono text-8xl font-bold tracking-tight md:text-9xl">
          {t.notFound.code}
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
          {t.notFound.title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-2">
          {t.notFound.description}
        </p>
        <a
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          <ArrowLeft
            size={15}
            weight="bold"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {t.notFound.home}
        </a>
      </motion.div>
    </main>
  )
}
