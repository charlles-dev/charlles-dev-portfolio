import { describe, expect, it } from "vitest";
import { endings, fragments, sectorOrder, sectors } from "@/game/data/narrative-content";

describe("narrative content contract", () => {
  it("keeps the four-sector critical route ordered", () => {
    expect(sectorOrder).toEqual(["hub", "archive", "garden", "core"]);
    expect(sectorOrder.map((id) => sectors[id].title)).toEqual([
      "Doca / Hub",
      "Arquivo de Sinais",
      "Jardim Orbital",
      "Núcleo de Memória",
    ]);
  });

  it("defines three readable consequences instead of generic completion text", () => {
    expect(Object.keys(endings)).toEqual(["archive-alive", "new-constellation", "vigil-pact"]);
    expect(Object.values(endings).every((ending) => ending.visualChange.length > 20)).toBe(true);
    expect(Object.values(endings).every((ending) => ending.line.length > 20)).toBe(true);
  });

  it("keeps the memory progression grounded in the narrative", () => {
    expect(fragments.map((fragment) => fragment.id)).toEqual(["arrival", "unowned", "damage", "quietude", "choice"]);
    expect(fragments.every((fragment) => fragment.title.length > 3 && fragment.text.length > 20)).toBe(true);
  });
});
