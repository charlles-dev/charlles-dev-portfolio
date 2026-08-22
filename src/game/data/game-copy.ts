export type GameLocale = "pt-BR" | "en" | "es";

export interface GameUiCopy {
  map: string;
  memory: string;
  currentObjective: string;
  lumen: string;
  moveHint: string;
  pauseHint: string;
  close: string;
  continue: string;
  pausedTitle: string;
  pausedBody: string;
  restart: string;
  finalRecord: string;
  stableSector: string;
  suspiciousSignature: string;
  sentinelAlert: string;
  pulseStabilized: string;
  controls: string;
  memoryTitle: string;
  mapTitle: string;
  youAreHere: string;
  signalNotFound: string;
  fragmentUnknown: string;
  fragmentIntro: string;
  hintLabel: string;
  puzzleSequence: string;
  puzzleArchive: string;
  puzzleGarden: string;
  puzzleWrong: string;
  puzzleSolved: string;
  puzzleCorrect: string;
  puzzleIdle: string;
  puzzles: {
    "archive-frequency": { title: string; hint: string };
    "garden-route": { title: string; hint: string };
  };
  objectiveAria: string;
  energyAria: (energy: number, maxEnergy: number) => string;
  toolsAria: string;
  puzzleAria: (title: string) => string;
  puzzleProgressAria: (step: number, total: number) => string;
  mapSectorsAria: string;
  memoryFragmentLabel: (index: number) => string;
  fragmentHidden: string;
  mapHere: string;
  mapUnknown: string;
  mapNote: string;
  dialogueAria: (speaker: string) => string;
  transmissionLabel: string;
  nodeProgressAria: (restored: number, total: number) => string;
  tools: { lens: string; pulse: string; anchor: string };
  pontoLabel: string;
  nixLabel: string;
  lumenOnline: string;
  pauseFooter: string;
}

