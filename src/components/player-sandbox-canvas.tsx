"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { AnimationGroup } from "@babylonjs/core/Animations/animationGroup.js";

import { InputManager, type GameInputSnapshot } from "@/game/input/input-manager";
import {
  initialPlayerSnapshot,
  stepPlayer,
  type PlayerMotionState,
  type PlayerSnapshot,
} from "@/game/player/controller";
import {
  initialEloState,
  selectEloNode,
  type EloNodeId,
  type EloStatus,
} from "@/game/world/elo-state";
import { approachLayerMix, toggleWorldLayer, type WorldLayer } from "@/game/world/world-layer";
import type { Locale } from "@/lib/i18n";

type QualityPreset = "low" | "medium" | "high";
type RuntimeStatus = "loading" | "ready" | "error";

type Telemetry = {
  state: PlayerMotionState;
  speed: number;
  frameTime: number;
  fps: number;
  grounded: boolean;
  quality: QualityPreset;
  animation: string;
  inputSource: GameInputSnapshot["inputSource"];
  position: string;
};

const initialTelemetry: Telemetry = {
  state: "Idle",
  speed: 0,
  frameTime: 0,
  fps: 0,
  grounded: true,
  quality: "medium",
  animation: "Idle happy · provisório",
  inputSource: "keyboard",
  position: "0.00 / -2.40",
};

