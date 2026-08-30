import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PlayerSandboxShell } from "@/components/player-sandbox-shell";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type PlayerSandboxPageProps = { params: Promise<{ locale: string }> };

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  "pt-BR": {
    title: "Player Sandbox 01 | Charlles.dev",
    description: "Prova jogável do controlador, câmera e animações de Entre Camadas.",
  },
  en: {
    title: "Player Sandbox 01 | Charlles.dev",
    description: "Playable controller, camera and animation proof for Between Layers.",
  },
  es: {
    title: "Player Sandbox 01 | Charlles.dev",
    description: "Prueba jugable del controlador, la cámara y las animaciones de Entre Capas.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PlayerSandboxPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...metadataCopy[locale],
    robots: { index: false, follow: true },
  };
}

export default async function PlayerSandboxPage({ params }: PlayerSandboxPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PlayerSandboxShell locale={locale} />;
}
