import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Scene } from "@babylonjs/core/scene";
import { GameStateStore } from "./game-state";
import { InputManager } from "../input/input-manager";
import { Player } from "../entities/player";

interface SignalNode {
  mesh: Mesh;
  ring: Mesh;
  restored: boolean;
}

const palette = {
  ink: "#171923",
  cream: "#E9D9B5",
  mint: "#76F0C0",
  violet: "#A879FF",
  amber: "#F3A65A",
  red: "#EE6A74",
};

function material(scene: Scene, name: string, color: string, emissive = "#000000"): StandardMaterial {
  const result = new StandardMaterial(name, scene);
  result.diffuseColor = Color3.FromHexString(color);
  result.emissiveColor = Color3.FromHexString(emissive);
  result.specularColor = Color3.Black();
  return result;
}

export class GameWorld {
  readonly player: Player;
  private readonly nodes: SignalNode[] = [];
  private readonly input: InputManager;
  private readonly store: GameStateStore;
  private readonly drone: Mesh;
  private readonly droneLight: Mesh;
  private droneTime = 0;
  private messageCooldown = 0;
  private energyTick = 0;
  private readonly scheduledTimeouts = new Set<number>();

  constructor(private readonly scene: Scene, store: GameStateStore, input: InputManager) {
    this.store = store;
    this.input = input;
    this.createDiorama();
    this.player = new Player(scene, input);
    this.createMira();
    this.createSignalNodes();
    this.createPortal();
    const droneParts = this.createDrone();
    this.drone = droneParts.body;
    this.droneLight = droneParts.light;
  }

  dispose(): void {
    for (const timeout of this.scheduledTimeouts) window.clearTimeout(timeout);
    this.scheduledTimeouts.clear();
  }

  update(delta: number): void {
    if (this.input.consume("pause")) {
      const paused = !this.store.getSnapshot().paused;
      this.store.patch({ paused, message: paused ? "Jogo pausado. Pressione ESC para retomar." : "Jogo retomado." });
    }
    if (this.store.getSnapshot().paused) return;

    const result = this.player.update(delta);
    if (result.moved) this.messageCooldown = Math.max(0, this.messageCooldown - delta);

    this.updateDrone(delta);
    this.handleInteractions();
    this.handleTool();

    if (this.store.getSnapshot().threatState === "alert") {
      this.energyTick += delta;
      if (this.energyTick > 1.2) {
        this.energyTick = 0;
        const snapshot = this.store.getSnapshot();
        this.store.patch({ energy: Math.max(0, snapshot.energy - 3), message: "O cone de varredura encontrou a assinatura Lumen." });
      }
    } else {
      this.energyTick = 0;
    }
  }

  private createDiorama(): void {
    const groundMaterial = material(this.scene, "hub-ground", "#292B38");
    const ground = MeshBuilder.CreateBox("hub-ground", { width: 11.6, depth: 6.8, height: 0.28 }, this.scene);
    ground.position.y = -0.18;
    ground.material = groundMaterial;

    const borderMaterial = material(this.scene, "hub-border", palette.ink);
    const mintMaterial = material(this.scene, "hub-mint-lines", palette.mint, palette.mint);
    const violetMaterial = material(this.scene, "hub-violet-lines", palette.violet, palette.violet);

    for (const [index, z] of [-2.65, -1.45, -0.25, 0.95, 2.15].entries()) {
      const line = MeshBuilder.CreateBox(`floor-line-${index}`, { width: 10.8, depth: 0.035, height: 0.018 }, this.scene);
      line.position.set(0, 0.01, z);
      line.material = index === 2 ? mintMaterial : borderMaterial;
    }

    for (const x of [-5.35, 5.35]) {
      const rail = MeshBuilder.CreateBox(`hub-rail-${x}`, { width: 0.28, depth: 6.5, height: 0.55 }, this.scene);
      rail.position.set(x, 0.2, 0);
      rail.material = borderMaterial;
    }

    const backWall = MeshBuilder.CreateBox("hub-back-wall", { width: 10.5, depth: 0.3, height: 1.4 }, this.scene);
    backWall.position.set(0, 0.55, 2.95);
    backWall.material = borderMaterial;

    for (const x of [-4.4, -3.2, 3.1, 4.2]) {
      const light = MeshBuilder.CreateBox(`signal-stripe-${x}`, { width: 0.07, depth: 0.15, height: 0.5 }, this.scene);
      light.position.set(x, 0.56, 2.76);
      light.material = x < 0 ? mintMaterial : violetMaterial;
    }

    const starMaterial = material(this.scene, "star-material", "#F7F4E7", "#3C405C");
    for (let index = 0; index < 18; index += 1) {
      const star = MeshBuilder.CreateSphere(`star-${index}`, { diameter: 0.025 + (index % 3) * 0.018, segments: 4 }, this.scene);
      star.position.set(-5.5 + ((index * 2.7) % 11), 1.8 + (index % 3) * 0.48, -3.6 + (index % 5) * 1.7);
      star.material = starMaterial;
    }
  }

