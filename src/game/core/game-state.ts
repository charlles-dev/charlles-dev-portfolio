export type ThreatState = "patrol" | "alert" | "disabled";

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

  reset(): void {
    this.snapshot = { ...initialSnapshot };
    for (const listener of this.listeners) listener(this.snapshot);
  }
}
