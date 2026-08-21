import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import { IconGlyph } from "@/components/icon-glyph";
import { ThemeToggle } from "@/components/theme-toggle";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href={localePath(locale, "#top")} aria-label="Charlles.dev">
          <span className="site-brand-mark">
            <Image src="/assets/charlles-dev.svg" alt="" width={22} height={24} priority />
          </span>
          <span>charlles<span className="accent-text">.dev</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href={localePath(locale, "#trabalhos")}>{dictionary.nav.work}</a>
          <a href={localePath(locale, "#sobre")}>{dictionary.nav.about}</a>
          <a href={localePath(locale, "#agora")}>{dictionary.nav.now}</a>
          <a href={localePath(locale, "#contato")}>{dictionary.nav.contact}</a>
        </nav>

        <div className="header-tools">
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle label={dictionary.nav.theme} />
          <a className="header-contact" href={localePath(locale, "#contato")}>
            <span className="status-dot" aria-hidden="true" />
            <span className="header-contact-label">{dictionary.hero.status}</span>
            <IconGlyph name="arrow-right" className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
