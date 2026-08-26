import { notFound, permanentRedirect } from "next/navigation";

import { isLocale, localePath, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LegacyProcessRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  permanentRedirect(`${localePath(locale)}#about`);
}
