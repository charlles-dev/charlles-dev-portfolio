"use client";

import Link from "next/link";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import { WORLD_COPY } from "@/game/world-2d/copy";
import {
  INITIAL_WORLD_SAVE,
  WORLD_MAPS,
  findNearbyWorldEntity,
  findWorldPortal,
  isWorldCellWalkable,
} from "@/game/world-2d/maps";
import { findWorldPath } from "@/game/world-2d/pathfinding";
import type { WorldCell, WorldFacing, WorldMapId, WorldSave } from "@/game/world-2d/types";
import type { Locale } from "@/lib/i18n";

import styles from "./world-game.module.css";

const STORAGE_KEY = "charlles-world-v1";
const STEP_DURATION = 145;
const WORLD_ASSETS = [
  "/assets/game/world/environment/charlles-home-concept-v1.png",
  "/assets/game/world/character/charlles-walk-front-420x115-v1.png",
  "/assets/game/world/character/charlles-walk-back-420x115-v1.png",
  "/assets/game/world/character/charlles-walk-left-420x115-v1.png",
  "/assets/game/world/character/charlles-walk-right-420x115-v1.png",
] as const;

function facingFromStep(from: WorldCell, to: WorldCell): WorldFacing {
  if (to.column > from.column) return "right";
  if (to.column < from.column) return "left";
  if (to.row < from.row) return "up";
  return "down";
}

function spriteForFacing(facing: WorldFacing) {
  const file = facing === "down" ? "front" : facing === "up" ? "back" : facing;
  return `/assets/game/world/character/charlles-walk-${file}-420x115-v1.png`;
}

function copySave(save: WorldSave): WorldSave {
  return { ...save, player: { ...save.player }, discoveredMaps: [...save.discoveredMaps] };
}

