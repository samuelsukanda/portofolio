import { useEffect } from "react"
import { useLang } from "../lib/i18n"
import { faqs, profile, projects, services, skills } from "../lib/data"
import { ui } from "../lib/translations"

const SITE = "https://rakapradana.dev"
const OG_IMAGE = `${SITE}/og.png`

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function buildJsonLd(lang: "id" | "en") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: profile.name,
        url: SITE,
        image: OG_IMAGE,
        description: profile.tagline[lang],
        jobTitle: profile.role[lang],
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.split(",")[0],
          addressRegion: "Jawa Barat",
          addressCountry: "ID",
        },
        nationality: lang === "id" ? "Indonesia" : "Indonesian",
        knowsAbout: skills.map((s) => s.name),
        sameAs: profile.socials.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: `${profile.name} - ${profile.role[lang]}`,
        description: profile.tagline[lang],
        inLanguage: lang,
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "ItemList",
        name: lang === "id" ? "Proyek Portofolio" : "Portfolio Projects",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.description[lang],
          },
        })),
      },
      ...services.map((s) => ({
        "@type": "Service",
        name: s.title[lang],
        description: s.description[lang],
        provider: { "@id": `${SITE}/#person` },
        areaServed: "ID",
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q[lang],
          acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
        })),
      },
    ],
  }
}

function upsertJsonLd(lang: "id" | "en") {
  let script = document.getElementById("seo-jsonld") as HTMLScriptElement | null
  if (!script) {
    script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = "seo-jsonld"
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(buildJsonLd(lang))
}

export function Seo() {
  const { lang } = useLang()
  const t = ui[lang]

  useEffect(() => {
    const title = `${profile.name} - ${profile.role[lang]}`
    const description = profile.tagline[lang]
    document.title = title
    upsertMeta("name", "description", description)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:locale", lang === "id" ? "id_ID" : "en_US")
    upsertMeta("property", "og:url", SITE)
    upsertMeta("property", "og:type", "website")
    upsertMeta("property", "og:image", OG_IMAGE)
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:url", SITE)
    upsertJsonLd(lang)
  }, [lang, t])

  return null
}
