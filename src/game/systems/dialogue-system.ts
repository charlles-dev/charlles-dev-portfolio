import type { DialogueLine } from "../data/narrative-content";

export interface DialogueSession {
  id: string;
  speaker: string;
  lines: DialogueLine[];
  cursor: number;
}

export interface DialogueAdvanceResult {
  line: DialogueLine | null;
  done: boolean;
}

export class DialogueSystem {
  private readonly cursors = new Map<string, number>();

  start(id: string, lines: DialogueLine[]): DialogueSession {
    return { id, speaker: lines[0]?.speaker ?? "NÚCLEO", lines, cursor: this.cursors.get(id) ?? 0 };
  }

  advance(session: DialogueSession): DialogueAdvanceResult {
    if (session.lines.length === 0) return { line: null, done: true };
    const index = Math.min(session.cursor, session.lines.length - 1);
    const line = session.lines[index];
    const next = index + 1;
    const done = next >= session.lines.length;
    this.cursors.set(session.id, done ? 0 : next);
    return { line, done };
  }

  reset(id?: string): void {
    if (id) this.cursors.delete(id);
    else this.cursors.clear();
  }
}
