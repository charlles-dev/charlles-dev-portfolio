import type { GameLocale } from "./game-copy";
import type { PuzzleSignal } from "../systems/puzzle-system";

export interface WorldCopy {
  pausePaused: string;
  pauseResumed: string;
  threatDamage: string;
  checkpointRestore: string;
  portal: string;
  mira: string;
  node: string;
  ponto: string;
  archiveModule: (index: number) => string;
  returnBeacon: string;
  gardenBeacon: string;
  nix: string;
  irrigation: (index: number) => string;
  coreExit: string;
  ending: (title: string) => string;
  silence: string;
  dialogueClosed: string;
  dialogueRecorded: (character: string) => string;
  transmission: (character: string) => string;
  nixWitness: string;
  nodeAlready: string;
  nodeObjectiveFirst: string;
  nodeObjectiveAll: string;
  nodeObjectiveMore: string;
  archiveToGarden: string;
  associatedFragment: string;
  endingConfirmed: (title: string) => string;
  pulseLastInteraction: string;
  nodeRestored: (index: number) => string;
  nodeLast: (index: number) => string;
  archiveGate: string;
  puzzleAccepted: (step: number) => string;
  puzzleWrong: string;
  signalRegistered: (signal: PuzzleSignal) => string;
  archiveSolved: string;
  gardenSolved: string;
  gardenGate: string;
  toolLocked: string;
  toolDepleted: string;
  pulse: string;
  dronePatrol: string;
  lensScan: (sectorTitle: string) => string;
  threatAlert: string;
  threatSuspicious: string;
  threatPatrol: string;
  checkpointEntered: (title: string) => string;
}

const labels: Record<GameLocale, Record<PuzzleSignal, string>> = {
  "pt-BR": { mint: "mint", violet: "violeta", amber: "âmbar" },
  en: { mint: "mint", violet: "violet", amber: "amber" },
  es: { mint: "mint", violet: "violeta", amber: "ámbar" },
};

