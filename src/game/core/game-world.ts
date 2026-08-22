import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Scene } from "@babylonjs/core/scene";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { GameStateStore } from "./game-state";
import { SaveSystem } from "./save-system";
import { PuzzleSystem, type PuzzleSignal } from "../systems/puzzle-system";
import { ThreatSystem } from "../systems/threat-system";
import { checkpointFor, objectiveFor, routeGate } from "../systems/progression-system";
import { DialogueSystem } from "../systems/dialogue-system";
import { resolveEnding } from "../systems/ending-system";
import { useLumenTool } from "../systems/tool-system";
import { createCheckpoint, restoreCheckpoint, type CheckpointAnchor } from "../systems/checkpoint-system";
import { InputManager } from "../input/input-manager";
import { Player } from "../entities/player";
import type { GameLocale } from "../data/game-copy";
import { getNarrative, sectorOrder, type EndingId, type SectorId } from "../data/narrative-content";
import { getWorldCopy, type WorldCopy } from "../data/world-copy";

interface SignalNode {
  mesh: Mesh;
  ring: Mesh;
  restored: boolean;
}

interface InteractionTarget {
  mesh: Mesh;
  sector: SectorId;
  radius: number;
  hint: string;
  onInteract: () => void;
}

interface DroneParts {
  body: Mesh;
  light: Mesh;
  cone: Mesh;
}

const palette = {
  ink: "#171923",
  inkSoft: "#252837",
  cream: "#E9D9B5",
  creamSoft: "#C9B88F",
  mint: "#76F0C0",
  mintDark: "#327E71",
  violet: "#A879FF",
  violetDark: "#3B2368",
  amber: "#F3A65A",
  red: "#EE6A74",
  paper: "#F7F4E7",
};

const bounds: Record<SectorId, { minX: number; maxX: number; minZ: number; maxZ: number }> = {
  hub: { minX: -5, maxX: 5, minZ: -2.7, maxZ: 2.7 },
  archive: { minX: -5, maxX: 5, minZ: -2.7, maxZ: 2.7 },
  garden: { minX: -5, maxX: 5, minZ: -2.7, maxZ: 2.7 },
  core: { minX: -5, maxX: 5, minZ: -2.7, maxZ: 2.7 },
};

export class GameWorld {
  readonly player: Player;
  private readonly input: InputManager;
  private readonly store: GameStateStore;
  private readonly saveSystem: SaveSystem;
  private readonly puzzles = new PuzzleSystem();
  private readonly threat = new ThreatSystem();
  private readonly dialogue = new DialogueSystem();
  private readonly nodes: SignalNode[] = [];
  private readonly interactions: InteractionTarget[] = [];
  private readonly sectorRoots = {} as Record<SectorId, TransformNode>;
  private readonly materials = new Map<string, StandardMaterial>();
  private readonly scheduledTimeouts = new Set<number>();
  private readonly drone: Mesh;
  private readonly droneLight: Mesh;
  private readonly droneCone: Mesh;
  private readonly portal: Mesh;
  private activeSector: SectorId = "hub";
  private droneTime = 0;
  private messageCooldown = 0;
  private energyTick = 0;
  private archiveSolved = false;
  private gardenWitnessed = false;
  private readonly locale: GameLocale;
  private readonly narrative: ReturnType<typeof getNarrative>;
  private readonly copy: WorldCopy;
  private checkpointAnchor!: CheckpointAnchor;
  private dialogueLineIsFinal = false;
  private activeDialogueId: "MIRA" | "PONTO" | "NIX" | "NÚCLEO" | null = null;

  constructor(private readonly scene: Scene, store: GameStateStore, input: InputManager, locale: GameLocale = "pt-BR") {
    this.locale = locale;
    this.narrative = getNarrative(locale);
    this.copy = getWorldCopy(locale);
    this.store = store;
    this.saveSystem = new SaveSystem();
    this.input = input;
    for (const sector of sectorOrder) this.sectorRoots[sector] = new TransformNode(`sector-root-${sector}`, scene);

    this.createHub();
    this.createArchive();
    const gardenDrone = this.createGarden();
    this.drone = gardenDrone.body;
    this.droneLight = gardenDrone.light;
    this.droneCone = gardenDrone.cone;
    this.createCore();

    this.player = new Player(scene, input);
    this.player.setBounds(bounds.hub);
    this.portal = this.createPortal(this.sectorRoots.hub, new Vector3(3.9, 0.9, 1.55), "hub-memory-portal");
    this.addInteraction(this.portal, "hub", 1.45, this.copy.portal, () => this.handleHubPortal());
    this.setActiveSector("hub", false);
    this.restoreSavedProgress();
  }

