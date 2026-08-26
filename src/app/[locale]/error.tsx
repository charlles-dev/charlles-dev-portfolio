"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const copy = {
  "pt-BR": {
    eyebrow: "Falha inesperada",
    title: "Esta rota perdeu o fio por um instante.",
    description: "Seu caminho continua seguro. Tente carregar novamente ou volte ao início do portfólio.",
    retry: "Tentar novamente",
    home: "Voltar ao início",
  },
  en: {
    eyebrow: "Unexpected failure",
    title: "This route lost the thread for a moment.",
    description: "Your path is still safe. Try loading it again or return to the portfolio home.",
    retry: "Try again",
    home: "Back to home",
  },
  es: {
    eyebrow: "Fallo inesperado",
    title: "Esta ruta perdió el hilo por un momento.",
    description: "Tu camino sigue seguro. Intenta cargarla de nuevo o vuelve al inicio del portafolio.",
    retry: "Intentar de nuevo",
    home: "Volver al inicio",
  },
} as const;

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const segment = typeof window === "undefined" ? "pt-BR" : window.location.pathname.split("/")[1];
  const locale = segment === "en" || segment === "es" ? segment : "pt-BR";
  const text = copy[locale];

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <main id="conteudo" className="route-error-page">
      <div className="route-error-copy">
        <p className="reference-eyebrow">{text.eyebrow}</p>
        <h1 ref={titleRef} tabIndex={-1}>{text.title}</h1>
        <p>{text.description}</p>
        <div className="route-error-actions">
          <button type="button" className="reference-primary-button" onClick={reset}>{text.retry}</button>
          <a className="reference-secondary-button" href={`/${locale}`}>{text.home}</a>
        </div>
      </div>
      <div className="route-error-visual" aria-hidden="true">
        <Image src="/reference/states/charlles-bug.jpeg" alt="" width={760} height={760} priority />
        <span>500</span>
      </div>
    </main>
  );
}
