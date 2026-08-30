import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CharacterLabShell } from "@/components/character-lab-shell";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type CharacterLabPageProps = { params: Promise<{ locale: string }> };

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  "pt-BR": {
    title: "Character Lab | Charlles.dev",
    description: "Laboratório técnico do personagem 3D de Entre Camadas.",
  },
  en: {
    title: "Character Lab | Charlles.dev",
    description: "Technical lab for the 3D character from Between Layers.",
  },
  es: {
    title: "Character Lab | Charlles.dev",
    description: "Laboratorio técnico del personaje 3D de Entre Capas.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: CharacterLabPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...metadataCopy[locale],
    robots: { index: false, follow: true },
  };
}

export default async function CharacterLabPage({ params }: CharacterLabPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CharacterLabShell locale={locale} />;
}
