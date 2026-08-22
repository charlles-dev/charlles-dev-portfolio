"use client";

import { useCallback, useState } from "react";
import type { GameSnapshot } from "@/game/core/game-state";
import type { InputManager } from "@/game/input/input-manager";
import { GameCanvas } from "./game-canvas";
import { GameUi } from "./game-ui";

const initialSnapshot: GameSnapshot = {
  objective: "Carregando o protocolo Lumen…",
  energy: 100,
  maxEnergy: 100,
  nodesRestored: 0,
  nodesTotal: 3,
  message: "Inicializando estação Orbe-9…",
  dialogue: null,
  threatState: "patrol",
  completed: false,
  paused: false,
  activeTool: "Lente",
};

export function GameShell() {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(initialSnapshot);
  const [input, setInput] = useState<InputManager | null>(null);
  const onSnapshot = useCallback((nextSnapshot: GameSnapshot) => setSnapshot(nextSnapshot), []);
  const onInputReady = useCallback((nextInput: InputManager | null) => setInput(nextInput), []);
  const onError = useCallback((message: string) => {
    setSnapshot((current) => ({
      ...current,
      objective: "Inicialização interrompida",
      message: `WebGL não iniciou: ${message}`,
    }));
  }, []);

  return (
    <main className="game-shell" id="conteudo">
      <GameCanvas onSnapshot={onSnapshot} onInputReady={onInputReady} onError={onError} />
      <GameUi snapshot={snapshot} input={input} />
    </main>
  );
}
