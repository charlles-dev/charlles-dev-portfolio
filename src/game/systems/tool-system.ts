export type LumenTool = "Lente" | "Pulso" | "Âncora";
export type ToolUseKind = "locked" | "depleted" | "pulse" | "scan" | "anchor";

export interface ToolUseInput {
  tool: LumenTool;
  energy: number;
  hasTool: boolean;
  targetInRange: boolean;
}

export interface ToolUseResult {
  kind: ToolUseKind;
  energy: number;
  success: boolean;
}

const costs: Record<LumenTool, number> = { Lente: 4, Pulso: 12, Âncora: 8 };

export function useLumenTool(input: ToolUseInput): ToolUseResult {
  if (!input.hasTool) return { kind: "locked", energy: input.energy, success: false };
  const cost = costs[input.tool];
  if (input.energy < cost) return { kind: "depleted", energy: input.energy, success: false };
  if (input.tool === "Pulso" && input.targetInRange) return { kind: "pulse", energy: input.energy - cost, success: true };
  if (input.tool === "Âncora") return { kind: "anchor", energy: input.energy - cost, success: true };
  return { kind: "scan", energy: input.energy - cost, success: true };
}
