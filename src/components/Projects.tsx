import { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  animate,
  useAnimationFrame,
  useMotionValue,
} from "motion/react"
import {
  ArrowUpRight,
  GithubLogo,
  Sparkle,
  X,
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
} from "@phosphor-icons/react"
import { projects } from "../lib/data"
import type { Project } from "../lib/data"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"
import { BlurImage } from "./BlurImage"

export function Projects() {
  const { t } = useLang()
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="work" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
          tone="blue"
        />
      </div>

      <ProjectCarousel projects={projects} onOpen={setActive} />

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  cardWidth,
  onOpen,
  openLabel,
  liveLabel,
  codeLabel,
  onCardClick,
}: {
  project: Project
  cardWidth: string
  onOpen: (p: Project) => void
  openLabel: string
  liveLabel: string
  codeLabel: string
  onCardClick: (p: Project) => void
}) {
  const { L } = useLang()
  const imgRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = imgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty("--px", `${px * 10}px`)
    el.style.setProperty("--py", `${py * 10}px`)
  }

  const onLeave = () => {
    const el = imgRef.current
    if (!el) return
    el.style.setProperty("--px", "0px")
    el.style.setProperty("--py", "0px")
  }

  return (
    <article className={`${cardWidth} shrink-0`}>
      <div
        onClick={() => onCardClick(project)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-card border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-lg"
      >
        <div
          ref={imgRef}
          className="relative aspect-[16/10] overflow-hidden"
          style={{ "--px": "0px", "--py": "0px" } as React.CSSProperties}
        >
          <BlurImage
            src={project.image}
            alt={project.title}
            imgClassName="transition-transform duration-500 group-hover:scale-105"
            imgStyle={{
              transform: "translate(var(--px, 0px), var(--py, 0px)) scale(1.12)",
              transitionProperty: "transform",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <button
            type="button"
            aria-label={openLabel}
            onClick={(e) => {
              e.stopPropagation()
              onOpen(project)
            }}
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-bg text-ink opacity-0 shadow-sm transition-all duration-300 hover:scale-105 group-hover:opacity-100"
          >
            <ArrowUpRight size={16} weight="bold" />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <span className="font-mono text-xs text-ink-3">{project.year}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-2 line-clamp-2">
            {L(project.description)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-2 border-t border-line pt-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-bg transition-colors hover:opacity-90"
            >
              {liveLabel}
              <ArrowUpRight size={13} weight="bold" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              <GithubLogo size={14} weight="bold" />
              {codeLabel}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCarousel({
  projects,
  onOpen,
}: {
  projects: Project[]
  onOpen: (p: Project) => void
}) {
  const { t } = useLang()
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const halfWidth = useRef(0)
  const stepPx = useRef(0)

  const paused = useRef(false)
  const dragging = useRef(false)
  const moved = useRef(0)
  const dragStartX = useRef(0)
  const dragStartPointer = useRef(0)
  const pointerId = useRef<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const speed = 42

  const measure = useCallback(() => {
    if (trackRef.current) {
      halfWidth.current = trackRef.current.scrollWidth / 2
    }
    const first = trackRef.current?.querySelector<HTMLElement>("article")
    if (first) stepPx.current = first.offsetWidth + 24
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    paused.current = isHovering
  }, [isHovering])

  const wrap = (v: number) => {
    if (!halfWidth.current) return v
    if (v <= -halfWidth.current) v += halfWidth.current
    if (v > 0) v -= halfWidth.current
    return v
  }

  useAnimationFrame((_, delta) => {
    if (paused.current || dragging.current) return
    let v = x.get()
    v -= (speed * delta) / 1000
    if (halfWidth.current && v <= -halfWidth.current) v += halfWidth.current
    x.set(v)
  })

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    moved.current = 0
    dragStartX.current = x.get()
    dragStartPointer.current = e.clientX
    pointerId.current = e.pointerId
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || pointerId.current !== e.pointerId) return
    const dx = e.clientX - dragStartPointer.current
    moved.current = Math.max(moved.current, Math.abs(dx))
    x.set(wrap(dragStartX.current + dx))
  }

  const endDrag = () => {
    dragging.current = false
    pointerId.current = null
  }

  const onWheel = (e: React.WheelEvent) => {
    x.set(wrap(x.get() - (e.deltaY + e.deltaX) * 0.4))
  }

  const nudge = (dir: 1 | -1) => {
    if (!stepPx.current) return
    const from = wrap(x.get())
    const to = from - dir * stepPx.current
    const controls = animate(x, [from, to], {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    })
    controls.then(() => x.set(wrap(x.get())))
    return () => controls.stop()
  }

  const handleCardClick = (project: Project) => {
    if (moved.current < 6) onOpen(project)
  }

  const cardWidth = "w-[78vw] sm:w-[320px] lg:w-[340px]"

  const cardSet = (key: string) => (
    <div key={key} className="flex gap-6 pr-6" aria-hidden={key !== "set-a" ? true : undefined}>
      {projects.map((project) => (
        <ProjectCard
          key={`${key}-${project.title}`}
          project={project}
          cardWidth={cardWidth}
          onOpen={onOpen}
          openLabel={`${t.projects.openDetail} ${project.title}`}
          liveLabel={t.projects.liveDemo}
          codeLabel={t.projects.code}
          onCardClick={handleCardClick}
        />
      ))}
    </div>
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="pointer-events-none absolute -left-10 top-0 z-10 h-full w-20 bg-gradient-to-r from-bg to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-0 z-10 h-full w-20 bg-gradient-to-l from-bg to-transparent"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label={t.projects.prevCard}
        className="absolute left-4 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors hover:border-accent hover:text-accent"
      >
        <CaretLeft size={20} weight="bold" />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label={t.projects.nextCard}
        className="absolute right-4 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors hover:border-accent hover:text-accent"
      >
        <CaretRight size={20} weight="bold" />
      </button>

      <div
        className="relative overflow-hidden py-2"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            nudge(-1)
          }
          if (e.key === "ArrowRight") {
            e.preventDefault()
            nudge(1)
          }
        }}
        onFocus={() => {
          paused.current = true
        }}
        onBlur={() => {
          paused.current = false
        }}
        tabIndex={0}
        aria-label={t.projects.title}
        style={{ touchAction: "pan-y" }}
      >
        <motion.div
          ref={trackRef}
          className="flex w-max"
          style={{ x, cursor: isHovering ? "grab" : "grab" }}
        >
          {cardSet("set-a")}
          {cardSet("set-b")}
        </motion.div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, L } = useLang()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const prev = document.activeElement as HTMLElement | null
    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusables = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(selector),
          ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null)
        : []
    focusables()[0]?.focus()

    const trapTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const els = focusables()
      if (els.length === 0) return
      const first = els[0]
      const last = els[els.length - 1]
      const contained = dialogRef.current?.contains(document.activeElement)
      if (e.shiftKey) {
        if (document.activeElement === first || !contained) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last || !contained) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", trapTab)
    return () => {
      document.removeEventListener("keydown", trapTab)
      document.body.style.overflow = ""
      prev?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false)
        else onClose()
      }
      if (e.key === "ArrowLeft") setSlide((s) => (s - 1 + project.screenshots.length) % project.screenshots.length)
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % project.screenshots.length)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose, project.screenshots.length, zoomed])

  const openExternal = (e: React.MouseEvent, url: string) => {
    if (url === "#") {
      e.preventDefault()
    }
  }

  const hasSlides = project.screenshots.length > 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-lenis-prevent>
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${t.projects.openDetail} ${project.title}`}
        className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-modal border border-line bg-surface shadow-lg"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative aspect-video shrink-0 overflow-hidden">
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={t.projects.zoomIn}
            className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
          >
            <MagnifyingGlassPlus size={16} weight="bold" />
          </button>
          <div className="relative size-full cursor-zoom-in" onClick={() => setZoomed(true)}>
            <BlurImage
              src={project.screenshots[slide]}
              alt={`${project.title} ${slide + 1}`}
              imgClassName="transition-transform duration-300"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.projects.closeDetail}
            className="absolute left-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
          >
            <X size={16} weight="bold" />
          </button>

          {hasSlides && (
            <>
              <button
                type="button"
                onClick={() =>
                  setSlide((s) => (s - 1 + project.screenshots.length) % project.screenshots.length)
                }
                aria-label={t.projects.prevScreenshot}
                className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => setSlide((s) => (s + 1) % project.screenshots.length)}
                aria-label={t.projects.nextScreenshot}
                className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <CaretRight size={16} weight="bold" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${t.projects.viewScreenshot} ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === slide ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2">
              {project.year}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-2 md:text-base">
            {L(project.longDescription)}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t.projects.challenges}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{L(project.challenges)}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t.projects.solutions}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{L(project.solutions)}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {t.projects.keyFeatures}
            </h4>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={L(f)} className="flex items-start gap-2 text-sm text-ink-2">
                  <Sparkle size={14} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  {L(f)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {t.projects.architecture}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{L(project.architecture)}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {t.projects.process}
            </h4>
            <ol className="mt-2 space-y-2">
              {project.process.map((step, i) => (
                <li key={L(step)} className="flex items-start gap-3 text-sm text-ink-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-2 font-mono text-[11px] text-ink-2">
                    {i + 1}
                  </span>
                  {L(step)}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {t.projects.technologies}
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => openExternal(e, project.live)}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-200 hover:scale-[1.02]"
            >
              {t.projects.liveDemo}
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => openExternal(e, project.github)}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              <GithubLogo size={16} weight="bold" />
              {t.projects.sourceCode}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              {t.projects.close}
              <X size={14} weight="bold" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <motion.img
              key={slide}
              src={project.screenshots[slide]}
              alt={`${project.title} ${slide + 1}`}
              className="max-h-full max-w-full cursor-zoom-out rounded-lg object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label={t.projects.zoomOut}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <MagnifyingGlassMinus size={20} weight="bold" />
            </button>
            {hasSlides && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSlide((s) => (s - 1 + project.screenshots.length) % project.screenshots.length)
                  }
                  aria-label={t.projects.prevScreenshot}
                  className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  <CaretLeft size={20} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => setSlide((s) => (s + 1) % project.screenshots.length)}
                  aria-label={t.projects.nextScreenshot}
                  className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  <CaretRight size={20} weight="bold" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
