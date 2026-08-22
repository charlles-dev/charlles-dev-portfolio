import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EngineeringPage } from "@/components/engineering-page";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/lib/i18n";

const siteUrl = "https://www.charlles.dev";
type EngineeringRouteProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: EngineeringRouteProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const canonicalUrl = `${siteUrl}${localePath(rawLocale)}/engineering`;
  const alternateLocales = {
    "pt-BR": `${siteUrl}/pt-BR/engineering`,
    en: `${siteUrl}/en/engineering`,
    es: `${siteUrl}/es/engineering`,
  };

  return {
    title: `${dictionary.engineering.title} | Charlles.dev`,
    description: dictionary.engineering.description,
    keywords: [...dictionary.meta.keywords, "engineering notes", "engenharia de software", "technical portfolio"],
    alternates: {
      canonical: canonicalUrl,
      languages: { ...alternateLocales, "x-default": `${siteUrl}/pt-BR/engineering` },
    },
    openGraph: {
      title: `${dictionary.engineering.title} | Charlles.dev`,
      description: dictionary.engineering.description,
      url: canonicalUrl,
      siteName: "Charlles.dev",
      locale: rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES",
      alternateLocale: ["pt_BR", "en_US", "es_ES"].filter((value) => value !== (rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES")),
      type: "article",
      images: [{ url: "/reference/charlles-og-image.png", width: 1200, height: 630, type: "image/png", alt: dictionary.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dictionary.engineering.title} | Charlles.dev`,
      description: dictionary.engineering.description,
      images: ["/reference/charlles-og-image.png"],
    },
  };
}

export default async function EngineeringRoute({ params }: EngineeringRouteProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  return <EngineeringPage locale={locale} dictionary={getDictionary(locale)} />;
}
