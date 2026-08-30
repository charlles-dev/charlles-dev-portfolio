import { notFound } from "next/navigation";

import { WorldGame } from "@/components/world-game";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WorldPrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WorldGame locale={locale as Locale} />;
}
