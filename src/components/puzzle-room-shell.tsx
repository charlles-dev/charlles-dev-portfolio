"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale } from "@/lib/i18n";

const PuzzleRoomCanvas = dynamic(
  () => import("@/components/player-sandbox-canvas").then((module) => module.PlayerSandboxCanvas),
  {
    ssr: false,
    loading: () => <div className="player-sandbox-loading" role="status">Babylon.js / puzzle runtime…</div>,
  },
);

const copy: Record<Locale, {
  back: string;
  eyebrow: string;
  title: string;
  description: string;
  gateEyebrow: string;
  gateTitle: string;
  gateDescription: string;
  load: string;
  rule: string;
  note: string;
}> = {
  "pt-BR": {
    back: "Voltar ao jogo",
    eyebrow: "Entre Camadas / Puzzle Room 01",
    title: "A saída existe nas duas camadas. O caminho, não.",
    description: "A primeira sala reúne movimento, troca de camada e Elo em uma sequência curta que precisa ser entendida jogando.",
    gateEyebrow: "fase 1 / primeira sala",
    gateTitle: "Feche o circuito e atravesse pela Superfície.",
    gateDescription: "Um nó está antes da barreira e o outro depois dela. A Estrutura permite atravessar; o Elo faz a passagem continuar aberta quando você volta.",
    load: "Entrar na sala",
    rule: "Q troca a camada · E conecta · alcance a moldura verde",
    note: "Sem tutorial longo: o objetivo muda conforme o estado real da sala.",
  },
  en: {
    back: "Back to the game",
    eyebrow: "Between Layers / Puzzle Room 01",
    title: "The exit exists in both layers. The path does not.",
    description: "The first room combines movement, layer shifting and the Link in a short sequence meant to be understood through play.",
    gateEyebrow: "phase 1 / first room",
    gateTitle: "Close the circuit and cross through Surface.",
    gateDescription: "One node sits before the barrier and the other beyond it. Structure lets you cross; the Link keeps the passage open when you return.",
    load: "Enter the room",
    rule: "Q shifts layer · E connects · reach the green frame",
    note: "No long tutorial: the objective follows the room's actual state.",
  },
  es: {
    back: "Volver al juego",
    eyebrow: "Entre Capas / Puzzle Room 01",
    title: "La salida existe en ambas capas. El camino no.",
    description: "La primera sala combina movimiento, cambio de capa y Vínculo en una secuencia corta que se entiende jugando.",
    gateEyebrow: "fase 1 / primera sala",
    gateTitle: "Cierra el circuito y cruza por Superficie.",
    gateDescription: "Un nodo está antes de la barrera y el otro después. Estructura permite cruzar; el Vínculo mantiene el paso abierto al volver.",
    load: "Entrar en la sala",
    rule: "Q cambia la capa · E conecta · alcanza el marco verde",
    note: "Sin tutorial largo: el objetivo sigue el estado real de la sala.",
  },
};

export function PuzzleRoomShell({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const labels = copy[locale];

  return (
    <main className="player-sandbox-page puzzle-room-page" id="conteudo">
      <header className="player-sandbox-header">
        <Link href={`/${locale}/game`}>
          <IconGlyph name="arrow-right" className="size-4 case-back-icon" />
          {labels.back}
        </Link>
        <p className="reference-eyebrow">{labels.eyebrow}</p>
        <h1>{labels.title}</h1>
        <p>{labels.description}</p>
      </header>

      {loaded ? (
        <PuzzleRoomCanvas locale={locale} mode="puzzle" />
      ) : (
        <section className="player-sandbox-gate" aria-labelledby="puzzle-load-title">
          <div>
            <p className="reference-eyebrow">{labels.gateEyebrow}</p>
            <h2 id="puzzle-load-title">{labels.gateTitle}</h2>
            <p>{labels.gateDescription}</p>
          </div>
          <div className="player-sandbox-gate-action">
            <button className="reference-primary-button" type="button" onClick={() => setLoaded(true)}>
              {labels.load}
              <IconGlyph name="arrow-right" className="size-4" />
            </button>
            <p>{labels.rule}</p>
            <p>{labels.note}</p>
          </div>
        </section>
      )}
    </main>
  );
}