export function getWorldCopy(locale: GameLocale): WorldCopy {
  if (locale === "en") {
    return {
      pausePaused: "The signal waits. Press ESC to resume.", pauseResumed: "The exploration continues.", threatDamage: "The scan cone found the Lumen signature.", checkpointRestore: "The signature was lost. The Anchor returned you to the last safe state.",
      portal: "The portal waits for three signals.", mira: "MIRA is waiting at the terminal.", node: "A signal node awaits intervention.", ponto: "PONTO holds a box with no origin.", archiveModule: (index) => `Module ${index + 1}: choose the frequency.`, returnBeacon: "A mint line points back to the Hub.", gardenBeacon: "The recovered frequency points to the Orbital Garden.", nix: "NIX watches the passage.", irrigation: (index) => `Irrigation signal ${index + 1}.`, coreExit: "The path to the Core requires a witness and a stable route.", ending: (title) => `Configuration: ${title}.`, silence: "The Lumen finds only silence here. Look for a signal, character or passage.", dialogueClosed: "The station waits for the next action.", dialogueRecorded: (character) => `${character} left a signal in the record.`, transmission: (character) => `Transmission received: ${character}`, nixWitness: "NIX recorded the action before recording the threat.", nodeAlready: "This signal has already answered. The station is waiting for the other two.", nodeObjectiveFirst: "Enter the Archive and discover what was hidden.", nodeObjectiveAll: "The memory portal recognizes a passage.", nodeObjectiveMore: "Reactivate the remaining signals in the Hub.", archiveToGarden: "Carry the recovered frequency to the Orbital Garden.", associatedFragment: "Fragment associated: the box without origin", endingConfirmed: (title) => `Configuration confirmed: ${title}`, pulseLastInteraction: "Drone stabilized for 3.2 s", nodeRestored: (index) => `Signal ${String(index).padStart(2, "0")} restored. The route changed.`, nodeLast: (index) => `Signal node ${String(index).padStart(2, "0")} restored`, archiveGate: "The portal shows a memory without an entrance. Answer a node first.", puzzleAccepted: (step) => `Signal accepted. Step ${step} recorded.`, puzzleWrong: "The frequency does not close. The sequence returned to the beginning.", signalRegistered: (signal) => `Signal ${labels.en[signal]} recorded`, archiveSolved: "The modules did not form an order. They formed a relationship.", gardenSolved: "The irrigation found its path. The Garden can sustain the passage to the Core.", gardenGate: "The route does not yet recognize a witness and a stable passage.", toolLocked: "The Lens found the path. The Pulse still needs an associated frequency.", toolDepleted: "The Lumen needs energy to perform another action.", pulse: "Lumen Pulse emitted. The sentinel opened a passage window.", dronePatrol: "The sentinel returned to patrol mode.", lensScan: (title) => `The Lens scanned ${title}. A signal answers in the distance.`, threatAlert: "NIX found the signature. Use the Pulse or retreat.", threatSuspicious: "The scan cone is looking for a known pattern.", threatPatrol: "The sentinel returned to patrol.", checkpointEntered: (title) => `Checkpoint registered: ${title}`,
    };
  }
  if (locale === "es") {
    return {
      pausePaused: "La señal espera. Pulsa ESC para continuar.", pauseResumed: "La exploración continúa.", threatDamage: "El cono de escaneo encontró la firma Lumen.", checkpointRestore: "La firma se perdió. el Ancla te devolvió al último estado seguro.",
      portal: "El portal espera las tres señales.", mira: "MIRA espera en el terminal.", node: "Un nodo de señal espera una intervención.", ponto: "PONTO sostiene una caja sin origen.", archiveModule: (index) => `Módulo ${index + 1}: elige la frecuencia.`, returnBeacon: "Una línea mint apunta de vuelta al Hub.", gardenBeacon: "La frecuencia recuperada apunta al Jardín Orbital.", nix: "NIX observa el paso.", irrigation: (index) => `Señal de irrigación ${index + 1}.`, coreExit: "El camino al Núcleo exige un testigo y una ruta estable.", ending: (title) => `Configuración: ${title}.`, silence: "La Lumen solo encuentra silencio aquí. Busca una señal, personaje o pasaje.", dialogueClosed: "La estación espera la próxima acción.", dialogueRecorded: (character) => `${character} dejó una señal en el registro.`, transmission: (character) => `Transmisión recibida: ${character}`, nixWitness: "NIX registró la acción antes de registrar la amenaza.", nodeAlready: "Esta señal ya respondió. La estación espera las otras dos.", nodeObjectiveFirst: "Entra en el Archivo y descubre lo que fue ocultado.", nodeObjectiveAll: "El portal de memoria reconoce un pasaje.", nodeObjectiveMore: "Reactiva las señales restantes en el Hub.", archiveToGarden: "Lleva la frecuencia recuperada al Jardín Orbital.", associatedFragment: "Fragmento asociado: la caja sin origen", endingConfirmed: (title) => `Configuración confirmada: ${title}`, pulseLastInteraction: "Drone estabilizado por 3,2 s", nodeRestored: (index) => `Señal ${String(index).padStart(2, "0")} restaurada. La ruta cambió.`, nodeLast: (index) => `Nodo de señal ${String(index).padStart(2, "0")} restaurado`, archiveGate: "El portal muestra un recuerdo sin entrada. Primero responde a un nodo.", puzzleAccepted: (step) => `Señal aceptada. Etapa ${step} registrada.`, puzzleWrong: "La frecuencia no cierra. La secuencia volvió al inicio.", signalRegistered: (signal) => `Señal ${labels.es[signal]} registrada`, archiveSolved: "Los módulos no formaban un orden. Formaban una relación.", gardenSolved: "El riego encontró el camino. El Jardín puede sostener el paso al Núcleo.", gardenGate: "La ruta aún no reconoce un testigo y un paso estable.", toolLocked: "La Lente encontró el camino. El Pulso aún necesita una frecuencia asociada.", toolDepleted: "La Lumen necesita energía para ejecutar otra acción.", pulse: "Pulso Lumen emitido. El centinela abrió una ventana de paso.", dronePatrol: "El centinela volvió al modo de patrulla.", lensScan: (title) => `La Lente recorrió ${title}. Una señal responde a lo lejos.`, threatAlert: "NIX encontró la firma. Usa el Pulso o retrocede.", threatSuspicious: "El cono de escaneo busca un patrón conocido.", threatPatrol: "El centinela volvió a patrullar.", checkpointEntered: (title) => `Checkpoint registrado: ${title}`,
    };
  }
  return {
    pausePaused: "O sinal aguarda. Pressione ESC para retomar.", pauseResumed: "A exploração continua.", threatDamage: "O cone de varredura encontrou a assinatura Lumen.", checkpointRestore: "A assinatura foi perdida. A Âncora devolveu você ao último estado seguro.",
    portal: "O portal aguarda os três sinais.", mira: "MIRA aguarda no terminal.", node: "Um nó de sinal aguarda uma intervenção.", ponto: "PONTO segura uma caixa sem origem.", archiveModule: (index) => `Módulo ${index + 1}: escolha a frequência.`, returnBeacon: "Uma linha mint aponta de volta ao Hub.", gardenBeacon: "A frequência recuperada aponta para o Jardim Orbital.", nix: "NIX observa a passagem.", irrigation: (index) => `Sinal de irrigação ${index + 1}.`, coreExit: "O caminho para o Núcleo exige uma testemunha e uma rota estável.", ending: (title) => `Configuração: ${title}.`, silence: "A Lumen encontra apenas silêncio aqui. Procure um sinal, personagem ou passagem.", dialogueClosed: "A estação aguardou a próxima ação.", dialogueRecorded: (character) => `${character} deixou um sinal no registro.`, transmission: (character) => `Transmissão recebida: ${character}`, nixWitness: "NIX registrou a ação antes de registrar a ameaça.", nodeAlready: "Este sinal já foi respondido. A estação espera os outros dois.", nodeObjectiveFirst: "Entre no Arquivo e descubra o que foi escondido.", nodeObjectiveAll: "O portal de memória reconhece uma passagem.", nodeObjectiveMore: "Reative os sinais restantes no Hub.", archiveToGarden: "Leve a frequência recuperada ao Jardim Orbital.", associatedFragment: "Fragmento associado: a caixa sem origem", endingConfirmed: (title) => `Configuração confirmada: ${title}`, pulseLastInteraction: "Drone estabilizado por 3,2 s", nodeRestored: (index) => `Sinal ${String(index).padStart(2, "0")} restaurado. A rota mudou.`, nodeLast: (index) => `Nó de sinal ${String(index).padStart(2, "0")} restaurado`, archiveGate: "O portal mostra uma memória sem entrada. Primeiro, responda a um nó.", puzzleAccepted: (step) => `Sinal aceito. Etapa ${step} registrada.`, puzzleWrong: "A frequência não fecha. A sequência voltou ao início.", signalRegistered: (signal) => `Sinal ${labels["pt-BR"][signal]} registrado`, archiveSolved: "Os módulos não formavam uma ordem. Formavam uma relação.", gardenSolved: "A irrigação encontrou o caminho. O Jardim pode sustentar a passagem ao Núcleo.", gardenGate: "O caminho ainda exige uma testemunha e uma rota estável.", toolLocked: "A Lente encontrou o caminho. O Pulso ainda precisa de uma frequência associada.", toolDepleted: "A Lumen precisa de energia para emitir outra ação.", pulse: "Pulso Lumen emitido. A sentinela abriu uma janela de passagem.", dronePatrol: "O sentinela voltou ao modo de patrulha.", lensScan: (title) => `A Lente percorreu o setor ${title}. Um sinal responde ao longe.`, threatAlert: "NIX encontrou a assinatura. Use o Pulso ou recue.", threatSuspicious: "O cone de varredura procura um padrão conhecido.", threatPatrol: "A sentinela voltou a patrulhar.", checkpointEntered: (title) => `Entrada registrada: ${title}`,
  };
}
