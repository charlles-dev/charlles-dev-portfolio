import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CvPage } from "@/components/cv-page";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getProfessionalContent } from "@/lib/professional-content";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

type CvPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getProfessionalContent(locale);
  const url = `https://www.charlles.dev/${locale}/cv`;
  const image = `/${locale}/opengraph-image`;
  return { title: content.cv.title, description: content.cv.description, alternates: { canonical: url, languages: Object.fromEntries(locales.map((item) => [item, `https://www.charlles.dev/${item}/cv`])) }, openGraph: { title: content.cv.title, description: content.cv.description, url, type: "profile", images: [{ url: image, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title: content.cv.title, description: content.cv.description, images: [image] } };
}

export default async function ResumePage({ params }: CvPageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const content = getProfessionalContent(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: content.cv.title,
    description: content.cv.description,
    url: `https://www.charlles.dev/${locale}/cv`,
    inLanguage: locale,
    mainEntity: { "@type": "Person", name: "Charlles Augusto", jobTitle: getDictionary(locale).hero.role, email: "mailto:hello@charlles.dev", url: "https://www.charlles.dev" },
  };
  return <><CvPage locale={locale} dictionary={getDictionary(locale)} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
