import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PuzzleRoomShell } from "@/components/puzzle-room-shell";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type PuzzleRoomPageProps = { params: Promise<{ locale: string }> };

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  "pt-BR": {
    title: "Puzzle Room 01 | Entre Camadas",
    description: "Primeira sala jogável combinando movimento, troca de camada e Elo.",
  },
  en: {
    title: "Puzzle Room 01 | Between Layers",
    description: "The first playable room combining movement, layer shifting and the Link.",
  },
  es: {
    title: "Puzzle Room 01 | Entre Capas",
    description: "La primera sala jugable que combina movimiento, cambio de capa y Vínculo.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PuzzleRoomPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { ...metadataCopy[locale], robots: { index: false, follow: true } };
}

export default async function PuzzleRoomPage({ params }: PuzzleRoomPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PuzzleRoomShell locale={locale} />;
}
