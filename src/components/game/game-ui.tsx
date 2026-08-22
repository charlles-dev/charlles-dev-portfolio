"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import type { GameSnapshot } from "@/game/core/game-state";
import type { GameAction, InputManager } from "@/game/input/input-manager";

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

export function GameUi({ snapshot, input }: GameUiProps) {
  const [panel, setPanel] = useState<"map" | "memory" | null>(null);
  const energyRatio = `${Math.max(0, Math.min(100, snapshot.energy))}%`;

  return (
    <div className="game-ui">
      <header className="game-topbar">
        <div>
          <p className="game-kicker">NÚCLEO EM ÓRBITA // BLOCKOUT 01</p>
          <h1>Estação Orbe-9</h1>
        </div>
        <div className="game-top-actions">
          <button type="button" className="game-top-action" onClick={() => setPanel("map")} aria-expanded={panel === "map"}>Mapa</button>
          <button type="button" className="game-top-action" onClick={() => setPanel("memory")} aria-expanded={panel === "memory"}>Memória</button>
          <div className={`game-threat game-threat-${snapshot.threatState}`}>
            <span className="game-threat-dot" aria-hidden="true" />
            {snapshot.threatState === "alert" ? "Sentinela em alerta" : snapshot.threatState === "disabled" ? "Pulso ativo" : "Setor estável"}
          </div>
        </div>
      </header>

      <section className="game-objective" aria-label="Objetivo atual">
        <p className="game-kicker">OBJETIVO ATUAL</p>
        <strong>{snapshot.objective}</strong>
        <div className="game-objective-progress" aria-label={`${snapshot.nodesRestored} de ${snapshot.nodesTotal} nós restaurados`}>
          {Array.from({ length: snapshot.nodesTotal }, (_, index) => (
            <span key={index} className={index < snapshot.nodesRestored ? "is-on" : ""} />
          ))}
        </div>
      </section>

      <section className="game-energy" aria-label={`Energia da Lumen: ${snapshot.energy} de ${snapshot.maxEnergy}`}>
        <div className="game-energy-label"><span>LUMEN</span><strong>{snapshot.energy}</strong><small>/{snapshot.maxEnergy}</small></div>
        <div className="game-energy-bar"><span style={{ width: energyRatio }} /></div>
        <p>WASD / setas mover · E interagir · Espaço Pulso · Shift dash</p>
      </section>

      <div className="game-message" role="status" aria-live="polite">{snapshot.message}</div>

      {panel ? (
        <section className="game-sheet" role="dialog" aria-modal="true" aria-label={panel === "map" ? "Mapa da estação" : "Memória da estação"}>
          <div className="game-sheet-header">
            <div><p className="game-kicker">{panel === "map" ? "CARTOGRAFIA // ORBE-9" : "REGISTRO // ORBE-9"}</p><h2>{panel === "map" ? "Mapa de sinais" : "Memória recuperada"}</h2></div>
            <button type="button" className="game-sheet-close" onClick={() => setPanel(null)} aria-label="Fechar painel">×</button>
          </div>
          {panel === "map" ? (
            <div className="game-map">
              <div className="game-map-line" aria-hidden="true" />
              <div className="game-map-stop is-current"><span>01</span><strong>Doca / Hub</strong><small>Você está aqui</small></div>
              <div className={`game-map-stop ${snapshot.nodesRestored > 0 ? "is-active" : ""}`}><span>02</span><strong>Arquivo</strong><small>{snapshot.nodesRestored > 0 ? "Sinal parcialmente restaurado" : "Aguardando energia"}</small></div>
              <div className={`game-map-stop ${snapshot.completed ? "is-active" : ""}`}><span>03</span><strong>Núcleo</strong><small>{snapshot.completed ? "Configuração reconhecida" : "Portal bloqueado"}</small></div>
            </div>
          ) : (
            <div className="game-memory-copy"><p>Os módulos da Orbe-9 não guardam apenas energia. Eles escolhem quais histórias permanecem acessíveis.</p><div className="game-memory-entry"><span>FRAGMENTO 01</span><strong>{snapshot.nodesRestored} / 3 sinais respondidos</strong><small>O protocolo começa a reconhecer a Lumen.</small></div><div className="game-memory-entry"><span>FRAGMENTO 02</span><strong>Ferramenta atual: {snapshot.activeTool}</strong><small>Mude o estado do mundo para descobrir o próximo registro.</small></div></div>
          )}
        </section>
      ) : null}

      {snapshot.dialogue ? (
        <section className="game-dialogue" role="dialog" aria-label={`Diálogo com ${snapshot.dialogue.speaker}`}>
          <p className="game-kicker">TRANSMISSÃO // {snapshot.dialogue.speaker}</p>
          <p>{snapshot.dialogue.text}</p>
          <span>Pressione E para fechar</span>
        </section>
      ) : null}

      {snapshot.paused ? (
        <section className="game-paused" role="dialog" aria-label="Jogo pausado" aria-modal="true">
          <p className="game-kicker">SISTEMA EM ESPERA</p>
          <h2>Jogo pausado</h2>
          <p>Pressione ESC para retomar a exploração.</p>
        </section>
      ) : null}

      {snapshot.completed ? (
        <section className="game-complete" role="status">
          <p className="game-kicker">SINAL RESTAURADO</p>
          <h2>A estação voltou a respirar.</h2>
          <p>O primeiro fragmento de Núcleo em Órbita está completo.</p>
          <button type="button" onClick={() => window.location.reload()}>Reiniciar slice</button>
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

      <footer className="game-footer"><span>LUMEN / 03</span><span>ESC para pausar</span><span>WEBGL 2.5D</span></footer>
    </div>
  );
}
