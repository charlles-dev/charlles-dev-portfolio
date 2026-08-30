"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale } from "@/lib/i18n";

const PlayerSandboxCanvas = dynamic(
  () => import("@/components/player-sandbox-canvas").then((module) => module.PlayerSandboxCanvas),
  {
    ssr: false,
    loading: () => <div className="player-sandbox-loading" role="status">Babylon.js / runtime…</div>,
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
  requirements: string;
  note: string;
}> = {
  "pt-BR": {
    back: "Voltar ao protótipo",
    eyebrow: "Entre Camadas / Player Sandbox 01",
    title: "Primeiro o personagem precisa responder. Depois a sala ganha um mundo.",
    description: "Uma prova técnica para corrida, frenagem, giro, salto, queda e câmera. A geometria cinza existe para expor problemas, não para escondê-los.",
    gateEyebrow: "build / fase 0",
    gateTitle: "O menor espaço que comprova o jogo de verdade.",
    gateDescription: "O runtime carrega somente depois da sua ação. Assim, o modelo 3D e a engine não entram no bundle inicial do portfólio.",
    load: "Entrar no sandbox",
    requirements: "GLB rigado · 4,2 MB · 15 clips · Babylon.js",
    note: "Teclado nesta build. Controle e touch entram no próximo marco.",
  },
  en: {
    back: "Back to the prototype",
    eyebrow: "Between Layers / Player Sandbox 01",
    title: "First the character needs to respond. Then the room earns a world.",
    description: "A technical proof for running, braking, turning, jumping, falling and camera behavior. Gray geometry exposes problems instead of hiding them.",
    gateEyebrow: "build / phase 0",
    gateTitle: "The smallest space that proves the game is real.",
    gateDescription: "The runtime loads only after your action, keeping the 3D model and engine out of the portfolio's initial bundle.",
    load: "Enter the sandbox",
    requirements: "Rigged GLB · 4.2 MB · 15 clips · Babylon.js",
    note: "Keyboard in this build. Controller and touch arrive in the next milestone.",
  },
  es: {
    back: "Volver al prototipo",
    eyebrow: "Entre Capas / Player Sandbox 01",
    title: "Primero el personaje debe responder. Después la sala se gana un mundo.",
    description: "Una prueba técnica de carrera, frenado, giro, salto, caída y cámara. La geometría gris expone los problemas en lugar de ocultarlos.",
    gateEyebrow: "build / fase 0",
    gateTitle: "El espacio mínimo que demuestra que el juego es real.",
    gateDescription: "El runtime carga solo después de tu acción, manteniendo el modelo 3D y la engine fuera del bundle inicial del portafolio.",
    load: "Entrar al sandbox",
    requirements: "GLB con rig · 4,2 MB · 15 clips · Babylon.js",
    note: "Teclado en esta build. Control y touch llegan en el próximo hito.",
  },
};

export function PlayerSandboxShell({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const labels = copy[locale];

  return (
    <main className="player-sandbox-page" id="conteudo">
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
        <PlayerSandboxCanvas locale={locale} />
      ) : (
        <section className="player-sandbox-gate" aria-labelledby="sandbox-load-title">
          <div>
            <p className="reference-eyebrow">{labels.gateEyebrow}</p>
            <h2 id="sandbox-load-title">{labels.gateTitle}</h2>
            <p>{labels.gateDescription}</p>
          </div>
          <div className="player-sandbox-gate-action">
            <button className="reference-primary-button" type="button" onClick={() => setLoaded(true)}>
              {labels.load}
              <IconGlyph name="arrow-right" className="size-4" />
            </button>
            <p>{labels.requirements}</p>
            <p>{labels.note}</p>
          </div>
        </section>
      )}
    </main>
  );
}
