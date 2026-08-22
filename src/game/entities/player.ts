import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Scene } from "@babylonjs/core/scene";
import { InputManager } from "../input/input-manager";

export interface PlayerUpdateResult {
  moved: boolean;
  position: Vector3;
}

export class Player {
  readonly root: Mesh;
  private readonly direction = new Vector3();
  private readonly speed = 3.8;
  private dashTime = 0;
  private readonly input: InputManager;

  constructor(private readonly scene: Scene, input: InputManager) {
    this.input = input;
    this.root = MeshBuilder.CreateCylinder("player-blockout", { height: 0.72, diameterTop: 0.46, diameterBottom: 0.58, tessellation: 8 }, scene);
    this.root.position = new Vector3(-2.9, 0.5, 1.1);

    const material = new StandardMaterial("player-blockout-material", scene);
    material.diffuseColor = Color3.FromHexString("#E9D9B5");
    material.emissiveColor = Color3.FromHexString("#392F40");
    material.specularColor = Color3.Black();
    this.root.material = material;

    const marker = MeshBuilder.CreateTorus("player-lumen-marker", { diameter: 0.78, thickness: 0.055, tessellation: 24 }, scene);
    marker.parent = this.root;
    marker.rotation.x = Math.PI / 2;
    marker.position.y = -0.34;
    const markerMaterial = new StandardMaterial("player-lumen-marker-material", scene);
    markerMaterial.diffuseColor = Color3.FromHexString("#76F0C0");
    markerMaterial.emissiveColor = Color3.FromHexString("#76F0C0");
    marker.material = markerMaterial;
  }

  update(delta: number): PlayerUpdateResult {
    const horizontal = Number(this.input.isHeld("right")) - Number(this.input.isHeld("left"));
    const vertical = Number(this.input.isHeld("down")) - Number(this.input.isHeld("up"));
    this.direction.set(horizontal, 0, vertical);

    if (this.direction.lengthSquared() > 0) this.direction.normalize();
    if (this.input.consume("dash")) this.dashTime = 0.16;
    this.dashTime = Math.max(0, this.dashTime - delta);

    const multiplier = this.dashTime > 0 ? 2.35 : 1;
    const distance = this.speed * multiplier * delta;
    const previous = this.root.position.clone();
    this.root.position.addInPlace(this.direction.scale(distance));
    this.root.position.x = Math.max(-4.9, Math.min(4.9, this.root.position.x));
    this.root.position.z = Math.max(-2.55, Math.min(2.75, this.root.position.z));

    if (this.direction.lengthSquared() > 0) {
      this.root.rotation.y = Math.atan2(this.direction.x, this.direction.z);
      this.root.scaling.y = 1 + Math.sin(performance.now() * 0.012) * 0.025;
    } else {
      this.root.scaling.y = 1;
    }

    return { moved: Vector3.DistanceSquared(previous, this.root.position) > 0.000001, position: this.root.position.clone() };
  }

  distanceTo(position: Vector3): number {
    return Vector3.Distance(this.root.position, position);
  }
}
