import { describe, expect, it, vi } from "vitest";
import { GameStateStore } from "@/game/core/game-state";

describe("GameStateStore", () => {
  it("notifies subscribers with the initial snapshot and patches", () => {
    const store = new GameStateStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toMatchObject({ nodesRestored: 0, threatState: "patrol" });

    store.patch({ nodesRestored: 1, message: "Nó restaurado." });
    expect(listener).toHaveBeenCalledTimes(2);
    expect(store.getSnapshot()).toMatchObject({ nodesRestored: 1, message: "Nó restaurado." });

    unsubscribe();
    store.patch({ dialogue: { speaker: "MIRA", text: "Sinal recebido." } });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("resets the narrative state after a completed slice", () => {
    const store = new GameStateStore();
    store.patch({ completed: true, nodesRestored: 3, threatState: "disabled", energy: 12 });
    store.reset();

    expect(store.getSnapshot()).toMatchObject({ completed: false, nodesRestored: 0, threatState: "patrol", energy: 100 });
  });
});
