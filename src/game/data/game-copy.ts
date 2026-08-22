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
  },
};

export function normalizeGameLocale(locale: string): GameLocale {
  if (locale === "en" || locale === "es") return locale;
  return "pt-BR";
}
