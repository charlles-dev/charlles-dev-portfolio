import type { GameSnapshot } from "../core/game-state";
import type { GameLocale } from "../data/game-copy";
import { getNarrative, type SectorId } from "../data/narrative-content";

export interface RouteGate {
  allowed: boolean;
  reason: string;
}

export function routeGate(snapshot: Pick<GameSnapshot, "nodesRestored" | "toolsUnlocked" | "relationship" | "puzzles">, destination: SectorId, locale: GameLocale = "pt-BR"): RouteGate {
  const narrative = getNarrative(locale);
  if (destination === "hub") return { allowed: true, reason: narrative.sectors.hub.title };
  if (destination === "archive") return snapshot.nodesRestored > 0
    ? { allowed: true, reason: narrative.sectors.archive.title }
    : { allowed: false, reason: "A rota exige pelo menos um sinal restaurado." };
  if (destination === "garden") return snapshot.toolsUnlocked.includes("Pulso") && snapshot.puzzles["archive-frequency"].solved
    ? { allowed: true, reason: narrative.sectors.garden.title }
    : { allowed: false, reason: "A rota exige a frequência associada e o Pulso Lumen." };
  return snapshot.toolsUnlocked.includes("Âncora") || (snapshot.puzzles["garden-route"].solved && snapshot.relationship.nix === "recognition")
    ? { allowed: true, reason: narrative.sectors.core.title }
    : { allowed: false, reason: "O Núcleo exige a rota de irrigação e o testemunho de NIX." };
}

export function objectiveFor(snapshot: Pick<GameSnapshot, "nodesRestored" | "toolsUnlocked" | "relationship" | "puzzles">, sector: SectorId, locale: GameLocale = "pt-BR"): string {
  const narrative = getNarrative(locale);
  if (sector === "hub") return snapshot.nodesRestored > 0 ? narrative.sectors.archive.arrival : narrative.sectors.hub.objective;
  if (sector === "archive") return snapshot.puzzles["archive-frequency"].solved ? narrative.sectors.garden.objective : narrative.sectors.archive.objective;
  if (sector === "garden") return snapshot.puzzles["garden-route"].solved && snapshot.relationship.nix === "recognition" ? narrative.sectors.core.objective : narrative.sectors.garden.objective;
  return narrative.sectors.core.objective;
}

export function checkpointFor(sector: SectorId): string {
  return sector === "hub" ? "dock" : sector;
}
