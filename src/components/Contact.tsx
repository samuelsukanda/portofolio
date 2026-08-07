import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  EnvelopeSimple,
  WhatsappLogo,
  GithubLogo,
  LinkedinLogo,
  Check,
  Copy,
  PaperPlaneTilt,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react"
import { profile } from "../lib/data"
import { contactForm } from "../lib/config"
import { useLang } from "../lib/i18n"
import { SectionHeading } from "./SectionHeading"

type Status = "idle" | "loading" | "success" | "error"

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  error?: string
  textarea?: boolean
}

function Field({ id, label, value, onChange, type = "text", error, textarea }: FieldProps) {
  const base =
    "peer w-full rounded-xl border bg-surface-2/60 px-4 pt-6 pb-2 text-sm text-ink outline-none transition-colors placeholder-transparent focus:border-accent"
  const borderCls = error ? "border-red-400" : "border-line focus:border-accent"

  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            rows={4}
            aria-invalid={!!error}
            className={`${base} ${borderCls} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            aria-invalid={!!error}
            className={`${base} ${borderCls} h-14`}
          />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wide transition-all ${
            value ? "text-accent" : "text-ink-3"
          }`}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400" role="alert">
          <WarningCircle size={13} weight="bold" />
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const { t } = useLang()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>("idle")
  const [submitError, setSubmitError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const focusName = () => {
      if (window.location.hash === "#contact") {
        window.setTimeout(() => document.getElementById("name")?.focus(), 500)
      }
    }
    focusName()
    window.addEventListener("hashchange", focusName)
    return () => window.removeEventListener("hashchange", focusName)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = t.contact.nameError
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.contact.emailError
    if (message.trim().length < 10) next.message = t.contact.messageError
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitError("")
    setStatus("loading")
    if (!contactForm.endpoint) {
      setStatus("error")
      setSubmitError(t.contact.notConfigured + profile.email)
      return
    }
    try {
      const res = await fetch(contactForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus("success")
    } catch {
      setStatus("error")
      setSubmitError(t.contact.sendError)
    }
  }

  const channels = [
    { label: "Email", value: profile.email, url: `mailto:${profile.email}`, icon: EnvelopeSimple },
    { label: "WhatsApp", value: t.contact.clickToChat, url: profile.whatsapp, icon: WhatsappLogo },
    { label: "GitHub", value: "@samuelsukanda", url: profile.socials[0].url, icon: GithubLogo },
    { label: "LinkedIn", value: "Samuel Sukanda", url: profile.socials[1].url, icon: LinkedinLogo },
  ]

  return (
    <section id="contact" className="border-t border-line">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
          tone="emerald"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {channels.map((c) => {
                const Icon = c.icon
                const isEmail = c.url.startsWith("mailto:")
                return (
                  <div key={c.label} className="relative">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-card border border-line bg-surface p-4 pr-12 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink transition-colors group-hover:text-accent">
                        <Icon size={20} weight="bold" />
                      </span>
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-3">
                          {c.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-ink">
                          {c.value}
                        </span>
                      </span>
                    </a>
                    {isEmail && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        aria-label={copied ? t.contact.emailCopied : t.contact.copyEmail}
                        title={t.contact.copyEmail}
                        className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
                      >
                        {copied ? (
                          <Check size={14} weight="bold" className="text-emerald-500" />
                        ) : (
                          <Copy size={14} weight="bold" />
                        )}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-card border border-line bg-surface p-6 shadow-sm md:p-8"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                  role="status"
                >
                  <motion.span
                    className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Check size={30} weight="bold" />
                  </motion.span>
                  <h3 className="mt-5 text-lg font-semibold">{t.contact.sent}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">
                    {t.contact.sentNote.replace("{name}", name.split(" ")[0])}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle")
                      setName("")
                      setEmail("")
                      setMessage("")
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                >
                  <Field id="name" label={t.contact.name} value={name} onChange={setName} error={errors.name} />
                  <Field
                    id="email"
                    label={t.contact.email}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                  />
                  <Field
                    id="message"
                    label={t.contact.message}
                    textarea
                    value={message}
                    onChange={setMessage}
                    error={errors.message}
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <SpinnerGap size={16} weight="bold" className="animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        {t.contact.send}
                        <PaperPlaneTilt
                          size={15}
                          weight="bold"
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-red-400"
                    >
                      <WarningCircle size={14} weight="bold" className="mt-0.5 shrink-0" />
                      <span className="break-words">{submitError}</span>
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
