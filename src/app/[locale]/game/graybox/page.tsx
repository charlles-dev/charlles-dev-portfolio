import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MechanicalGrayboxShell } from "@/components/mechanical-graybox-shell";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type MechanicalGrayboxPageProps = { params: Promise<{ locale: string }> };

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  "pt-BR": {
    title: "Mechanical Graybox 01 | Charlles.dev",
    description: "Primeira prova da troca entre Superfície e Estrutura em Entre Camadas.",
  },
  en: {
    title: "Mechanical Graybox 01 | Charlles.dev",
    description: "The first Surface and Structure layer-shift proof for Between Layers.",
  },
  es: {
    title: "Mechanical Graybox 01 | Charlles.dev",
    description: "Primera prueba del cambio entre Superficie y Estructura en Entre Capas.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: MechanicalGrayboxPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { ...metadataCopy[locale], robots: { index: false, follow: true } };
}

export default async function MechanicalGrayboxPage({ params }: MechanicalGrayboxPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MechanicalGrayboxShell locale={locale} />;
}
