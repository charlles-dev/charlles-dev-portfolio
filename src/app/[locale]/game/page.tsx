import type { Metadata } from "next";
import { GameShell } from "@/components/game/game-shell";
import { normalizeGameLocale } from "@/game/data/game-copy";

const siteUrl = "https://www.charlles.dev";

interface GamePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeGameLocale(rawLocale);
  const titles = {
    "pt-BR": "Núcleo em Órbita — RPG web",
    en: "Núcleo em Órbita — web RPG",
    es: "Núcleo en Órbita — RPG web",
  } as const;
  const descriptions = {
    "pt-BR": "Vertical slice jogável de um RPG narrativo de exploração sci-fi toy criado por Charlles Augusto.",
    en: "A playable vertical slice of a narrative toy sci-fi exploration RPG created by Charlles Augusto.",
    es: "Vertical slice jugable de un RPG narrativo de exploración sci-fi toy creado por Charlles Augusto.",
  } as const;
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}/game`,
      languages: {
        "pt-BR": `${siteUrl}/pt-BR/game`,
        en: `${siteUrl}/en/game`,
        es: `${siteUrl}/es/game`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${siteUrl}/${locale}/game`,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { locale: rawLocale } = await params;
  return <GameShell locale={normalizeGameLocale(rawLocale)} />;
}