  dispose(): void {
    for (const timeout of this.scheduledTimeouts) window.clearTimeout(timeout);
    this.scheduledTimeouts.clear();
  }

  update(delta: number): void {
    if (this.input.consume("pause")) {
      const paused = !this.store.getSnapshot().paused;
      this.store.patch({ paused, message: paused ? this.copy.pausePaused : this.copy.pauseResumed });
    }
    if (this.store.getSnapshot().paused || this.store.getSnapshot().completed) return;

    const result = this.player.update(delta);
    if (result.moved) this.messageCooldown = Math.max(0, this.messageCooldown - delta);

    if (this.activeSector === "garden") this.updateDrone(delta);
    this.handleInteractions();
    this.handleTool();

    if (this.store.getSnapshot().threatState === "alert") {
      this.energyTick += delta;
      if (this.energyTick > 1.2) {
        this.energyTick = 0;
        const snapshot = this.store.getSnapshot();
        const nextEnergy = Math.max(0, snapshot.energy - 3);
        if (nextEnergy <= 0) {
          const restored = restoreCheckpoint(snapshot, this.checkpointAnchor);
          this.setActiveSector(restored.sector, false);
          this.store.patch({ ...restored, message: this.copy.checkpointRestore });
          this.saveSystem.save(this.store.getSnapshot());
        } else {
          this.store.patch({ energy: nextEnergy, message: this.copy.threatDamage });
        }
      }
    } else {
      this.energyTick = 0;
    }
  }

  private material(name: string, color: string, emissive = "#000000"): StandardMaterial {
    const key = `${name}:${color}:${emissive}`;
    const existing = this.materials.get(key);
    if (existing) return existing;
    const result = new StandardMaterial(name, this.scene);
    result.diffuseColor = Color3.FromHexString(color);
    result.emissiveColor = Color3.FromHexString(emissive);
    result.specularColor = Color3.Black();
    this.materials.set(key, result);
    return result;
  }

  private addMesh(mesh: Mesh, root: TransformNode, material: StandardMaterial): Mesh {
    mesh.parent = root;
    mesh.material = material;
    return mesh;
  }

  private addInteraction(mesh: Mesh, sector: SectorId, radius: number, hint: string, onInteract: () => void): void {
    this.interactions.push({ mesh, sector, radius, hint, onInteract });
  }

  private createBase(root: TransformNode, name: string, accent: "mint" | "violet" | "amber"): void {
    const ground = this.addMesh(MeshBuilder.CreateBox(`${name}-ground`, { width: 11.6, depth: 6.8, height: 0.28 }, this.scene), root, this.material(`${name}-ground-material`, palette.inkSoft));
    ground.position.y = -0.18;
    const edge = this.material(`${name}-edge-material`, palette.ink);
    const signal = this.material(`${name}-signal-material`, palette[accent], palette[accent]);
    for (const [index, z] of [-2.65, -1.45, -0.25, 0.95, 2.15].entries()) {
      const line = this.addMesh(MeshBuilder.CreateBox(`${name}-line-${index}`, { width: 10.8, depth: 0.035, height: 0.018 }, this.scene), root, index === 2 ? signal : edge);
      line.position.set(0, 0.01, z);
    }
    for (const x of [-5.35, 5.35]) {
      const rail = this.addMesh(MeshBuilder.CreateBox(`${name}-rail-${x}`, { width: 0.28, depth: 6.5, height: 0.55 }, this.scene), root, edge);
      rail.position.set(x, 0.2, 0);
    }
    const rear = this.addMesh(MeshBuilder.CreateBox(`${name}-rear-wall`, { width: 10.5, depth: 0.3, height: 1.35 }, this.scene), root, edge);
    rear.position.set(0, 0.55, 2.95);
    for (const x of [-4.4, -3.2, 3.1, 4.2]) {
      const stripe = this.addMesh(MeshBuilder.CreateBox(`${name}-stripe-${x}`, { width: 0.07, depth: 0.15, height: 0.5 }, this.scene), root, x < 0 ? signal : edge);
      stripe.position.set(x, 0.56, 2.76);
    }
    const starMaterial = this.material(`${name}-star-material`, palette.paper, palette.violetDark);
    for (let index = 0; index < 16; index += 1) {
      const star = this.addMesh(MeshBuilder.CreateSphere(`${name}-star-${index}`, { diameter: 0.025 + (index % 3) * 0.018, segments: 4 }, this.scene), root, starMaterial);
      star.position.set(-5.5 + ((index * 2.7) % 11), 1.8 + (index % 3) * 0.48, -3.6 + (index % 5) * 1.7);
    }
  }

