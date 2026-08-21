import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioHome } from "@/components/portfolio-home";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const canonicalPath = rawLocale === "pt-BR" ? "/" : `/${rawLocale}`;

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "pt-BR": "/",
        en: "/en",
        es: "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: canonicalPath,
      siteName: "Charlles.dev",
      locale: rawLocale === "pt-BR" ? "pt_BR" : rawLocale,
      type: "profile",
      images: [{ url: "/reference/charlles-hero-poster.webp", width: 1280, height: 720, alt: dictionary.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: ["/reference/charlles-hero-poster.webp"],
    },
  };
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dictionary = getDictionary(locale);
  const sameAs = socialLinks.filter((link) => link.kind !== "email").map((link) => link.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: dictionary.meta.title,
    url: `https://charlles.dev${localePath(locale)}`,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      url: "https://charlles.dev",
      image: "https://charlles.dev/reference/charlles-hero-poster.webp",
      jobTitle: dictionary.hero.role,
      description: dictionary.meta.description,
      address: { "@type": "PostalAddress", addressLocality: "Campina Grande", addressCountry: "BR" },
      sameAs,
      knowsAbout: ["Web development", "TypeScript", "Next.js", "Automation", "Applied security"],
    },
  };

  return (
    <div id="conteudo">
      <PortfolioHome locale={locale} dictionary={dictionary} initialPayload={fallbackProjectsPayload} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
