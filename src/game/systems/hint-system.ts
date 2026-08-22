import type { GameLocale } from "../data/game-copy";
import type { PuzzleId } from "./puzzle-system";

export type HintLevel = 0 | 1 | 2 | 3;

const hints: Record<GameLocale, Record<PuzzleId, [string, string, string]>> = {
  "pt-BR": {
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
  },
  en: {
    "archive-frequency": [
      "Watch violet before mint; the first memory is still out of reach.",
      "The violet signal opens the sequence. Mint confirms the association.",
      "The order is violet, mint, amber.",
    ],
    "garden-route": [
      "The irrigation repeats one pulse before changing color.",
      "The first two signals are mint; violet and amber follow.",
      "The order is mint, mint, violet, amber.",
    ],
  },
  es: {
    "archive-frequency": [
      "Observa el violeta antes del mint; el primer recuerdo aún está lejos.",
      "La señal violeta abre la secuencia. El mint confirma la asociación.",
      "El orden es violeta, mint, ámbar.",
    ],
    "garden-route": [
      "El riego repite un pulso antes de cambiar de color.",
      "Las dos primeras señales son mint; después vienen violeta y ámbar.",
      "El orden es mint, mint, violeta, ámbar.",
    ],
  },
};

export function hintFor(id: PuzzleId, attempts: number, locale: GameLocale = "pt-BR"): { level: HintLevel; text: string | null } {
  if (attempts < 2) return { level: 0, text: null };
  const level = Math.min(3, Math.floor((attempts - 2) / 2) + 1) as HintLevel;
  return { level, text: hints[locale][id][level - 1] };
}
