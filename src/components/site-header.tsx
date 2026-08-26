"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import { localeLabels, localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

export function SiteHeader({
  locale,
  dictionary,
  contextHash,
}: {
  locale: Locale;
  dictionary: PortfolioDictionary;
  contextHash?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const menuItemsRef = useRef<Array<HTMLElement | null>>([]);
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
  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
    const key = event.key;
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const menuItemCount = 3;
    const nextIndex = key === "Home" ? 0 : key === "End" ? menuItemCount - 1 : key === "ArrowUp" || key === "ArrowLeft" ? (index + menuItemCount - 1) % menuItemCount : (index + 1) % menuItemCount;
    menuItemsRef.current[nextIndex]?.focus();
  };
  return (
    <header className="reference-header">
      <div className="reference-header-inner">
                  <a className="reference-brand" href={localePath(locale)} aria-label="Charlles.dev">

          <Image className="reference-brand-mark" src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
        <nav className="reference-nav" aria-label={dictionary.nav.main}>
          <a href="#work">{dictionary.nav.work}</a>
          <a href="#about">{dictionary.nav.about}</a>
          <a href="#contact">{dictionary.nav.contact}</a>
          <LanguageSwitcher currentLocale={locale} label={dictionary.nav.language} contextHash={contextHash} />
          <div className="reference-mobile-menu-wrap" ref={menuRef}>
            <button ref={menuButtonRef} type="button" className="reference-mobile-menu-button" aria-label={dictionary.nav.menu} aria-expanded={menuOpen} aria-controls="reference-mobile-menu" onClick={() => setMenuOpen((value) => !value)}><span aria-hidden="true">☰</span></button>
            {menuOpen && <div className="reference-mobile-menu" id="reference-mobile-menu" role="menu" aria-label={dictionary.nav.menu}>
              <a ref={(node) => { firstMenuItemRef.current = node; menuItemsRef.current[0] = node; }} href="#work" role="menuitem" onKeyDown={(event) => handleMenuKeyDown(event, 0)} onClick={closeMenu}>{dictionary.nav.work}</a>
              <a ref={(node) => { menuItemsRef.current[1] = node; }} href="#about" role="menuitem" onKeyDown={(event) => handleMenuKeyDown(event, 1)} onClick={closeMenu}>{dictionary.nav.about}</a>
              <a ref={(node) => { menuItemsRef.current[2] = node; }} href="#contact" role="menuitem" onKeyDown={(event) => handleMenuKeyDown(event, 2)} onClick={closeMenu}>{dictionary.nav.contact}</a>
              <div className="reference-mobile-languages" role="group" aria-label={dictionary.nav.language}>
                {(Object.keys(localeLabels) as Locale[]).map((option) => <a key={option} href={`${localePath(option)}${contextHash ? `#${contextHash}` : ""}`} hrefLang={option} lang={option} aria-current={option === locale ? "page" : undefined}>{localeLabels[option].name}</a>)}
              </div>
            </div>}
          </div>
        </nav>
      </div>
    </header>
  );
}