  private restoreSavedProgress(): void {
    const saved = this.saveSystem.read();
    if (!saved) return;
    const progress = saved.snapshot;
    this.archiveSolved = progress.toolsUnlocked.includes("Pulso");
    this.gardenWitnessed = progress.relationship.nix === "recognition";
    for (let index = 0; index < Math.min(progress.nodesRestored, this.nodes.length); index += 1) {
      const node = this.nodes[index];
      node.restored = true;
      node.mesh.material = this.material(`restored-node-${node.mesh.name}`, palette.mint, palette.mint);
      node.ring.material = this.material(`restored-ring-${node.ring.name}`, palette.mint, palette.mint);
    }
    this.store.restoreProgress(progress);
    this.store.patch({ message: this.copy.progressRestored, lastInteraction: this.copy.restoredCheckpoint });
    const puzzleProgress = progress.puzzles ?? {
      "archive-frequency": this.puzzles.get("archive-frequency"),
      "garden-route": this.puzzles.get("garden-route"),
    };
    this.puzzles.restore(puzzleProgress["archive-frequency"]);
    this.puzzles.restore(puzzleProgress["garden-route"]);
    this.setActiveSector(progress.sector, false);
  }

  private createHub(): void {
    const root = this.sectorRoots.hub;
    this.createBase(root, "hub", "mint");
    const panelMaterial = this.material("hub-panel-material", "#463D5B");
    for (const x of [-4.4, -3.2, 3.1, 4.2]) {
      const panel = this.addMesh(MeshBuilder.CreateBox(`hub-panel-${x}`, { width: 0.62, depth: 0.18, height: 0.88 }, this.scene), root, panelMaterial);
      panel.position.set(x, 0.72, 2.45);
      panel.rotation.y = x < 0 ? 0.08 : -0.08;
    }

    const terminal = this.addMesh(MeshBuilder.CreateBox("mira-terminal", { width: 1.35, depth: 0.62, height: 0.92 }, this.scene), root, panelMaterial);
    terminal.position.set(-3.7, 0.48, 2.02);
    const screen = this.addMesh(MeshBuilder.CreateBox("mira-terminal-screen", { width: 0.82, depth: 0.035, height: 0.36 }, this.scene), root, this.material("mira-screen-material", palette.mint, palette.mint));
    screen.position.set(-3.7, 0.82, 1.68);
    const badge = this.addMesh(MeshBuilder.CreateTorus("mira-badge", { diameter: 0.38, thickness: 0.045, tessellation: 16 }, this.scene), root, this.material("mira-badge-material", palette.amber, palette.amber));
    badge.position.set(-3.02, 0.74, 1.68);
    badge.rotation.x = Math.PI / 2;
    this.addInteraction(terminal, "hub", 1.35, this.copy.mira, () => this.speak("MIRA", this.narrative.openingDialogue));

    const nodePositions = [new Vector3(-1.45, 0.22, 0.15), new Vector3(0, 0.22, -0.95), new Vector3(1.45, 0.22, 0.15)];
    nodePositions.forEach((position, index) => {
      const mesh = this.addMesh(MeshBuilder.CreateCylinder(`signal-node-${index}`, { diameter: 0.48, height: 0.22, tessellation: 8 }, this.scene), root, this.material(`signal-node-material-${index}`, "#414454"));
      mesh.position.copyFrom(position);
      const ring = this.addMesh(MeshBuilder.CreateTorus(`signal-ring-${index}`, { diameter: 0.9, thickness: 0.045, tessellation: 24 }, this.scene), root, this.material(`signal-ring-material-${index}`, palette.violet, palette.violetDark));
      ring.position.set(position.x, 0.35, position.z);
      ring.rotation.x = Math.PI / 2;
      const node: SignalNode = { mesh, ring, restored: false };
      this.nodes.push(node);
      this.addInteraction(mesh, "hub", 1.05, this.copy.node, () => this.restoreNode(node));
    });
  }

