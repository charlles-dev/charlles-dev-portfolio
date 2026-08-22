export type AssetKind = "sprite" | "texture" | "vfx" | "audio";
export type AssetStatus = "proxy" | "candidate" | "approved" | "rejected";

export interface AssetRecord {
  id: string;
  kind: AssetKind;
  status: AssetStatus;
  url: string | null;
  width: number;
  height: number;
  pivot: { x: number; y: number };
  states: string[];
  notes: string;
}

export const assetRegistry: Record<string, AssetRecord> = {
  playerProxy: {
    id: "playerProxy",
    kind: "sprite",
    status: "proxy",
    url: null,
    width: 256,
    height: 256,
    pivot: { x: 0.5, y: 0.92 },
    states: ["idle", "walk", "interact", "lumen", "dash", "hit"],
    notes: "Marcador geométrico de desenvolvimento; não é arte final.",
  },
  playerMaster: {
    id: "playerMaster",
    kind: "sprite",
    status: "candidate",
    url: null,
    width: 1920,
    height: 1920,
    pivot: { x: 0.5, y: 0.92 },
    states: ["reference-sheet"],
    notes: "Master v2 aguardando validação visual contra o avatar canônico.",
  },
  playerIdle: {
    id: "playerIdle",
    kind: "sprite",
    status: "rejected",
    url: null,
    width: 0,
    height: 0,
    pivot: { x: 0.5, y: 0.92 },
    states: ["idle"],
    notes: "Tentativas anteriores não aprovadas; não importar.",
  },
  mira: {
    id: "mira",
    kind: "sprite",
    status: "proxy",
    url: null,
    width: 192,
    height: 192,
    pivot: { x: 0.5, y: 0.92 },
    states: ["idle", "talk", "concerned", "recognition"],
    notes: "Aguardando produção de personagem após o player.",
  },
  ponto: {
    id: "ponto",
    kind: "sprite",
    status: "proxy",
    url: null,
    width: 160,
    height: 160,
    pivot: { x: 0.5, y: 0.92 },
    states: ["idle", "talk", "associate", "open"],
    notes: "Aguardando produção de personagem após o player.",
  },
  nix: {
    id: "nix",
    kind: "sprite",
    status: "proxy",
    url: null,
    width: 224,
    height: 224,
    pivot: { x: 0.5, y: 0.92 },
    states: ["patrol", "suspicious", "alert", "overload", "talk"],
    notes: "Aguardando produção de personagem após o player.",
  },
  drone: {
    id: "drone",
    kind: "sprite",
    status: "proxy",
    url: null,
    width: 128,
    height: 128,
    pivot: { x: 0.5, y: 0.5 },
    states: ["hover", "suspicious", "alert", "overload", "recovering"],
    notes: "Proxy permitido até a arte do drone ser aprovada.",
  },
};

export function canLoadAsset(id: string, allowDevelopmentProxy = true): boolean {
  const record = assetRegistry[id];
  if (!record || record.status === "rejected") return false;
  if (record.status === "approved" && Boolean(record.url)) return true;
  return allowDevelopmentProxy && record.status === "proxy";
}

export function approvedAssetIds(): string[] {
  return Object.values(assetRegistry).filter((record) => record.status === "approved" && Boolean(record.url)).map((record) => record.id);
}
