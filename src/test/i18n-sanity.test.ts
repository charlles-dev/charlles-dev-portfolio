import { describe, expect, it } from "vitest";

import { dictionaries, locales } from "@/lib/i18n";

const navigationLabels = ["work", "about", "now", "contact", "menu", "main", "language"] as const;
const forbiddenEnglishResidue = ["Trabalhos", "Sobre", "Contato", "Disponível", "Desenvolvedor de software", "Voltar ao início", "Copiar e-mail"];
const forbiddenSpanishResidue = ["Trabalhos", "Contato", "Disponível", "Desenvolvedor de software", "Voltar ao início", "Copiar e-mail"];

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

describe("localized copy sanity", () => {
  it("keeps critical labels non-empty and reasonably short", () => {
    for (const locale of locales) {
      const dictionary = dictionaries[locale];
      for (const key of navigationLabels) expect(dictionary.nav[key].trim().length).toBeGreaterThan(0);
      expect(dictionary.work.tabs.product.length).toBeLessThanOrEqual(32);
      expect(dictionary.work.tabs.visual.length).toBeLessThanOrEqual(32);
      expect(dictionary.work.tabs.motion.length).toBeLessThanOrEqual(32);
      expect(dictionary.contact.primaryCta.length).toBeLessThanOrEqual(32);
      expect(dictionary.contact.secondaryCta.length).toBeLessThanOrEqual(32);
    }
  });

  it("does not leak Portuguese UI phrases into English or Spanish", () => {
    const english = collectStrings(dictionaries.en).join(" ");
    const spanish = collectStrings(dictionaries.es).join(" ");
    for (const phrase of forbiddenEnglishResidue) expect(english).not.toContain(phrase);
    for (const phrase of forbiddenSpanishResidue) expect(spanish).not.toContain(phrase);
  });
});
