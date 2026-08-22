import { describe, expect, it } from "vitest";
import { gameUiCopy, normalizeGameLocale } from "@/game/data/game-copy";
import { getNarrative, sectorOrder } from "@/game/data/narrative-content";

describe("game localization contract", () => {
  it("normalizes unknown route segments to Brazilian Portuguese", () => {
    expect(normalizeGameLocale("pt-BR")).toBe("pt-BR");
    expect(normalizeGameLocale("en")).toBe("en");
    expect(normalizeGameLocale("es")).toBe("es");
    expect(normalizeGameLocale("fr")).toBe("pt-BR");
  });

  it("provides complete UI labels for every supported locale", () => {
    const required = ["map", "memory", "continue", "pausedTitle", "restart", "moveHint", "finalRecord"] as const;
    for (const locale of ["pt-BR", "en", "es"] as const) {
      expect(required.every((key) => gameUiCopy[locale][key].trim().length >= 3)).toBe(true);
    }
  });

  it("keeps the same narrative structure in all languages", () => {
    for (const locale of ["pt-BR", "en", "es"] as const) {
      const narrative = getNarrative(locale);
      expect(Object.keys(narrative.sectors)).toEqual(sectorOrder);
      expect(narrative.openingDialogue.length).toBeGreaterThanOrEqual(4);
      expect(narrative.archiveDialogue.length).toBeGreaterThanOrEqual(3);
      expect(narrative.gardenDialogue.length).toBeGreaterThanOrEqual(3);
      expect(narrative.coreDialogue.length).toBeGreaterThanOrEqual(3);
      expect(Object.keys(narrative.endings)).toHaveLength(3);
      expect(narrative.fragments).toHaveLength(5);
    }
  });
});
