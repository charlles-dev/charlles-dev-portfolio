import type { MetadataRoute } from "next";

const baseUrl = "https://www.charlles.dev";
const lastModified = "2026-08-26";
const languageAlternates = {
  "pt-BR": `${baseUrl}/pt-BR`,
  en: `${baseUrl}/en`,
  es: `${baseUrl}/es`,
};
export default function sitemap(): MetadataRoute.Sitemap {
  const homeRoutes: MetadataRoute.Sitemap = [
    { url: languageAlternates["pt-BR"], lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: languageAlternates } },
    { url: languageAlternates.en, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: languageAlternates } },
    { url: languageAlternates.es, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: languageAlternates } },
  ];
  const contentRoutes: MetadataRoute.Sitemap = ["pt-BR", "en", "es"].flatMap((locale) => [
    { url: `${baseUrl}/${locale}/cv`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    ...["charlles-dev-portfolio", "astrolink", "trakr"].map((slug) => ({ url: `${baseUrl}/${locale}/projects/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
  ]);
  return [...homeRoutes, ...contentRoutes];
}
