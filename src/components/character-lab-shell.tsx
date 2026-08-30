"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale } from "@/lib/i18n";

const CharacterLabCanvas = dynamic(
  () => import("@/components/character-lab-canvas").then((module) => module.CharacterLabCanvas),
  {
    ssr: false,
    loading: () => <div className="character-lab-loading" role="status">3D runtime…</div>,
  },
);

const copy: Record<Locale, {
  back: string;
  eyebrow: string;
  title: string;
  description: string;
  load: string;
  size: string;
  note: string;
  result: string;
}> = {
  "pt-BR": {
    back: "Voltar ao jogo",
    eyebrow: "Entre Camadas / Character Lab 01",
    title: "Antes de animar, o personagem precisa sobreviver ao navegador.",
    description: "Esta cena compara a malha estática com a versão rigada para web: 60 mil triângulos, 70 ossos de deformação e 15 animações selecionáveis.",
    load: "Carregar personagem 3D",
    size: "Maior download disponível: 5,3 MB · rig animado: 4,2 MB",
    note: "Arraste para orbitar · use a roda ou pinça para aproximar",
    result: "91,1% menor que a fonte de alta resolução.",
  },
  en: {
    back: "Back to the game",
    eyebrow: "Between Layers / Character Lab 01",
    title: "Before animation, the character needs to survive the browser.",
    description: "This scene compares the static mesh with the web-ready rig: 60k triangles, 70 deformation bones and 15 selectable animations.",
    load: "Load 3D character",
    size: "Largest available download: 5.3 MB · animated rig: 4.2 MB",
    note: "Drag to orbit · use the wheel or pinch to zoom",
    result: "91.1% smaller than the high-resolution source.",
  },
  es: {
    back: "Volver al juego",
    eyebrow: "Entre Capas / Character Lab 01",
    title: "Antes de animarlo, el personaje debe sobrevivir al navegador.",
    description: "Esta escena compara la malla estática con el rig para web: 60 mil triángulos, 70 huesos de deformación y 15 animaciones seleccionables.",
    load: "Cargar personaje 3D",
    size: "Mayor descarga disponible: 5,3 MB · rig animado: 4,2 MB",
    note: "Arrastra para orbitar · usa la rueda o pellizca para acercar",
    result: "91,1% menor que la fuente de alta resolución.",
  },
};

export function CharacterLabShell({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const labels = copy[locale];

  return (
    <main className="character-lab-page" id="conteudo">
      <header className="character-lab-header">
        <Link href={`/${locale}/game`}>
          <IconGlyph name="arrow-right" className="size-4 case-back-icon" />
          {labels.back}
        </Link>
        <p className="reference-eyebrow">{labels.eyebrow}</p>
        <h1>{labels.title}</h1>
        <p>{labels.description}</p>
      </header>

      {loaded ? (
        <CharacterLabCanvas locale={locale} />
      ) : (
        <section className="character-lab-gate" aria-labelledby="lab-load-title">
          <div>
            <p className="reference-eyebrow">GLB / runtime preview</p>
            <h2 id="lab-load-title">{labels.result}</h2>
          </div>
          <div className="character-lab-gate-action">
            <button className="reference-primary-button" type="button" onClick={() => setLoaded(true)}>
              {labels.load}
              <IconGlyph name="arrow-right" className="size-4" />
            </button>
            <p>{labels.size}</p>
            <p>{labels.note}</p>
          </div>
        </section>
      )}
    </main>
  );
}
