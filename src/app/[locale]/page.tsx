import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioHome } from "@/components/portfolio-home";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

const siteUrl = "https://www.charlles.dev";
const ogImagePath = "/reference/charlles-og-image.png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const canonicalPath = localePath(rawLocale);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const alternateLocales = { "pt-BR": `${siteUrl}/pt-BR`, en: `${siteUrl}/en`, es: `${siteUrl}/es` };

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: { ...alternateLocales, "x-default": `${siteUrl}/pt-BR` },
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: canonicalUrl,
      siteName: "Charlles.dev",
      locale: rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES",
      alternateLocale: ["pt_BR", "en_US", "es_ES"].filter((value) => value !== (rawLocale === "pt-BR" ? "pt_BR" : rawLocale === "en" ? "en_US" : "es_ES")),
      type: "website",
      images: [{ url: ogImagePath, width: 1200, height: 630, type: "image/png", alt: dictionary.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [ogImagePath],
    },
  };
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dictionary = getDictionary(locale);
  const canonicalUrl = `${siteUrl}${localePath(locale)}`;
  const sameAs = socialLinks.filter((link) => link.kind !== "email").map((link) => link.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: dictionary.meta.title,
    "@id": `${canonicalUrl}#profile`,
    url: canonicalUrl,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Charlles.dev", url: siteUrl, inLanguage: locale },
    mainEntity: {
      "@id": `${siteUrl}/#person`,
      "@type": "Person",
      name: profile.name,
      alternateName: profile.handle,
      url: siteUrl,
      image: [`${siteUrl}/reference/charlles-contact-avatar.webp`, `${siteUrl}/reference/charlles-hero-poster.webp`],
      jobTitle: dictionary.hero.role,
      description: dictionary.meta.description,
      address: { "@type": "PostalAddress", addressLocality: "Campina Grande", addressCountry: "BR" },
      sameAs,
      knowsAbout: ["Web development", "Software engineering", "TypeScript", "React", "Next.js", "Automation", "Applied security"],
    },
  };

  return (
    <div id="conteudo">
      <PortfolioHome locale={locale} dictionary={dictionary} initialPayload={fallbackProjectsPayload} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
