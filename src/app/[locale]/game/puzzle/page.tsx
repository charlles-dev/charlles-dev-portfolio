import { notFound, redirect } from "next/navigation";

import { isLocale, locales } from "@/lib/i18n";

type PuzzleRoomPageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PuzzleRoomPage({ params }: PuzzleRoomPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}/game/world`);
}