const copy: Record<Locale, {
  canvas: string;
  loading: string;
  error: string;
  retry: string;
  paused: string;
  pausedDetail: string;
  resume: string;
  state: string;
  speed: string;
  frame: string;
  grounded: string;
  quality: string;
  animation: string;
  yes: string;
  no: string;
  reset: string;
  pause: string;
  consoleDescription: string;
  runHint: string;
  jumpHint: string;
  pauseHint: string;
  qualityLow: string;
  qualityMedium: string;
  qualityHigh: string;
  provisional: string;
  fallProxy: string;
  heavyLandingProxy: string;
  layer: string;
  surface: string;
  structure: string;
  enterStructure: string;
  returnSurface: string;
  layerHint: string;
  input: string;
  position: string;
  mechanicalDescription: string;
  elo: string;
  eloReady: string;
  eloSelecting: string;
  eloLinked: string;
  nearestNode: string;
  noNode: string;
  leftNode: string;
  rightNode: string;
  interactHint: string;
  enterStructureForElo: string;
  approachNode: string;
  selectNode: string;
  cancelSelection: string;
  connectSecondNode: string;
  eloStabilized: string;
  objective: string;
  objectiveEnterStructure: string;
  objectiveAnchor: string;
  objectiveConnect: string;
  objectiveReturnSurface: string;
  objectiveReachExit: string;
  objectiveComplete: string;
  roomComplete: string;
  puzzleDescription: string;
}> = {
  "pt-BR": {
    canvas: "Elo Sandbox 01. Use WASD ou as setas para mover, Q para trocar a camada, E para conectar, Espaço para saltar e Escape para pausar.",
    loading: "Montando graybox e preparando o rig…",
    error: "O sandbox não conseguiu iniciar neste navegador.",
    retry: "Tentar iniciar novamente",
    paused: "Simulação pausada",
    pausedDetail: "A física e a animação estão congeladas. O jogo também pausa quando a aba perde foco.",
    resume: "Retomar simulação",
    state: "Estado",
    speed: "Velocidade",
    frame: "Frame time",
    grounded: "No chão",
    quality: "Qualidade",
    animation: "Clip",
    yes: "sim",
    no: "não",
    reset: "Reposicionar jogador",
    pause: "Pausar simulação",
    consoleDescription: "Graybox funcional. Sem arte final, sem física escondida.",
    runHint: "Shift · correr",
    jumpHint: "Espaço · saltar",
    pauseHint: "Esc · pausar",
    qualityLow: "reduzida",
    qualityMedium: "média",
    qualityHigh: "alta",
    provisional: "provisório",
    fallProxy: "queda provisória",
    heavyLandingProxy: "pouso pesado provisório",
    layer: "Camada",
    surface: "Superfície",
    structure: "Estrutura",
    enterStructure: "Entrar na Estrutura",
    returnSurface: "Voltar à Superfície",
    layerHint: "Q · trocar camada",
    input: "Entrada",
    position: "Posição X/Z",
    mechanicalDescription: "Primeira regra do mundo: a camada altera leitura e colisão.",
    elo: "Elo",
    eloReady: "pronto",
    eloSelecting: "primeiro nó fixado",
    eloLinked: "estabilizado",
    nearestNode: "Nó próximo",
    noNode: "nenhum",
    leftNode: "esquerdo",
    rightNode: "direito",
    interactHint: "E · usar Elo",
    enterStructureForElo: "Entre na Estrutura para usar o Elo",
    approachNode: "Aproxime-se de um nó",
    selectNode: "Selecionar nó",
    cancelSelection: "Cancelar seleção",
    connectSecondNode: "Conectar segundo nó",
    eloStabilized: "Elo estabilizado · passagem aberta",
    objective: "Objetivo",
    objectiveEnterStructure: "Encontre a Estrutura",
    objectiveAnchor: "Ancore o primeiro nó",
    objectiveConnect: "Atravesse e conecte o segundo nó",
    objectiveReturnSurface: "Volte à Superfície",
    objectiveReachExit: "Alcance a saída",
    objectiveComplete: "Sala concluída",
    roomComplete: "Circuito estabilizado. A saída respondeu.",
    puzzleDescription: "Primeira sala: leia as camadas, feche o circuito e encontre a saída.",
  },
  en: {
    canvas: "Link Sandbox 01. Use WASD or arrow keys to move, Q to shift layer, E to connect, Space to jump and Escape to pause.",
    loading: "Building the graybox and preparing the rig…",
    error: "The sandbox could not start in this browser.",
    retry: "Try starting again",
    paused: "Simulation paused",
    pausedDetail: "Physics and animation are frozen. The game also pauses when the tab loses focus.",
    resume: "Resume simulation",
    state: "State",
    speed: "Speed",
    frame: "Frame time",
    grounded: "Grounded",
    quality: "Quality",
    animation: "Clip",
    yes: "yes",
    no: "no",
    reset: "Reset player",
    pause: "Pause simulation",
    consoleDescription: "Functional graybox. No final art, no hidden physics.",
    runHint: "Shift · run",
    jumpHint: "Space · jump",
    pauseHint: "Esc · pause",
    qualityLow: "reduced",
    qualityMedium: "medium",
    qualityHigh: "high",
    provisional: "temporary",
    fallProxy: "temporary fall proxy",
    heavyLandingProxy: "temporary heavy landing proxy",
    layer: "Layer",
    surface: "Surface",
    structure: "Structure",
    enterStructure: "Enter Structure",
    returnSurface: "Return to Surface",
    layerHint: "Q · shift layer",
    input: "Input",
    position: "Position X/Z",
    mechanicalDescription: "The world's first rule: the layer changes readability and collision.",
    elo: "Link",
    eloReady: "ready",
    eloSelecting: "first node anchored",
    eloLinked: "stabilized",
    nearestNode: "Nearby node",
    noNode: "none",
    leftNode: "left",
    rightNode: "right",
    interactHint: "E · use Link",
    enterStructureForElo: "Enter Structure to use the Link",
    approachNode: "Approach a node",
    selectNode: "Select node",
    cancelSelection: "Cancel selection",
    connectSecondNode: "Connect second node",
    eloStabilized: "Link stabilized · passage open",
    objective: "Objective",
    objectiveEnterStructure: "Find the Structure",
    objectiveAnchor: "Anchor the first node",
    objectiveConnect: "Cross and connect the second node",
    objectiveReturnSurface: "Return to Surface",
    objectiveReachExit: "Reach the exit",
    objectiveComplete: "Room complete",
    roomComplete: "Circuit stabilized. The exit responded.",
    puzzleDescription: "First room: read the layers, close the circuit and find the exit.",
  },
  es: {
    canvas: "Vínculo Sandbox 01. Usa WASD o las flechas para moverte, Q para cambiar de capa, E para conectar, Espacio para saltar y Escape para pausar.",
    loading: "Montando el graybox y preparando el rig…",
    error: "El sandbox no pudo iniciarse en este navegador.",
    retry: "Intentar iniciar de nuevo",
    paused: "Simulación en pausa",
    pausedDetail: "La física y la animación están congeladas. El juego también se pausa cuando la pestaña pierde el foco.",
    resume: "Reanudar simulación",
    state: "Estado",
    speed: "Velocidad",
    frame: "Frame time",
    grounded: "En el suelo",
    quality: "Calidad",
    animation: "Clip",
    yes: "sí",
    no: "no",
    reset: "Reposicionar jugador",
    pause: "Pausar simulación",
    consoleDescription: "Graybox funcional. Sin arte final ni física oculta.",
    runHint: "Shift · correr",
    jumpHint: "Espacio · saltar",
    pauseHint: "Esc · pausar",
    qualityLow: "reducida",
    qualityMedium: "media",
    qualityHigh: "alta",
    provisional: "provisional",
    fallProxy: "caída provisional",
    heavyLandingProxy: "aterrizaje pesado provisional",
    layer: "Capa",
    surface: "Superficie",
    structure: "Estructura",
    enterStructure: "Entrar en Estructura",
    returnSurface: "Volver a Superficie",
    layerHint: "Q · cambiar capa",
    input: "Entrada",
    position: "Posición X/Z",
    mechanicalDescription: "La primera regla del mundo: la capa cambia lectura y colisión.",
    elo: "Vínculo",
    eloReady: "listo",
    eloSelecting: "primer nodo fijado",
    eloLinked: "estabilizado",
    nearestNode: "Nodo cercano",
    noNode: "ninguno",
    leftNode: "izquierdo",
    rightNode: "derecho",
    interactHint: "E · usar Vínculo",
    enterStructureForElo: "Entra en Estructura para usar el Vínculo",
    approachNode: "Acércate a un nodo",
    selectNode: "Seleccionar nodo",
    cancelSelection: "Cancelar selección",
    connectSecondNode: "Conectar segundo nodo",
    eloStabilized: "Vínculo estabilizado · paso abierto",
    objective: "Objetivo",
    objectiveEnterStructure: "Encuentra la Estructura",
    objectiveAnchor: "Fija el primer nodo",
    objectiveConnect: "Cruza y conecta el segundo nodo",
    objectiveReturnSurface: "Vuelve a Superficie",
    objectiveReachExit: "Alcanza la salida",
    objectiveComplete: "Sala completada",
    roomComplete: "Circuito estabilizado. La salida respondió.",
    puzzleDescription: "Primera sala: lee las capas, cierra el circuito y encuentra la salida.",
  },
};

const animationNames: Record<PlayerMotionState, string> = {
  Idle: "Idle_happy_remap",
  Walk: "Happy Walk_remap",
  Run: "Running_remap",
  Jump: "Jump_remap",
  Falling: "Jump_remap",
  Landing: "Idle_happy_remap",
};

