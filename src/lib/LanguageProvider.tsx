import { useEffect, useState, type ReactNode } from "react"
import { LanguageContext, type Lang } from "./i18n"
import { ui } from "./translations"

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id"
  const stored = localStorage.getItem("lang")
  if (stored === "en" || stored === "id") return stored
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "id"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = ui[lang]
  const L = (ls: { id: string; en: string }) => ls[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, L }}>
      {children}
    </LanguageContext.Provider>
  )
}
