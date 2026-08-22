import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { GameStateStore } from "./core/game-state";
import { GameWorld } from "./core/game-world";
import { InputManager } from "./input/input-manager";
import type { GameLocale } from "./data/game-copy";

export interface GameHandle {
  scene: Scene;
  store: GameStateStore;
  input: InputManager;
  dispose: () => void;
}

export async function createGameScene(engine: Engine, canvas: HTMLCanvasElement, locale: GameLocale = "pt-BR"): Promise<GameHandle> {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.025, 0.03, 0.055, 1);

  const camera = new ArcRotateCamera("orbital-camera", -Math.PI / 2.1, Math.PI / 3.05, 12.8, new Vector3(0, 0, 0), scene);
  camera.mode = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;
  camera.orthoLeft = -6.8;
  camera.orthoRight = 6.8;
  camera.orthoTop = 4.1;
  camera.orthoBottom = -4.1;
  camera.lowerRadiusLimit = 12.8;
  camera.upperRadiusLimit = 12.8;
  camera.attachControl(canvas, false);

  const light = new HemisphericLight("orbital-fill", new Vector3(0, 1, 0), scene);
  light.intensity = 1.15;
  light.diffuse = new Color3(0.95, 0.88, 0.74);
  light.groundColor = new Color3(0.15, 0.13, 0.23);

  const store = new GameStateStore();
  const input = new InputManager(window);
  const world = new GameWorld(scene, store, input, locale);
  const observer = scene.onBeforeRenderObservable.add(() => {
    world.update(engine.getDeltaTime() / 1000);
  });

  return {
    scene,
    store,
    input,
    dispose: () => {
      scene.onBeforeRenderObservable.remove(observer);
      input.dispose();
      world.dispose();
      scene.dispose();
    },
  };
}
