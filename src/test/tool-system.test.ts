import { describe, expect, it } from "vitest";
import { useLumenTool } from "@/game/systems/tool-system";

describe("ToolSystem", () => {
  it("does not spend energy when a tool is locked or depleted", () => {
    expect(useLumenTool({ tool: "Pulso", energy: 50, hasTool: false, targetInRange: true })).toMatchObject({ kind: "locked", energy: 50, success: false });
    expect(useLumenTool({ tool: "Pulso", energy: 5, hasTool: true, targetInRange: true })).toMatchObject({ kind: "depleted", energy: 5, success: false });
  });

  it("spends the pulse cost only when a target is in range", () => {
    expect(useLumenTool({ tool: "Pulso", energy: 50, hasTool: true, targetInRange: true })).toMatchObject({ kind: "pulse", energy: 38, success: true });
    expect(useLumenTool({ tool: "Pulso", energy: 50, hasTool: true, targetInRange: false })).toMatchObject({ kind: "scan", energy: 38, success: true });
  });

  it("keeps costs deterministic for anchor and lens", () => {
    expect(useLumenTool({ tool: "Âncora", energy: 20, hasTool: true, targetInRange: false })).toMatchObject({ kind: "anchor", energy: 12, success: true });
    expect(useLumenTool({ tool: "Lente", energy: 20, hasTool: true, targetInRange: false })).toMatchObject({ kind: "scan", energy: 16, success: true });
  });
});