  private createMira(): void {
    const base = MeshBuilder.CreateBox("mira-terminal", { width: 1.25, depth: 0.55, height: 0.85 }, this.scene);
    base.position.set(-3.7, 0.48, 2.1);
    base.material = material(this.scene, "mira-terminal-material", "#463D5B");

    const screen = MeshBuilder.CreateBox("mira-terminal-screen", { width: 0.76, depth: 0.03, height: 0.35 }, this.scene);
    screen.position.set(-3.7, 0.78, 1.78);
    screen.material = material(this.scene, "mira-screen", palette.mint, palette.mint);

    const badge = MeshBuilder.CreateTorus("mira-badge", { diameter: 0.38, thickness: 0.045, tessellation: 16 }, this.scene);
    badge.position.set(-3.05, 0.72, 1.78);
    badge.rotation.x = Math.PI / 2;
    badge.material = material(this.scene, "mira-badge-material", palette.amber, palette.amber);
  }

  private createSignalNodes(): void {
    for (const [index, position] of [new Vector3(-1.45, 0.22, 0.15), new Vector3(0, 0.22, -0.95), new Vector3(1.45, 0.22, 0.15)].entries()) {
      const mesh = MeshBuilder.CreateCylinder(`signal-node-${index}`, { diameter: 0.48, height: 0.22, tessellation: 8 }, this.scene);
      mesh.position.copyFrom(position);
      mesh.material = material(this.scene, `signal-node-material-${index}`, "#414454");

      const ring = MeshBuilder.CreateTorus(`signal-ring-${index}`, { diameter: 0.9, thickness: 0.045, tessellation: 24 }, this.scene);
      ring.position.set(position.x, 0.35, position.z);
      ring.rotation.x = Math.PI / 2;
      ring.material = material(this.scene, `signal-ring-material-${index}`, palette.violet, "#241A41");
      this.nodes.push({ mesh, ring, restored: false });
    }
  }

  private createPortal(): void {
    const frame = MeshBuilder.CreateTorus("memory-portal", { diameter: 1.75, thickness: 0.22, tessellation: 32 }, this.scene);
    frame.position.set(3.9, 0.9, 1.55);
    frame.rotation.x = Math.PI / 2;
    frame.material = material(this.scene, "portal-material", palette.violet, "#3B2368");

    const core = MeshBuilder.CreateDisc("portal-core", { radius: 0.73, tessellation: 32 }, this.scene);
    core.position.set(3.9, 0.9, 1.56);
    core.rotation.x = Math.PI / 2;
    core.material = material(this.scene, "portal-core-material", "#201A38", "#201A38");
  }

  private createDrone(): { body: Mesh; light: Mesh } {
    const body = MeshBuilder.CreateBox("sentinel-drone", { width: 0.6, depth: 0.6, height: 0.32 }, this.scene);
    body.position.set(2.2, 1.15, -1.9);
    body.material = material(this.scene, "drone-material", "#373746");

    const light = MeshBuilder.CreateSphere("sentinel-drone-light", { diameter: 0.16, segments: 8 }, this.scene);
    light.position.set(2.2, 1.15, -2.22);
    light.material = material(this.scene, "drone-light-material", palette.amber, palette.amber);
    return { body, light };
  }