  private createArchive(): void {
    const root = this.sectorRoots.archive;
    this.createBase(root, "archive", "violet");
    const shelfMaterial = this.material("archive-shelf-material", "#5C4D78");
    for (const x of [-4.3, -2.8, 2.7, 4.25]) {
      const shelf = this.addMesh(MeshBuilder.CreateBox(`archive-shelf-${x}`, { width: 0.72, depth: 0.42, height: 1.8 }, this.scene), root, shelfMaterial);
      shelf.position.set(x, 0.84, 1.92);
      const shelfLine = this.addMesh(MeshBuilder.CreateBox(`archive-shelf-line-${x}`, { width: 0.82, depth: 0.06, height: 0.06 }, this.scene), root, this.material("archive-shelf-line", palette.creamSoft));
      shelfLine.position.set(x, 1.18, 1.68);
    }
    const ponto = this.addMesh(MeshBuilder.CreateCylinder("ponto-archive-marker", { diameter: 0.6, height: 0.58, tessellation: 10 }, this.scene), root, this.material("ponto-marker-material", palette.cream, palette.violetDark));
    ponto.position.set(-3.65, 0.42, 0.2);
    const pontoSignal = this.addMesh(MeshBuilder.CreateTorus("ponto-archive-signal", { diameter: 0.82, thickness: 0.055, tessellation: 20 }, this.scene), root, this.material("ponto-signal-material", palette.violet, palette.violet));
    pontoSignal.position.set(-3.65, 0.8, 0.2);
    pontoSignal.rotation.x = Math.PI / 2;
    this.addInteraction(ponto, "archive", 1.25, this.copy.ponto, () => this.speak("PONTO", this.narrative.archiveDialogue));

    const modulePositions = [new Vector3(-1.2, 0.38, -0.35), new Vector3(0, 0.38, -0.35), new Vector3(1.2, 0.38, -0.35)];
    modulePositions.forEach((position, index) => {
      const module = this.addMesh(MeshBuilder.CreateBox(`archive-memory-module-${index}`, { width: 0.62, depth: 0.62, height: 0.48 }, this.scene), root, this.material(`archive-module-${index}`, index === 0 ? palette.mintDark : palette.violetDark));
      module.position.copyFrom(position);
      const window = this.addMesh(MeshBuilder.CreateDisc(`archive-memory-window-${index}`, { radius: 0.2, tessellation: 16 }, this.scene), root, this.material(`archive-window-${index}`, index === 0 ? palette.mint : palette.violet, index === 0 ? palette.mint : palette.violet));
      window.position.set(position.x, 0.66, position.z - 0.01);
      window.rotation.x = Math.PI / 2;
      const archiveSignals: PuzzleSignal[] = ["violet", "mint", "amber"];
      const signal = archiveSignals[index];
      this.addInteraction(module, "archive", 1.1, this.copy.archiveModule(index), () => this.handlePuzzleSignal("archive-frequency", signal));
    });
    const returnBeacon = this.addMesh(MeshBuilder.CreateCylinder("archive-return-beacon", { diameter: 0.32, height: 0.5, tessellation: 8 }, this.scene), root, this.material("archive-return-beacon-material", palette.mint, palette.mint));
    returnBeacon.position.set(-4.65, 0.35, -2.1);
    this.addInteraction(returnBeacon, "archive", 1.0, this.copy.returnBeacon, () => this.setActiveSector("hub"));
    const gardenBeacon = this.addMesh(MeshBuilder.CreateCylinder("archive-garden-beacon", { diameter: 0.42, height: 0.64, tessellation: 8 }, this.scene), root, this.material("archive-garden-beacon-material", palette.violet, palette.violet));
    gardenBeacon.position.set(4.25, 0.42, -1.75);
    this.addInteraction(gardenBeacon, "archive", 1.1, this.copy.gardenBeacon, () => {
      if (!this.archiveSolved) {
        this.store.patch({ message: this.copy.archiveGate });
        return;
      }
      this.setActiveSector("garden");
    });
  }

