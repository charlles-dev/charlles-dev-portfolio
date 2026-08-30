"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import { copyText } from "@/lib/clipboard";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/lib/portfolio";
import { getProfessionalContent } from "@/lib/professional-content";

type MenuState = { x: number; y: number } | null;

export function PortfolioShortcuts({ locale, onOpenWork }: { locale: Locale; onOpenWork: () => void }) {
  const content = getProfessionalContent(locale).contextMenu;
  const [menu, setMenu] = useState<MenuState>(null);
  const [copied, setCopied] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let brandClicks = 0;
    let brandTimer = 0;
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || target.closest("a, button, input, textarea, select, video, [role='dialog'], [data-native-context]")) return;
      event.preventDefault();
      const width = 250;
      const height = 270;
      setMenu({ x: Math.min(event.clientX, window.innerWidth - width - 12), y: Math.min(event.clientY, window.innerHeight - height - 12) });
    };
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".reference-brand") && window.location.pathname === `/${locale}`) {
        event.preventDefault();
        brandClicks += 1;
        window.clearTimeout(brandTimer);
        brandTimer = window.setTimeout(() => { brandClicks = 0; }, 1800);
        if (brandClicks >= 5) {
          brandClicks = 0;
          setDeveloperMode(true);
          console.info("Charlles.dev: dev mode unlocked. See you between the layers.");
        }
        return;
      }
      setMenu(null);
    };
    const close = () => setMenu(null);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key.toLowerCase() === "k" && event.altKey) {
        event.preventDefault();
        setMenu({ x: Math.max(12, window.innerWidth / 2 - 125), y: Math.max(12, window.innerHeight / 2 - 135) });
      }
    };
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", keydown);
    return () => {
      window.clearTimeout(brandTimer);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", keydown);
    };
  }, [locale]);

  useEffect(() => {
    if (!menu) return;
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a, button")?.focus());
  }, [menu]);

  const copyEmail = async () => {
    if (await copyText(profile.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <>
      {menu && (
        <div ref={menuRef} className="portfolio-context-menu" role="menu" aria-label={content.label} style={{ left: menu.x, top: menu.y }} onClick={(event) => event.stopPropagation()}>
          <span>{content.label}</span>
          <Link role="menuitem" href={`/${locale}`}><IconGlyph name="route" className="size-4" />{content.home}</Link>
          <button role="menuitem" type="button" onClick={() => { onOpenWork(); setMenu(null); }}><IconGlyph name="github" className="size-4" />{content.projects}</button>
          <Link role="menuitem" href={`/${locale}/cv`}><IconGlyph name="solar-document" className="size-4" />{content.cv}</Link>
          <Link role="menuitem" href={`/${locale}/game/world`}><IconGlyph name="robot" className="size-4" />{content.game}</Link>
          <button role="menuitem" type="button" onClick={copyEmail}><IconGlyph name="mail" className="size-4" />{copied ? content.copied : content.email}</button>
          <small>Alt + K</small>
        </div>
      )}
      {developerMode && (
        <div className="developer-easter-egg" role="status">
          <button type="button" aria-label="Fechar" onClick={() => setDeveloperMode(false)}>×</button>
          <span>DEV MODE // 5 cliques confirmados</span>
          <strong>Um bug escapou para o laboratório.</strong>
          <Link href={`/${locale}/game/world`}>{content.game}<IconGlyph name="arrow-right" className="size-4" /></Link>
        </div>
      )}
      {copied && (
        <div className="copy-character-reaction" role="status">
          <Image src="/reference/charlles-contact-avatar.webp" alt="" width={52} height={52} />
          <span>{content.copied}</span>
        </div>
      )}
    </>
  );
}
