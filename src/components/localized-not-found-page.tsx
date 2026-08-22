"use client";

import { useSyncExternalStore } from "react";

import { NotFoundPage } from "@/components/not-found-page";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

function readBrowserLocale(fallbackLocale: Locale): Locale {
  const pathLocale = window.location.pathname.split("/")[1];
  if (pathLocale && isLocale(pathLocale)) return pathLocale;

  const cookieLocale = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("NEXT_LOCALE="))
    ?.slice("NEXT_LOCALE=".length);

  return cookieLocale && isLocale(cookieLocale) ? cookieLocale : fallbackLocale;
}

function subscribeToLocale() {
  return () => {};
}

export function LocalizedNotFoundPage({ fallbackLocale }: { fallbackLocale: Locale }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    () => readBrowserLocale(fallbackLocale),
    () => fallbackLocale,
  );

  return <NotFoundPage locale={locale} dictionary={getDictionary(locale)} />;
}
