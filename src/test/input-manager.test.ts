import { afterEach, describe, expect, it, vi } from "vitest";

import { InputManager } from "@/game/input/input-manager";

describe("input manager", () => {
  const cleanups: Array<() => void> = [];

  afterEach(() => {
    cleanups.splice(0).forEach((cleanup) => cleanup());
  });

  it("maps keyboard movement and consumes one-shot actions once", () => {
    const manager = new InputManager({ onPause: vi.fn() });
    cleanups.push(manager.attach(window));
    window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyD" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyQ" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyE" }));

    const first = manager.sample();
    const second = manager.sample();
    expect(first).toMatchObject({ moveX: 1, moveZ: 0, jumpPressed: true, layerPressed: true, interactPressed: true });
    expect(second).toMatchObject({ moveX: 1, jumpPressed: false, layerPressed: false, interactPressed: false });
  });

  it("routes pause without mixing it into movement state", () => {
    const onPause = vi.fn();
    const manager = new InputManager({ onPause });
    cleanups.push(manager.attach(window));
    window.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));
    expect(onPause).toHaveBeenCalledOnce();
  });

  it("accepts normalized touch movement through the shared action contract", () => {
    const manager = new InputManager({ onPause: vi.fn() });
    manager.setTouchMovement(2, 0, true);
    expect(manager.sample()).toMatchObject({ moveX: 1, moveZ: 0, run: true, inputSource: "touch" });
  });

  it("queues the touch interaction once", () => {
    const manager = new InputManager({ onPause: vi.fn() });
    manager.queueInteract();
    expect(manager.sample()).toMatchObject({ interactPressed: true, inputSource: "touch" });
    expect(manager.sample().interactPressed).toBe(false);
  });
});
