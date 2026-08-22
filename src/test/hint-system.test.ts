import { describe, expect, it } from "vitest";
import { hintFor } from "@/game/systems/hint-system";

describe("HintSystem", () => {
  it("stays quiet during the first attempt", () => {
    expect(hintFor("archive-frequency", 0)).toEqual({ level: 0, text: null });
    expect(hintFor("archive-frequency", 1)).toEqual({ level: 0, text: null });
  });

  it("escalates from relationship to complete order", () => {
    expect(hintFor("archive-frequency", 2).level).toBe(1);
    expect(hintFor("archive-frequency", 4).level).toBe(2);
    expect(hintFor("archive-frequency", 6).level).toBe(3);
    expect(hintFor("archive-frequency", 20).level).toBe(3);
  });

  it("uses a distinct hint track for the garden", () => {
    expect(hintFor("garden-route", 2).text).toContain("irrigação");
    expect(hintFor("garden-route", 6).text).toContain("mint");
  });
});
