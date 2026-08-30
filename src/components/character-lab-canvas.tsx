"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { AnimationGroup } from "@babylonjs/core/Animations/animationGroup.js";

import type { Locale } from "@/lib/i18n";

type LabMetrics = {
  fps: number;
  triangles: number;
  meshes: number;
  resolution: string;
};

type CharacterVariant = "preview" | "gameplay" | "rigged";

const assets: Record<CharacterVariant, string> = {
  preview: "charlles-runtime-preview.glb",
  gameplay: "charlles-gameplay-proxy.glb",
  rigged: "charlles-rigged-gameplay.glb",
};

type LabCopy = {
  canvas: string;
  loading: string;
  ready: string;
  failed: string;
  retry: string;
  reset: string;
  wireframe: string;
  material: string;
  fps: string;
  triangles: string;
  meshes: string;
  resolution: string;
  noRig: string;
  rigReady: string;
  variants: string;
  preview: string;
  gameplay: string;
  rigged: string;
  animation: string;
  play: string;
  pause: string;
};

const copy: Record<Locale, LabCopy> = {
  "pt-BR": {
    canvas: "Visualizador tridimensional do personagem. Arraste para orbitar e use a roda ou pinça para aproximar.",
    loading: "Decodificando geometria e preparando materiais…",
    ready: "Modelo pronto para inspeção.",
    failed: "O modelo não pôde ser carregado neste navegador.",
    retry: "Tentar novamente",
    reset: "Reposicionar câmera",
    wireframe: "Ver estrutura",
    material: "Ver material",
    fps: "FPS",
    triangles: "Triângulos",
    meshes: "Malhas",
    resolution: "Render",
    noRig: "Preview estático · rig pendente",
    rigReady: "Rig web · 15 animações separadas",
    variants: "Densidade da malha",
    preview: "Preview · 200k",
    gameplay: "Gameplay · 60k",
    rigged: "Rig + animações · 60k",
    animation: "Animação",
    play: "Reproduzir animação",
    pause: "Pausar animação",
  },
  en: {
    canvas: "Three-dimensional character viewer. Drag to orbit and use the wheel or pinch to zoom.",
    loading: "Decoding geometry and preparing materials…",
    ready: "Model ready for inspection.",
    failed: "The model could not be loaded in this browser.",
    retry: "Try again",
    reset: "Reset camera",
    wireframe: "Show structure",
    material: "Show material",
    fps: "FPS",
    triangles: "Triangles",
    meshes: "Meshes",
    resolution: "Render",
    noRig: "Static preview · rig pending",
    rigReady: "Web rig · 15 separate animations",
    variants: "Mesh density",
    preview: "Preview · 200k",
    gameplay: "Gameplay · 60k",
    rigged: "Rig + animations · 60k",
    animation: "Animation",
    play: "Play animation",
    pause: "Pause animation",
  },
  es: {
    canvas: "Visor tridimensional del personaje. Arrastra para orbitar y usa la rueda o pellizca para acercar.",
    loading: "Decodificando geometría y preparando materiales…",
    ready: "Modelo listo para inspección.",
    failed: "No se pudo cargar el modelo en este navegador.",
    retry: "Intentar de nuevo",
    reset: "Reposicionar cámara",
    wireframe: "Ver estructura",
    material: "Ver material",
    fps: "FPS",
    triangles: "Triángulos",
    meshes: "Mallas",
    resolution: "Render",
    noRig: "Preview estático · rig pendiente",
    rigReady: "Rig web · 15 animaciones separadas",
    variants: "Densidad de malla",
    preview: "Preview · 200k",
    gameplay: "Gameplay · 60k",
    rigged: "Rig + animaciones · 60k",
    animation: "Animación",
    play: "Reproducir animación",
    pause: "Pausar animación",
  },
};

