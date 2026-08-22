import type { Metadata } from "next";
import { LocalizedNotFoundPage } from "@/components/localized-not-found-page";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type LocalizedNotFoundProps = { params?: Promise<{ locale?: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedNotFoundProps): Promise<Metadata> {
  const rawLocale = (await params)?.locale;
  const locale = typeof rawLocale === "string" && isLocale(rawLocale) ? rawLocale : "pt-BR";
  const dictionary = getDictionary(locale);
  return {
    title: `${dictionary.notFound.routeLabel} | Charlles.dev`,
    description: dictionary.notFound.description,
    robots: { index: false, follow: true },
  };
}

export default function LocalizedNotFound() {
  return <LocalizedNotFoundPage fallbackLocale="pt-BR" />;
}
