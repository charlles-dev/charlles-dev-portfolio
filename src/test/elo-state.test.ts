import { describe, expect, it } from "vitest";

import { initialEloState, selectEloNode } from "@/game/world/elo-state";

describe("Elo state", () => {
  it("selects the first structural node", () => {
    expect(selectEloNode(initialEloState, "left")).toEqual({ status: "selecting", firstNode: "left" });
  });

  it("cancels when the selected node is used again", () => {
    const selecting = selectEloNode(initialEloState, "left");
    expect(selectEloNode(selecting, "left")).toEqual(initialEloState);
  });

  it("stabilizes when a different second node is selected", () => {
    const selecting = selectEloNode(initialEloState, "left");
    expect(selectEloNode(selecting, "right")).toEqual({ status: "linked", firstNode: "left" });
  });

  it("keeps a stabilized link immutable until the prototype is reset", () => {
    const linked = selectEloNode(selectEloNode(initialEloState, "left"), "right");
    expect(selectEloNode(linked, "left")).toBe(linked);
  });
});
