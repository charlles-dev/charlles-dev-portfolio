import type { PuzzleId } from "./puzzle-system";

export type HintLevel = 0 | 1 | 2 | 3;

const hints: Record<PuzzleId, [string, string, string]> = {
  "archive-frequency": [
    "Observe o violeta antes do mint; a primeira memória ainda está distante.",
    "O sinal violeta abre a sequência. O mint confirma a associação.",
    "A ordem é violeta, mint, âmbar.",
  ],
  "garden-route": [
    "A irrigação repete um pulso antes de mudar de cor.",
    "Os dois primeiros sinais são mint; depois vêm violeta e âmbar.",
    "A ordem é mint, mint, violeta, âmbar.",
  ],
};

export function hintFor(id: PuzzleId, attempts: number): { level: HintLevel; text: string | null } {
  if (attempts < 2) return { level: 0, text: null };
  const level = Math.min(3, Math.floor((attempts - 2) / 2) + 1) as HintLevel;
  return { level, text: hints[id][level - 1] };
}
