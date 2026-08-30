import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioHome } from "@/components/portfolio-home";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
import { getDictionary, isLocale, localePath, locales, type Locale } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

const siteUrl = "https://www.charlles.dev";
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);
  const canonicalPath = localePath(rawLocale);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const ogImagePath = `${canonicalPath}/opengraph-image`;
  const searchImagePath = "/reference/charlles-search-avatar-v1.webp";
  const alternateLocales = { "pt-BR": `${siteUrl}/pt-BR`, en: `${siteUrl}/en`, es: `${siteUrl}/es` };

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    referrer: "origin-when-cross-origin",
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
      images: [{ url: searchImagePath, width: 1024, height: 1024, type: "image/webp", alt: dictionary.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [ogImagePath],
      creator: "@charlles_dev",
    },
  };
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dictionary = getDictionary(locale);
  const canonicalUrl = `${siteUrl}${localePath(locale)}`;
  const searchPreviewUrl = `${siteUrl}/reference/charlles-search-avatar-v1.webp`;
  const sameAs = socialLinks.filter((link) => link.kind !== "email").map((link) => link.href);
  const projectItems = fallbackProjectsPayload.projects.map((project) => {
    const copy = dictionary.projects[project.displayName];
    return {
      "@type": "SoftwareSourceCode",
      name: project.name,
      url: project.htmlUrl,
      codeRepository: project.htmlUrl,
      programmingLanguage: project.language || undefined,
      description: copy?.summary ?? project.summary,
      inLanguage: locale,
      creator: { "@id": `${siteUrl}/#person` },
      keywords: [project.language, dictionary.work.filters[project.category], ...project.tags].filter(Boolean),
    };
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Charlles.dev",
        url: siteUrl,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        name: dictionary.meta.title,
        description: dictionary.meta.description,
        url: canonicalUrl,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: searchPreviewUrl,
          contentUrl: searchPreviewUrl,
          width: 1024,
          height: 1024,
          representativeOfPage: true,
          caption: `Charlles Augusto — ${dictionary.hero.role}`,
        },
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        alternateName: profile.handle,
        url: siteUrl,
        image: [searchPreviewUrl, `${siteUrl}/reference/charlles-hero-poster.webp`],
        jobTitle: dictionary.hero.role,
        description: dictionary.meta.description,
        address: { "@type": "PostalAddress", addressLocality: "Campina Grande", addressCountry: "BR" },
        sameAs,
        knowsAbout: ["Full-stack software engineering", "TypeScript", "React", "Next.js", "Go", "Process automation", "Computer networks", "Applied cybersecurity", "Embedded systems"],
      },
      {
        "@type": "ProfilePage",
        name: dictionary.meta.title,
        "@id": `${canonicalUrl}#profile`,
        url: canonicalUrl,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${siteUrl}/#person` },
        primaryImageOfPage: searchPreviewUrl,
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#projects`,
        name: dictionary.work.title,
        url: `${canonicalUrl}#work`,
        itemListElement: projectItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })),
      },
    ],
  };

  return (
    <div>
      <PortfolioHome locale={locale} dictionary={dictionary} initialPayload={fallbackProjectsPayload} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
