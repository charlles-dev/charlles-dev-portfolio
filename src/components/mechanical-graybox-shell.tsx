"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale } from "@/lib/i18n";

const MechanicalGrayboxCanvas = dynamic(
  () => import("@/components/player-sandbox-canvas").then((module) => module.PlayerSandboxCanvas),
  {
    ssr: false,
    loading: () => <div className="player-sandbox-loading" role="status">Babylon.js / mechanical runtime…</div>,
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
    eyebrow: "Entre Camadas / Elo Sandbox 01",
    title: "Encontre a estrutura. Ligue o que estava separado.",
    description: "A troca de camada agora revela uma ação: aproxime-se dos dois nós, estabilize o Elo e veja a mudança sobreviver ao retorno para a Superfície.",
    gateEyebrow: "fase 1 / primeira conexão",
    gateTitle: "A Estrutura revela os nós. O Elo muda a matéria.",
    gateDescription: "Entre na Estrutura, selecione um nó com E e conecte o segundo. Quando o Elo estabilizar, a barreira permanece aberta nas duas camadas.",
    load: "Testar o Elo",
    rule: "Q troca a camada · E conecta o nó próximo",
    note: "Este ainda não é o puzzle completo: é a prova física da mecânica central.",
  },
  en: {
    back: "Back to the game",
    eyebrow: "Between Layers / Link Sandbox 01",
    title: "Find the structure. Link what was separated.",
    description: "Layer shifting now reveals an action: approach both nodes, stabilize the Link and watch the change survive your return to Surface.",
    gateEyebrow: "phase 1 / first connection",
    gateTitle: "Structure reveals the nodes. The Link changes matter.",
    gateDescription: "Enter Structure, select one node with E and connect the second. Once stabilized, the barrier remains open in both layers.",
    load: "Test the Link",
    rule: "Q shifts layer · E connects the nearby node",
    note: "This is not the full puzzle yet: it is the physical proof of the core mechanic.",
  },
  es: {
    back: "Volver al juego",
    eyebrow: "Entre Capas / Vínculo Sandbox 01",
    title: "Encuentra la estructura. Une lo que estaba separado.",
    description: "El cambio de capa ahora revela una acción: acércate a los dos nodos, estabiliza el Vínculo y observa cómo el cambio persiste al volver a Superficie.",
    gateEyebrow: "fase 1 / primera conexión",
    gateTitle: "Estructura revela los nodos. El Vínculo cambia la materia.",
    gateDescription: "Entra en Estructura, selecciona un nodo con E y conecta el segundo. Al estabilizarse, la barrera permanece abierta en ambas capas.",
    load: "Probar el Vínculo",
    rule: "Q cambia la capa · E conecta el nodo cercano",
    note: "Todavía no es el puzzle completo: es la prueba física de la mecánica central.",
  },
};

export function MechanicalGrayboxShell({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const labels = copy[locale];

  return (
    <main className="player-sandbox-page mechanical-graybox-page" id="conteudo">
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
        <MechanicalGrayboxCanvas locale={locale} mode="mechanical" />
      ) : (
        <section className="player-sandbox-gate" aria-labelledby="mechanical-load-title">
          <div>
            <p className="reference-eyebrow">{labels.gateEyebrow}</p>
            <h2 id="mechanical-load-title">{labels.gateTitle}</h2>
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
