import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProcessPage } from "@/components/process-page";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/lib/i18n";

const siteUrl = "https://www.charlles.dev";
type ProcessRouteProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ProcessRouteProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const canonicalUrl = `${siteUrl}${localePath(rawLocale)}/process`;
  const alternateLocales = {
    "pt-BR": `${siteUrl}/pt-BR/process`,
    en: `${siteUrl}/en/process`,
    es: `${siteUrl}/es/process`,
  };

  return {
    title: `${dictionary.process.routeLabel} | Charlles.dev`,
    description: dictionary.process.description,
    keywords: [...dictionary.meta.keywords, "development process", "software process", "método de trabalho"],
    alternates: {
      canonical: canonicalUrl,
      languages: { ...alternateLocales, "x-default": `${siteUrl}/pt-BR/process` },
    },
    openGraph: {
      title: `${dictionary.process.routeLabel} | Charlles.dev`,
      description: dictionary.process.description,
      url: canonicalUrl,
      siteName: "Charlles.dev",
      locale: rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES",
      alternateLocale: ["pt_BR", "en_US", "es_ES"].filter((value) => value !== (rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES")),
      type: "article",
      images: [{ url: "/reference/charlles-og-image.png", width: 1200, height: 630, type: "image/png", alt: dictionary.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dictionary.process.routeLabel} | Charlles.dev`,
      description: dictionary.process.description,
      images: ["/reference/charlles-og-image.png"],
    },
  };
}

export default async function ProcessRoute({ params }: ProcessRouteProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  return <ProcessPage locale={locale} dictionary={getDictionary(locale)} />;
}
