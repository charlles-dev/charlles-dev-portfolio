export type PuzzleId = "archive-frequency" | "garden-route";
export type PuzzleSignal = "mint" | "violet" | "amber";

export interface PuzzleDefinition {
  id: PuzzleId;
  title: string;
  hint: string;
  sequence: PuzzleSignal[];
}

export interface PuzzleProgress {
  id: PuzzleId;
  step: number;
  attempts: number;
  solved: boolean;
  lastChoice: PuzzleSignal | null;
  feedback: "idle" | "correct" | "wrong" | "solved";
}

export interface PuzzleResult {
  progress: PuzzleProgress;
  accepted: boolean;
  solvedNow: boolean;
}

export const puzzleDefinitions: Record<PuzzleId, PuzzleDefinition> = {
  "archive-frequency": {
    id: "archive-frequency",
    title: "Frequência sem origem",
    hint: "A sequência aparece no intervalo entre ausência, memória e cuidado.",
    sequence: ["violet", "mint", "amber"],
  },
  "garden-route": {
    id: "garden-route",
    title: "Rota de irrigação",
    hint: "O jardim não pede mais energia. Pede uma passagem que não assuste a sentinela.",
    sequence: ["mint", "mint", "violet", "amber"],
  },
};

export function createPuzzleProgress(id: PuzzleId): PuzzleProgress {
  return { id, step: 0, attempts: 0, solved: false, lastChoice: null, feedback: "idle" };
}

export class PuzzleSystem {
  private readonly progress = new Map<PuzzleId, PuzzleProgress>();

  constructor() {
    for (const id of Object.keys(puzzleDefinitions) as PuzzleId[]) this.progress.set(id, createPuzzleProgress(id));
  }

  get(id: PuzzleId): PuzzleProgress {
    return { ...this.progress.get(id)! };
  }

  submit(id: PuzzleId, signal: PuzzleSignal): PuzzleResult {
    const definition = puzzleDefinitions[id];
    const current = this.progress.get(id) ?? createPuzzleProgress(id);
    if (current.solved) return { progress: { ...current }, accepted: false, solvedNow: false };

    const expected = definition.sequence[current.step];
    const attempts = current.attempts + 1;
    if (signal !== expected) {
      const progress: PuzzleProgress = { ...current, attempts, step: 0, lastChoice: signal, feedback: "wrong" };
      this.progress.set(id, progress);
      return { progress: { ...progress }, accepted: false, solvedNow: false };
    }

    const step = current.step + 1;
    const solved = step >= definition.sequence.length;
    const progress: PuzzleProgress = { ...current, attempts, step: solved ? step : step, solved, lastChoice: signal, feedback: solved ? "solved" : "correct" };
    this.progress.set(id, progress);
    return { progress: { ...progress }, accepted: true, solvedNow: solved };
  }

  reset(id: PuzzleId): PuzzleProgress {
    const progress = createPuzzleProgress(id);
    this.progress.set(id, progress);
    return { ...progress };
  }

  restore(progress: PuzzleProgress): void {
    if (!puzzleDefinitions[progress.id]) return;
    const definition = puzzleDefinitions[progress.id];
    const safeStep = Math.max(0, Math.min(progress.step, definition.sequence.length));
    this.progress.set(progress.id, { ...progress, step: safeStep, solved: progress.solved && safeStep === definition.sequence.length });
  }
}
