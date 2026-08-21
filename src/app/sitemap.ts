import type { MetadataRoute } from "next";

const baseUrl = "https://charlles.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { "pt-BR": baseUrl, en: `${baseUrl}/en`, es: `${baseUrl}/es` } },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { "pt-BR": baseUrl, en: `${baseUrl}/en`, es: `${baseUrl}/es` } },
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { "pt-BR": baseUrl, en: `${baseUrl}/en`, es: `${baseUrl}/es` } },
    },
  ];
}
