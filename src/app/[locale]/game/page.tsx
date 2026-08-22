import type { Metadata } from "next";
import { GameShell } from "@/components/game/game-shell";

export const metadata: Metadata = {
  title: "Núcleo em Órbita — RPG web",
  description: "Vertical slice jogável de um RPG narrativo de exploração sci-fi toy criado por Charlles Augusto.",
  alternates: {
    canonical: "/pt-BR/game",
    languages: {
      "pt-BR": "/pt-BR/game",
      en: "/en/game",
      es: "/es/game",
    },
  },
};

export default function GamePage() {
  return <GameShell />;
}
