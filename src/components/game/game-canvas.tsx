"use client";

import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import type { GameSnapshot } from "@/game/core/game-state";
import type { InputManager } from "@/game/input/input-manager";
import { createGameScene, type GameHandle } from "@/game/scene";

interface GameCanvasProps {
  onSnapshot: (snapshot: GameSnapshot) => void;
  onInputReady: (input: InputManager | null) => void;
  onError: (message: string) => void;
}

export function GameCanvas({ onSnapshot, onInputReady, onError }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || engineRef.current) return;

    let engine: Engine;
    try {
      engine = new Engine(canvas, true, { stencil: true, preserveDrawingBuffer: false, adaptToDeviceRatio: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "O navegador não conseguiu criar um contexto WebGL.";
      onError(message);
      return;
    }
    engineRef.current = engine;
    let disposed = false;
    let handle: GameHandle | null = null;
    let unsubscribe: (() => void) | null = null;

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    resize();

    void createGameScene(engine, canvas)
      .then((createdHandle) => {
        if (disposed) {
          createdHandle.dispose();
          return;
        }
        handle = createdHandle;
        unsubscribe = handle.store.subscribe(onSnapshot);
        onInputReady(handle.input);
        engine.runRenderLoop(() => handle?.scene.render());
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Falha desconhecida ao inicializar o Babylon.";
        console.error("[game] Babylon initialization failed", error);
        onError(message);
      });

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      unsubscribe?.();
      onInputReady(null);
      engine.stopRenderLoop();
      handle?.dispose();
      engine.dispose();
      engineRef.current = null;
    };
  }, [onError, onInputReady, onSnapshot]);

  return <canvas ref={canvasRef} className="game-canvas" aria-label="Cena jogável de Núcleo em Órbita" />;
}
