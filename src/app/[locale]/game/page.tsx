import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ByteboundGame } from "@/components/bytebound-game";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getProfessionalContent } from "@/lib/professional-content";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

type GamePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const game = getProfessionalContent(locale).game;
  return { title: `${game.title} | Charlles.dev`, description: game.description, robots: { index: false, follow: true } };
}

export default async function GamePage({ params }: GamePageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return <ByteboundGame locale={rawLocale as Locale} />;
}
