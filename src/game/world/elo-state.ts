export type EloNodeId = "left" | "right";
export type EloStatus = "ready" | "selecting" | "linked";

export type EloState = {
  status: EloStatus;
  firstNode: EloNodeId | null;
};

export const initialEloState: EloState = {
  status: "ready",
  firstNode: null,
};

export function selectEloNode(state: EloState, node: EloNodeId): EloState {
  if (state.status === "linked") return state;
  if (state.status === "ready") return { status: "selecting", firstNode: node };
  if (state.firstNode === node) return initialEloState;
  return { status: "linked", firstNode: state.firstNode };
}