export function CharacterLabCanvas({ locale }: { locale: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetCameraRef = useRef<(() => void) | null>(null);
  const toggleWireframeRef = useRef<((enabled: boolean) => void) | null>(null);
  const animationGroupsRef = useRef<AnimationGroup[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [wireframe, setWireframe] = useState(false);
  const [variant, setVariant] = useState<CharacterVariant>("preview");
  const [animations, setAnimations] = useState<string[]>([]);
  const [activeAnimation, setActiveAnimation] = useState("");
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [metrics, setMetrics] = useState<LabMetrics>({ fps: 0, triangles: 0, meshes: 0, resolution: "—" });
  const labels = copy[locale];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let disposeScene = () => {};
    setStatus("loading");
    setAnimations([]);
    setActiveAnimation("");
    setAnimationPlaying(false);

    const initialize = async () => {
      try {
        const [
          { Engine },
          { Scene },
          { ArcRotateCamera },
          { Vector3 },
          { Color3, Color4 },
          { HemisphericLight },
          { DirectionalLight },
          { MeshBuilder },
          { StandardMaterial },
          { SceneLoader },
          { DefaultRenderingPipeline },
        ] = await Promise.all([
          import("@babylonjs/core/Engines/engine.js"),
          import("@babylonjs/core/scene.js"),
          import("@babylonjs/core/Cameras/arcRotateCamera.js"),
          import("@babylonjs/core/Maths/math.vector.js"),
          import("@babylonjs/core/Maths/math.color.js"),
          import("@babylonjs/core/Lights/hemisphericLight.js"),
          import("@babylonjs/core/Lights/directionalLight.js"),
          import("@babylonjs/core/Meshes/meshBuilder.js"),
          import("@babylonjs/core/Materials/standardMaterial.js"),
          import("@babylonjs/core/Loading/sceneLoader.js"),
          import("@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline.js"),
        ]);
        await import("@babylonjs/loaders/glTF/index.js");
        if (disposed) return;

        const engine = new Engine(canvas, true, {
          antialias: true,
          preserveDrawingBuffer: false,
          stencil: true,
          adaptToDeviceRatio: true,
        });
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.025, 0.027, 0.025, 1);

        const camera = new ArcRotateCamera("lab-camera", Math.PI / 2, Math.PI / 2.25, 1.8, Vector3.Zero(), scene);
        camera.lowerRadiusLimit = 0.75;
        camera.upperRadiusLimit = 4;
        camera.panningSensibility = 0;
        camera.wheelPrecision = 80;
        camera.pinchPrecision = 160;
        camera.attachControl(canvas, true);

        const ambient = new HemisphericLight("ambient", new Vector3(0, 1, 0), scene);
        ambient.intensity = 1.15;
        ambient.diffuse = new Color3(0.78, 0.86, 1);
        ambient.groundColor = new Color3(0.08, 0.09, 0.08);

        const key = new DirectionalLight("key", new Vector3(-0.6, -1, -0.4), scene);
        key.position = new Vector3(2, 3, 2);
        key.intensity = 2.1;
        key.diffuse = new Color3(1, 0.84, 0.7);

        const result = await SceneLoader.ImportMeshAsync("", "/assets/game/characters/", assets[variant], scene);
        if (disposed) {
          scene.dispose();
          engine.dispose();
          return;
        }

        const bounds = result.meshes[0].getHierarchyBoundingVectors(true);
        const center = bounds.min.add(bounds.max).scale(0.5);
        const height = bounds.max.y - bounds.min.y;
        const initialRadius = Math.max(1.15, height * 1.55);
        camera.setTarget(new Vector3(center.x, center.y + height * 0.04, center.z));
        camera.radius = initialRadius;
        camera.lowerRadiusLimit = initialRadius * 0.55;
        camera.upperRadiusLimit = initialRadius * 2.4;

        const ground = MeshBuilder.CreateDisc("lab-ground", { radius: height * 0.72, tessellation: 96 }, scene);
        ground.rotation.x = Math.PI / 2;
        ground.position.y = bounds.min.y - 0.008;
        const groundMaterial = new StandardMaterial("lab-ground-material", scene);
        groundMaterial.diffuseColor = new Color3(0.035, 0.04, 0.036);
        groundMaterial.specularColor = new Color3(0.08, 0.1, 0.08);
        ground.material = groundMaterial;

        const pipeline = new DefaultRenderingPipeline("lab-pipeline", true, scene, [camera]);
        pipeline.samples = Math.min(4, engine.getCaps().maxMSAASamples || 1);
        pipeline.fxaaEnabled = true;
        pipeline.bloomEnabled = false;
        pipeline.imageProcessingEnabled = true;
        pipeline.imageProcessing.contrast = 1.08;
        pipeline.imageProcessing.exposure = 1.04;

        const resetCamera = () => {
          camera.alpha = Math.PI / 2;
          camera.beta = Math.PI / 2.25;
          camera.radius = initialRadius;
          camera.setTarget(new Vector3(center.x, center.y + height * 0.04, center.z));
        };
        resetCameraRef.current = resetCamera;
        toggleWireframeRef.current = (enabled) => {
          for (const material of scene.materials) material.wireframe = enabled;
          groundMaterial.wireframe = false;
        };

        animationGroupsRef.current = result.animationGroups;
        if (result.animationGroups.length > 0) {
          const defaultGroup = result.animationGroups.find((group) => group.name === "Idle_happy_remap") ?? result.animationGroups[0];
          setAnimations(result.animationGroups.map((group) => group.name));
          setActiveAnimation(defaultGroup.name);
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            defaultGroup.start(true);
            setAnimationPlaying(true);
          }
        }

        let lastMetricsUpdate = 0;
        engine.runRenderLoop(() => {
          scene.render();
          const now = performance.now();
          if (now - lastMetricsUpdate > 750) {
            lastMetricsUpdate = now;
            setMetrics({
              fps: Math.round(engine.getFps()),
              triangles: Math.round(scene.getActiveIndices() / 3),
              meshes: result.meshes.filter((mesh) => mesh.getTotalVertices() > 0).length,
              resolution: `${engine.getRenderWidth()}×${engine.getRenderHeight()}`,
            });
          }
        });

        const resize = () => engine.resize();
        const observer = new ResizeObserver(resize);
        observer.observe(canvas.parentElement ?? canvas);
        window.addEventListener("resize", resize);
        setStatus("ready");

        disposeScene = () => {
          observer.disconnect();
          window.removeEventListener("resize", resize);
          resetCameraRef.current = null;
          toggleWireframeRef.current = null;
          animationGroupsRef.current = [];
          scene.dispose();
          engine.dispose();
        };
      } catch (error) {
        console.error("Character Lab failed to initialize", error);
        if (!disposed) setStatus("error");
      }
    };

    void initialize();
    return () => {
      disposed = true;
      disposeScene();
    };
  }, [attempt, variant]);

  const toggleWireframe = useCallback(() => {
    setWireframe((current) => {
      const next = !current;
      toggleWireframeRef.current?.(next);
      return next;
    });
  }, []);

  const selectAnimation = useCallback((name: string) => {
    for (const group of animationGroupsRef.current) group.stop();
    const group = animationGroupsRef.current.find((item) => item.name === name);
    if (!group) return;
    group.start(true);
    setActiveAnimation(name);
    setAnimationPlaying(true);
  }, []);

  const toggleAnimation = useCallback(() => {
    const group = animationGroupsRef.current.find((item) => item.name === activeAnimation);
    if (!group) return;
    if (animationPlaying) group.pause();
    else group.play(true);
    setAnimationPlaying((current) => !current);
  }, [activeAnimation, animationPlaying]);

  return (
    <section className="character-lab-stage" aria-label="Character Lab">
      <div className="character-lab-viewport">
        <canvas ref={canvasRef} tabIndex={0} aria-label={labels.canvas} />
        {status !== "ready" && (
          <div className="character-lab-state" role={status === "error" ? "alert" : "status"}>
            <p>{status === "error" ? labels.failed : labels.loading}</p>
            {status === "error" && (
              <button type="button" onClick={() => setAttempt((value) => value + 1)}>{labels.retry}</button>
            )}
          </div>
        )}
        <p className="character-lab-runtime-state" aria-live="polite">
          <span aria-hidden="true" />
          {status === "ready" ? labels.ready : labels.loading}
        </p>
      </div>

      <aside className="character-lab-console" aria-label="Runtime metrics">
        <div className="character-lab-console-heading">
          <p className="reference-eyebrow">runtime / Babylon.js</p>
          <strong>{variant === "rigged" ? labels.rigReady : labels.noRig}</strong>
        </div>
        <div className="character-lab-variants" role="group" aria-label={labels.variants}>
          {(Object.keys(assets) as CharacterVariant[]).map((item) => (
            <button
              type="button"
              aria-pressed={variant === item}
              onClick={() => {
                for (const group of animationGroupsRef.current) group.stop();
                setWireframe(false);
                setAnimations([]);
                setActiveAnimation("");
                setAnimationPlaying(false);
                setMetrics({ fps: 0, triangles: 0, meshes: 0, resolution: "—" });
                setVariant(item);
              }}
              key={item}
            >
              {labels[item]}
            </button>
          ))}
        </div>
        {animations.length > 0 && (
          <div className="character-lab-animation-control" data-animation-count={animations.length}>
            <label htmlFor="character-lab-animation">{labels.animation}</label>
            <select
              id="character-lab-animation"
              value={activeAnimation}
              onChange={(event) => selectAnimation(event.target.value)}
            >
              {animations.map((animation) => (
                <option value={animation} key={animation}>{animation.replace(/_remap$/, "").replaceAll("_", " ")}</option>
              ))}
            </select>
            <button type="button" aria-pressed={animationPlaying} onClick={toggleAnimation}>
              {animationPlaying ? labels.pause : labels.play}
            </button>
          </div>
        )}
        <dl>
          <div><dt>{labels.fps}</dt><dd>{metrics.fps || "—"}</dd></div>
          <div><dt>{labels.triangles}</dt><dd data-triangles={metrics.triangles}>{metrics.triangles ? metrics.triangles.toLocaleString(locale) : "—"}</dd></div>
          <div><dt>{labels.meshes}</dt><dd>{metrics.meshes || "—"}</dd></div>
          <div><dt>{labels.resolution}</dt><dd>{metrics.resolution}</dd></div>
        </dl>
        <div className="character-lab-actions">
          <button type="button" onClick={() => resetCameraRef.current?.()}>{labels.reset}</button>
          <button type="button" aria-pressed={wireframe} onClick={toggleWireframe}>
            {wireframe ? labels.material : labels.wireframe}
          </button>
        </div>
      </aside>
    </section>
  );
}
