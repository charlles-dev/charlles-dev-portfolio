export type WorldLayer = "surface" | "structure";

export function toggleWorldLayer(layer: WorldLayer): WorldLayer {
  return layer === "surface" ? "structure" : "surface";
}

export function approachLayerMix(current: number, layer: WorldLayer, deltaSeconds: number, reducedMotion = false) {
  const target = layer === "structure" ? 1 : 0;
  if (reducedMotion) return target;
  const blend = 1 - Math.exp(-Math.max(0, deltaSeconds) * 8.5);
  return current + (target - current) * blend;
}