  private createGarden(): DroneParts {
    const root = this.sectorRoots.garden;
    this.createBase(root, "garden", "amber");
    const tubeMaterial = this.material("garden-tube-material", palette.mintDark, palette.mintDark);
    for (const [index, x] of [-4.1, -2.3, -0.5, 1.3, 3.1].entries()) {
      const tube = this.addMesh(MeshBuilder.CreateCylinder(`garden-tube-${index}`, { diameter: 0.18, height: 2.1, tessellation: 12 }, this.scene), root, tubeMaterial);
      tube.position.set(x, 0.28, -0.65 + (index % 2) * 0.55);
      tube.rotation.z = index % 2 === 0 ? 0.6 : -0.6;
    }
    const plantMaterial = this.material("garden-plant-material", "#6D997F", "#172D2A");
    for (const [index, position] of [new Vector3(-3.25, 0.38, 1.35), new Vector3(-1.2, 0.38, 1.18), new Vector3(1.15, 0.38, 1.42), new Vector3(3.2, 0.38, 1.12)].entries()) {
      const pot = this.addMesh(MeshBuilder.CreateCylinder(`garden-pot-${index}`, { diameter: 0.42, height: 0.26, tessellation: 8 }, this.scene), root, this.material(`garden-pot-${index}`, palette.creamSoft));
      pot.position.copyFrom(position);
      const plant = this.addMesh(MeshBuilder.CreateSphere(`garden-plant-${index}`, { diameter: 0.56, segments: 8 }, this.scene), root, plantMaterial);
      plant.position.set(position.x, position.y + 0.38, position.z);
      plant.scaling.y = 1.45;
    }
    const nix = this.addMesh(MeshBuilder.CreateBox("nix-observatory-marker", { width: 0.72, depth: 0.72, height: 0.95 }, this.scene), root, this.material("nix-marker-material", palette.ink));
    nix.position.set(-3.7, 0.58, 2.02);
    const nixLight = this.addMesh(MeshBuilder.CreateSphere("nix-observatory-light", { diameter: 0.2, segments: 12 }, this.scene), root, this.material("nix-light-material", palette.amber, palette.amber));
    nixLight.position.set(-3.7, 0.82, 1.63);
    this.addInteraction(nix, "garden", 1.35, this.copy.nix, () => this.speak("NIX", this.narrative.gardenDialogue));
    const routeSignals: PuzzleSignal[] = ["mint", "mint", "violet", "amber"];
    const routePositions = [new Vector3(-2.7, 0.28, -0.25), new Vector3(-0.9, 0.28, 0.82), new Vector3(0.95, 0.28, -0.25), new Vector3(2.55, 0.28, 0.82)];
    routePositions.forEach((position, index) => {
      const marker = this.addMesh(MeshBuilder.CreateTorus(`garden-route-marker-${index}`, { diameter: 0.46, thickness: 0.065, tessellation: 12 }, this.scene), root, this.material(`garden-route-marker-${index}`, index < 2 ? palette.mintDark : palette.amber));
      marker.position.copyFrom(position);
      marker.rotation.x = Math.PI / 2;
      this.addInteraction(marker, "garden", 0.9, this.copy.irrigation(index), () => this.handlePuzzleSignal("garden-route", routeSignals[index]));
    });
    const exitBeacon = this.addMesh(MeshBuilder.CreateCylinder("garden-core-beacon", { diameter: 0.4, height: 0.64, tessellation: 8 }, this.scene), root, this.material("garden-core-beacon-material", palette.violet, palette.violet));
    exitBeacon.position.set(4.25, 0.42, 1.75);
    this.addInteraction(exitBeacon, "garden", 1.1, this.copy.coreExit, () => this.handleGardenExit());

    const body = this.addMesh(MeshBuilder.CreateBox("sentinel-drone", { width: 0.68, depth: 0.68, height: 0.34 }, this.scene), root, this.material("drone-material", "#373746"));
    body.position.set(1.8, 1.18, -1.65);
    const light = this.addMesh(MeshBuilder.CreateSphere("sentinel-drone-light", { diameter: 0.17, segments: 8 }, this.scene), root, this.material("drone-light-material", palette.amber, palette.amber));
    light.position.set(1.8, 1.18, -2.02);
    const cone = this.addMesh(MeshBuilder.CreateDisc("sentinel-scan-cone", { radius: 1.45, tessellation: 3 }, this.scene), root, this.material("drone-cone-material", palette.amber, palette.amber));
    cone.position.set(1.8, 0.04, -2.05);
    cone.rotation.x = Math.PI / 2;
    cone.rotation.z = Math.PI / 2;
    cone.visibility = 0.12;
    return { body, light, cone };
  }

