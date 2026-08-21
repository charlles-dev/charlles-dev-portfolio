"use client";

import { useState } from "react";
import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";

export function SiteHeader({
  locale,
  dictionary,
  onOpenWork,
  onOpenAbout,
  onOpenContact,
}: {
  locale: Locale;
  dictionary: PortfolioDictionary;
  onOpenWork: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const open = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <header className="reference-header">
      <div className="reference-header-inner">
        <a className="reference-brand" href={`/${locale === "pt-BR" ? "" : locale}`} aria-label="Charlles.dev">
          <Image className="reference-brand-mark" src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
        <nav className="reference-nav" aria-label="Navegação principal">
          <button type="button" onClick={onOpenWork}>{dictionary.nav.work}</button>
          <button type="button" onClick={onOpenAbout}>{dictionary.nav.about}</button>
          <button type="button" onClick={onOpenContact}>{dictionary.nav.contact}</button>
          <LanguageSwitcher currentLocale={locale} />
          <button type="button" className="reference-mobile-menu-button" aria-expanded={menuOpen} aria-controls="reference-mobile-menu" onClick={() => setMenuOpen((value) => !value)}>☰<span className="sr-only">{dictionary.nav.menu}</span></button>
        </nav>
        {menuOpen && <div className="reference-mobile-menu" id="reference-mobile-menu">
          <button type="button" onClick={() => open(onOpenWork)}>{dictionary.nav.work}</button>
          <button type="button" onClick={() => open(onOpenAbout)}>{dictionary.nav.about}</button>
          <button type="button" onClick={() => open(onOpenContact)}>{dictionary.nav.contact}</button>
        </div>}
      </div>
    </header>
  );
}
