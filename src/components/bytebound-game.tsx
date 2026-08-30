"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale } from "@/lib/i18n";
import { getProfessionalContent } from "@/lib/professional-content";

type Point = { x: number; y: number };
type ModuleId = "interface" | "logic" | "signal";
type SaveState = { player: Point; modules: ModuleId[]; completed: boolean };

const grid = { columns: 9, rows: 7 };
const walls = new Set(["0,0","1,0","2,0","3,0","4,0","5,0","6,0","7,0","8,0","0,1","8,1","0,2","4,2","8,2","0,3","4,3","8,3","0,4","8,4","0,5","2,5","3,5","8,5","0,6","1,6","2,6","3,6","4,6","5,6","6,6","7,6","8,6"]);
const modules: Record<ModuleId, Point> = { interface: { x: 2, y: 2 }, logic: { x: 6, y: 1 }, signal: { x: 5, y: 5 } };
const terminal = { x: 7, y: 5 };
const startState: SaveState = { player: { x: 1, y: 4 }, modules: [], completed: false };

const labels: Record<Locale, Record<ModuleId, string>> = {
  "pt-BR": { interface: "Interface", logic: "Lógica", signal: "Sinal" },
  en: { interface: "Interface", logic: "Logic", signal: "Signal" },
  es: { interface: "Interfaz", logic: "Lógica", signal: "Señal" },
};

function key(point: Point) { return `${point.x},${point.y}`; }
function adjacent(a: Point, b: Point) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) <= 1; }