  private createCore(): void {
    const root = this.sectorRoots.core;
    this.createBase(root, "core", "violet");
    const platformMaterial = this.material("core-platform-material", "#4B405F");
    const modulePositions = [new Vector3(-2.45, 0.42, 0.35), new Vector3(0, 0.42, -0.9), new Vector3(2.45, 0.42, 0.35)];
    const endingsForModules: EndingId[] = ["archive-alive", "new-constellation", "vigil-pact"];
    modulePositions.forEach((position, index) => {
      const platform = this.addMesh(MeshBuilder.CreateBox(`core-platform-${index}`, { width: 1.48, depth: 1.15, height: 0.25 }, this.scene), root, platformMaterial);
      platform.position.copyFrom(position);
      const module = this.addMesh(MeshBuilder.CreateCylinder(`core-memory-module-${index}`, { diameter: 0.72, height: 0.5, tessellation: 8 }, this.scene), root, this.material(`core-module-material-${index}`, index === 0 ? palette.mint : index === 1 ? palette.violet : palette.amber, index === 0 ? palette.mint : index === 1 ? palette.violet : palette.amber));
      module.position.set(position.x, position.y + 0.38, position.z);
      const ending = endingsForModules[index];
      this.addInteraction(module, "core", 1.2, this.copy.ending(this.narrative.endings[ending].title), () => this.confirmEnding(ending));
    });
    const frame = this.createPortal(root, new Vector3(0, 1.2, 1.9), "core-memory-frame");
    frame.scaling.setAll(1.22);
    const center = this.addMesh(MeshBuilder.CreateDisc("core-memory-center", { radius: 0.78, tessellation: 32 }, this.scene), root, this.material("core-memory-center-material", palette.ink, palette.violetDark));
    center.position.set(0, 1.2, 1.91);
    center.rotation.x = Math.PI / 2;
  }

  private createPortal(root: TransformNode, position: Vector3, name: string): Mesh {
    const frame = this.addMesh(MeshBuilder.CreateTorus(name, { diameter: 1.75, thickness: 0.22, tessellation: 32 }, this.scene), root, this.material(`${name}-material`, palette.violet, palette.violetDark));
    frame.position.copyFrom(position);
    frame.rotation.x = Math.PI / 2;
    return frame;
  }

  private setActiveSector(sector: SectorId, announce = true): void {
    const previous = this.activeSector;
    for (const id of sectorOrder) this.sectorRoots[id].setEnabled(id === sector);
    this.activeSector = sector;
    this.threat.reset();
    this.player.setBounds(bounds[sector]);
    if (sector === "hub") this.player.placeAt(new Vector3(-4.1, 0.5, 0.95));
    if (sector === "archive") this.player.placeAt(new Vector3(-4.45, 0.5, -1.9));
    if (sector === "garden") this.player.placeAt(new Vector3(-4.45, 0.5, -1.85));
    if (sector === "core") this.player.placeAt(new Vector3(0, 0.5, -2.05));
    this.store.patch({
      sector,
      sectorTitle: this.narrative.sectors[sector].title,
      objective: objectiveFor(this.store.getSnapshot(), sector, this.locale),
      checkpoint: checkpointFor(sector),
      message: announce ? this.narrative.sectors[sector].arrival : this.store.getSnapshot().message,
      threatState: "patrol",
      lastInteraction: previous === sector ? null : this.copy.checkpointEntered(this.narrative.sectors[sector].title),
    });
    if (sector === "core") this.speak("NÚCLEO", this.narrative.coreDialogue);
    this.checkpointAnchor = createCheckpoint(this.store.getSnapshot());
    this.saveSystem.save(this.store.getSnapshot());
  }

  private handleInteractions(): void {
    if (!this.input.consume("interact")) return;
    const snapshot = this.store.getSnapshot();
    if (snapshot.dialogue) {
      if (this.dialogueLineIsFinal) {
        this.dialogueLineIsFinal = false;
        this.activeDialogueId = null;
        this.store.patch({ dialogue: null, message: this.copy.dialogueClosed });
      } else {
        this.advanceDialogue();
      }
      return;
    }
    const target = this.interactions.find((candidate) => candidate.sector === this.activeSector && this.player.distanceTo(candidate.mesh.position) < candidate.radius);
    if (target) {
      target.onInteract();
      return;
    }
    this.store.patch({ message: this.copy.silence });
  }

