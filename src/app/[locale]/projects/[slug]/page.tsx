import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCasePage } from "@/components/project-case-page";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { caseSlugs, getProjectCase } from "@/lib/professional-content";

const siteUrl = "https://www.charlles.dev";

export function generateStaticParams() {
  return locales.flatMap((locale) => caseSlugs.map((slug) => ({ locale, slug })));
}

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const project = getProjectCase(rawLocale, slug);
  if (!project) return {};
  const canonical = `${siteUrl}/${rawLocale}/projects/${project.slug}`;
  return {
    title: `${project.title} — Case | Charlles.dev`,
    description: project.summary,
    alternates: {
      canonical,
      languages: Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}/projects/${project.slug}`])),
    },
    openGraph: { title: `${project.title} — Charlles.dev`, description: project.summary, url: canonical, siteName: "Charlles.dev", type: "article", images: [{ url: `/${rawLocale}/opengraph-image`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: `${project.title} — Charlles.dev`, description: project.summary, images: [`/${rawLocale}/opengraph-image`] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const project = getProjectCase(locale, slug);
  if (!project) notFound();
  const dictionary = getDictionary(locale);
  const canonical = `${siteUrl}/${locale}/projects/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: canonical,
    codeRepository: project.repository,
    programmingLanguage: project.stack,
    author: { "@type": "Person", name: "Charlles Augusto", url: siteUrl },
    inLanguage: locale,
  };
  return <><ProjectCasePage locale={locale} dictionary={dictionary} project={project} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
