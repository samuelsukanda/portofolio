import { useEffect } from "react"
import { useLang } from "../lib/i18n"
import { profile } from "../lib/data"
import { ui } from "../lib/translations"

const SITE = "https://rakapradana.dev"
const OG_IMAGE = `${SITE}/og.svg`

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertJsonLd() {
  const id = "person-jsonld"
  if (document.getElementById(id)) return
  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.id = id
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE,
    image: OG_IMAGE,
    jobTitle: profile.role.id,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    sameAs: profile.socials.map((s) => s.url),
  })
  document.head.appendChild(script)
}

export function Seo() {
  const { lang } = useLang()
  const t = ui[lang]

  useEffect(() => {
    const title = `${profile.name} - ${profile.role[lang]}`
    const description = profile.tagline[lang]
    document.title = title
    document.documentElement.lang = lang
    upsertMeta("name", "description", description)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:locale", lang === "id" ? "id_ID" : "en_US")
    upsertMeta("property", "og:url", SITE)
    upsertMeta("property", "og:type", "website")
    upsertMeta("property", "og:image", OG_IMAGE)
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertJsonLd()
  }, [lang, t])

  return null
}