  private speak(character: string, lines: Array<{ speaker: "MIRA" | "PONTO" | "NIX" | "CHARLLES" | "NÚCLEO"; text: string }>): void {
    this.activeDialogueId = character as "MIRA" | "PONTO" | "NIX" | "NÚCLEO";
    const session = this.dialogue.start(character, lines);
    const result = this.dialogue.advance(session);
    const line = result.line;
    if (!line) return;
    this.dialogueLineIsFinal = result.done;
    const patch: Parameters<GameStateStore["patch"]>[0] = {
      dialogue: line,
      message: this.copy.dialogueRecorded(character),
      lastInteraction: this.copy.transmission(character),
    };
    if (result.done && character === "MIRA") patch.relationship = { ...this.store.getSnapshot().relationship, mira: "doubt" };
    if (result.done && character === "PONTO") patch.relationship = { ...this.store.getSnapshot().relationship, ponto: "listening" };
    if (result.done && character === "NIX") {
      this.gardenWitnessed = true;
      const fragmentsFound = this.store.getSnapshot().fragmentsFound.includes("damage") ? this.store.getSnapshot().fragmentsFound : [...this.store.getSnapshot().fragmentsFound, "damage"];
      patch.relationship = { ...this.store.getSnapshot().relationship, nix: "recognition" };
      patch.fragmentsFound = fragmentsFound;
      patch.message = this.copy.nixWitness;
      patch.lastInteraction = "Testemunho de dano recuperado";
    }
    this.store.patch(patch);
  }

  private advanceDialogue(): void {
    const current = this.store.getSnapshot().dialogue;
    if (!current) return;
    const dialogueId = this.activeDialogueId ?? (current.speaker === "MIRA" || current.speaker === "PONTO" || current.speaker === "NIX" || current.speaker === "NÚCLEO" ? current.speaker : "NÚCLEO");
    const lines = dialogueId === "MIRA" ? this.narrative.openingDialogue : dialogueId === "PONTO" ? this.narrative.archiveDialogue : dialogueId === "NIX" ? this.narrative.gardenDialogue : this.narrative.coreDialogue;
    this.speak(dialogueId, lines);
  }

  private restoreNode(node: SignalNode): void {
    if (node.restored) {
      this.store.patch({ message: this.copy.nodeAlready });
      return;
    }
    node.restored = true;
    node.mesh.material = this.material(`restored-node-${node.mesh.name}`, palette.mint, palette.mint);
    node.ring.material = this.material(`restored-ring-${node.ring.name}`, palette.mint, palette.mint);
    const restored = this.store.getSnapshot().nodesRestored + 1;
    const fragmentsFound = this.store.getSnapshot().fragmentsFound.includes("arrival") ? this.store.getSnapshot().fragmentsFound : [...this.store.getSnapshot().fragmentsFound, "arrival"];
    this.store.patch({
      nodesRestored: restored,
      fragmentsFound,
      objective: restored === 1 ? this.copy.nodeObjectiveFirst : restored === 3 ? this.copy.nodeObjectiveAll : this.copy.nodeObjectiveMore,
      message: restored === 3 ? this.copy.nodeObjectiveAll : this.copy.nodeRestored(restored),
      lastInteraction: this.copy.nodeLast(restored),
    });
    this.saveSystem.save(this.store.getSnapshot());
  }

  private handleHubPortal(): void {
    const gate = routeGate(this.store.getSnapshot(), "archive", this.locale);
    if (!gate.allowed) {
      this.store.patch({ message: this.copy.archiveGate });
      return;
    }
    this.setActiveSector("archive");
  }

  private handlePuzzleSignal(id: "archive-frequency" | "garden-route", signal: PuzzleSignal): void {
    const result = this.puzzles.submit(id, signal);
    const snapshot = this.store.getSnapshot();
    const puzzles = { ...snapshot.puzzles, [id]: result.progress };
    const stepMessage = result.solvedNow ? this.copy.archiveSolved : result.accepted ? this.copy.puzzleAccepted(result.progress.step) : this.copy.puzzleWrong;
    this.store.patch({ puzzles, message: stepMessage, lastInteraction: this.copy.signalRegistered(signal) });
    if (result.solvedNow && id === "archive-frequency") {
      this.archiveSolved = true;
      const fragmentsFound = snapshot.fragmentsFound.includes("unowned") ? snapshot.fragmentsFound : [...snapshot.fragmentsFound, "unowned"];
      this.store.patch({
        fragmentsFound,
        toolsUnlocked: ["Lente", "Pulso"],
        objective: this.copy.archiveToGarden,
        message: this.copy.archiveSolved,
        lastInteraction: this.copy.associatedFragment,
        relationship: { ...snapshot.relationship, ponto: "association" },
      });
    }
    if (result.solvedNow && id === "garden-route") {
      this.store.patch({ message: this.copy.gardenSolved, lastInteraction: this.copy.gardenSolved });
    }
    this.saveSystem.save(this.store.getSnapshot());
  }

