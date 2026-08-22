"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { GameSnapshot } from "@/game/core/game-state";
import type { GameAction, InputManager } from "@/game/input/input-manager";
import { gameUiCopy, type GameLocale } from "@/game/data/game-copy";
import { SAVE_KEY } from "@/game/core/save-system";
import { getNarrative, sectorOrder } from "@/game/data/narrative-content";
import { puzzleDefinitions } from "@/game/systems/puzzle-system";
import { hintFor } from "@/game/systems/hint-system";

interface GameUiProps {
  locale: GameLocale;
  snapshot: GameSnapshot;
  input: InputManager | null;
}

function HoldButton({ action, label, input }: { action: GameAction; label: string; input: InputManager | null }) {
  const press = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    input?.press(action);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const release = () => input?.release(action);

  return (
    <button
      className="game-control-button"
      type="button"
      aria-label={label}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
    >
      {label}
    </button>
  );
}

function ActionButton({ action, label, input }: { action: GameAction; label: string; input: InputManager | null }) {
  return (
    <button
      className="game-control-button game-control-action"
      type="button"
      aria-label={label}
      onPointerDown={(event) => {
        event.preventDefault();
        input?.press(action);
        window.setTimeout(() => input?.release(action), 80);
      }}
    >
      {label}
    </button>
  );
}

function closeWithInput(input: InputManager | null) {
  input?.press("interact");
  window.setTimeout(() => input?.release("interact"), 80);
}

