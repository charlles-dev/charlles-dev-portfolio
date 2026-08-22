import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NowPage } from "@/components/now-page";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/lib/i18n";

const siteUrl = "https://www.charlles.dev";
type NowRouteProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: NowRouteProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const canonicalUrl = `${siteUrl}${localePath(rawLocale)}/now`;
  const alternateLocales = {
    "pt-BR": `${siteUrl}/pt-BR/now`,
    en: `${siteUrl}/en/now`,
    es: `${siteUrl}/es/now`,
  };

  return {
    title: `${dictionary.now.routeLabel} | Charlles.dev`,
    description: dictionary.now.description,
    keywords: [...dictionary.meta.keywords, "now page", "current focus", "engenharia de software"],
    alternates: {
      canonical: canonicalUrl,
      languages: { ...alternateLocales, "x-default": `${siteUrl}/pt-BR/now` },
    },
    openGraph: {
      title: `${dictionary.now.routeLabel} | Charlles.dev`,
      description: dictionary.now.description,
      url: canonicalUrl,
      siteName: "Charlles.dev",
      locale: rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES",
      alternateLocale: ["pt_BR", "en_US", "es_ES"].filter((value) => value !== (rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES")),
      type: "website",
      images: [{ url: "/reference/charlles-og-image.png", width: 1200, height: 630, type: "image/png", alt: dictionary.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dictionary.now.routeLabel} | Charlles.dev`,
      description: dictionary.now.description,
      images: ["/reference/charlles-og-image.png"],
    },
  };
}

export default async function NowRoute({ params }: NowRouteProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  return <NowPage locale={locale} dictionary={getDictionary(locale)} />;
}
