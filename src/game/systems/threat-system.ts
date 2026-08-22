import type { ThreatState } from "../core/game-state";

export interface ThreatEvaluation {
  state: ThreatState;
  changed: boolean;
  drainPerSecond: number;
  coneVisibility: number;
  telegraph: number;
}

export interface ThreatInput {
  distance: number;
  disabled: boolean;
}

export class ThreatSystem {
  private state: ThreatState = "patrol";

  getState(): ThreatState {
    return this.state;
  }

  evaluate(input: ThreatInput): ThreatEvaluation {
    const nextState: ThreatState = input.disabled ? "disabled" : input.distance < 1.55 ? "alert" : input.distance < 2.65 ? "suspicious" : "patrol";
    const changed = nextState !== this.state;
    this.state = nextState;
    return {
      state: nextState,
      changed,
      drainPerSecond: nextState === "alert" ? 2.5 : 0,
      coneVisibility: nextState === "alert" ? 0.22 : nextState === "suspicious" ? 0.14 : nextState === "disabled" ? 0.04 : 0.08,
      telegraph: nextState === "alert" ? 1 : nextState === "suspicious" ? 0.55 : nextState === "disabled" ? 0.12 : 0.25,
    };
  }

  reset(): void {
    this.state = "patrol";
  }
}
