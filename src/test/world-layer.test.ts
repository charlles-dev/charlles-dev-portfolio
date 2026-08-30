import { describe, expect, it } from "vitest";

import { approachLayerMix, toggleWorldLayer } from "@/game/world/world-layer";

describe("world layer", () => {
  it("toggles reversibly between the two layers", () => {
    expect(toggleWorldLayer("surface")).toBe("structure");
    expect(toggleWorldLayer(toggleWorldLayer("surface"))).toBe("surface");
  });

  it("approaches the selected layer without snapping", () => {
    const next = approachLayerMix(0, "structure", 1 / 60);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(1);
  });

  it("changes immediately when reduced motion is requested", () => {
    expect(approachLayerMix(0, "structure", 1 / 60, true)).toBe(1);
    expect(approachLayerMix(1, "surface", 1 / 60, true)).toBe(0);
  });
});