function detectQuality(): QualityPreset {
  const device = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency || 4;
  const memory = device.deviceMemory || 4;
  if (window.innerWidth < 720 || cores <= 4 || memory <= 4) return "low";
  if (cores <= 8 || memory <= 8) return "medium";
  return "high";
}

function groundAt(x: number, z: number, mode: PrototypeMode, layer: WorldLayer, barrierSolid = true, gateLinked = false) {
  if (x < -8.2 || x > 8.2 || z < -5.2 || z > 5.2) return { height: -20, blocked: true };

  let height = 0;
  if (x >= -6 && x <= -2 && z >= 1.5 && z <= 4) height = Math.max(height, ((x + 6) / 4) * 1.2);
  if (x > -2 && x <= -0.35 && z >= 1.5 && z <= 4) height = Math.max(height, 1.2);

  if (x >= 2 && x <= 5 && z >= 1.5 && z <= 3.5) {
    const step = Math.min(5, Math.floor((x - 2) / 0.6) + 1);
    height = Math.max(height, step * 0.22);
  }
  if (x > 5 && x <= 6.35 && z >= 1.5 && z <= 3.5) height = Math.max(height, 1.1);

  if (x >= -0.8 && x <= 0.8 && z >= 0.7 && z <= 1.9) height = Math.max(height, 1.05);
  const barrierHalfWidth = mode === "puzzle" ? 8.2 : 2;
  if (mode !== "sandbox" && layer === "surface" && barrierSolid && !gateLinked && x >= -barrierHalfWidth && x <= barrierHalfWidth && z >= -0.15 && z <= 0.35) {
    height = Math.max(height, 2.1);
  }
  return { height };
}

type PrototypeMode = "sandbox" | "mechanical" | "puzzle";

const eloNodePositions: Record<EloNodeId, { x: number; y: number; z: number }> = {
  left: { x: -1.45, y: 1.15, z: -0.23 },
  right: { x: 1.45, y: 1.15, z: -0.23 },
};

const puzzleNodePositions: Record<EloNodeId, { x: number; y: number; z: number }> = {
  left: { x: -2.1, y: 1.15, z: -0.72 },
  right: { x: 2.1, y: 1.15, z: 0.82 },
};

