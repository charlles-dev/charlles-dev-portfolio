import { describe, expect, it } from "vitest";
import { getWorldCopy } from "@/game/data/world-copy";

describe("WorldCopy", () => {
  it("provides core runtime messages for every supported locale", () => {
    for (const locale of ["pt-BR", "en", "es"] as const) {
      const copy = getWorldCopy(locale);
      expect(copy.portal.length).toBeGreaterThan(8);
      expect(copy.threatAlert.length).toBeGreaterThan(8);
      expect(copy.toolDepleted.length).toBeGreaterThan(8);
      expect(copy.checkpointRestore.length).toBeGreaterThan(8);
      expect(copy.archiveModule(0).length).toBeGreaterThan(8);
      expect(copy.nodeRestored(1).length).toBeGreaterThan(8);
      expect(copy.ending("test").length).toBeGreaterThan(8);
    }
  });

  it("changes the language of the gameplay copy", () => {
    expect(getWorldCopy("en").portal).toContain("portal");
    expect(getWorldCopy("es").portal).toContain("portal");
    expect(getWorldCopy("pt-BR").portal).toContain("portal");
    expect(getWorldCopy("en").threatAlert).not.toContain("assinatura");
    expect(getWorldCopy("es").threatAlert).not.toContain("assinatura");
  });
});
