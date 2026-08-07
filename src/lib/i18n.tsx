import { createContext, useContext } from "react"
import type { UiDict } from "./translations"

export type Lang = "id" | "en"
export type LocaleString = Record<Lang, string>

export const LanguageContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: UiDict
  L: (ls: LocaleString) => string
} | null>(null)

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used within LanguageProvider")
  return ctx
}