  private handleGardenExit(): void {
    const gate = routeGate(this.store.getSnapshot(), "core", this.locale);
    if (!gate.allowed) {
      this.store.patch({ message: gate.reason });
      return;
    }
    this.setActiveSector("core");
  }

  private confirmEnding(ending: EndingId): void {
    const result = resolveEnding(this.store.getSnapshot(), ending, this.narrative);
    if (!result.allowed || !result.ending) {
      this.store.patch({ message: result.reason });
      return;
    }
    this.store.patch({
      completed: true,
      ending: result.ending,
      objective: result.objective,
      message: result.message,
      lastInteraction: this.copy.endingConfirmed(result.title),
      fragmentsFound: result.fragmentsFound,
    });
    this.saveSystem.save(this.store.getSnapshot());
  }

  private handleTool(): void {
    if (!this.input.consume("tool")) return;
    const snapshot = this.store.getSnapshot();
    const targetInRange = this.activeSector === "garden" && this.player.distanceTo(this.drone.position) < 2.1 && snapshot.threatState !== "disabled";
    const requestedTool = targetInRange ? "Pulso" : "Lente";
    const result = useLumenTool({
      tool: requestedTool,
      energy: snapshot.energy,
      hasTool: snapshot.toolsUnlocked.includes(requestedTool),
      targetInRange,
    });
    if (!result.success) {
      this.store.patch({ message: result.kind === "locked" ? this.copy.toolLocked : this.copy.toolDepleted });
      return;
    }
    if (result.kind === "pulse") {
      this.store.patch({ energy: result.energy, threatState: "disabled", message: this.copy.pulse, lastInteraction: this.copy.pulseLastInteraction });
      this.saveSystem.save(this.store.getSnapshot());
      this.messageCooldown = 2.2;
      const timeout = window.setTimeout(() => {
        this.scheduledTimeouts.delete(timeout);
        if (this.store.getSnapshot().completed) return;
        this.store.patch({ threatState: "patrol", message: this.copy.dronePatrol });
      }, 3200);
      this.scheduledTimeouts.add(timeout);
      return;
    }
    this.store.patch({ energy: result.energy, message: this.copy.lensScan(this.narrative.sectors[this.activeSector].title) });
  }

  private updateDrone(delta: number): void {
    const snapshot = this.store.getSnapshot();
    if (snapshot.threatState === "disabled") {
      this.drone.rotation.y += delta * 1.4;
      this.droneLight.visibility = 0.28;
      this.droneCone.visibility = 0.04;
      return;
    }
    this.droneTime += delta;
    this.drone.position.x = 1.8 + Math.sin(this.droneTime * 0.8) * 1.65;
    this.drone.position.z = -1.6 + Math.cos(this.droneTime * 0.8) * 0.62;
    this.droneLight.position.x = this.drone.position.x;
    this.droneLight.position.z = this.drone.position.z - 0.37;
    this.drone.position.y = 1.18 + Math.sin(this.droneTime * 2.2) * 0.08;
    this.droneLight.position.y = this.drone.position.y;
    this.droneCone.position.x = this.drone.position.x;
    this.droneCone.position.z = this.drone.position.z - 0.35;

    const distance = this.player.distanceTo(this.drone.position);
    const evaluation = this.threat.evaluate({ distance, disabled: false });
    const nextThreat = evaluation.state;
    if (nextThreat !== snapshot.threatState && this.messageCooldown <= 0) {
      this.store.patch({ threatState: nextThreat, message: nextThreat === "alert" ? this.copy.threatAlert : nextThreat === "suspicious" ? this.copy.threatSuspicious : this.copy.threatPatrol });
      this.messageCooldown = 0.8;
    }
    const droneMaterial = this.drone.material as StandardMaterial;
    const lightMaterial = this.droneLight.material as StandardMaterial;
    const coneMaterial = this.droneCone.material as StandardMaterial;
    const isAlert = nextThreat === "alert";
    const isSuspicious = nextThreat === "suspicious";
    droneMaterial.emissiveColor = Color3.FromHexString(isAlert ? "#4A202C" : isSuspicious ? "#3D3020" : "#000000");
    lightMaterial.diffuseColor = Color3.FromHexString(isAlert ? palette.red : isSuspicious ? palette.amber : palette.amber);
    lightMaterial.emissiveColor = lightMaterial.diffuseColor;
    coneMaterial.diffuseColor = Color3.FromHexString(isAlert ? palette.red : palette.amber);
    coneMaterial.emissiveColor = coneMaterial.diffuseColor;
    this.droneCone.visibility = evaluation.coneVisibility;

  }
}