export function WorldGame({ locale }: { locale: Locale }) {
  const copy = WORLD_COPY[locale];
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [save, setSave] = useState<WorldSave>(() => copySave(INITIAL_WORLD_SAVE));
  const [queue, setQueue] = useState<WorldCell[]>([]);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [message, setMessage] = useState(copy.homeObjective);
  const [hydrated, setHydrated] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef(save);
  const transitionTimerRef = useRef<number | null>(null);

  const map = WORLD_MAPS[save.mapId];
  const isMoving = queue.length > 0;
  const mapName = save.mapId === "home" ? copy.home : copy.street;
  const objective = save.mapId === "home" ? copy.homeObjective : copy.streetObjective;

  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  useEffect(() => {
    let cancelled = false;

    Promise.all(WORLD_ASSETS.map((source) => new Promise<void>((resolve, reject) => {
      const asset = new window.Image();
      asset.onload = () => resolve();
      asset.onerror = () => reject(new Error(source));
      asset.src = source;
    }))).then(() => {
      if (cancelled) return;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const candidate = JSON.parse(stored) as WorldSave;
          const candidateMap = WORLD_MAPS[candidate.mapId as WorldMapId];
          if (candidate.version === 1 && candidateMap && isWorldCellWalkable(candidateMap, candidate.player)) {
            setSave(candidate);
            setMessage(candidate.mapId === "home" ? copy.homeObjective : copy.streetObjective);
          }
        }
      } catch { /* Persistence is optional. */ }
      setHydrated(true);
      setStatus("ready");
      requestAnimationFrame(() => stageRef.current?.focus());
    }).catch(() => {
      if (!cancelled) setStatus("error");
    });

    return () => { cancelled = true; };
  }, [attempt, copy.homeObjective, copy.streetObjective]);

  useEffect(() => {
    if (!hydrated || status !== "ready") return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); } catch { /* Continue without storage. */ }
  }, [hydrated, save, status]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.visibilityState === "hidden") setPaused(true);
    };
    const pauseOnBlur = () => setPaused(true);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    window.addEventListener("blur", pauseOnBlur);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      window.removeEventListener("blur", pauseOnBlur);
    };
  }, []);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
  }, []);

  useEffect(() => {
    if (status !== "ready" || paused || transitioning || queue.length === 0) return;
    const next = queue[0];
    const timer = window.setTimeout(() => {
      const current = saveRef.current;
      const currentMap = WORLD_MAPS[current.mapId];
      if (!isWorldCellWalkable(currentMap, next)) {
        setQueue([]);
        return;
      }

      const facing = facingFromStep(current.player, next);
      const portal = findWorldPortal(currentMap, next);
      setStepCount((value) => value + 1);
      setSave((value) => ({ ...value, player: next, facing }));
      setQueue((value) => value.slice(1));

      if (!portal) return;
      setQueue([]);
      setTransitioning(true);
      transitionTimerRef.current = window.setTimeout(() => {
        setSave((value) => ({
          ...value,
          mapId: portal.targetMapId,
          player: portal.targetCell,
          facing: portal.targetMapId === "street" ? "down" : "up",
          discoveredMaps: value.discoveredMaps.includes(portal.targetMapId)
            ? value.discoveredMaps
            : [...value.discoveredMaps, portal.targetMapId],
        }));
        setMessage(portal.targetMapId === "street" ? copy.streetArrival : copy.homeArrival);
        setTransitioning(false);
        requestAnimationFrame(() => stageRef.current?.focus());
      }, 260);
    }, STEP_DURATION);
    return () => window.clearTimeout(timer);
  }, [copy.homeArrival, copy.streetArrival, paused, queue, status, transitioning]);

  const enqueueStep = useCallback((column: number, row: number) => {
    if (status !== "ready" || paused || transitioning) return;
    const current = saveRef.current;
    const activeMap = WORLD_MAPS[current.mapId];
    setQueue((existing) => {
      const origin = existing.at(-1) ?? current.player;
      const target = { column: origin.column + column, row: origin.row + row };
      return isWorldCellWalkable(activeMap, target) ? [...existing, target] : existing;
    });
  }, [paused, status, transitioning]);

  const walkTo = useCallback((target: WorldCell) => {
    if (status !== "ready" || paused || transitioning) return;
    const current = saveRef.current;
    const path = findWorldPath(WORLD_MAPS[current.mapId], current.player, target);
    if (path.length > 0) setQueue(path);
  }, [paused, status, transitioning]);

  const interact = useCallback(() => {
    if (status !== "ready" || paused || transitioning) return;
    const current = saveRef.current;
    const entity = findNearbyWorldEntity(WORLD_MAPS[current.mapId], current.player);
    setMessage(entity ? copy[entity.id] : copy.nothingHere);
  }, [copy, paused, status, transitioning]);

  const reset = useCallback(() => {
    setQueue([]);
    setPaused(false);
    setTransitioning(false);
    setSave(copySave(INITIAL_WORLD_SAVE));
    setMessage(copy.resetMessage);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    requestAnimationFrame(() => stageRef.current?.focus());
  }, [copy.resetMessage]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toLowerCase();
    const commands: Record<string, () => void> = {
      arrowup: () => enqueueStep(0, -1), w: () => enqueueStep(0, -1),
      arrowdown: () => enqueueStep(0, 1), s: () => enqueueStep(0, 1),
      arrowleft: () => enqueueStep(-1, 0), a: () => enqueueStep(-1, 0),
      arrowright: () => enqueueStep(1, 0), d: () => enqueueStep(1, 0),
      e: interact, " ": interact,
      p: () => setPaused((value) => !value), escape: () => setPaused((value) => !value),
    };
    const command = commands[key];
    if (!command) return;
    event.preventDefault();
    command();
  };

  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    walkTo({
      column: Math.min(map.columns - 1, Math.max(0, Math.floor(((event.clientX - bounds.left) / bounds.width) * map.columns))),
      row: Math.min(map.rows - 1, Math.max(0, Math.floor(((event.clientY - bounds.top) / bounds.height) * map.rows))),
    });
    event.currentTarget.focus();
  };

  const playerStyle = useMemo(() => ({
    "--player-x": `${((save.player.column + 0.5) / map.columns) * 100}%`,
    "--player-y": `${((save.player.row + 1) / map.rows) * 100}%`,
    "--sprite": `url(${spriteForFacing(save.facing)})`,
    "--sprite-frame": `${(stepCount % 4) * 33.333}%`,
  }) as CSSProperties, [map.columns, map.rows, save.facing, save.player, stepCount]);

  return (
    <main className={styles.page} id="conteudo">
      <header className={styles.header}>
        <Link href={`/${locale}/game`} className={styles.back}><IconGlyph name="arrow-right" className={styles.backIcon} />{copy.back}</Link>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </header>

      <section className={styles.shell} aria-labelledby="world-map-title">
        <div className={styles.toolbar}>
          <div>
            <span>{save.discoveredMaps.length}/2</span>
            <strong id="world-map-title">{mapName}</strong>
            <p>{objective}</p>
          </div>
          <div className={styles.toolbarActions}>
            <button type="button" onClick={() => setPaused(true)}>{copy.pause}</button>
            <button type="button" onClick={reset}>{copy.reset}</button>
          </div>
        </div>

        <div
          ref={stageRef}
          className={`${styles.stage} ${styles[save.mapId]} ${transitioning ? styles.transitioning : ""}`}
          role="group"
          tabIndex={0}
          aria-label={`${mapName}. ${copy.controls}`}
          aria-describedby="world-controls"
          data-map-id={save.mapId}
          data-player-column={save.player.column}
          data-player-row={save.player.row}
          data-world-status={status}
          onKeyDown={onKeyDown}
          onPointerDown={onStagePointerDown}
        >
          {save.mapId === "street" && <StreetScenery />}
          <div className={`${styles.player} ${isMoving ? styles.walking : ""}`} style={playerStyle} aria-label="Charlles" />

          {status === "loading" && <div className={styles.overlay} role="status"><span className={styles.loader} />{copy.loading}</div>}
          {status === "error" && <div className={styles.overlay} role="alert"><strong>{copy.loadError}</strong><button type="button" onClick={() => { setStatus("loading"); setHydrated(false); setAttempt((value) => value + 1); }}>{copy.retry}</button></div>}
          {paused && status === "ready" && <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={copy.paused}><strong>{copy.paused}</strong><button type="button" onClick={() => { setPaused(false); requestAnimationFrame(() => stageRef.current?.focus()); }}>{copy.resume}</button></div>}
        </div>

        <p className={styles.message} role="status" aria-live="polite">{message}</p>
        <p className={styles.instructions} id="world-controls">{copy.controls}</p>

        <div className={styles.touchControls} aria-label={copy.controls}>
          <button type="button" aria-label="Up" onClick={() => enqueueStep(0, -1)}>↑</button>
          <button type="button" aria-label="Left" onClick={() => enqueueStep(-1, 0)}>←</button>
          <button type="button" className={styles.interact} aria-label={copy.interact} onClick={interact}>E</button>
          <button type="button" aria-label="Right" onClick={() => enqueueStep(1, 0)}>→</button>
          <button type="button" aria-label="Down" onClick={() => enqueueStep(0, 1)}>↓</button>
        </div>
      </section>
    </main>
  );
}

function StreetScenery() {
  return (
    <div className={styles.streetScenery} aria-hidden="true">
      <div className={styles.house}><span /></div>
      <div className={styles.sidewalk} />
      <div className={styles.road} />
      <div className={styles.lamp} />
      <div className={styles.gate}>CITY / NEXT</div>
    </div>
  );
}
