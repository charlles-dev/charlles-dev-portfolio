import { describe, expect, it } from "vitest";
import { DialogueSystem } from "@/game/systems/dialogue-system";

const lines = [
  { speaker: "MIRA" as const, text: "Primeiro sinal." },
  { speaker: "CHARLLES" as const, text: "Eu ouvi." },
  { speaker: "MIRA" as const, text: "Então continue." },
];

describe("DialogueSystem", () => {
  it("advances through a session and resets the cursor after completion", () => {
    const dialogue = new DialogueSystem();
    const session = dialogue.start("opening", lines);
    expect(dialogue.advance(session)).toMatchObject({ line: lines[0], done: false });
    session.cursor = 1;
    expect(dialogue.advance(session)).toMatchObject({ line: lines[1], done: false });
    session.cursor = 2;
    expect(dialogue.advance(session)).toMatchObject({ line: lines[2], done: true });
    expect(dialogue.start("opening", lines).cursor).toBe(0);
  });

  it("remembers the next line when a session is reopened", () => {
    const dialogue = new DialogueSystem();
    const first = dialogue.start("mira", lines);
    dialogue.advance(first);
    const reopened = dialogue.start("mira", lines);
    expect(reopened.cursor).toBe(1);
  });

  it("handles empty dialogue without throwing", () => {
    const dialogue = new DialogueSystem();
    const session = dialogue.start("empty", []);
    expect(dialogue.advance(session)).toEqual({ line: null, done: true });
  });
});
