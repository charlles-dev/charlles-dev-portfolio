import { describe, expect, it } from "vitest";
import { PuzzleSystem } from "@/game/systems/puzzle-system";

describe("PuzzleSystem", () => {
  it("requires the archive sequence and exposes step feedback", () => {
    const puzzles = new PuzzleSystem();
    expect(puzzles.get("archive-frequency").step).toBe(0);
    expect(puzzles.submit("archive-frequency", "violet").progress).toMatchObject({ step: 1, feedback: "correct", solved: false });
    expect(puzzles.submit("archive-frequency", "mint").progress.step).toBe(2);
    const solved = puzzles.submit("archive-frequency", "amber");
    expect(solved.solvedNow).toBe(true);
    expect(solved.progress.feedback).toBe("solved");
  });

  it("resets the sequence after an incorrect signal", () => {
    const puzzles = new PuzzleSystem();
    puzzles.submit("garden-route", "mint");
    const wrong = puzzles.submit("garden-route", "amber");
    expect(wrong.accepted).toBe(false);
    expect(wrong.progress.step).toBe(0);
    expect(wrong.progress.attempts).toBe(2);
    expect(wrong.progress.feedback).toBe("wrong");
  });

  it("keeps a solved puzzle idempotent and restores bounded progress", () => {
    const puzzles = new PuzzleSystem();
    puzzles.restore({ id: "archive-frequency", step: 50, attempts: 4, solved: true, lastChoice: "amber", feedback: "solved" });
    expect(puzzles.get("archive-frequency")).toMatchObject({ step: 3, solved: true });
    expect(puzzles.submit("archive-frequency", "violet").solvedNow).toBe(false);
    expect(puzzles.get("archive-frequency").attempts).toBe(4);
  });
});
