import { describe, expect, it } from "vitest";
import { approvedAssetIds, assetRegistry, canLoadAsset } from "@/game/data/asset-registry";

describe("asset registry gates", () => {
  it("never loads rejected player attempts", () => {
    expect(canLoadAsset("playerIdle")).toBe(false);
    expect(assetRegistry.playerIdle.status).toBe("rejected");
    expect(assetRegistry.playerIdle.url).toBeNull();
  });

  it("allows only explicit development proxies before art approval", () => {
    expect(canLoadAsset("playerProxy")).toBe(true);
    expect(canLoadAsset("playerProxy", false)).toBe(false);
    expect(canLoadAsset("playerMaster")).toBe(false);
  });

  it("does not report candidates as approved runtime art", () => {
    expect(approvedAssetIds()).not.toContain("playerMaster");
    expect(approvedAssetIds()).not.toContain("playerProxy");
  });
});
