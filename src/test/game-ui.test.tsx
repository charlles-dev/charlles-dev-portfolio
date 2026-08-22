import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GameUi } from "@/components/game/game-ui";
import { GameStateStore } from "@/game/core/game-state";

describe("GameUi keyboard panels", () => {
  it("opens and toggles map and memory with global M/J shortcuts", () => {
    const store = new GameStateStore();
    render(<GameUi locale="pt-BR" snapshot={store.getSnapshot()} input={null} />);

    fireEvent.keyDown(window, { key: "m" });
    expect(screen.getByRole("dialog", { name: "Mapa de sinais" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "m" });
    expect(screen.queryByRole("dialog", { name: "Mapa de sinais" })).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "j" });
    expect(screen.getByRole("dialog", { name: "Memória recuperada" })).toBeInTheDocument();
  });

  it("does not open panels while the game is paused or a dialogue is active", () => {
    const pausedStore = new GameStateStore();
    pausedStore.patch({ paused: true });
    const { unmount } = render(<GameUi locale="pt-BR" snapshot={pausedStore.getSnapshot()} input={null} />);
    fireEvent.keyDown(window, { key: "m" });
    expect(screen.queryByRole("dialog", { name: "Mapa de sinais" })).not.toBeInTheDocument();
    unmount();

    const dialogueStore = new GameStateStore();
    dialogueStore.patch({ dialogue: { speaker: "MIRA", text: "O sinal aguarda." } });
    render(<GameUi locale="pt-BR" snapshot={dialogueStore.getSnapshot()} input={null} />);
    fireEvent.keyDown(window, { key: "j" });
    expect(screen.queryByRole("dialog", { name: "Memória recuperada" })).not.toBeInTheDocument();
  });
});
