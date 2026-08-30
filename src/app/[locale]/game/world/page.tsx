import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OriginalGameExperience } from "@/components/original-game-experience";
import { isLocale, locales, type Locale } from "@/lib/i18n";

const siteUrl = "https://www.charlles.dev";
const metadataCopy: Record<Locale, { title: string; description: string }> = {
  "pt-BR": {
    title: "Entre Camadas | Charlles.dev",
    description: "Explore o portfólio de Charlles Augusto como uma casa jogável, com projetos públicos, experimentos web, currículo e um desktop retrô funcional.",
  },
  en: {
    title: "Between Layers | Charlles.dev",
    description: "Explore Charlles Augusto's portfolio as a playable house with public projects, web experiments, a résumé and a functional retro desktop.",
  },
  es: {
    title: "Entre Capas | Charlles.dev",
    description: "Explora el portafolio de Charlles Augusto como una casa jugable con proyectos públicos, experimentos web, currículum y un escritorio retro funcional.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type WorldPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: WorldPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = metadataCopy[locale];
  const canonical = `${siteUrl}/${locale}/game/world`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: Object.fromEntries(locales.map((language) => [language, `${siteUrl}/${language}/game/world`])),
    },
    openGraph: { title: copy.title, description: copy.description, url: canonical, siteName: "Charlles.dev", type: "website", images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [`/${locale}/opengraph-image`] },
  };
}

export default async function WorldPage({ params }: WorldPageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return <OriginalGameExperience locale={rawLocale as Locale} />;
}
