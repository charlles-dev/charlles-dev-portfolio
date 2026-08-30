import { INITIAL_WORLD_SAVE, WORLD_MAPS, findWorldPortal, isWorldCellWalkable, isWorldSave } from "@/game/world-2d/maps";
import { findWorldPath } from "@/game/world-2d/pathfinding";

describe("World Migration 01", () => {
  it("finds a playable path from the home spawn to the exit", () => {
    const home = WORLD_MAPS.home;
    const exit = home.portals[0].cells[0];
    const path = findWorldPath(home, home.spawn, exit);

    expect(path.length).toBeGreaterThan(0);
    expect(path.at(-1)).toEqual(exit);
    expect(path.every((cell) => isWorldCellWalkable(home, cell))).toBe(true);
  });

  it("keeps the home and street transition reversible", () => {
    const homePortal = findWorldPortal(WORLD_MAPS.home, { column: 5, row: 15 });
    const streetPortal = findWorldPortal(WORLD_MAPS.street, { column: 5, row: 1 });

    expect(homePortal?.targetMapId).toBe("street");
    expect(streetPortal?.targetMapId).toBe("home");
    expect(isWorldCellWalkable(WORLD_MAPS.street, homePortal!.targetCell)).toBe(true);
    expect(isWorldCellWalkable(WORLD_MAPS.home, streetPortal!.targetCell)).toBe(true);
  });

  it("rejects saves positioned inside collision cells", () => {
    expect(isWorldSave(INITIAL_WORLD_SAVE)).toBe(true);
    expect(isWorldSave({ ...INITIAL_WORLD_SAVE, player: { column: 0, row: 0 } })).toBe(false);
  });

  it("does not route through walls", () => {
    expect(findWorldPath(WORLD_MAPS.home, WORLD_MAPS.home.spawn, { column: 0, row: 0 })).toEqual([]);
  });
});
