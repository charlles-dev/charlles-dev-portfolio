import { notFound, redirect } from "next/navigation";

import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

type GamePageProps = { params: Promise<{ locale: string }> };

export default async function GamePage({ params }: GamePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}/game/world`);
}
