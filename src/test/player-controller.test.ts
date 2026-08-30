import { describe, expect, it } from "vitest";

import {
  initialPlayerSnapshot,
  landingWeightForDistance,
  locomotionState,
  stepPlayer,
} from "@/game/player/controller";

const flatGround = () => ({ height: 0 });

describe("player controller", () => {
  it("accelerates instead of snapping to full speed", () => {
    const next = stepPlayer(initialPlayerSnapshot, { x: 1, z: 0, run: true, jumpPressed: false }, 1 / 60, flatGround);
    expect(next.velocityX).toBeGreaterThan(0);
    expect(next.velocityX).toBeLessThan(4.8);
    expect(next.state).toBe("Walk");
  });

  it("keeps horizontal momentum when jumping", () => {
    const moving = { ...initialPlayerSnapshot, velocityX: 2, state: "Walk" as const };
    const next = stepPlayer(moving, { x: 1, z: 0, run: false, jumpPressed: true }, 1 / 60, flatGround);
    expect(next.state).toBe("Jump");
    expect(next.velocityX).toBeGreaterThanOrEqual(2);
    expect(next.velocityY).toBeGreaterThan(0);
  });

  it("enters falling when the ground disappears", () => {
    const next = stepPlayer(
      initialPlayerSnapshot,
      { x: 0, z: 0, run: false, jumpPressed: false },
      1 / 60,
      () => ({ height: -2 }),
    );
    expect(next.grounded).toBe(false);
    expect(next.state).toBe("Falling");
  });

  it("classifies locomotion and landing weights", () => {
    expect(locomotionState(0.01, false)).toBe("Idle");
    expect(locomotionState(2, true)).toBe("Walk");
    expect(locomotionState(3.2, true)).toBe("Run");
    expect(landingWeightForDistance(0.8)).toBe("light");
    expect(landingWeightForDistance(1.8)).toBe("medium");
    expect(landingWeightForDistance(3.2)).toBe("heavy");
  });
});
