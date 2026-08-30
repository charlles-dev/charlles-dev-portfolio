import { isWorldCellWalkable, worldCellKey, worldCellsEqual } from "@/game/world-2d/maps";
import type { WorldCell, WorldMapDefinition } from "@/game/world-2d/types";

const WORLD_DIRECTIONS: readonly WorldCell[] = [
  { column: 0, row: -1 },
  { column: 1, row: 0 },
  { column: 0, row: 1 },
  { column: -1, row: 0 },
];

export function findWorldPath(map: WorldMapDefinition, start: WorldCell, target: WorldCell): WorldCell[] {
  if (!isWorldCellWalkable(map, start) || !isWorldCellWalkable(map, target)) return [];
  if (worldCellsEqual(start, target)) return [];

  const queue: WorldCell[] = [start];
  const previous = new Map<string, WorldCell | null>([[worldCellKey(start), null]]);
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor];
    cursor += 1;

    if (worldCellsEqual(current, target)) break;

    for (const direction of WORLD_DIRECTIONS) {
      const next = {
        column: current.column + direction.column,
        row: current.row + direction.row,
      };
      const key = worldCellKey(next);
      if (previous.has(key) || !isWorldCellWalkable(map, next)) continue;
      previous.set(key, current);
      queue.push(next);
    }
  }

  if (!previous.has(worldCellKey(target))) return [];

  const path: WorldCell[] = [];
  let current: WorldCell | null = target;
  while (current && !worldCellsEqual(current, start)) {
    path.push(current);
    current = previous.get(worldCellKey(current)) ?? null;
  }
  return path.reverse();
}
