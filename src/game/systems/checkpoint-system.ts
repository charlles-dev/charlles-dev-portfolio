import type { GameSnapshot } from "../core/game-state";
import type { SectorId } from "../data/narrative-content";

export interface CheckpointAnchor {
  id: string;
  sector: SectorId;
  energy: number;
}

export function createCheckpoint(snapshot: Pick<GameSnapshot, "checkpoint" | "sector" | "energy">): CheckpointAnchor {
  return { id: snapshot.checkpoint, sector: snapshot.sector, energy: snapshot.energy };
}

export function restoreCheckpoint(snapshot: GameSnapshot, anchor: CheckpointAnchor): GameSnapshot {
  return {
    ...snapshot,
    energy: Math.max(1, Math.min(snapshot.maxEnergy, anchor.energy)),
    sector: anchor.sector,
    checkpoint: anchor.id,
    dialogue: null,
    paused: false,
    threatState: "patrol",
    lastInteraction: `Checkpoint restored: ${anchor.id}`,
  };
}
