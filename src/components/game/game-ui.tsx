"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { GameSnapshot } from "@/game/core/game-state";
import type { GameAction, InputManager } from "@/game/input/input-manager";
import { endings, fragments, relationshipLabels, sectors, sectorOrder } from "@/game/data/narrative-content";

interface GameUiProps {
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

export function GameUi({ snapshot, input }: GameUiProps) {
  const [panel, setPanel] = useState<"map" | "memory" | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const energyRatio = `${Math.max(0, Math.min(100, snapshot.energy))}%`;
  const sector = sectors[snapshot.sector];
  const finalEnding = snapshot.ending ? endings[snapshot.ending] : null;

  useEffect(() => {
    if (!panel) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panel]);

  return (
    <div className="game-ui">
      <header className="game-topbar">
        <div className="game-brand-lockup">
          <p className="game-kicker">NÚCLEO EM ÓRBITA // VERTICAL SLICE</p>
          <h1>Orbe-9</h1>
          <p className="game-sector-line"><span aria-hidden="true">◆</span> {sector.title} <span aria-hidden="true">/</span> {sector.subtitle}</p>
        </div>
        <div className="game-top-actions">
          <button type="button" className="game-top-action" onClick={() => setPanel("map")} aria-expanded={panel === "map"}>Mapa <span aria-hidden="true">M</span></button>
          <button type="button" className="game-top-action" onClick={() => setPanel("memory")} aria-expanded={panel === "memory"}>Memória <span aria-hidden="true">J</span></button>
          <div className={`game-threat game-threat-${snapshot.threatState}`}>
            <span className="game-threat-dot" aria-hidden="true" />
            <span>{snapshot.threatState === "alert" ? "Sentinela em alerta" : snapshot.threatState === "suspicious" ? "Assinatura observada" : snapshot.threatState === "disabled" ? "Pulso estabilizado" : "Setor estável"}</span>
          </div>
        </div>
      </header>

      <section className="game-objective" aria-label="Objetivo atual">
        <p className="game-kicker">OBJETIVO // {snapshot.sectorTitle.toUpperCase()}</p>
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
        <p>WASD / setas mover · E interagir · Espaço Pulso · Shift dash · ESC pausar</p>
      </section>

      <div className="game-message" role="status" aria-live="polite"><span aria-hidden="true">↳</span> {snapshot.message}</div>

      {panel ? (
        <section className="game-sheet" role="dialog" aria-modal="true" aria-label={panel === "map" ? "Mapa da estação" : "Memória da estação"}>
          <div className="game-sheet-header">
            <div><p className="game-kicker">{panel === "map" ? "CARTOGRAFIA // ORBE-9" : "REGISTRO // ORBE-9"}</p><h2>{panel === "map" ? "Mapa de sinais" : "Memória recuperada"}</h2></div>
            <button ref={closeButtonRef} type="button" className="game-sheet-close" onClick={() => setPanel(null)} aria-label="Fechar painel">×</button>
          </div>
          {panel === "map" ? (
            <div className="game-map" aria-label="Setores da vertical slice">
              <div className="game-map-line" aria-hidden="true" />
              {sectorOrder.map((id, index) => {
                const destination = sectors[id];
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
              <p className="game-memory-intro">Os módulos não guardam apenas energia. Eles escolhem quais histórias permanecem acessíveis.</p>
              <div className="game-memory-grid">
                {fragments.map((fragment, index) => {
                  const found = snapshot.fragmentsFound.includes(fragment.id);
                  return (
                    <article key={fragment.id} className={`game-memory-entry ${found ? "is-found" : "is-hidden"}`}>
                      <span>FRAGMENTO {String(index + 1).padStart(2, "0")}</span>
                      <strong>{found ? fragment.title : "Registro sem origem"}</strong>
                      <small>{found ? fragment.text : "A Lente ainda não encontrou uma forma de lê-lo."}</small>
                    </article>
                  );
                })}
              </div>
              <div className="game-relationship-grid" aria-label="Estado das relações">
                <span>{relationshipLabels[snapshot.relationship.mira]}</span>
                <span>PONTO: {snapshot.relationship.ponto}</span>
                <span>NIX: {relationshipLabels[snapshot.relationship.nix]}</span>
              </div>
            </div>
          )}
        </section>
      ) : null}

      {snapshot.dialogue ? (
        <section className="game-dialogue" role="dialog" aria-label={`Diálogo com ${snapshot.dialogue.speaker}`} aria-modal="true">
          <p className="game-kicker">TRANSMISSÃO // {snapshot.dialogue.speaker}</p>
          <p>{snapshot.dialogue.text}</p>
          <button type="button" className="game-dialogue-advance" onClick={() => closeWithInput(input)}>Continuar <span aria-hidden="true">↵</span></button>
        </section>
      ) : null}

      {snapshot.paused ? (
        <section className="game-paused" role="dialog" aria-label="Jogo pausado" aria-modal="true">
          <p className="game-kicker">SISTEMA EM ESPERA // {snapshot.sectorTitle.toUpperCase()}</p>
          <h2>O sinal aguarda.</h2>
          <p>O mundo está congelado. Pressione <strong>ESC</strong> para retomar a exploração.</p>
        </section>
      ) : null}

      {snapshot.completed ? (
        <section className="game-complete" role="status">
          <p className="game-kicker">REGISTRO FINAL // MEMÓRIA CONFIRMADA</p>
          <h2>{finalEnding?.title ?? "A estação voltou a respirar."}</h2>
          <p>{finalEnding?.line ?? "O primeiro fragmento de Núcleo em Órbita está completo."}</p>
          {finalEnding ? <small>{finalEnding.thesis}</small> : null}
          <button type="button" onClick={() => window.location.reload()}>Reiniciar a slice</button>
        </section>
      ) : null}

      <div className="game-touch-controls" aria-label="Controles touch">
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
