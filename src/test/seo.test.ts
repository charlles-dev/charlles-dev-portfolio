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
      expect(JSON.stringify(metadata.openGraph)).toContain("/reference/charlles-og-image.png");
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
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
    ]);
  });
});