export function ByteboundGame({ locale }: { locale: Locale }) {
  const copy = getProfessionalContent(locale).game;
  const [started, setStarted] = useState(false);
  const [save, setSave] = useState<SaveState>(startState);
  const [message, setMessage] = useState(copy.description);
  const [hasSave, setHasSave] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const storageKey = `charlles-bytebound-v1-${locale}`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) { setSave(JSON.parse(stored) as SaveState); setHasSave(true); }
      } catch { /* Local storage is optional. */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    if (!started) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(save)); } catch { /* Continue without persistence. */ }
  }, [save, started, storageKey]);

  const remaining = useMemo(() => (Object.keys(modules) as ModuleId[]).filter((id) => !save.modules.includes(id)), [save.modules]);

  const move = useCallback((dx: number, dy: number) => {
    if (!started || save.completed) return;
    setSave((current) => {
      const next = { x: current.player.x + dx, y: current.player.y + dy };
      if (next.x < 0 || next.y < 0 || next.x >= grid.columns || next.y >= grid.rows || walls.has(key(next))) return current;
      return { ...current, player: next };
    });
  }, [save.completed, started]);

  const interact = useCallback(() => {
    if (!started || save.completed) return;
    const nearbyModule = remaining.find((id) => adjacent(save.player, modules[id]));
    if (nearbyModule) {
      setSave((current) => ({ ...current, modules: [...current.modules, nearbyModule] }));
      setMessage(locale === "pt-BR" ? `Módulo ${labels[locale][nearbyModule]} recuperado. O circuito respondeu.` : locale === "en" ? `${labels[locale][nearbyModule]} module recovered. The circuit answered.` : `Módulo ${labels[locale][nearbyModule]} recuperado. El circuito respondió.`);
      return;
    }
    if (adjacent(save.player, terminal)) {
      if (remaining.length === 0) {
        setSave((current) => ({ ...current, completed: true }));
        setMessage(copy.complete);
      } else {
        setMessage(locale === "pt-BR" ? `O terminal ainda pede ${remaining.length} módulo${remaining.length > 1 ? "s" : ""}.` : locale === "en" ? `The terminal still needs ${remaining.length} module${remaining.length > 1 ? "s" : ""}.` : `El terminal aún necesita ${remaining.length} módulo${remaining.length > 1 ? "s" : ""}.`);
      }
      return;
    }
    setMessage(locale === "pt-BR" ? "Nada para depurar aqui. Ainda." : locale === "en" ? "Nothing to debug here. Yet." : "Nada que depurar aquí. Todavía.");
  }, [copy.complete, locale, remaining, save.completed, save.player, started]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const commands: Record<string, () => void> = { ArrowUp: () => move(0, -1), w: () => move(0, -1), ArrowDown: () => move(0, 1), s: () => move(0, 1), ArrowLeft: () => move(-1, 0), a: () => move(-1, 0), ArrowRight: () => move(1, 0), d: () => move(1, 0), e: interact, " ": interact };
      const command = commands[event.key] ?? commands[event.key.toLowerCase()];
      if (!command) return;
      event.preventDefault();
      command();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [interact, move]);

  const begin = (fresh = false) => {
    if (fresh) { setSave(startState); try { window.localStorage.removeItem(storageKey); } catch {} }
    setStarted(true);
    setHasSave(true);
    setMessage(copy.objective);
    requestAnimationFrame(() => gameRef.current?.focus());
  };

  return (
    <main className="game-page" id="conteudo">
      <header className="game-header">
        <Link href={`/${locale}`}><IconGlyph name="arrow-right" className="size-4 case-back-icon" />{copy.back}</Link>
        <p className="reference-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </header>

      {!started ? (
        <section className="game-start">
          <div className="game-start-character"><Image src="/reference/charlles-toy-canonical.png" alt="" fill sizes="280px" priority /></div>
          <div>
            <p>{copy.controls}</p>
            <button className="reference-primary-button" type="button" onClick={() => begin(false)}>{hasSave ? copy.continue : copy.start}<IconGlyph name="arrow-right" className="size-4" /></button>
            {hasSave && <button className="game-reset" type="button" onClick={() => begin(true)}>{copy.reset}</button>}
            <Link className="game-lab-link" href={`/${locale}/game/lab`}>
              {locale === "pt-BR" ? "Abrir Character Lab 3D" : locale === "en" ? "Open 3D Character Lab" : "Abrir Character Lab 3D"}
              <IconGlyph name="arrow-right" className="size-4" />
            </Link>
            <Link className="game-lab-link is-sandbox" href={`/${locale}/game/sandbox`}>
              {locale === "pt-BR" ? "Jogar Player Sandbox 01" : locale === "en" ? "Play Player Sandbox 01" : "Jugar Player Sandbox 01"}
              <IconGlyph name="arrow-right" className="size-4" />
            </Link>
            <Link className="game-lab-link is-graybox" href={`/${locale}/game/graybox`}>
              {locale === "pt-BR" ? "Testar Elo Sandbox 01" : locale === "en" ? "Test Link Sandbox 01" : "Probar Vínculo Sandbox 01"}
              <IconGlyph name="arrow-right" className="size-4" />
            </Link>
            <Link className="game-lab-link is-puzzle" href={`/${locale}/game/puzzle`}>
              {locale === "pt-BR" ? "Jogar Puzzle Room 01" : locale === "en" ? "Play Puzzle Room 01" : "Jugar Puzzle Room 01"}
              <IconGlyph name="arrow-right" className="size-4" />
            </Link>
            <Link className="game-lab-link is-world" href={`/${locale}/game/world`}>
              {locale === "pt-BR" ? "Explorar World Migration 01" : locale === "en" ? "Explore World Migration 01" : "Explorar Migración del Mundo 01"}
              <IconGlyph name="arrow-right" className="size-4" />
            </Link>
          </div>
        </section>
      ) : (
        <section className="game-shell" aria-label={copy.title}>
          <div className="game-status">
            <div><span>{copy.objective}</span><strong>{message}</strong></div>
            <div><span>{copy.inventory}</span><strong>{save.modules.length} / 3</strong></div>
          </div>
          <div ref={gameRef} className={`game-board ${save.completed ? "is-complete" : ""}`} tabIndex={0} role="application" aria-label={`${copy.title}. ${copy.controls}`} style={{ "--game-columns": grid.columns, "--game-rows": grid.rows } as React.CSSProperties}>
            {Array.from({ length: grid.columns * grid.rows }, (_, index) => {
              const point = { x: index % grid.columns, y: Math.floor(index / grid.columns) };
              return <span className={walls.has(key(point)) ? "game-tile is-wall" : "game-tile"} style={{ gridColumn: point.x + 1, gridRow: point.y + 1 }} key={key(point)} aria-hidden="true" />;
            })}
            {(Object.entries(modules) as Array<[ModuleId, Point]>).map(([id, point]) => !save.modules.includes(id) && <span className={`game-module game-module-${id}`} style={{ gridColumn: point.x + 1, gridRow: point.y + 1 }} key={id} aria-label={labels[locale][id]}><IconGlyph name={id === "interface" ? "device-laptop" : id === "logic" ? "code" : "network"} className="size-5" /></span>)}
            <span className="game-terminal" style={{ gridColumn: terminal.x + 1, gridRow: terminal.y + 1 }} aria-label="Terminal"><IconGlyph name="terminal" className="size-6" /></span>
            <span className="game-player" style={{ gridColumn: save.player.x + 1, gridRow: save.player.y + 1 }} aria-label="Charlles"><Image src="/reference/charlles-toy-canonical.png" alt="" fill sizes="80px" /></span>
            {save.completed && <div className="game-victory" role="status"><strong>{copy.complete}</strong><Link href={`/${locale}/projects/charlles-dev-portfolio`}>{getProfessionalContent(locale).caseUi.demo}<IconGlyph name="arrow-right" className="size-4" /></Link></div>}
          </div>
          <div className="game-controls" aria-label={copy.controls}>
            <button type="button" aria-label="Up" onClick={() => move(0, -1)}>↑</button>
            <button type="button" aria-label="Left" onClick={() => move(-1, 0)}>←</button>
            <button type="button" aria-label={copy.interact} className="is-interact" onClick={interact}>E</button>
            <button type="button" aria-label="Right" onClick={() => move(1, 0)}>→</button>
            <button type="button" aria-label="Down" onClick={() => move(0, 1)}>↓</button>
          </div>
          <button className="game-reset" type="button" onClick={() => begin(true)}>{copy.reset}</button>
        </section>
      )}
    </main>
  );
}
