import { lazy, Suspense, useEffect, useState } from "react"
import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Skills } from "./components/Skills"
import { Experience } from "./components/Experience"
import { Services } from "./components/Services"
import { Footer } from "./components/Footer"
import { NotFound } from "./components/NotFound"
import { Seo } from "./components/Seo"
import { useLang } from "./lib/i18n"

const Projects = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.Projects })),
)
const Contact = lazy(() =>
  import("./components/Contact").then((m) => ({ default: m.Contact })),
)

function SectionFallback() {
  return <div className="min-h-[40dvh]" aria-hidden />
}

export default function App() {
  const { t } = useLang()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const isRoot = path === "/" || path === "/index.html"

  if (!isRoot) {
    return (
      <div id="top" className="min-h-[100dvh] overflow-x-clip">
        <Seo />
        <NotFound />
      </div>
    )
  }

  return (
    <div id="top" className="min-h-[100dvh] overflow-x-clip">
      <a href="#main" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <Seo />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Services />
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
