export type GameAction = "up" | "down" | "left" | "right" | "interact" | "tool" | "dash" | "pause";

const keyMap: Record<string, GameAction> = {
  w: "up",
  ArrowUp: "up",
  s: "down",
  ArrowDown: "down",
  a: "left",
  ArrowLeft: "left",
  d: "right",
  ArrowRight: "right",
  e: "interact",
  x: "interact",
  " ": "tool",
  Shift: "dash",
  Escape: "pause",
};

export class InputManager {
  private readonly held = new Set<GameAction>();
  private readonly pressed = new Set<GameAction>();
  private readonly onKeyDown = (event: KeyboardEvent) => {
    const action = keyMap[event.key];
    if (!action) return;
    event.preventDefault();
    if (!this.held.has(action)) this.pressed.add(action);
    this.held.add(action);
  };
  private readonly onKeyUp = (event: KeyboardEvent) => {
    const action = keyMap[event.key];
    if (action) this.held.delete(action);
  };

  constructor(private readonly target: Window = window) {
    target.addEventListener("keydown", this.onKeyDown, { passive: false });
    target.addEventListener("keyup", this.onKeyUp);
    target.addEventListener("blur", this.clear);
  }

  isHeld(action: GameAction): boolean {
    return this.held.has(action);
  }

  consume(action: GameAction): boolean {
    const hasPressed = this.pressed.has(action);
    this.pressed.delete(action);
    return hasPressed;
  }

  press(action: GameAction): void {
    if (!this.held.has(action)) this.pressed.add(action);
    this.held.add(action);
  }

  release(action: GameAction): void {
    this.held.delete(action);
  }

  clear = (): void => {
    this.held.clear();
    this.pressed.clear();
  };

  dispose(): void {
    this.target.removeEventListener("keydown", this.onKeyDown);
    this.target.removeEventListener("keyup", this.onKeyUp);
    this.target.removeEventListener("blur", this.clear);
    this.clear();
  }
}
