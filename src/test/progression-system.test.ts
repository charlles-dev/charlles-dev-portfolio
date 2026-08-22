import { describe, expect, it } from "vitest";
import { objectiveFor, routeGate } from "@/game/systems/progression-system";
import type { GameSnapshot } from "@/game/core/game-state";

const base = {
  nodesRestored: 0,
  toolsUnlocked: ["Lente"] as GameSnapshot["toolsUnlocked"],
  relationship: { mira: "protocol", ponto: "unknown", nix: "protocol" } as GameSnapshot["relationship"],
  puzzles: {
    "archive-frequency": { id: "archive-frequency" as const, step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" as const },
    "garden-route": { id: "garden-route" as const, step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" as const },
  },
};

describe("ProgressionSystem", () => {
  it("keeps the critical route locked until its narrative proofs exist", () => {
    expect(routeGate(base, "archive").allowed).toBe(false);
    expect(routeGate(base, "garden").allowed).toBe(false);
    expect(routeGate(base, "core").allowed).toBe(false);
  });

  it("opens the garden only after the archive frequency is solved", () => {
    const archiveSolved = { ...base, nodesRestored: 1, toolsUnlocked: ["Lente", "Pulso"] as GameSnapshot["toolsUnlocked"], puzzles: { ...base.puzzles, "archive-frequency": { ...base.puzzles["archive-frequency"], step: 3, solved: true, feedback: "solved" as const } } };
    expect(routeGate(archiveSolved, "garden").allowed).toBe(true);
    expect(routeGate(archiveSolved, "core").allowed).toBe(false);
  });

  it("opens the core only after the garden route and witness are complete", () => {
    const complete = { ...base, nodesRestored: 3, toolsUnlocked: ["Lente", "Pulso"] as GameSnapshot["toolsUnlocked"], relationship: { ...base.relationship, nix: "recognition" as const }, puzzles: { ...base.puzzles, "archive-frequency": { ...base.puzzles["archive-frequency"], step: 3, solved: true, feedback: "solved" as const }, "garden-route": { ...base.puzzles["garden-route"], step: 4, solved: true, feedback: "solved" as const } } };
    expect(routeGate(complete, "core").allowed).toBe(true);
    expect(objectiveFor(complete, "core", "en")).toContain("Decide");
  });
});
