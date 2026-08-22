import type { GameSnapshot } from "../core/game-state";
import type { EndingId, NarrativeContent } from "../data/narrative-content";

export interface EndingResult {
  allowed: boolean;
  reason: string;
  ending: EndingId | null;
  title: string;
  objective: string;
  message: string;
  fragmentsFound: string[];
}

export function resolveEnding(snapshot: Pick<GameSnapshot, "nodesRestored" | "fragmentsFound" | "relationship" | "puzzles">, ending: EndingId, narrative: NarrativeContent): EndingResult {
  const ready = snapshot.nodesRestored >= 3 && snapshot.puzzles["archive-frequency"].solved && snapshot.puzzles["garden-route"].solved && snapshot.relationship.nix === "recognition";
  if (!ready) {
    return {
      allowed: false,
      reason: "O Núcleo não aceita uma configuração sem as três testemunhas e as duas sequências estabilizadas.",
      ending: null,
      title: "",
      objective: "",
      message: "",
      fragmentsFound: [...snapshot.fragmentsFound],
    };
  }
  const definition = narrative.endings[ending];
  return {
    allowed: true,
    reason: "Configuração aceita.",
    ending,
    title: definition.title,
    objective: `Registro concluído: ${definition.title}`,
    message: definition.visualChange,
    fragmentsFound: [...new Set([...snapshot.fragmentsFound, "choice"])],
  };
}
