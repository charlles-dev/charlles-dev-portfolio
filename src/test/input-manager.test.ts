import { describe, expect, it } from "vitest";
import { InputManager } from "@/game/input/input-manager";

function fakeWindow() {
  const listeners = new Map<string, EventListener>();
  return {
    addEventListener(type: string, listener: EventListener) { listeners.set(type, listener); },
    removeEventListener(type: string) { listeners.delete(type); },
    emit(type: string, event: Event) { listeners.get(type)?.(event); },
  };
}

describe("InputManager", () => {
  it("maps keyboard alternatives into semantic actions", () => {
    const target = fakeWindow();
    const input = new InputManager(target as unknown as Window);
    target.emit("keydown", new KeyboardEvent("keydown", { key: "m" }));
    expect(input.consume("map")).toBe(true);
    target.emit("keydown", new KeyboardEvent("keydown", { key: "J" }));
    expect(input.consume("memory")).toBe(true);
    input.dispose();
  });

  it("clears held and pressed actions when focus is lost", () => {
    const target = fakeWindow();
    const input = new InputManager(target as unknown as Window);
    target.emit("keydown", new KeyboardEvent("keydown", { key: "w" }));
    expect(input.isHeld("up")).toBe(true);
    target.emit("blur", new Event("blur"));
    expect(input.isHeld("up")).toBe(false);
    expect(input.consume("up")).toBe(false);
    input.dispose();
  });
});
