export type GameInputSnapshot = {
  moveX: number;
  moveZ: number;
  run: boolean;
  jumpPressed: boolean;
  layerPressed: boolean;
  interactPressed: boolean;
  inputSource: "keyboard" | "gamepad" | "touch";
};

type InputManagerOptions = {
  onPause: () => void;
};

const handledCodes = new Set([
  "KeyW", "KeyA", "KeyS", "KeyD",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "ShiftLeft", "ShiftRight", "Space", "KeyQ", "KeyE", "Escape",
]);

function deadzone(value: number, threshold = 0.18) {
  if (Math.abs(value) <= threshold) return 0;
  return Math.sign(value) * ((Math.abs(value) - threshold) / (1 - threshold));
}

export class InputManager {
  private readonly keys = new Set<string>();
  private readonly options: InputManagerOptions;
  private jumpQueued = false;
  private layerQueued = false;
  private interactQueued = false;
  private touchX = 0;
  private touchZ = 0;
  private touchRun = false;
  private previousGamepadJump = false;
  private previousGamepadLayer = false;
  private previousGamepadInteract = false;
  private previousGamepadPause = false;
  private oneShotSource: GameInputSnapshot["inputSource"] | null = null;

  constructor(options: InputManagerOptions) {
    this.options = options;
  }

  attach(target: Window) {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!handledCodes.has(event.code)) return;
      event.preventDefault();
      if (event.code === "Escape" && !event.repeat) {
        this.options.onPause();
        return;
      }
      this.keys.add(event.code);
      if (event.code === "Space" && !event.repeat) this.jumpQueued = true;
      if (event.code === "KeyQ" && !event.repeat) this.layerQueued = true;
      if (event.code === "KeyE" && !event.repeat) this.interactQueued = true;
    };
    const onKeyUp = (event: KeyboardEvent) => this.keys.delete(event.code);
    target.addEventListener("keydown", onKeyDown, { passive: false });
    target.addEventListener("keyup", onKeyUp);
    return () => {
      target.removeEventListener("keydown", onKeyDown);
      target.removeEventListener("keyup", onKeyUp);
    };
  }

  sample(): GameInputSnapshot {
    let moveX = (this.keys.has("KeyD") || this.keys.has("ArrowRight") ? 1 : 0)
      - (this.keys.has("KeyA") || this.keys.has("ArrowLeft") ? 1 : 0);
    let moveZ = (this.keys.has("KeyW") || this.keys.has("ArrowUp") ? 1 : 0)
      - (this.keys.has("KeyS") || this.keys.has("ArrowDown") ? 1 : 0);
    let run = this.keys.has("ShiftLeft") || this.keys.has("ShiftRight");
    let source: GameInputSnapshot["inputSource"] = "keyboard";

    const gamepad = typeof navigator !== "undefined"
      ? Array.from(navigator.getGamepads?.() ?? []).find(Boolean)
      : undefined;
    if (gamepad) {
      const gamepadX = deadzone(gamepad.axes[0] ?? 0);
      const gamepadZ = -deadzone(gamepad.axes[1] ?? 0);
      if (Math.hypot(gamepadX, gamepadZ) > Math.hypot(moveX, moveZ) * 0.5) {
        moveX = gamepadX;
        moveZ = gamepadZ;
        source = "gamepad";
      }
      run ||= Boolean(gamepad.buttons[5]?.pressed || gamepad.buttons[10]?.pressed);
      const gamepadJump = Boolean(gamepad.buttons[0]?.pressed);
      const gamepadLayer = Boolean(gamepad.buttons[4]?.pressed);
      const gamepadInteract = Boolean(gamepad.buttons[2]?.pressed);
      const gamepadPause = Boolean(gamepad.buttons[9]?.pressed);
      if (gamepadJump && !this.previousGamepadJump) {
        this.jumpQueued = true;
        this.oneShotSource = "gamepad";
      }
      if (gamepadLayer && !this.previousGamepadLayer) {
        this.layerQueued = true;
        this.oneShotSource = "gamepad";
      }
      if (gamepadInteract && !this.previousGamepadInteract) {
        this.interactQueued = true;
        this.oneShotSource = "gamepad";
      }
      if (gamepadPause && !this.previousGamepadPause) this.options.onPause();
      this.previousGamepadJump = gamepadJump;
      this.previousGamepadLayer = gamepadLayer;
      this.previousGamepadInteract = gamepadInteract;
      this.previousGamepadPause = gamepadPause;
    }

    if (Math.hypot(this.touchX, this.touchZ) > 0.01) {
      moveX = this.touchX;
      moveZ = this.touchZ;
      run = this.touchRun;
      source = "touch";
    }
    if (this.oneShotSource) source = this.oneShotSource;

    const snapshot: GameInputSnapshot = {
      moveX,
      moveZ,
      run,
      jumpPressed: this.jumpQueued,
      layerPressed: this.layerQueued,
      interactPressed: this.interactQueued,
      inputSource: source,
    };
    this.jumpQueued = false;
    this.layerQueued = false;
    this.interactQueued = false;
    this.oneShotSource = null;
    return snapshot;
  }

  queueLayerToggle(source: GameInputSnapshot["inputSource"] = "touch") {
    this.layerQueued = true;
    this.oneShotSource = source;
  }

  queueJump(source: GameInputSnapshot["inputSource"] = "touch") {
    this.jumpQueued = true;
    this.oneShotSource = source;
  }

  queueInteract(source: GameInputSnapshot["inputSource"] = "touch") {
    this.interactQueued = true;
    this.oneShotSource = source;
  }

  setTouchMovement(x: number, z: number, run = false) {
    const length = Math.hypot(x, z);
    this.touchX = length > 1 ? x / length : x;
    this.touchZ = length > 1 ? z / length : z;
    this.touchRun = run;
  }

  clear() {
    this.keys.clear();
    this.jumpQueued = false;
    this.layerQueued = false;
    this.interactQueued = false;
    this.oneShotSource = null;
    this.touchX = 0;
    this.touchZ = 0;
    this.touchRun = false;
  }
}
