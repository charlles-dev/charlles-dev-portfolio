import { describe, expect, it } from "vitest";
import { SAVE_KEY, SaveSystem, type SaveStorage } from "@/game/core/save-system";
import type { GameSnapshot } from "@/game/core/game-state";

function storage(seed?: string): SaveStorage & { value: string | null } {
  return {
    value: seed ?? null,
    getItem(key) { return key === SAVE_KEY ? this.value : null; },
    setItem(key, value) { if (key === SAVE_KEY) this.value = value; },
    removeItem(key) { if (key === SAVE_KEY) this.value = null; },
  };
}

const snapshot: GameSnapshot = {
  objective: "Decida o que a Orbe-9 deve lembrar.",
  energy: 72,
  maxEnergy: 100,
  nodesRestored: 3,
  nodesTotal: 3,
  message: "Pronto",
  dialogue: null,
  threatState: "disabled",
  completed: true,
  paused: false,
  activeTool: "Âncora",
  sector: "core",
  sectorTitle: "Núcleo de Memória",
  fragmentsFound: ["arrival", "unowned", "damage", "choice"],
  relationship: { mira: "doubt", ponto: "association", nix: "recognition" },
  toolsUnlocked: ["Lente", "Pulso", "Âncora"],
  checkpoint: "core",
  ending: "vigil-pact",
  lastInteraction: "Configuração confirmada",
};

describe("SaveSystem", () => {
  it("serializes only resumable progress and restores it safely", () => {
    const store = storage();
    const saves = new SaveSystem(store);
    const payload = saves.save(snapshot);
    expect(payload?.version).toBe(1);
    expect(saves.hasSave()).toBe(true);
    expect(saves.read()?.snapshot.ending).toBe("vigil-pact");
    expect(saves.read()?.snapshot.fragmentsFound).toEqual(snapshot.fragmentsFound);
  });

  it("ignores malformed payloads and can clear a save", () => {
    const store = storage("{bad json");
    const saves = new SaveSystem(store);
    expect(saves.read()).toBeNull();
    store.value = JSON.stringify({ version: 99, snapshot: {} });
    expect(saves.read()).toBeNull();
    saves.clear();
    expect(store.value).toBeNull();
  });

  it("is inert when storage is unavailable", () => {
    const saves = new SaveSystem(null);
    expect(saves.save(snapshot)).toBeNull();
    expect(saves.read()).toBeNull();
    expect(saves.hasSave()).toBe(false);
  });
});