  private updateDrone(delta: number): void {
    const snapshot = this.store.getSnapshot();
    if (snapshot.threatState === "disabled") {
      this.drone.rotation.y += delta * 1.4;
      this.droneLight.visibility = 0.28;
      return;
    }

    this.droneTime += delta;
    this.drone.position.x = 2.2 + Math.sin(this.droneTime * 0.8) * 1.4;
    this.drone.position.z = -1.8 + Math.cos(this.droneTime * 0.8) * 0.55;
    this.droneLight.position.x = this.drone.position.x;
    this.droneLight.position.z = this.drone.position.z - 0.32;
    this.drone.position.y = 1.15 + Math.sin(this.droneTime * 2.2) * 0.08;
    this.droneLight.position.y = this.drone.position.y;

    const close = this.player.distanceTo(this.drone.position) < 2.25;
    if (close && snapshot.threatState !== "alert") {
      this.store.patch({ threatState: "alert", message: "Sentinela em alerta — use o Pulso ou atravesse com um dash." });
    } else if (!close && snapshot.threatState === "alert" && this.messageCooldown <= 0) {
      this.store.patch({ threatState: "patrol" });
    }
    const droneMaterial = this.drone.material as StandardMaterial;
    const lightMaterial = this.droneLight.material as StandardMaterial;
    droneMaterial.emissiveColor = Color3.FromHexString(snapshot.threatState === "alert" ? "#4A202C" : "#000000");
    lightMaterial.diffuseColor = Color3.FromHexString(snapshot.threatState === "alert" ? palette.red : palette.amber);
    lightMaterial.emissiveColor = lightMaterial.diffuseColor;
  }

  private handleInteractions(): void {
    if (!this.input.consume("interact")) return;
    const snapshot = this.store.getSnapshot();
    if (snapshot.dialogue) {
      this.store.patch({ dialogue: null, message: "A estação aguardou a próxima ação." });
      return;
    }

    const nearbyNode = this.nodes.find((node) => this.player.distanceTo(node.mesh.position) < 1.05 && !node.restored);
    if (nearbyNode) {
      nearbyNode.restored = true;
      nearbyNode.mesh.material = material(this.scene, `restored-node-${nearbyNode.mesh.name}`, palette.mint, palette.mint);
      nearbyNode.ring.material = material(this.scene, `restored-ring-${nearbyNode.ring.name}`, palette.mint, palette.mint);
      const restored = snapshot.nodesRestored + 1;
      this.store.patch({
        nodesRestored: restored,
        objective: restored === 3 ? "Atravesse o portal de memória" : "Reative os três nós de sinal",
        message: restored === 3 ? "Os três sinais responderam. O portal de memória está aberto." : `Nó restaurado. ${3 - restored} ainda aguardando energia.`,
      });
      return;
    }

    if (this.player.distanceTo(new Vector3(-3.7, 0.5, 2.1)) < 1.35) {
      this.store.patch({ dialogue: { speaker: "MIRA", text: "Você trouxe a Lumen. Se o núcleo ainda lembra de algo, os três sinais vão responder." }, message: "MIRA compartilhou uma pista sobre os nós." });
      return;
    }

    if (this.player.distanceTo(new Vector3(3.9, 0.9, 1.55)) < 1.45) {
      if (snapshot.nodesRestored === 3) {
        this.store.patch({ completed: true, objective: "Slice concluída — a estação voltou a respirar", message: "O núcleo reconheceu uma nova configuração de memória." });
      } else {
        this.store.patch({ message: "O portal ainda precisa dos três sinais restaurados." });
      }
      return;
    }

    this.store.patch({ message: "Aproxime-se de um nó, de MIRA ou do portal para interagir." });
  }

  private handleTool(): void {
    if (!this.input.consume("tool")) return;
    const snapshot = this.store.getSnapshot();
    if (snapshot.energy < 12) {
      this.store.patch({ message: "A Lumen precisa de energia para emitir outro Pulso." });
      return;
    }
    if (this.player.distanceTo(this.drone.position) < 1.85 && snapshot.threatState !== "disabled") {
      this.store.patch({ energy: snapshot.energy - 12, threatState: "disabled", message: "Pulso Lumen emitido. O sentinela foi desativado por alguns segundos." });
      this.messageCooldown = 2.2;
      const timeout = window.setTimeout(() => {
        this.scheduledTimeouts.delete(timeout);
        if (this.store.getSnapshot().completed) return;
        this.store.patch({ threatState: "patrol", message: "O sentinela voltou ao modo de patrulha." });
      }, 3200);
      this.scheduledTimeouts.add(timeout);
      return;
    }
    this.store.patch({ energy: Math.max(0, snapshot.energy - 4), message: "A Lumen escaneou o setor. Há três sinais próximos." });
  }
}
