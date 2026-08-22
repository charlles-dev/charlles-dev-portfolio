import { describe, expect, it } from "vitest";
import { GameStateStore } from "@/game/core/game-state";
import { createCheckpoint, restoreCheckpoint } from "@/game/systems/checkpoint-system";

describe("CheckpointSystem", () => {
  it("captures the anchor identity, sector and safe energy", () => {
    const store = new GameStateStore();
    store.patch({ sector: "garden", checkpoint: "garden", energy: 64 });
    expect(createCheckpoint(store.getSnapshot())).toEqual({ id: "garden", sector: "garden", energy: 64 });
  });

  it("restores transient state without erasing narrative progress", () => {
    const store = new GameStateStore();
    store.patch({
      energy: 0,
      sector: "core",
      checkpoint: "core",
      dialogue: { speaker: "NIX", text: "..." },
      paused: true,
      threatState: "alert",
      nodesRestored: 3,
      fragmentsFound: ["arrival", "unowned", "damage"],
      relationship: { mira: "doubt", ponto: "association", nix: "recognition" },
      toolsUnlocked: ["Lente", "Pulso"],
      puzzles: {
        "archive-frequency": { id: "archive-frequency", step: 3, attempts: 3, solved: true, lastChoice: "amber", feedback: "solved" },
        "garden-route": { id: "garden-route", step: 4, attempts: 5, solved: true, lastChoice: "amber", feedback: "solved" },
      },
    });
    const anchor = { id: "garden", sector: "garden" as const, energy: 58 };
    const restored = restoreCheckpoint(store.getSnapshot(), anchor);

    expect(restored).toMatchObject({ energy: 58, sector: "garden", checkpoint: "garden", dialogue: null, paused: false, threatState: "patrol" });
    expect(restored.nodesRestored).toBe(3);
    expect(restored.fragmentsFound).toEqual(["arrival", "unowned", "damage"]);
    expect(restored.relationship.nix).toBe("recognition");
    expect(restored.puzzles["garden-route"].solved).toBe(true);
    expect(restored.completed).toBe(false);
  });

  it("clamps a malformed anchor to a usable energy value", () => {
    const store = new GameStateStore();
    expect(restoreCheckpoint(store.getSnapshot(), { id: "dock", sector: "hub", energy: 999 }).energy).toBe(100);
    expect(restoreCheckpoint(store.getSnapshot(), { id: "dock", sector: "hub", energy: -20 }).energy).toBe(1);
  });
});
