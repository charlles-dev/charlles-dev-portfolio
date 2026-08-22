"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import { localeLabels, localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const menuButton = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => firstMenuItemRef.current?.focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.body.dataset.mobileMenuOpen = "true";
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      delete document.body.dataset.mobileMenuOpen;
      menuButton?.focus();
    };
  }, [menuOpen]);
  const open = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <header className="reference-header">
      <div className="reference-header-inner">
                  <a className="reference-brand" href={localePath(locale)} aria-label="Charlles.dev">

          <Image className="reference-brand-mark" src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
          <nav className="reference-nav" aria-label={dictionary.nav.main}>
          <button type="button" onClick={onOpenWork}>{dictionary.nav.work}</button>
          <button type="button" onClick={onOpenAbout}>{dictionary.nav.about}</button>
          <button type="button" onClick={onOpenContact}>{dictionary.nav.contact}</button>
          <LanguageSwitcher currentLocale={locale} label={dictionary.nav.language} />
          <div className="reference-mobile-menu-wrap" ref={menuRef}>
            <button ref={menuButtonRef} type="button" className="reference-mobile-menu-button" aria-label={dictionary.nav.menu} aria-expanded={menuOpen} aria-controls="reference-mobile-menu" onClick={() => setMenuOpen((value) => !value)}><span aria-hidden="true">☰</span></button>
            {menuOpen && <div className="reference-mobile-menu" id="reference-mobile-menu" role="menu" aria-label={dictionary.nav.menu}>
              <button ref={firstMenuItemRef} type="button" role="menuitem" onClick={() => open(onOpenWork)}>{dictionary.nav.work}</button>
              <button type="button" role="menuitem" onClick={() => open(onOpenAbout)}>{dictionary.nav.about}</button>
              <button type="button" role="menuitem" onClick={() => open(onOpenContact)}>{dictionary.nav.contact}</button>
              <div className="reference-mobile-languages" role="group" aria-label={dictionary.nav.language}>
                {(Object.keys(localeLabels) as Locale[]).map((option) => <a key={option} href={localePath(option)} hrefLang={option} lang={option} aria-current={option === locale ? "page" : undefined}>{localeLabels[option].name}</a>)}
              </div>
            </div>}
          </div>
        </nav>
      </div>
    </header>
  );
}
