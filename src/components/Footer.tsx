import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  WhatsappLogo,
} from "@phosphor-icons/react"
import { navLinks, profile } from "../lib/data"
import { useLang } from "../lib/i18n"
import { Tooltip } from "./Tooltip"

export function Footer() {
  const { t, L } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-site py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-accent-ink">
                {profile.initials}
              </span>
              <span className="text-base font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-2">
              {t.footer.tagline.replace("{role}", L(profile.role))}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-2 transition-colors hover:text-accent"
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {[
              { label: "GitHub", url: profile.socials[0].url, icon: GithubLogo },
              { label: "LinkedIn", url: profile.socials[1].url, icon: LinkedinLogo },
              { label: "Email", url: `mailto:${profile.email}`, icon: EnvelopeSimple },
              { label: "WhatsApp", url: profile.whatsapp, icon: WhatsappLogo },
            ].map((s) => {
              const Icon = s.icon
              return (
                <Tooltip key={s.label} label={s.label} side="top">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-line text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon size={17} weight="bold" />
                  </a>
                </Tooltip>
              )
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="text-sm text-ink-3">
            © {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