export function PlayerSandboxCanvas({ locale, mode = "sandbox" }: { locale: Locale; mode?: PrototypeMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const pauseRef = useRef<((paused?: boolean) => void) | null>(null);
  const layerToggleRef = useRef<(() => void) | null>(null);
  const interactRef = useRef<(() => void) | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<RuntimeStatus>("loading");
  const [paused, setPaused] = useState(false);
  const [worldLayer, setWorldLayer] = useState<WorldLayer>("surface");
  const [eloStatus, setEloStatus] = useState<EloStatus>("ready");
  const [selectedNode, setSelectedNode] = useState<EloNodeId | null>(null);
  const [nearNode, setNearNode] = useState<EloNodeId | null>(null);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [telemetry, setTelemetry] = useState(initialTelemetry);
  const labels = copy[locale];
  const hasWorldMechanics = mode !== "sandbox";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let disposeScene = () => {};
    setStatus("loading");

    const initialize = async () => {
      try {
        const [
          { Engine },
          { Scene },
          { FreeCamera },
          { Vector3 },
          { Color3, Color4 },
          { HemisphericLight },
          { DirectionalLight },
          { MeshBuilder },
          { StandardMaterial },
          { TransformNode },
          { SceneLoader },
        ] = await Promise.all([
          import("@babylonjs/core/Engines/engine.js"),
          import("@babylonjs/core/scene.js"),
          import("@babylonjs/core/Cameras/freeCamera.js"),
          import("@babylonjs/core/Maths/math.vector.js"),
          import("@babylonjs/core/Maths/math.color.js"),
          import("@babylonjs/core/Lights/hemisphericLight.js"),
          import("@babylonjs/core/Lights/directionalLight.js"),
          import("@babylonjs/core/Meshes/meshBuilder.js"),
          import("@babylonjs/core/Materials/standardMaterial.js"),
          import("@babylonjs/core/Meshes/transformNode.js"),
          import("@babylonjs/core/Loading/sceneLoader.js"),
        ]);
        await import("@babylonjs/loaders/glTF/index.js");
        if (disposed) return;
        const activeEloNodePositions = mode === "puzzle" ? puzzleNodePositions : eloNodePositions;

        let quality = detectQuality();
        const engine = new Engine(canvas, true, {
          antialias: true,
          preserveDrawingBuffer: false,
          stencil: false,
          adaptToDeviceRatio: false,
        });
        const applyQuality = (next: QualityPreset) => {
          quality = next;
          const ratio = window.devicePixelRatio || 1;
          const targetRatio = next === "high" ? Math.min(ratio, 1.5) : next === "medium" ? Math.min(ratio, 1.15) : 0.85;
          engine.setHardwareScalingLevel(Math.max(1, ratio / targetRatio));
          setTelemetry((current) => ({ ...current, quality: next }));
        };
        applyQuality(quality);

        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.055, 0.06, 0.057, 1);
        scene.imageProcessingConfiguration.contrast = 1.06;
        scene.imageProcessingConfiguration.exposure = 1.02;

        const camera = new FreeCamera("sandbox-camera", new Vector3(0, 3.6, -9.5), scene);
        camera.fov = 0.72;
        camera.minZ = 0.1;
        camera.inputs.clear();

        const ambient = new HemisphericLight("sandbox-ambient", new Vector3(0, 1, 0), scene);
        ambient.intensity = 1.05;
        ambient.diffuse = new Color3(0.78, 0.82, 0.79);
        ambient.groundColor = new Color3(0.12, 0.13, 0.12);
        const key = new DirectionalLight("sandbox-key", new Vector3(-0.45, -1, 0.35), scene);
        key.position = new Vector3(4, 8, -5);
        key.intensity = 1.65;

        const floorMaterial = new StandardMaterial("graybox-floor", scene);
        floorMaterial.diffuseColor = new Color3(0.25, 0.265, 0.255);
        floorMaterial.specularColor = new Color3(0.035, 0.04, 0.035);
        const raisedMaterial = new StandardMaterial("graybox-raised", scene);
        raisedMaterial.diffuseColor = new Color3(0.34, 0.355, 0.345);
        raisedMaterial.specularColor = new Color3(0.05, 0.05, 0.05);
        const boundaryMaterial = new StandardMaterial("graybox-boundary", scene);
        boundaryMaterial.diffuseColor = new Color3(0.145, 0.155, 0.15);
        const phaseBarrierMaterial = new StandardMaterial("phase-barrier", scene);
        phaseBarrierMaterial.diffuseColor = new Color3(0.43, 0.455, 0.44);
        phaseBarrierMaterial.specularColor = new Color3(0.04, 0.05, 0.045);
        const createNodeMaterial = (name: string) => {
          const material = new StandardMaterial(name, scene);
          material.diffuseColor = new Color3(0.04, 0.12, 0.07);
          material.emissiveColor = new Color3(0.16, 0.8, 0.36);
          material.alpha = 0;
          return material;
        };
        const leftNodeMaterial = createNodeMaterial("structure-node-left-material");
        const rightNodeMaterial = createNodeMaterial("structure-node-right-material");
        const goalMaterial = new StandardMaterial("puzzle-goal-material", scene);
        goalMaterial.diffuseColor = new Color3(0.025, 0.11, 0.055);
        goalMaterial.emissiveColor = new Color3(0.12, 0.7, 0.3);
        goalMaterial.alpha = 0;
        const surfaceFloorColor = floorMaterial.diffuseColor.clone();
        const structureFloorColor = new Color3(0.025, 0.03, 0.027);
        const surfaceRaisedColor = raisedMaterial.diffuseColor.clone();
        const structureRaisedColor = new Color3(0.055, 0.065, 0.058);
        const surfaceBoundaryColor = boundaryMaterial.diffuseColor.clone();
        const structureBoundaryColor = new Color3(0.018, 0.024, 0.02);
        const surfaceBarrierColor = phaseBarrierMaterial.diffuseColor.clone();
        const structureBarrierColor = new Color3(0.1, 0.34, 0.18);

        const box = (name: string, width: number, height: number, depth: number, x: number, y: number, z: number, material = raisedMaterial) => {
          const mesh = MeshBuilder.CreateBox(name, { width, height, depth }, scene);
          mesh.position.set(x, y, z);
          mesh.material = material;
          return mesh;
        };

        box("floor", 17, 0.24, 11, 0, -0.12, 0, floorMaterial);
        box("back-wall", 17.5, 2.8, 0.25, 0, 1.4, 5.5, boundaryMaterial);
        box("left-wall", 0.25, 2.1, 11, -8.5, 1.05, 0, boundaryMaterial);
        box("right-wall", 0.25, 2.1, 11, 8.5, 1.05, 0, boundaryMaterial);
        const ramp = box("ramp", 4.1, 0.14, 2.5, -4, 0.6, 2.75);
        ramp.rotation.z = Math.atan2(1.2, 4);
        box("ramp-platform", 1.65, 1.2, 2.5, -1.175, 0.6, 2.75);
        for (let index = 0; index < 5; index += 1) {
          const height = (index + 1) * 0.22;
          box(`step-${index + 1}`, 0.6, height, 2, 2.3 + index * 0.6, height / 2, 2.5);
        }
        box("step-platform", 1.35, 1.1, 2, 5.675, 0.55, 2.5);
        box("jump-block", 1.6, 1.05, 1.2, 0, 0.525, 1.3);
        const phaseBarrier = hasWorldMechanics
          ? box("surface-barrier", mode === "puzzle" ? 17 : 4, 2.1, 0.5, 0, 1.05, 0.1, phaseBarrierMaterial)
          : null;
        let eloLine: ReturnType<typeof MeshBuilder.CreateLines> | null = null;
        if (hasWorldMechanics) {
          const leftNode = MeshBuilder.CreateSphere("structure-node-left", { diameter: 0.28, segments: 16 }, scene);
          leftNode.position.set(activeEloNodePositions.left.x, activeEloNodePositions.left.y, activeEloNodePositions.left.z);
          leftNode.material = leftNodeMaterial;
          const rightNode = MeshBuilder.CreateSphere("structure-node-right", { diameter: 0.28, segments: 16 }, scene);
          rightNode.position.set(activeEloNodePositions.right.x, activeEloNodePositions.right.y, activeEloNodePositions.right.z);
          rightNode.material = rightNodeMaterial;
          eloLine = MeshBuilder.CreateLines("elo-link", {
            points: [
              new Vector3(activeEloNodePositions.left.x, activeEloNodePositions.left.y, activeEloNodePositions.left.z),
              new Vector3(activeEloNodePositions.right.x, activeEloNodePositions.right.y, activeEloNodePositions.right.z),
            ],
          }, scene);
          eloLine.color = new Color3(0.24, 1, 0.48);
          eloLine.alpha = 0;
          eloLine.isPickable = false;
        }
        if (mode === "puzzle") {
          box("goal-left", 0.16, 2.6, 0.16, -2.25, 1.3, 4.65, goalMaterial);
          box("goal-right", 0.16, 2.6, 0.16, 2.25, 1.3, 4.65, goalMaterial);
          box("goal-header", 4.66, 0.16, 0.16, 0, 2.55, 4.65, goalMaterial);
        }

        const playerRoot = new TransformNode("player-controller", scene);
        let player: PlayerSnapshot = { ...initialPlayerSnapshot };
        playerRoot.position.set(player.x, player.y, player.z);

        const result = await SceneLoader.ImportMeshAsync(
          "",
          "/assets/game/characters/",
          "charlles-rigged-gameplay.glb",
          scene,
        );
        if (disposed) {
          scene.dispose();
          engine.dispose();
          return;
        }

        const modelRoot = result.meshes[0];
        const bounds = modelRoot.getHierarchyBoundingVectors(true);
        modelRoot.parent = playerRoot;
        modelRoot.position.y = -bounds.min.y;
        modelRoot.rotation.y = Math.PI;

        const animationGroups = new Map(result.animationGroups.map((group) => [group.name, group]));
        const animationWeights = new Map<AnimationGroup, number>();
        let activeAnimation: AnimationGroup | null = null;
        let activeMotionState: PlayerMotionState | null = null;
        let animationLabel = `Idle happy · ${labels.provisional}`;

        for (const group of result.animationGroups) {
          for (const targeted of group.targetedAnimations) {
            targeted.animation.enableBlending = true;
            targeted.animation.blendingSpeed = 0.075;
          }
        }

        const transitionAnimation = (state: PlayerMotionState, landingWeight = player.landingWeight) => {
          if (state === activeMotionState) return;
          activeMotionState = state;

          if (state === "Falling" && activeAnimation?.name === animationNames.Jump) {
            activeAnimation.goToFrame(activeAnimation.from + (activeAnimation.to - activeAnimation.from) * 0.72);
            activeAnimation.pause();
            animationLabel = `Jump · ${labels.fallProxy}`;
            return;
          }

          const requestedName = state === "Landing" && landingWeight === "heavy"
            ? "Getting Up_remap"
            : animationNames[state];
          const next = animationGroups.get(requestedName) ?? animationGroups.get(animationNames.Idle) ?? result.animationGroups[0];
          if (!next) return;
          const loops = state === "Idle" || state === "Walk" || state === "Run";
          next.start(loops, 1, next.from, next.to, false);
          next.setWeightForAllAnimatables(next === activeAnimation ? 1 : 0);
          animationWeights.set(next, next === activeAnimation ? 1 : 0);
          activeAnimation = next;
          animationLabel = state === "Landing"
            ? landingWeight === "heavy" ? `Getting Up · ${labels.heavyLandingProxy}` : `Idle happy · ${labels.provisional}`
            : state === "Falling" ? `Jump · ${labels.fallProxy}` : next.name.replace(/_remap$/, "").replaceAll("_", " ");
        };

        transitionAnimation("Idle");

        let isPaused = false;
        let inputManager: InputManager | null = null;
        let runtimeLayer: WorldLayer = "surface";
        let layerMix = 0;
        let runtimeEloState = { ...initialEloState };
        let runtimeNearNode: EloNodeId | null = null;
        let linkVisualMix = 0;
        let gateVisualMix = 0;
        let gateLinked = false;
        let runtimePuzzleComplete = false;
        let phaseGrace = false;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const setRuntimeLayer = (next = toggleWorldLayer(runtimeLayer)) => {
          if (!hasWorldMechanics || next === runtimeLayer) return;
          phaseGrace = !gateLinked && next === "surface"
            && player.x >= -2.3 && player.x <= 2.3
            && player.z >= -0.45 && player.z <= 0.65;
          runtimeLayer = next;
          setWorldLayer(next);
        };
        const interactWithElo = () => {
          if (!hasWorldMechanics || runtimeLayer !== "structure" || !runtimeNearNode || gateLinked) return;
          runtimeEloState = selectEloNode(runtimeEloState, runtimeNearNode);
          gateLinked = runtimeEloState.status === "linked";
          if (gateLinked) phaseGrace = false;
          setEloStatus(runtimeEloState.status);
          setSelectedNode(runtimeEloState.firstNode);
        };
        const setRuntimePaused = (next = !isPaused) => {
          if (next === isPaused) return;
          isPaused = next;
          setPaused(next);
          inputManager?.clear();
          if (next) {
            for (const group of result.animationGroups) group.pause();
          } else {
            for (const group of result.animationGroups) {
              if (animationWeights.has(group)) group.play(group === activeAnimation && (player.state === "Idle" || player.state === "Walk" || player.state === "Run"));
            }
            lastFrame = performance.now();
          }
        };
        pauseRef.current = setRuntimePaused;
        const manager = new InputManager({ onPause: () => setRuntimePaused() });
        inputManager = manager;
        layerToggleRef.current = () => manager.queueLayerToggle();
        interactRef.current = () => manager.queueInteract();
        const detachInput = manager.attach(window);

        const resetPlayer = () => {
          player = { ...initialPlayerSnapshot };
          playerRoot.position.set(player.x, player.y, player.z);
          playerRoot.rotation.y = player.facing;
          activeMotionState = null;
          transitionAnimation("Idle");
          runtimeEloState = { ...initialEloState };
          runtimeNearNode = null;
          linkVisualMix = 0;
          gateVisualMix = 0;
          gateLinked = false;
          runtimePuzzleComplete = false;
          phaseGrace = false;
          setEloStatus("ready");
          setSelectedNode(null);
          setNearNode(null);
          setPuzzleComplete(false);
          setRuntimeLayer("surface");
          canvas.focus();
        };
        resetRef.current = resetPlayer;

        const pauseForWindowBlur = () => setRuntimePaused(true);
        const pauseForHiddenTab = () => {
          if (document.hidden) setRuntimePaused(true);
        };
        window.addEventListener("blur", pauseForWindowBlur);
        document.addEventListener("visibilitychange", pauseForHiddenTab);

        let lastFrame = performance.now();
        let lastTelemetry = 0;
        let slowFrameBudget = 0;
        let cameraX = 0;
        let cameraY = 3.6;
        let cameraZ = -9.5;
        let inputSource: GameInputSnapshot["inputSource"] = "keyboard";
        const cameraTarget = new Vector3(0, 1.05, -1.4);

        engine.runRenderLoop(() => {
          const now = performance.now();
          const rawDelta = (now - lastFrame) / 1000;
          lastFrame = now;

          if (!isPaused) {
            const input = manager.sample();
            inputSource = input.inputSource;
            if (!runtimePuzzleComplete && input.layerPressed) setRuntimeLayer();
            if (!runtimePuzzleComplete && input.interactPressed) interactWithElo();
            if (phaseGrace && (player.x < -2.3 || player.x > 2.3 || player.z < -0.45 || player.z > 0.65)) {
              phaseGrace = false;
            }
            player = stepPlayer(player, {
              x: runtimePuzzleComplete ? 0 : input.moveX,
              z: runtimePuzzleComplete ? 0 : input.moveZ,
              run: runtimePuzzleComplete ? false : input.run,
              jumpPressed: runtimePuzzleComplete ? false : input.jumpPressed,
            }, rawDelta, (x, z) => groundAt(x, z, mode, runtimeLayer, !phaseGrace, gateLinked));

            playerRoot.position.set(player.x, player.y, player.z);
            playerRoot.rotation.y = player.facing;
            transitionAnimation(player.state, player.landingWeight);

            const speed = Math.hypot(player.velocityX, player.velocityZ);
            const animationSpeed = player.state === "Run" ? Math.max(0.72, speed / 4.2) : player.state === "Walk" ? Math.max(0.65, speed / 2.15) : 1;
            if (activeAnimation && (player.state === "Walk" || player.state === "Run")) activeAnimation.speedRatio = animationSpeed;

            const fade = 1 - Math.exp(-rawDelta * 11);
            for (const [group, weight] of animationWeights) {
              const target = group === activeAnimation ? 1 : 0;
              const nextWeight = weight + (target - weight) * fade;
              group.setWeightForAllAnimatables(nextWeight);
              animationWeights.set(group, nextWeight);
              if (target === 0 && nextWeight < 0.01) {
                group.stop();
                animationWeights.delete(group);
              }
            }

            const cameraBlend = 1 - Math.exp(-rawDelta * 4.8);
            const desiredX = Math.max(-5.4, Math.min(5.4, player.x * 0.72));
            const desiredY = 3.55 + Math.min(0.75, player.y * 0.32);
            const desiredZ = Math.max(-9.5, Math.min(-4.8, player.z - 7.1));
            cameraX += (desiredX - cameraX) * cameraBlend;
            cameraY += (desiredY - cameraY) * cameraBlend;
            cameraZ += (desiredZ - cameraZ) * cameraBlend;
            camera.position.set(cameraX, cameraY, cameraZ);
            cameraTarget.set(cameraX * 0.18 + player.x * 0.82, player.y + 1.02, player.z + 0.55);
            camera.setTarget(cameraTarget);

            if (hasWorldMechanics) {
              const leftDistance = Math.hypot(player.x - activeEloNodePositions.left.x, player.z - activeEloNodePositions.left.z);
              const rightDistance = Math.hypot(player.x - activeEloNodePositions.right.x, player.z - activeEloNodePositions.right.z);
              const nearestDistance = Math.min(leftDistance, rightDistance);
              const resolvedNearNode = runtimeLayer === "structure" && !gateLinked && nearestDistance <= 1.08
                ? leftDistance <= rightDistance ? "left" : "right"
                : null;
              if (resolvedNearNode !== runtimeNearNode) {
                runtimeNearNode = resolvedNearNode;
                setNearNode(resolvedNearNode);
              }

              layerMix = approachLayerMix(layerMix, runtimeLayer, rawDelta, reducedMotion);
              const barrierSignalMix = gateLinked ? Math.max(layerMix, 0.88) : layerMix;
              Color3.LerpToRef(surfaceFloorColor, structureFloorColor, layerMix, floorMaterial.diffuseColor);
              Color3.LerpToRef(surfaceRaisedColor, structureRaisedColor, layerMix, raisedMaterial.diffuseColor);
              Color3.LerpToRef(surfaceBoundaryColor, structureBoundaryColor, layerMix, boundaryMaterial.diffuseColor);
              Color3.LerpToRef(surfaceBarrierColor, structureBarrierColor, barrierSignalMix, phaseBarrierMaterial.diffuseColor);
              phaseBarrierMaterial.emissiveColor.set(0.08 * barrierSignalMix, 0.42 * barrierSignalMix, 0.19 * barrierSignalMix);
              phaseBarrierMaterial.alpha = 1 - barrierSignalMix * 0.76;
              phaseBarrierMaterial.wireframe = barrierSignalMix > 0.55;
              const nodeVisibility = gateLinked ? Math.max(layerMix, 0.46) : layerMix;
              leftNodeMaterial.alpha = nodeVisibility;
              rightNodeMaterial.alpha = nodeVisibility;
              const leftSignal = runtimeNearNode === "left" || runtimeEloState.firstNode === "left" ? 1 : 0.52;
              const rightSignal = runtimeNearNode === "right" || runtimeEloState.firstNode === "right" ? 1 : 0.52;
              leftNodeMaterial.emissiveColor.set(0.18 * leftSignal, 0.9 * leftSignal, 0.4 * leftSignal);
              rightNodeMaterial.emissiveColor.set(0.18 * rightSignal, 0.9 * rightSignal, 0.4 * rightSignal);
              const linkTarget = gateLinked ? 1 : runtimeEloState.status === "selecting" ? 0.24 * layerMix : 0;
              linkVisualMix = reducedMotion
                ? linkTarget
                : linkVisualMix + (linkTarget - linkVisualMix) * (1 - Math.exp(-rawDelta * 10));
              if (eloLine) eloLine.alpha = linkVisualMix;
              const gateTarget = mode === "puzzle" && gateLinked ? 1 : 0;
              gateVisualMix = reducedMotion
                ? gateTarget
                : gateVisualMix + (gateTarget - gateVisualMix) * (1 - Math.exp(-rawDelta * 5.5));
              if (phaseBarrier && mode === "puzzle") phaseBarrier.position.y = 1.05 + gateVisualMix * 2.55;
              goalMaterial.alpha = mode === "puzzle" && gateLinked ? 0.34 + gateVisualMix * 0.66 : 0;
              if (mode === "puzzle" && gateLinked && runtimeLayer === "surface" && Math.abs(player.x) <= 2.35 && player.z >= 4.28 && !runtimePuzzleComplete) {
                runtimePuzzleComplete = true;
                setPuzzleComplete(true);
              }
              ambient.intensity = 1.05 - layerMix * 0.28;
              key.intensity = 1.65 - layerMix * 0.55;
              scene.clearColor.set(0.055 - layerMix * 0.037, 0.06 - layerMix * 0.036, 0.057 - layerMix * 0.037, 1);
              if (phaseBarrier) phaseBarrier.isPickable = runtimeLayer === "surface" && !gateLinked;
            }

            if (rawDelta > 0.028) slowFrameBudget += rawDelta;
            else slowFrameBudget = Math.max(0, slowFrameBudget - rawDelta * 0.35);
            if (slowFrameBudget > 3 && quality !== "low") {
              applyQuality(quality === "high" ? "medium" : "low");
              slowFrameBudget = 0;
            }
          }

          scene.render();
          if (now - lastTelemetry > 160) {
            lastTelemetry = now;
            const frameTime = Math.min(99.9, engine.getDeltaTime());
            setTelemetry({
              state: player.state,
              speed: Math.hypot(player.velocityX, player.velocityZ),
              frameTime,
              fps: Math.round(engine.getFps()),
              grounded: player.grounded,
              quality,
              animation: animationLabel,
              inputSource,
              position: `${player.x.toFixed(2)} / ${player.z.toFixed(2)}`,
            });
          }
        });

        const resize = () => engine.resize();
        const observer = new ResizeObserver(resize);
        observer.observe(canvas.parentElement ?? canvas);
        window.addEventListener("resize", resize);
        setStatus("ready");
        requestAnimationFrame(() => canvas.focus());

        disposeScene = () => {
          observer.disconnect();
          window.removeEventListener("resize", resize);
          detachInput();
          window.removeEventListener("blur", pauseForWindowBlur);
          document.removeEventListener("visibilitychange", pauseForHiddenTab);
          resetRef.current = null;
          pauseRef.current = null;
          layerToggleRef.current = null;
          interactRef.current = null;
          scene.dispose();
          engine.dispose();
        };
      } catch (error) {
        console.error("Player Sandbox failed to initialize", error);
        if (!disposed) setStatus("error");
      }
    };

    void initialize();
    return () => {
      disposed = true;
      disposeScene();
    };
  }, [attempt, labels.fallProxy, labels.heavyLandingProxy, labels.provisional, mode]);

  const togglePause = useCallback(() => pauseRef.current?.(), []);
  const toggleLayer = useCallback(() => layerToggleRef.current?.(), []);
  const interact = useCallback(() => interactRef.current?.(), []);
  const nodeLabel = (node: EloNodeId | null) => node === "left" ? labels.leftNode : node === "right" ? labels.rightNode : labels.noNode;
  const eloStateLabel = eloStatus === "linked" ? labels.eloLinked : eloStatus === "selecting" ? labels.eloSelecting : labels.eloReady;
  const eloActionDisabled = worldLayer !== "structure" || !nearNode || eloStatus === "linked";
  const eloActionLabel = worldLayer !== "structure"
    ? labels.enterStructureForElo
    : eloStatus === "linked"
      ? labels.eloStabilized
      : !nearNode
        ? labels.approachNode
        : eloStatus === "selecting" && selectedNode === nearNode
          ? labels.cancelSelection
          : eloStatus === "selecting"
            ? labels.connectSecondNode
            : `${labels.selectNode} ${nodeLabel(nearNode)}`;
  const puzzleObjectiveStatus = puzzleComplete
    ? "complete"
    : eloStatus === "linked"
      ? worldLayer === "structure" ? "return-surface" : "reach-exit"
      : eloStatus === "selecting"
        ? "connect"
        : worldLayer === "surface" ? "enter-structure" : "anchor";
  const puzzleObjectiveLabel = puzzleObjectiveStatus === "complete"
    ? labels.objectiveComplete
    : puzzleObjectiveStatus === "return-surface"
      ? labels.objectiveReturnSurface
      : puzzleObjectiveStatus === "reach-exit"
        ? labels.objectiveReachExit
        : puzzleObjectiveStatus === "connect"
          ? labels.objectiveConnect
          : puzzleObjectiveStatus === "anchor"
            ? labels.objectiveAnchor
            : labels.objectiveEnterStructure;
  const runtimeName = mode === "puzzle" ? "Puzzle Room 01" : mode === "mechanical" ? "Elo Sandbox 01" : "Player Sandbox 01";

  return (
    <section className="player-sandbox-stage" aria-label={runtimeName}>
      <div className="player-sandbox-viewport">
        <canvas ref={canvasRef} tabIndex={0} aria-label={labels.canvas} />
        {status !== "ready" && (
          <div className="player-sandbox-runtime-message" role={status === "error" ? "alert" : "status"}>
            <p>{status === "error" ? labels.error : labels.loading}</p>
            {status === "error" && <button type="button" onClick={() => setAttempt((value) => value + 1)}>{labels.retry}</button>}
          </div>
        )}
        {paused && status === "ready" && (
          <div className="player-sandbox-pause" role="dialog" aria-modal="true" aria-labelledby="sandbox-pause-title">
            <div>
              <p className="reference-eyebrow">runtime / paused</p>
              <h2 id="sandbox-pause-title">{labels.paused}</h2>
              <p>{labels.pausedDetail}</p>
              <button type="button" onClick={togglePause}>{labels.resume}</button>
            </div>
          </div>
        )}
        <div className="player-sandbox-controls-hint" aria-hidden="true">
          <span>WASD / ↑↓←→</span><span>{labels.runHint}</span><span>{labels.jumpHint}</span>{hasWorldMechanics && <><span>{labels.layerHint}</span><span>{labels.interactHint}</span></>}<span>{labels.pauseHint}</span>
        </div>
        {mode === "puzzle" && status === "ready" && (
          <div className="player-puzzle-objective" role="status" aria-live="polite">
            <span>{labels.objective}</span>
            <strong data-puzzle-status={puzzleObjectiveStatus}>{puzzleObjectiveLabel}</strong>
          </div>
        )}
        {mode === "puzzle" && puzzleComplete && (
          <div className="player-puzzle-complete" role="status">
            <span aria-hidden="true">01</span>
            <div><strong>{labels.objectiveComplete}</strong><p>{labels.roomComplete}</p></div>
          </div>
        )}
        {hasWorldMechanics && status === "ready" && !paused && !(mode === "puzzle" && puzzleComplete) && (
          <div className="player-mechanical-actions">
            <button
              className="player-layer-toggle"
              type="button"
              aria-pressed={worldLayer === "structure"}
              onClick={toggleLayer}
            >
              <span aria-hidden="true">Q</span>
              {worldLayer === "surface" ? labels.enterStructure : labels.returnSurface}
            </button>
            <button
              className="player-elo-action"
              type="button"
              disabled={eloActionDisabled}
              onClick={interact}
            >
              <span aria-hidden="true">E</span>
              {eloActionLabel}
            </button>
          </div>
        )}
      </div>

      <aside className="player-sandbox-console" aria-label="Runtime telemetry">
        <div className="player-sandbox-console-heading">
          <p className="reference-eyebrow">controller / live</p>
          <strong>{runtimeName}</strong>
          <p>{mode === "puzzle" ? labels.puzzleDescription : mode === "mechanical" ? labels.mechanicalDescription : labels.consoleDescription}</p>
        </div>
        <dl>
          {mode === "puzzle" && <div><dt>{labels.objective}</dt><dd data-puzzle-status={puzzleObjectiveStatus}>{puzzleObjectiveLabel}</dd></div>}
          {hasWorldMechanics && <div><dt>{labels.layer}</dt><dd data-world-layer={worldLayer}>{worldLayer === "surface" ? labels.surface : labels.structure}</dd></div>}
          {hasWorldMechanics && <div><dt>{labels.elo}</dt><dd data-elo-status={eloStatus}>{eloStateLabel}</dd></div>}
          {hasWorldMechanics && <div><dt>{labels.nearestNode}</dt><dd data-near-node={nearNode ?? "none"}>{nodeLabel(nearNode)}</dd></div>}
          {hasWorldMechanics && <div><dt>{labels.position}</dt><dd data-player-position={telemetry.position}>{telemetry.position}</dd></div>}
          <div><dt>{labels.state}</dt><dd data-player-state={telemetry.state}>{telemetry.state}</dd></div>
          <div><dt>{labels.speed}</dt><dd>{telemetry.speed.toFixed(2)} m/s</dd></div>
          <div><dt>{labels.frame}</dt><dd>{telemetry.frameTime.toFixed(1)} ms</dd></div>
          <div><dt>FPS</dt><dd>{telemetry.fps || "—"}</dd></div>
          <div><dt>{labels.grounded}</dt><dd>{telemetry.grounded ? labels.yes : labels.no}</dd></div>
          <div><dt>{labels.quality}</dt><dd data-quality={telemetry.quality}>{telemetry.quality === "high" ? labels.qualityHigh : telemetry.quality === "medium" ? labels.qualityMedium : labels.qualityLow}</dd></div>
          <div><dt>{labels.input}</dt><dd>{telemetry.inputSource}</dd></div>
          <div className="player-sandbox-animation-row"><dt>{labels.animation}</dt><dd>{telemetry.animation}</dd></div>
        </dl>
        <div className="player-sandbox-console-actions">
          <button type="button" onClick={() => resetRef.current?.()}>{labels.reset}</button>
          <button type="button" aria-pressed={paused} onClick={togglePause}>{paused ? labels.resume : labels.pause}</button>
        </div>
      </aside>
    </section>
  );
}