export function GameUi({ locale, snapshot, input }: GameUiProps) {
  const copy = gameUiCopy[locale];
  const narrative = getNarrative(locale);
  const [panel, setPanel] = useState<"map" | "memory" | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const energyRatio = `${Math.max(0, Math.min(100, snapshot.energy))}%`;
  const sector = narrative.sectors[snapshot.sector];
  const finalEnding = snapshot.ending ? narrative.endings[snapshot.ending] : null;
  const activePuzzle = snapshot.sector === "archive" ? snapshot.puzzles["archive-frequency"] : snapshot.sector === "garden" ? snapshot.puzzles["garden-route"] : null;
  const activePuzzleDefinition = activePuzzle ? puzzleDefinitions[activePuzzle.id] : null;
  const activeHint = activePuzzle ? hintFor(activePuzzle.id, activePuzzle.attempts, locale) : null;
  const togglePause = () => {
    input?.press("pause");
    window.setTimeout(() => input?.release("pause"), 80);
  };
  const resetSave = () => {
    window.localStorage.removeItem(SAVE_KEY);
    window.location.reload();
  };

  useEffect(() => {
    if (panel) closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable = Boolean(target && typeof target.matches === "function" && target.matches("input, textarea, select, [contenteditable=\"true\"]"));
      if (isEditable || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "Escape") {
        if (panel) {
          event.preventDefault();
          setPanel(null);
        }
        return;
      }
      if (snapshot.dialogue || snapshot.paused || snapshot.completed) return;
      const key = event.key.toLowerCase();
      if (key === "m" || key === "j") {
        event.preventDefault();
        setPanel((current) => key === "m" ? (current === "map" ? null : "map") : (current === "memory" ? null : "memory"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panel, snapshot.completed, snapshot.dialogue, snapshot.paused]);

  return (
    <div className="game-ui">
      <header className="game-topbar">
        <div className="game-brand-lockup">
          <p className="game-kicker">NÚCLEO EM ÓRBITA // VERTICAL SLICE</p>
          <h1>Orbe-9</h1>
          <p className="game-sector-line"><span aria-hidden="true">◆</span> {sector.title} <span aria-hidden="true">/</span> {sector.subtitle}</p>
        </div>
        <div className="game-top-actions">
          <button type="button" className="game-top-action" onClick={() => setPanel("map")} aria-expanded={panel === "map"}>{copy.map} <span aria-hidden="true">M</span></button>
          <button type="button" className="game-top-action" onClick={() => setPanel("memory")} aria-expanded={panel === "memory"}>{copy.memory} <span aria-hidden="true">J</span></button>
          <div className={`game-threat game-threat-${snapshot.threatState}`}>
            <span className="game-threat-dot" aria-hidden="true" />
            <span>{snapshot.threatState === "alert" ? copy.sentinelAlert : snapshot.threatState === "suspicious" ? copy.suspiciousSignature : snapshot.threatState === "disabled" ? copy.pulseStabilized : copy.stableSector}</span>
          </div>
        </div>
      </header>

      <section className="game-objective" aria-label="Objetivo atual">
        <p className="game-kicker">{copy.currentObjective.toUpperCase()} // {snapshot.sectorTitle.toUpperCase()}</p>
        <strong>{snapshot.objective}</strong>
        <p className="game-objective-context">{sector.arrival}</p>
        <div className="game-objective-progress" aria-label={`${snapshot.nodesRestored} de ${snapshot.nodesTotal} sinais restaurados`}>
          {Array.from({ length: snapshot.nodesTotal }, (_, index) => (
            <span key={index} className={index < snapshot.nodesRestored ? "is-on" : ""} />
          ))}
        </div>
      </section>

      <section className="game-energy" aria-label={`Energia da Lumen: ${snapshot.energy} de ${snapshot.maxEnergy}`}>
        <div className="game-energy-label"><span>LUMEN // {snapshot.activeTool.toUpperCase()}</span><strong>{snapshot.energy}</strong><small>/{snapshot.maxEnergy}</small></div>
        <div className="game-energy-bar"><span style={{ width: energyRatio }} /></div>
        <div className="game-tool-strip" aria-label="Ferramentas">
          {(["Lente", "Pulso", "Âncora"] as const).map((tool) => (
            <span key={tool} className={`${snapshot.toolsUnlocked.includes(tool) ? "is-unlocked" : "is-locked"} ${snapshot.activeTool === tool ? "is-current" : ""}`}>
              <i aria-hidden="true">{tool === "Lente" ? "◌" : tool === "Pulso" ? "◉" : "⌖"}</i>{tool}
            </span>
          ))}
        </div>
        <p>{copy.moveHint}</p>
      </section>

      {activePuzzle && activePuzzleDefinition ? (
        <section className={`game-puzzle-card is-${activePuzzle.feedback}`} aria-label={`Puzzle: ${activePuzzleDefinition.title}`}>
          <p className="game-kicker">SEQUÊNCIA // {activePuzzle.id === "archive-frequency" ? "ARQUIVO" : "JARDIM"}</p>
          <div className="game-puzzle-heading"><strong>{activePuzzleDefinition.title}</strong><span>{activePuzzle.step}/{activePuzzleDefinition.sequence.length}</span></div>
          <p>{activePuzzleDefinition.hint}</p>
          <div className="game-puzzle-sequence" aria-label={`Progresso ${activePuzzle.step} de ${activePuzzleDefinition.sequence.length}`}>
            {activePuzzleDefinition.sequence.map((signal, index) => (
              <span key={`${activePuzzle.id}-${index}`} className={index < activePuzzle.step ? "is-done" : index === activePuzzle.step ? "is-current" : ""}>
                <i aria-hidden="true">{index < activePuzzle.step ? "●" : index === activePuzzle.step ? "◐" : "○"}</i>{signal}
              </span>
            ))}
          </div>
          <small>{activePuzzle.feedback === "wrong" ? "A sequência reiniciou. Observe os sinais antes de escolher." : activePuzzle.feedback === "solved" ? "Sequência estabilizada." : activePuzzle.feedback === "correct" ? "Sinal aceito. Continue a leitura." : "Interaja com um módulo para registrar a frequência."}</small>
          {activeHint?.text ? <p className="game-puzzle-hint"><b>{copy.hintLabel.toUpperCase()} {activeHint.level}/3</b> {activeHint.text}</p> : null}
        </section>
      ) : null}

      <div className="game-message" role="status" aria-live="polite"><span aria-hidden="true">↳</span> {snapshot.message}</div>

      {panel ? (
        <section className="game-sheet" role="dialog" aria-modal="true" aria-label={panel === "map" ? copy.mapTitle : copy.memoryTitle}>
          <div className="game-sheet-header">
            <div><p className="game-kicker">{panel === "map" ? "CARTOGRAPHY // ORBE-9" : "RECORD // ORBE-9"}</p><h2>{panel === "map" ? copy.mapTitle : copy.memoryTitle}</h2></div>
            <button ref={closeButtonRef} type="button" className="game-sheet-close" onClick={() => setPanel(null)} aria-label={copy.close}>×</button>
          </div>
          {panel === "map" ? (
            <div className="game-map" aria-label="Setores da vertical slice">
              <div className="game-map-line" aria-hidden="true" />
              {sectorOrder.map((id, index) => {
                const destination = narrative.sectors[id];
                const isCurrent = snapshot.sector === id;
                const isUnlocked = id === "hub" || (id === "archive" && snapshot.nodesRestored > 0) || (id === "garden" && snapshot.fragmentsFound.includes("unowned")) || (id === "core" && snapshot.nodesRestored >= 3);
                return (
                  <div key={id} className={`game-map-stop ${isCurrent ? "is-current" : ""} ${isUnlocked ? "is-active" : ""}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{destination.title}</strong>
                    <small>{isCurrent ? "Você está aqui" : isUnlocked ? destination.subtitle : "Sinal ainda não encontrado"}</small>
                  </div>
                );
              })}
              <p className="game-sheet-note">A Orbe-9 não desenha rotas. Ela mostra onde uma decisão deixou sinal.</p>
            </div>
          ) : (
            <div className="game-memory-copy">
              <p className="game-memory-intro">{copy.fragmentIntro}</p>
              <div className="game-memory-grid">
                {narrative.fragments.map((fragment, index) => {
                  const found = snapshot.fragmentsFound.includes(fragment.id);
                  return (
                    <article key={fragment.id} className={`game-memory-entry ${found ? "is-found" : "is-hidden"}`}>
                      <span>FRAGMENTO {String(index + 1).padStart(2, "0")}</span>
                      <strong>{found ? fragment.title : copy.fragmentUnknown}</strong>
                      <small>{found ? fragment.text : "A Lente ainda não encontrou uma forma de lê-lo."}</small>
                    </article>
                  );
                })}
              </div>
              <div className="game-relationship-grid" aria-label="Estado das relações">
                <span>{narrative.relationshipLabels[snapshot.relationship.mira]}</span>
                <span>PONTO: {snapshot.relationship.ponto}</span>
                <span>NIX: {narrative.relationshipLabels[snapshot.relationship.nix]}</span>
              </div>
            </div>
          )}
        </section>
      ) : null}

      {snapshot.dialogue ? (
        <section className="game-dialogue" role="dialog" aria-label={`Diálogo com ${snapshot.dialogue.speaker}`} aria-modal="true">
          <p className="game-kicker">TRANSMISSÃO // {snapshot.dialogue.speaker}</p>
          <p>{snapshot.dialogue.text}</p>
          <button type="button" className="game-dialogue-advance" onClick={() => closeWithInput(input)}>{copy.continue} <span aria-hidden="true">↵</span></button>
        </section>
      ) : null}

      {snapshot.paused ? (
        <section className="game-paused" role="dialog" aria-label={copy.pausedTitle} aria-modal="true">
          <p className="game-kicker">SYSTEM // {snapshot.sectorTitle.toUpperCase()}</p>
          <h2>{copy.pausedTitle}</h2>
          <p>{copy.pausedBody}</p>
          <div className="game-paused-actions">
            <button type="button" onClick={togglePause}>{copy.continue}</button>
            <button type="button" onClick={resetSave}>{copy.restart}</button>
          </div>
        </section>
      ) : null}

      {snapshot.completed ? (
        <section className="game-complete" role="status">
          <p className="game-kicker">{copy.finalRecord}</p>
          <h2>{finalEnding?.title ?? "A estação voltou a respirar."}</h2>
          <p>{finalEnding?.line ?? "O primeiro fragmento de Núcleo em Órbita está completo."}</p>
          {finalEnding ? <small>{finalEnding.thesis}</small> : null}
          <button type="button" onClick={() => window.location.reload()}>{copy.restart}</button>
        </section>
      ) : null}

      <div className="game-touch-controls" aria-label={copy.controls}>
        <div className="game-dpad">
          <HoldButton action="up" label="↑" input={input} />
          <div><HoldButton action="left" label="←" input={input} /><HoldButton action="down" label="↓" input={input} /><HoldButton action="right" label="→" input={input} /></div>
        </div>
        <div className="game-action-pad">
          <ActionButton action="dash" label="DASH" input={input} />
          <ActionButton action="tool" label="PULSO" input={input} />
          <ActionButton action="interact" label="AÇÃO" input={input} />
        </div>
      </div>

      <footer className="game-footer"><span>ORBE-9 / {snapshot.sector.toUpperCase()}</span><span>{snapshot.lastInteraction ?? "LUMEN ONLINE"}</span><span>ESC // PAUSAR</span></footer>
    </div>
  );
}
