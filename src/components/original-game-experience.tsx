"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";

import styles from "./original-game-experience.module.css";

const labels: Record<Locale, { title: string; back: string; loading: string }> = {
  "pt-BR": { title: "Casa interativa de Charlles.dev", back: "Voltar ao portfólio", loading: "Inicializando o mundo…" },
  en: { title: "Charlles.dev interactive house", back: "Back to portfolio", loading: "Starting the world…" },
  es: { title: "Casa interactiva de Charlles.dev", back: "Volver al portafolio", loading: "Iniciando el mundo…" },
};

export function OriginalGameExperience({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const copy = labels[locale];

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const focusFrame = () => frame.contentWindow?.focus();
    const revealTimer = window.setTimeout(() => setLoaded(true), 700);
    window.addEventListener("focus", focusFrame);
    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener("focus", focusFrame);
    };
  }, []);

  return (
    <main className={styles.page} id="conteudo">
      {!loaded && <div className={styles.loading} role="status"><span />{copy.loading}</div>}
      <iframe
        ref={frameRef}
        className={styles.frame}
        src={`/game/original/index.html?lang=${encodeURIComponent(locale)}`}
        title={copy.title}
        allow="autoplay; fullscreen; gamepad"
        onLoad={() => { setLoaded(true); frameRef.current?.contentWindow?.focus(); }}
      />
      <Link className={styles.escape} href={`/${locale}`} aria-label={copy.back} title={copy.back}>←</Link>
    </main>
  );
}
