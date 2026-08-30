export type WorldMapId = "home" | "street";
export type WorldFacing = "up" | "down" | "left" | "right";

export type WorldCell = {
  column: number;
  row: number;
};

export type WorldPortal = {
  id: string;
  cells: WorldCell[];
  targetMapId: WorldMapId;
  targetCell: WorldCell;
};

export type WorldEntity = {
  id: "desk" | "layerPortal" | "streetLamp" | "townGate";
  cell: WorldCell;
};

export type WorldMapDefinition = {
  id: WorldMapId;
  columns: number;
  rows: number;
  collision: readonly string[];
  spawn: WorldCell;
  portals: readonly WorldPortal[];
  entities: readonly WorldEntity[];
};

export type WorldSave = {
  version: 1;
  mapId: WorldMapId;
  player: WorldCell;
  facing: WorldFacing;
  discoveredMaps: WorldMapId[];
};
