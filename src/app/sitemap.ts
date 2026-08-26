import type { MetadataRoute } from "next";

const baseUrl = "https://www.charlles.dev";
const lastModified = "2026-08-26";
const languageAlternates = {
  "pt-BR": `${baseUrl}/pt-BR`,
  en: `${baseUrl}/en`,
  es: `${baseUrl}/es`,
};
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: languageAlternates["pt-BR"], lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: languageAlternates } },
    { url: languageAlternates.en, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: languageAlternates } },
    { url: languageAlternates.es, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: languageAlternates } },
  ];
}
