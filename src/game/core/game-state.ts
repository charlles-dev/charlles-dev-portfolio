import type { EndingId, RelationshipState, SectorId } from "../data/narrative-content";
import { createPuzzleProgress, type PuzzleId, type PuzzleProgress } from "../systems/puzzle-system";

export type ThreatState = "patrol" | "suspicious" | "alert" | "disabled";

export interface RelationshipFlags {
  mira: RelationshipState;
  ponto: "unknown" | "listening" | "association" | "recognition";
  nix: RelationshipState;
}

export interface DialogueState {
  speaker: string;
  text: string;
}

export interface GameSnapshot {
  objective: string;
  energy: number;
  maxEnergy: number;
  nodesRestored: number;
  nodesTotal: number;
  message: string;
  dialogue: DialogueState | null;
  threatState: ThreatState;
  completed: boolean;
  paused: boolean;
  activeTool: "Lente" | "Pulso" | "Âncora";
  sector: SectorId;
  sectorTitle: string;
  fragmentsFound: string[];
  relationship: RelationshipFlags;
  toolsUnlocked: Array<"Lente" | "Pulso" | "Âncora">;
  checkpoint: string;
  ending: EndingId | null;
  lastInteraction: string | null;
  puzzles: Record<PuzzleId, PuzzleProgress>;
}

export type GameListener = (snapshot: GameSnapshot) => void;

const initialSnapshot: GameSnapshot = {
  objective: "Reative os três nós de sinal",
  energy: 100,
  maxEnergy: 100,
  nodesRestored: 0,
  nodesTotal: 3,
  message: "A doca reconheceu uma assinatura Lumen.",
  dialogue: null,
  threatState: "patrol",
  completed: false,
  paused: false,
  activeTool: "Lente",
  sector: "hub",
  sectorTitle: "Doca / Hub",
  fragmentsFound: [],
  relationship: { mira: "protocol", ponto: "unknown", nix: "protocol" },
  toolsUnlocked: ["Lente"],
  checkpoint: "dock",
  ending: null,
  lastInteraction: null,
  puzzles: {
    "archive-frequency": { id: "archive-frequency", step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" },
    "garden-route": { id: "garden-route", step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" },
  },
};

export class GameStateStore {
  private snapshot: GameSnapshot = { ...initialSnapshot };
  private readonly listeners = new Set<GameListener>();

  getSnapshot(): GameSnapshot {
    return this.snapshot;
  }

  subscribe(listener: GameListener): () => void {
    this.listeners.add(listener);
    listener(this.snapshot);
    return () => this.listeners.delete(listener);
  }

  patch(partial: Partial<GameSnapshot>): void {
    this.snapshot = { ...this.snapshot, ...partial };
    for (const listener of this.listeners) listener(this.snapshot);
  }

  restoreProgress(progress: Pick<GameSnapshot, "energy" | "nodesRestored" | "fragmentsFound" | "relationship" | "toolsUnlocked" | "checkpoint" | "sector" | "ending" | "completed" | "puzzles">): void {
    const puzzles = progress.puzzles ?? {
      "archive-frequency": createPuzzleProgress("archive-frequency"),
      "garden-route": createPuzzleProgress("garden-route"),
    };
    this.snapshot = {
      ...this.snapshot,
      ...progress,
      fragmentsFound: [...progress.fragmentsFound],
      relationship: { ...progress.relationship },
      toolsUnlocked: [...progress.toolsUnlocked],
      puzzles: {
        "archive-frequency": { ...puzzles["archive-frequency"] },
        "garden-route": { ...puzzles["garden-route"] },
      },
      paused: false,
      dialogue: null,
      threatState: "patrol",
      message: "Progresso restaurado. A estação aguardava o seu retorno.",
      lastInteraction: "Checkpoint restaurado",
    };
    for (const listener of this.listeners) listener(this.snapshot);
  }

  reset(): void {
    this.snapshot = { ...initialSnapshot };
    for (const listener of this.listeners) listener(this.snapshot);
  }
}
