import { NextRequest, NextResponse } from "next/server";

const locales = ["pt-BR", "en", "es"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "pt-BR";

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function preferredLocale(request: NextRequest): Locale {
  const stored = request.cookies.get("NEXT_LOCALE")?.value;
  if (stored && isLocale(stored)) return stored;

  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (accepted.includes("es")) return "es";
  if (accepted.includes("en")) return "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", firstSegment, { maxAge: 60 * 60 * 24 * 365, sameSite: "lax", path: "/" });
    return response;
  }

  const locale = preferredLocale(request);
  const target = request.nextUrl.clone();
  target.pathname = `/${locale === "pt-BR" ? "pt-BR" : locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(target);
  response.cookies.set("NEXT_LOCALE", locale, { maxAge: 60 * 60 * 24 * 365, sameSite: "lax", path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|reference|game/original).*)"],
};
