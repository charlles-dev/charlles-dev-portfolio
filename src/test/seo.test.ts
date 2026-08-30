import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import { generateMetadata } from "@/app/[locale]/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { localePath, locales } from "@/lib/i18n";

describe("SEO and discovery metadata", () => {
  it("keeps every locale on a stable canonical path", async () => {
    expect(localePath("pt-BR")).toBe("/pt-BR");
    expect(localePath("en")).toBe("/en");
    expect(localePath("es")).toBe("/es");

    for (const locale of locales) {
      const metadata = await generateMetadata({ params: Promise.resolve({ locale }) } as never);
      expect(metadata.alternates?.canonical).toBe(`https://www.charlles.dev/${locale}`);
      expect(metadata.openGraph).toMatchObject({ type: "website", url: `https://www.charlles.dev/${locale}` });
      expect(JSON.stringify(metadata.openGraph)).toContain("/reference/charlles-search-avatar-v1.webp");
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image", creator: "@charlles_dev" });
      expect(JSON.stringify(metadata.twitter)).toContain(`/${locale}/opengraph-image`);
    }
  });

  it("uses the cinematic social card and a square character preview for search engines", async () => {
    const source = await import("node:fs/promises");
    const ogRoute = await source.readFile("src/app/[locale]/opengraph-image.tsx", "utf8");
    const landing = await source.readFile("src/app/[locale]/page.tsx", "utf8");

    expect(ogRoute).toContain("charlles-og-image-v2.jpeg");
    expect(landing).toContain("charlles-search-avatar-v1.webp");
    expect(landing).toContain("width: 1024");
    expect(landing).toContain("height: 1024");
  });

  it("exposes landing, résumé and evidence pages to crawlers", () => {
    expect(manifest().start_url).toBe("/pt-BR");
    expect(manifest().icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: "/assets/icon-192.png", sizes: "192x192" }),
      expect.objectContaining({ src: "/assets/icon-512.png", sizes: "512x512" }),
    ]));
    expect(robots()).toMatchObject({ sitemap: "https://www.charlles.dev/sitemap.xml", host: "https://www.charlles.dev" });
    expect(sitemap().map((entry) => entry.url)).toEqual(expect.arrayContaining([
      "https://www.charlles.dev/pt-BR",
      "https://www.charlles.dev/en",
      "https://www.charlles.dev/es",
      "https://www.charlles.dev/pt-BR/cv",
      "https://www.charlles.dev/en/projects/astrolink",
      "https://www.charlles.dev/es/projects/trakr",
    ]));
    expect(sitemap().map((entry) => entry.url).some((url) => url.endsWith("/game"))).toBe(false);
  });
});
