import { useLang, type Lang } from "../lib/i18n"

const options: { value: Lang; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
]

export function LanguageToggle() {
  const { lang, setLang, t } = useLang()

  return (
    <div
      role="group"
      aria-label={t.lang.switch}
      className="flex items-center rounded-full border border-line p-0.5"
    >
      {options.map((opt) => {
        const active = lang === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            aria-label={opt.value === "id" ? "Indonesia" : "English"}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-medium transition-colors ${
              active
                ? "bg-accent text-accent-ink"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
