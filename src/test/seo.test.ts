import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import { generateMetadata } from "@/app/[locale]/page";
import { generateMetadata as generateEngineeringMetadata } from "@/app/[locale]/engineering/page";
import { generateMetadata as generateNowMetadata } from "@/app/[locale]/now/page";
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
      expect(JSON.stringify(metadata.openGraph)).toContain("/reference/charlles-og-image.png");
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    }
  });

  it("keeps the engineering notes localized and discoverable", async () => {
    for (const locale of locales) {
      const metadata = await generateEngineeringMetadata({ params: Promise.resolve({ locale }) });
      expect(metadata.alternates?.canonical).toBe(`https://www.charlles.dev/${locale}/engineering`);
      expect(metadata.openGraph).toMatchObject({ type: "article", url: `https://www.charlles.dev/${locale}/engineering` });
      expect(metadata.description).toContain(locale === "pt-BR" ? "decisões" : locale === "en" ? "decisions" : "decisiones");
    }
  });

  it("keeps the now page localized and discoverable", async () => {
    for (const locale of locales) {
      const metadata = await generateNowMetadata({ params: Promise.resolve({ locale }) });
      expect(metadata.alternates?.canonical).toBe(`https://www.charlles.dev/${locale}/now`);
      expect(metadata.openGraph).toMatchObject({ type: "website", url: `https://www.charlles.dev/${locale}/now` });
      expect(metadata.description).toContain(locale === "pt-BR" ? "focos" : locale === "en" ? "focuses" : "focos");
    }
  });

  it("exposes the dedicated preview image and crawl files", () => {
    expect(manifest().start_url).toBe("/pt-BR");
    expect(manifest().icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: "/assets/icon-192.png", sizes: "192x192" }),
      expect.objectContaining({ src: "/assets/icon-512.png", sizes: "512x512" }),
    ]));
    expect(robots()).toMatchObject({ sitemap: "https://www.charlles.dev/sitemap.xml", host: "https://www.charlles.dev" });
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://www.charlles.dev/pt-BR",
      "https://www.charlles.dev/en",
      "https://www.charlles.dev/es",
      "https://www.charlles.dev/pt-BR/engineering",
      "https://www.charlles.dev/en/engineering",
      "https://www.charlles.dev/es/engineering",
      "https://www.charlles.dev/pt-BR/now",
      "https://www.charlles.dev/en/now",
      "https://www.charlles.dev/es/now",
    ]);
  });
});
