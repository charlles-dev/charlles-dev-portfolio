import type {
  WorldCell,
  WorldEntity,
  WorldMapDefinition,
  WorldMapId,
  WorldPortal,
  WorldSave,
} from "@/game/world-2d/types";

const HOME_COLLISION = [
  "############",
  "############",
  "############",
  "############",
  "####....####",
  "###......###",
  "###......###",
  "##........##",
  "##........##",
  "##........##",
  "##......####",
  "##......####",
  "##......####",
  "##........##",
  "####....####",
  "#####..#####",
] as const;

const STREET_COLLISION = [
  "#####..#####",
  "#####..#####",
  "####....####",
  "###......###",
  "##........##",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "##........##",
  "###......###",
  "#####..#####",
] as const;

export const WORLD_MAPS: Record<WorldMapId, WorldMapDefinition> = {
  home: {
    id: "home",
    columns: 12,
    rows: 16,
    collision: HOME_COLLISION,
    spawn: { column: 5, row: 10 },
    portals: [
      {
        id: "home-exit",
        cells: [
          { column: 5, row: 15 },
          { column: 6, row: 15 },
        ],
        targetMapId: "street",
        targetCell: { column: 5, row: 2 },
      },
    ],
    entities: [
      { id: "desk", cell: { column: 5, row: 5 } },
      { id: "layerPortal", cell: { column: 9, row: 7 } },
    ],
  },
  street: {
    id: "street",
    columns: 12,
    rows: 16,
    collision: STREET_COLLISION,
    spawn: { column: 5, row: 2 },
    portals: [
      {
        id: "street-home",
        cells: [
          { column: 5, row: 1 },
          { column: 6, row: 1 },
        ],
        targetMapId: "home",
        targetCell: { column: 5, row: 14 },
      },
    ],
    entities: [
      { id: "streetLamp", cell: { column: 2, row: 7 } },
      { id: "townGate", cell: { column: 5, row: 14 } },
    ],
  },
};

export const INITIAL_WORLD_SAVE: WorldSave = {
  version: 1,
  mapId: "home",
  player: WORLD_MAPS.home.spawn,
  facing: "down",
  discoveredMaps: ["home"],
};

export function worldCellKey(cell: WorldCell) {
  return `${cell.column},${cell.row}`;
}

export function worldCellsEqual(first: WorldCell, second: WorldCell) {
  return first.column === second.column && first.row === second.row;
}

export function isWorldCellInside(map: WorldMapDefinition, cell: WorldCell) {
  return cell.column >= 0 && cell.row >= 0 && cell.column < map.columns && cell.row < map.rows;
}

export function isWorldCellWalkable(map: WorldMapDefinition, cell: WorldCell) {
  if (!isWorldCellInside(map, cell)) return false;
  return map.collision[cell.row]?.[cell.column] === ".";
}

export function findWorldPortal(map: WorldMapDefinition, cell: WorldCell): WorldPortal | undefined {
  return map.portals.find((portal) => portal.cells.some((portalCell) => worldCellsEqual(portalCell, cell)));
}

export function findNearbyWorldEntity(map: WorldMapDefinition, cell: WorldCell): WorldEntity | undefined {
  return map.entities.find(
    (entity) => Math.abs(entity.cell.column - cell.column) + Math.abs(entity.cell.row - cell.row) <= 1,
  );
}

export function isWorldSave(value: unknown): value is WorldSave {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<WorldSave>;
  if (candidate.version !== 1 || (candidate.mapId !== "home" && candidate.mapId !== "street")) return false;
  if (!candidate.player || typeof candidate.player.column !== "number" || typeof candidate.player.row !== "number") return false;
  if (!candidate.facing || !["up", "down", "left", "right"].includes(candidate.facing)) return false;
  if (!candidate.discoveredMaps?.every((mapId) => mapId === "home" || mapId === "street")) return false;
  return isWorldCellWalkable(WORLD_MAPS[candidate.mapId], candidate.player);
}
