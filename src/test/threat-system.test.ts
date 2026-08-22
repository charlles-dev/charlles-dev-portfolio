import { describe, expect, it } from "vitest";
import { ThreatSystem } from "@/game/systems/threat-system";

describe("ThreatSystem", () => {
  it("uses readable distance bands and hysteresis-free deterministic output", () => {
    const threat = new ThreatSystem();
    expect(threat.evaluate({ distance: 4, disabled: false })).toMatchObject({ state: "patrol", drainPerSecond: 0, coneVisibility: 0.08 });
    expect(threat.evaluate({ distance: 2, disabled: false })).toMatchObject({ state: "suspicious", drainPerSecond: 0, telegraph: 0.55 });
    expect(threat.evaluate({ distance: 1, disabled: false })).toMatchObject({ state: "alert", drainPerSecond: 2.5, telegraph: 1 });
  });

  it("keeps an overloaded sentinel harmless until recovery", () => {
    const threat = new ThreatSystem();
    const disabled = threat.evaluate({ distance: 0.4, disabled: true });
    expect(disabled).toMatchObject({ state: "disabled", drainPerSecond: 0, coneVisibility: 0.04 });
    expect(threat.getState()).toBe("disabled");
  });

  it("reports state transitions for feedback without owning presentation", () => {
    const threat = new ThreatSystem();
    expect(threat.evaluate({ distance: 3, disabled: false }).changed).toBe(false);
    expect(threat.evaluate({ distance: 2.4, disabled: false }).changed).toBe(true);
    expect(threat.evaluate({ distance: 2.4, disabled: false }).changed).toBe(false);
    threat.reset();
    expect(threat.getState()).toBe("patrol");
  });
});
