import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Space_Grotesk: () => ({ variable: "--font-sans" })
}));

import { metadata } from "@/app/layout";

describe("page metadata", () => {
  it("positions the portfolio as professional work, not an ai-student pitch", () => {
    const title = String(metadata.title);
    const description = String(metadata.description);
    const openGraphTitle = String(metadata.openGraph?.title);
    const openGraphDescription = String(metadata.openGraph?.description);
    const metadataText = `${title} ${description} ${openGraphTitle} ${openGraphDescription}`;

    expect(title).toMatch(/Desenvolvimento web/i);
    expect(metadataText).not.toMatch(/Dev, cyber e IA|em formação|aprendizado em público/i);
  });
});
