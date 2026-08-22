import { describe, expect, it } from "vitest";
import { getNarrative } from "@/game/data/narrative-content";
import { resolveEnding } from "@/game/systems/ending-system";
import type { GameSnapshot } from "@/game/core/game-state";

const base = {
  nodesRestored: 0,
  fragmentsFound: [],
  relationship: { mira: "protocol", ponto: "unknown", nix: "protocol" } as GameSnapshot["relationship"],
  puzzles: {
    "archive-frequency": { id: "archive-frequency" as const, step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" as const },
    "garden-route": { id: "garden-route" as const, step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" as const },
  },
};

describe("EndingSystem", () => {
  it("rejects premature endings", () => {
    const result = resolveEnding(base, "archive-alive", getNarrative("pt-BR"));
    expect(result.allowed).toBe(false);
    expect(result.ending).toBeNull();
  });

  it("resolves an ending only when all narrative proofs exist", () => {
    const complete = {
      ...base,
      nodesRestored: 3,
      relationship: { ...base.relationship, nix: "recognition" as const },
      puzzles: {
        "archive-frequency": { ...base.puzzles["archive-frequency"], step: 3, solved: true, feedback: "solved" as const },
        "garden-route": { ...base.puzzles["garden-route"], step: 4, solved: true, feedback: "solved" as const },
      },
    };
    const result = resolveEnding(complete, "new-constellation", getNarrative("en"));
    expect(result).toMatchObject({ allowed: true, ending: "new-constellation" });
    expect(result.objective).toContain(result.title);
    expect(result.fragmentsFound).toContain("choice");
  });

  it("keeps the final choice localized through the narrative package", () => {
    const complete = {
      ...base,
      nodesRestored: 3,
      relationship: { ...base.relationship, nix: "recognition" as const },
      puzzles: {
        "archive-frequency": { ...base.puzzles["archive-frequency"], step: 3, solved: true, feedback: "solved" as const },
        "garden-route": { ...base.puzzles["garden-route"], step: 4, solved: true, feedback: "solved" as const },
      },
    };
    expect(resolveEnding(complete, "vigil-pact", getNarrative("es")).title.length).toBeGreaterThan(2);
  });
});