export const gameUiCopy: Record<GameLocale, GameUiCopy> = {
  "pt-BR": {
    map: "Mapa",
    memory: "Memória",
    currentObjective: "Objetivo",
    lumen: "Lumen",
    moveHint: "WASD / setas mover · E interagir · Espaço Pulso · Shift dash · ESC pausar",
    pauseHint: "O mundo está congelado. Pressione ESC para retomar a exploração.",
    close: "Fechar painel",
    continue: "Continuar",
    pausedTitle: "O sinal aguarda.",
    pausedBody: "O mundo está congelado. Pressione ESC para retomar a exploração.",
    restart: "Reiniciar a slice",
    finalRecord: "REGISTRO FINAL // MEMÓRIA CONFIRMADA",
    stableSector: "Setor estável",
    suspiciousSignature: "Assinatura observada",
    sentinelAlert: "Sentinela em alerta",
    pulseStabilized: "Pulso estabilizado",
    controls: "Controles touch",
    memoryTitle: "Memória recuperada",
    mapTitle: "Mapa de sinais",
    youAreHere: "Você está aqui",
    signalNotFound: "Sinal ainda não encontrado",
    fragmentUnknown: "Registro sem origem",
    fragmentIntro: "Os módulos não guardam apenas energia. Eles escolhem quais histórias permanecem acessíveis.",
    hintLabel: "Dica",
    puzzleSequence: "Sequência",
    puzzleArchive: "Arquivo",
    puzzleGarden: "Jardim",
    puzzleWrong: "A sequência reiniciou. Observe os sinais antes de escolher.",
    puzzleSolved: "Sequência estabilizada.",
    puzzleCorrect: "Sinal aceito. Continue a leitura.",
    puzzleIdle: "Interaja com um módulo para registrar a frequência.",
    puzzles: {
      "archive-frequency": { title: "Frequência sem origem", hint: "A sequência aparece no intervalo entre ausência, memória e cuidado." },
      "garden-route": { title: "Rota de irrigação", hint: "O jardim não pede mais energia. Pede uma passagem que não assuste a sentinela." },
    },
    objectiveAria: "Objetivo atual", energyAria: (energy, maxEnergy) => `Energia da Lumen: ${energy} de ${maxEnergy}`, toolsAria: "Ferramentas", puzzleAria: (title) => `Puzzle: ${title}`, puzzleProgressAria: (step, total) => `Progresso ${step} de ${total}`, mapSectorsAria: "Setores da vertical slice", memoryFragmentLabel: (index) => `Fragmento ${String(index).padStart(2, "0")}`, fragmentHidden: "A Lente ainda não encontrou uma forma de lê-lo.", mapHere: "Você está aqui", mapUnknown: "Sinal ainda não encontrado", mapNote: "A Orbe-9 não desenha rotas. Ela mostra onde uma decisão deixou sinal.", dialogueAria: (speaker) => `Diálogo com ${speaker}`, transmissionLabel: "Transmissão", nodeProgressAria: (restored, total) => `${restored} de ${total} sinais restaurados`, tools: { lens: "Lente", pulse: "Pulso", anchor: "Âncora" }, pontoLabel: "Ponto", nixLabel: "Nix", lumenOnline: "Lumen online", pauseFooter: "ESC // PAUSAR",
  },
  en: {
    map: "Map",
    memory: "Memory",
    currentObjective: "Objective",
    lumen: "Lumen",
    moveHint: "WASD / arrows move · E interact · Space Pulse · Shift dash · ESC pause",
    pauseHint: "The world is frozen. Press ESC to resume exploration.",
    close: "Close panel",
    continue: "Continue",
    pausedTitle: "The signal waits.",
    pausedBody: "The world is frozen. Press ESC to resume exploration.",
    restart: "Restart slice",
    finalRecord: "FINAL RECORD // MEMORY CONFIRMED",
    stableSector: "Sector stable",
    suspiciousSignature: "Signature observed",
    sentinelAlert: "Sentinel alert",
    pulseStabilized: "Pulse stabilized",
    controls: "Touch controls",
    memoryTitle: "Recovered memory",
    mapTitle: "Signal map",
    youAreHere: "You are here",
    signalNotFound: "Signal not found yet",
    fragmentUnknown: "Record without origin",
    fragmentIntro: "The modules do not only store energy. They choose which stories remain accessible.",
    hintLabel: "Hint",
    puzzleSequence: "Sequence",
    puzzleArchive: "Archive",
    puzzleGarden: "Garden",
    puzzleWrong: "The sequence reset. Observe the signals before choosing.",
    puzzleSolved: "Sequence stabilized.",
    puzzleCorrect: "Signal accepted. Continue reading.",
    puzzleIdle: "Interact with a module to record the frequency.",
    puzzles: {
      "archive-frequency": { title: "Frequency without origin", hint: "The sequence appears in the interval between absence, memory and care." },
      "garden-route": { title: "Irrigation route", hint: "The garden does not ask for more energy. It asks for a passage that does not frighten the sentinel." },
    },
    objectiveAria: "Current objective", energyAria: (energy, maxEnergy) => `Lumen energy: ${energy} of ${maxEnergy}`, toolsAria: "Tools", puzzleAria: (title) => `Puzzle: ${title}`, puzzleProgressAria: (step, total) => `Progress ${step} of ${total}`, mapSectorsAria: "Vertical slice sectors", memoryFragmentLabel: (index) => `Fragment ${String(index).padStart(2, "0")}`, fragmentHidden: "The Lens has not found a way to read it yet.", mapHere: "You are here", mapUnknown: "Signal not found yet", mapNote: "Orbe-9 does not draw routes. It shows where a decision left a signal.", dialogueAria: (speaker) => `Dialogue with ${speaker}`, transmissionLabel: "Transmission", nodeProgressAria: (restored, total) => `${restored} of ${total} signals restored`, tools: { lens: "Lens", pulse: "Pulse", anchor: "Anchor" }, pontoLabel: "Ponto", nixLabel: "Nix", lumenOnline: "Lumen online", pauseFooter: "ESC // PAUSE",
  },
  es: {
    map: "Mapa",
    memory: "Memoria",
    currentObjective: "Objetivo",
    lumen: "Lumen",
    moveHint: "WASD / flechas mover · E interactuar · Espacio Pulso · Shift dash · ESC pausar",
    pauseHint: "El mundo está congelado. Pulsa ESC para continuar la exploración.",
    close: "Cerrar panel",
    continue: "Continuar",
    pausedTitle: "La señal espera.",
    pausedBody: "El mundo está congelado. Pulsa ESC para continuar la exploración.",
    restart: "Reiniciar la slice",
    finalRecord: "REGISTRO FINAL // MEMORIA CONFIRMADA",
    stableSector: "Sector estable",
    suspiciousSignature: "Firma observada",
    sentinelAlert: "Centinela en alerta",
    pulseStabilized: "Pulso estabilizado",
    controls: "Controles táctiles",
    memoryTitle: "Memoria recuperada",
    mapTitle: "Mapa de señales",
    youAreHere: "Estás aquí",
    signalNotFound: "Señal aún no encontrada",
    fragmentUnknown: "Registro sin origen",
    fragmentIntro: "Los módulos no solo guardan energía. Eligen qué historias permanecen accesibles.",
    hintLabel: "Pista",
    puzzleSequence: "Secuencia",
    puzzleArchive: "Archivo",
    puzzleGarden: "Jardín",
    puzzleWrong: "La secuencia se reinició. Observa las señales antes de elegir.",
    puzzleSolved: "Secuencia estabilizada.",
    puzzleCorrect: "Señal aceptada. Continúa la lectura.",
    puzzleIdle: "Interactúa con un módulo para registrar la frecuencia.",
    puzzles: {
      "archive-frequency": { title: "Frecuencia sin origen", hint: "La secuencia aparece entre ausencia, memoria y cuidado." },
      "garden-route": { title: "Ruta de irrigación", hint: "El jardín no pide más energía. Pide un paso que no asuste al centinela." },
    },
    objectiveAria: "Objetivo actual", energyAria: (energy, maxEnergy) => `Energía de la Lumen: ${energy} de ${maxEnergy}`, toolsAria: "Herramientas", puzzleAria: (title) => `Puzzle: ${title}`, puzzleProgressAria: (step, total) => `Progreso ${step} de ${total}`, mapSectorsAria: "Sectores de la vertical slice", memoryFragmentLabel: (index) => `Fragmento ${String(index).padStart(2, "0")}`, fragmentHidden: "La Lente aún no ha encontrado una forma de leerlo.", mapHere: "Estás aquí", mapUnknown: "Señal aún no encontrada", mapNote: "La Orbe-9 no dibuja rutas. Muestra dónde una decisión dejó una señal.", dialogueAria: (speaker) => `Diálogo con ${speaker}`, transmissionLabel: "Transmisión", nodeProgressAria: (restored, total) => `${restored} de ${total} señales restauradas`, tools: { lens: "Lente", pulse: "Pulso", anchor: "Ancla" }, pontoLabel: "Ponto", nixLabel: "Nix", lumenOnline: "Lumen en línea", pauseFooter: "ESC // PAUSAR",
  },
};

export function normalizeGameLocale(locale: string): GameLocale {
  if (locale === "en" || locale === "es") return locale;
  return "pt-BR";
}
