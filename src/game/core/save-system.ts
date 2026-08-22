import type { GameSnapshot } from "./game-state";

const SAVE_KEY = "charlles-orbe9-save-v1";

export interface SavePayload {
  version: 1;
  savedAt: string;
  snapshot: Pick<GameSnapshot, "energy" | "nodesRestored" | "fragmentsFound" | "relationship" | "toolsUnlocked" | "checkpoint" | "sector" | "ending" | "completed">;
}

export interface SaveStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

function isSavePayload(value: unknown): value is SavePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<SavePayload>;
  return payload.version === 1 && typeof payload.savedAt === "string" && typeof payload.snapshot === "object" && payload.snapshot !== null;
}

export class SaveSystem {
  constructor(private readonly storage: SaveStorage | null = typeof window === "undefined" ? null : window.localStorage) {}

  hasSave(): boolean {
    return Boolean(this.read());
  }

  save(snapshot: GameSnapshot): SavePayload | null {
    if (!this.storage) return null;
    const payload: SavePayload = {
      version: 1,
      savedAt: new Date().toISOString(),
      snapshot: {
        energy: snapshot.energy,
        nodesRestored: snapshot.nodesRestored,
        fragmentsFound: [...snapshot.fragmentsFound],
        relationship: { ...snapshot.relationship },
        toolsUnlocked: [...snapshot.toolsUnlocked],
        checkpoint: snapshot.checkpoint,
        sector: snapshot.sector,
        ending: snapshot.ending,
        completed: snapshot.completed,
      },
    };
    try {
      this.storage.setItem(SAVE_KEY, JSON.stringify(payload));
      return payload;
    } catch {
      return null;
    }
  }

  read(): SavePayload | null {
    if (!this.storage) return null;
    try {
      const raw = this.storage.getItem(SAVE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isSavePayload(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    try {
      this.storage?.removeItem(SAVE_KEY);
    } catch {
      // Private browsing and quota errors should not break the game.
    }
  }
}

export { SAVE_KEY };
