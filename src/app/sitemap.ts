import type { MetadataRoute } from "next";

const baseUrl = "https://www.charlles.dev";
const lastModified = "2026-08-22";
const languageAlternates = {
  "pt-BR": `${baseUrl}/pt-BR`,
  en: `${baseUrl}/en`,
  es: `${baseUrl}/es`,
};
const engineeringAlternates = {
  "pt-BR": `${baseUrl}/pt-BR/engineering`,
  en: `${baseUrl}/en/engineering`,
  es: `${baseUrl}/es/engineering`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: languageAlternates["pt-BR"], lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: languageAlternates } },
    { url: languageAlternates.en, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: languageAlternates } },
    { url: languageAlternates.es, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: languageAlternates } },
    { url: engineeringAlternates["pt-BR"], lastModified, changeFrequency: "yearly", priority: 0.6, alternates: { languages: engineeringAlternates } },
    { url: engineeringAlternates.en, lastModified, changeFrequency: "yearly", priority: 0.6, alternates: { languages: engineeringAlternates } },
    { url: engineeringAlternates.es, lastModified, changeFrequency: "yearly", priority: 0.6, alternates: { languages: engineeringAlternates } },
  ];
}
