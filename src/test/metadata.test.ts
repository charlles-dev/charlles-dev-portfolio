import { describe, expect, it } from "vitest";

import { dictionaries, locales } from "@/lib/i18n";

describe("localized portfolio metadata", () => {
  it("positions every locale as professional software and web work", () => {
    for (const locale of locales) {
      const dictionary = dictionaries[locale];
      const metadataText = `${dictionary.meta.title} ${dictionary.meta.description}`;

      expect(metadataText).toMatch(/software|web|desarrollador|desenvolvimento/i);
      expect(metadataText).not.toMatch(/Dev, cyber e IA|em formação|aprendizado em público|IA student/i);
      expect(dictionary.meta.description.length).toBeGreaterThan(100);
    }
  });
});
