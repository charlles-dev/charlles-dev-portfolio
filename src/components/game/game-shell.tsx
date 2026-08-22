"use client";

import { useCallback, useState } from "react";
import type { GameSnapshot } from "@/game/core/game-state";
import type { InputManager } from "@/game/input/input-manager";
import { gameUiCopy, type GameLocale } from "@/game/data/game-copy";
import { GameCanvas } from "./game-canvas";
import { GameUi } from "./game-ui";

interface GameShellProps {
  locale: GameLocale;
}

function createInitialSnapshot(locale: GameLocale): GameSnapshot {
  const copy = gameUiCopy[locale];
  return {
    objective: locale === "en" ? "Discover why Orbe-9 recognized the Lumen." : locale === "es" ? "Descubre por qué Orbe-9 reconoció el Lumen." : "Descubra por que a Orbe-9 reconheceu a Lumen.",
    energy: 100,
    maxEnergy: 100,
    nodesRestored: 0,
    nodesTotal: 3,
    message: locale === "en" ? "Initializing Orbe-9 station…" : locale === "es" ? "Inicializando la estación Orbe-9…" : "Inicializando estação Orbe-9…",
    dialogue: null,
    threatState: "patrol",
    completed: false,
    paused: false,
    activeTool: "Lente",
    sector: "hub",
    sectorTitle: locale === "en" ? "Dock / Hub" : locale === "es" ? "Muelle / Hub" : "Doca / Hub",
    fragmentsFound: [],
    relationship: { mira: "protocol", ponto: "unknown", nix: "protocol" },
    toolsUnlocked: ["Lente"],
    checkpoint: "dock",
    ending: null,
    lastInteraction: copy.lumen,
    puzzles: {
      "archive-frequency": { id: "archive-frequency", step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" },
      "garden-route": { id: "garden-route", step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" },
    },
  };
}

export function GameShell({ locale }: GameShellProps) {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() => createInitialSnapshot(locale));
  const [input, setInput] = useState<InputManager | null>(null);
  const onSnapshot = useCallback((nextSnapshot: GameSnapshot) => setSnapshot(nextSnapshot), []);
  const onInputReady = useCallback((nextInput: InputManager | null) => setInput(nextInput), []);
  const onError = useCallback((message: string) => {
    setSnapshot((current) => ({
      ...current,
      objective: locale === "en" ? "Initialization interrupted" : locale === "es" ? "Inicialización interrumpida" : "Inicialização interrompida",
      message: `${locale === "en" ? "WebGL could not start" : locale === "es" ? "WebGL no se inició" : "WebGL não iniciou"}: ${message}`,
    }));
  }, [locale]);

  return (
    <main className="game-shell" id="conteudo">
      <GameCanvas locale={locale} onSnapshot={onSnapshot} onInputReady={onInputReady} onError={onError} />
      <GameUi locale={locale} snapshot={snapshot} input={input} />
    </main>
  );
}
