import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Skills } from "./components/Skills"
import { Experience } from "./components/Experience"
import { Services } from "./components/Services"
import { Faq } from "./components/Faq"
import { Footer } from "./components/Footer"
import { Seo } from "./components/Seo"
import { Preloader } from "./components/Preloader"
import { TechMarquee } from "./components/TechMarquee"
import { BackToTop } from "./components/BackToTop"
import { useLang } from "./lib/i18n"

gsap.registerPlugin(ScrollTrigger)

const Projects = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.Projects })),
)
const Contact = lazy(() =>
  import("./components/Contact").then((m) => ({ default: m.Contact })),
)
const NotFound = lazy(() =>
  import("./components/NotFound").then((m) => ({ default: m.NotFound })),
)

function SectionFallback() {
  return <div className="min-h-[40dvh]" aria-hidden />
}

export default function App() {
  const { t } = useLang()
  const [path, setPath] = useState(window.location.pathname)
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const isRoot = path === "/" || path === "/index.html"

  const handlePreloaderComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    if (!isRoot) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || href === "#" || anchor.classList.contains("skip-link")) return
      e.preventDefault()
      if (href === "#top") {
        lenis.scrollTo(0, { duration: 1.1 })
      } else {
        const el = document.querySelector<HTMLElement>(href)
        if (!el) return
        lenis.scrollTo(el, { offset: -12, duration: 1.1 })
      }
      history.pushState(null, "", href)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("click", onClick)
      lenis.off("scroll", ScrollTrigger.update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isRoot])

  if (!isRoot) {
    return (
      <div id="top" className="min-h-[100dvh] overflow-x-clip">
        <Seo />
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      </div>
    )
  }

  return (
    <div id="top" className="min-h-[100dvh] overflow-x-clip">
      {/* Preloader */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <a href="#main" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <Seo />
      <Nav />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Services />
        <Faq />
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
