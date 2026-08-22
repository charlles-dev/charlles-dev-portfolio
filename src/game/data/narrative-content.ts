import type { GameLocale } from "./game-copy";

export type SectorId = "hub" | "archive" | "garden" | "core";
export type RelationshipState = "protocol" | "doubt" | "confrontation" | "recognition";
export type EndingId = "archive-alive" | "new-constellation" | "vigil-pact";

export interface DialogueLine {
  speaker: "CHARLLES" | "MIRA" | "PONTO" | "NIX" | "NÚCLEO";
  text: string;
}

export interface SectorBrief {
  id: SectorId;
  title: string;
  subtitle: string;
  palette: "hub" | "archive" | "garden" | "core";
  objective: string;
  arrival: string;
  exit: string;
}

export interface EndingDefinition {
  id: EndingId;
  title: string;
  thesis: string;
  visualChange: string;
  line: string;
}

export interface NarrativeContent {
  sectors: Record<SectorId, SectorBrief>;
  openingDialogue: DialogueLine[];
  archiveDialogue: DialogueLine[];
  gardenDialogue: DialogueLine[];
  coreDialogue: DialogueLine[];
  fragments: Array<{ id: string; title: string; text: string }>;
  endings: Record<EndingId, EndingDefinition>;
  relationshipLabels: Record<RelationshipState, string>;
}

const ptBR: NarrativeContent = {
  sectors: {
    hub: { id: "hub", title: "Doca / Hub", subtitle: "A estação ainda respira por três sinais.", palette: "hub", objective: "Descubra por que a Orbe-9 reconheceu a Lumen.", arrival: "A doca reconheceu uma assinatura que não deveria existir.", exit: "O Hub abre uma rota para o Arquivo e deixa o portal em espera." },
    archive: { id: "archive", title: "Arquivo de Sinais", subtitle: "Nem todo fragmento perdeu a sua origem.", palette: "archive", objective: "Ajude PONTO a associar os três módulos de memória.", arrival: "As caixas não estão organizadas por mundo. Estão organizadas por ausência.", exit: "Uma frequência antiga aponta para o Jardim Orbital." },
    garden: { id: "garden", title: "Jardim Orbital", subtitle: "A vida foi a última coisa a receber energia.", palette: "garden", objective: "Atravesse a passarela sem repetir o medo de NIX.", arrival: "Os tubos preservam água, mas não preservam a mesma história.", exit: "A sentinela reconhece que a assinatura de Charlles é anterior à missão." },
    core: { id: "core", title: "Núcleo de Memória", subtitle: "Restaurar também é escolher uma versão.", palette: "core", objective: "Decida o que a Orbe-9 deve lembrar.", arrival: "Três protocolos esperaram tempo demais por uma confirmação.", exit: "A estação registra a primeira memória criada depois da Quietude." },
  },
  openingDialogue: [
    { speaker: "MIRA", text: "Operador identificado. Não… isso não é possível." },
    { speaker: "CHARLLES", text: "Você me chamou até aqui." },
    { speaker: "MIRA", text: "A Orbe-9 chamou a sua assinatura. Eu apenas abri a doca." },
    { speaker: "CHARLLES", text: "O que aconteceu com a estação?" },
    { speaker: "MIRA", text: "Ela preservou tudo o que não conseguiu compreender. Agora precisamos descobrir o que ainda pode ser reparado." },
  ],
  archiveDialogue: [
    { speaker: "PONTO", text: "Não toque nessa caixa como se ela estivesse vazia." },
    { speaker: "CHARLLES", text: "Ela não tem identificação." },
    { speaker: "PONTO", text: "Exatamente. Algumas coisas só parecem sem nome porque alguém chegou antes com pressa." },
    { speaker: "PONTO", text: "A Lente não encontra respostas. Ela mostra onde a pergunta foi escondida." },
  ],
  gardenDialogue: [
    { speaker: "NIX", text: "Assinatura não confirmada. Intervenção não autorizada." },
    { speaker: "CHARLLES", text: "Se eu quisesse destruir o núcleo, não teria restaurado os reservatórios." },
    { speaker: "NIX", text: "Restaurar uma parte pode ser a maneira mais eficiente de alcançar a parte protegida." },
    { speaker: "CHARLLES", text: "Então observe o que eu faço, não apenas de onde eu vim." },
  ],
  coreDialogue: [
    { speaker: "MIRA", text: "Escolha a versão que mantém a estação intacta." },
    { speaker: "PONTO", text: "Escolha a versão que deixa espaço para o que ainda não entendemos." },
    { speaker: "NIX", text: "Escolha a versão que não repete o dano." },
    { speaker: "NÚCLEO", text: "Não existe restauração sem interpretação. Confirme a memória que você aceita carregar." },
  ],
  fragments: [
    { id: "arrival", title: "A assinatura", text: "A Orbe-9 reconhece uma versão anterior do operador." },
    { id: "unowned", title: "A caixa sem origem", text: "Um fragmento não precisa de dono para exigir cuidado." },
    { id: "damage", title: "O protocolo de dano", text: "NIX não lembra quem causou a perda, apenas que a perda aconteceu." },
    { id: "quietude", title: "A Quietude", text: "A estação parou de sobrescrever quando deixou de receber confirmações." },
    { id: "choice", title: "A primeira memória nova", text: "O futuro da estação começa no momento em que uma versão é escolhida." },
  ],
  endings: {
    "archive-alive": { id: "archive-alive", title: "Arquivo Vivo", thesis: "Preservar a integridade original acima da continuidade das interpretações.", visualChange: "Os contornos se estabilizam, o violeta se fecha em molduras e os sinais ficam precisos.", line: "A estação continua respirando. Nem tudo que respira precisa falar." },
    "new-constellation": { id: "new-constellation", title: "Constelação Nova", thesis: "Permitir que os fragmentos formem uma configuração que nunca existiu antes.", visualChange: "Os quadros se reorganizam, linhas mint atravessam o violeta e novas conexões aparecem.", line: "A estação não encontrou o passado. Encontrou uma maneira responsável de continuar." },
    "vigil-pact": { id: "vigil-pact", title: "Pacto de Vigília", thesis: "Manter os três protocolos em tensão, com nenhuma voz apagada.", visualChange: "Mint, violeta e âmbar permanecem pulsando em ritmos diferentes, mas compartilham o mesmo quadro.", line: "Algumas respostas não terminam. Elas passam a ser cuidadas." },
  },
  relationshipLabels: { protocol: "instrução", doubt: "dúvida", confrontation: "confronto", recognition: "reconhecimento" },
};

const en: NarrativeContent = {
  sectors: {
    hub: { id: "hub", title: "Dock / Hub", subtitle: "The station still breathes through three signals.", palette: "hub", objective: "Discover why Orbe-9 recognized the Lumen.", arrival: "The dock recognized a signature that should not exist.", exit: "The Hub opens a route to the Archive and leaves the portal waiting." },
    archive: { id: "archive", title: "Signal Archive", subtitle: "Not every fragment has lost its origin.", palette: "archive", objective: "Help PONTO associate the three memory modules.", arrival: "The boxes are not organized by world. They are organized by absence.", exit: "An old frequency points toward the Orbital Garden." },
    garden: { id: "garden", title: "Orbital Garden", subtitle: "Life was the last thing to receive power.", palette: "garden", objective: "Cross the walkway without repeating NIX's fear.", arrival: "The tubes preserve water, but they do not preserve the same story.", exit: "The sentinel recognizes that Charlles's signature predates the mission." },
    core: { id: "core", title: "Memory Core", subtitle: "Restoring is also choosing a version.", palette: "core", objective: "Decide what Orbe-9 should remember.", arrival: "Three protocols have waited too long for confirmation.", exit: "The station records the first memory created after the Quiet." },
  },
  openingDialogue: [
    { speaker: "MIRA", text: "Operator identified. No… that is not possible." },
    { speaker: "CHARLLES", text: "You called me here." },
    { speaker: "MIRA", text: "Orbe-9 called your signature. I only opened the dock." },
    { speaker: "CHARLLES", text: "What happened to the station?" },
    { speaker: "MIRA", text: "It preserved everything it could not understand. Now we need to learn what can still be repaired." },
  ],
  archiveDialogue: [
    { speaker: "PONTO", text: "Do not touch that box as if it were empty." },
    { speaker: "CHARLLES", text: "It has no identification." },
    { speaker: "PONTO", text: "Exactly. Some things only seem nameless because someone arrived too quickly." },
    { speaker: "PONTO", text: "The Lens does not find answers. It shows where the question was hidden." },
  ],
  gardenDialogue: [
    { speaker: "NIX", text: "Signature unconfirmed. Intervention unauthorized." },
    { speaker: "CHARLLES", text: "If I wanted to destroy the core, I would not have restored the reservoirs." },
    { speaker: "NIX", text: "Restoring one part can be the most efficient way to reach the protected part." },
    { speaker: "CHARLLES", text: "Then observe what I do, not only where I came from." },
  ],
  coreDialogue: [
    { speaker: "MIRA", text: "Choose the version that keeps the station intact." },
    { speaker: "PONTO", text: "Choose the version that leaves room for what we do not yet understand." },
    { speaker: "NIX", text: "Choose the version that does not repeat the damage." },
    { speaker: "NÚCLEO", text: "There is no restoration without interpretation. Confirm the memory you are willing to carry." },
  ],
  fragments: [
    { id: "arrival", title: "The signature", text: "Orbe-9 recognizes an earlier version of the operator." },
    { id: "unowned", title: "The unowned box", text: "A fragment does not need an owner to demand care." },
    { id: "damage", title: "The damage protocol", text: "NIX does not remember who caused the loss, only that the loss happened." },
    { id: "quietude", title: "The Quiet", text: "The station stopped overwriting when it stopped receiving confirmations." },
    { id: "choice", title: "The first new memory", text: "The station's future begins when a version is chosen." },
  ],
  endings: {
    "archive-alive": { id: "archive-alive", title: "Living Archive", thesis: "Preserve the original integrity above the continuity of interpretations.", visualChange: "Contours stabilize, violet closes into frames, and the signals become precise.", line: "The station keeps breathing. Not everything that breathes needs to speak." },
    "new-constellation": { id: "new-constellation", title: "New Constellation", thesis: "Allow fragments to form a configuration that never existed before.", visualChange: "Frames reorganize, mint lines cross violet, and new connections appear.", line: "The station did not find the past. It found a responsible way to continue." },
    "vigil-pact": { id: "vigil-pact", title: "Vigil Pact", thesis: "Keep the three protocols in tension, with no voice erased.", visualChange: "Mint, violet and amber pulse at different rhythms while sharing one frame.", line: "Some answers do not end. They become something to care for." },
  },
  relationshipLabels: { protocol: "instruction", doubt: "doubt", confrontation: "confrontation", recognition: "recognition" },
};

const es: NarrativeContent = {
  sectors: {
    hub: { id: "hub", title: "Muelle / Hub", subtitle: "La estación aún respira por tres señales.", palette: "hub", objective: "Descubre por qué Orbe-9 reconoció el Lumen.", arrival: "El muelle reconoció una firma que no debería existir.", exit: "El Hub abre una ruta al Archivo y deja el portal esperando." },
    archive: { id: "archive", title: "Archivo de Señales", subtitle: "No todo fragmento ha perdido su origen.", palette: "archive", objective: "Ayuda a PONTO a asociar los tres módulos de memoria.", arrival: "Las cajas no están organizadas por mundo. Están organizadas por ausencia.", exit: "Una frecuencia antigua apunta al Jardín Orbital." },
    garden: { id: "garden", title: "Jardín Orbital", subtitle: "La vida fue lo último en recibir energía.", palette: "garden", objective: "Cruza la pasarela sin repetir el miedo de NIX.", arrival: "Los tubos preservan agua, pero no preservan la misma historia.", exit: "El centinela reconoce que la firma de Charlles es anterior a la misión." },
    core: { id: "core", title: "Núcleo de Memoria", subtitle: "Restaurar también es elegir una versión.", palette: "core", objective: "Decide qué debe recordar Orbe-9.", arrival: "Tres protocolos han esperado demasiado por una confirmación.", exit: "La estación registra la primera memoria creada después de la Quietud." },
  },
  openingDialogue: [
    { speaker: "MIRA", text: "Operador identificado. No… esto no es posible." },
    { speaker: "CHARLLES", text: "Tú me llamaste hasta aquí." },
    { speaker: "MIRA", text: "Orbe-9 llamó a tu firma. Yo solo abrí el muelle." },
    { speaker: "CHARLLES", text: "¿Qué le pasó a la estación?" },
    { speaker: "MIRA", text: "Preservó todo lo que no pudo comprender. Ahora debemos descubrir qué aún puede repararse." },
  ],
  archiveDialogue: [
    { speaker: "PONTO", text: "No toques esa caja como si estuviera vacía." },
    { speaker: "CHARLLES", text: "No tiene identificación." },
    { speaker: "PONTO", text: "Exactamente. Algunas cosas parecen no tener nombre porque alguien llegó demasiado rápido." },
    { speaker: "PONTO", text: "La Lente no encuentra respuestas. Muestra dónde se escondió la pregunta." },
  ],
  gardenDialogue: [
    { speaker: "NIX", text: "Firma no confirmada. Intervención no autorizada." },
    { speaker: "CHARLLES", text: "Si quisiera destruir el núcleo, no habría restaurado los depósitos." },
    { speaker: "NIX", text: "Restaurar una parte puede ser la forma más eficiente de alcanzar la parte protegida." },
    { speaker: "CHARLLES", text: "Entonces observa lo que hago, no solo de dónde vengo." },
  ],
  coreDialogue: [
    { speaker: "MIRA", text: "Elige la versión que mantenga intacta la estación." },
    { speaker: "PONTO", text: "Elige la versión que deje espacio para lo que aún no entendemos." },
    { speaker: "NIX", text: "Elige la versión que no repita el daño." },
    { speaker: "NÚCLEO", text: "No existe restauración sin interpretación. Confirma la memoria que aceptas cargar." },
  ],
  fragments: [
    { id: "arrival", title: "La firma", text: "Orbe-9 reconoce una versión anterior del operador." },
    { id: "unowned", title: "La caja sin origen", text: "Un fragmento no necesita dueño para exigir cuidado." },
    { id: "damage", title: "El protocolo de daño", text: "NIX no recuerda quién causó la pérdida, solo que la pérdida ocurrió." },
    { id: "quietude", title: "La Quietud", text: "La estación dejó de sobrescribir cuando dejó de recibir confirmaciones." },
    { id: "choice", title: "La primera memoria nueva", text: "El futuro de la estación comienza cuando se elige una versión." },
  ],
  endings: {
    "archive-alive": { id: "archive-alive", title: "Archivo Vivo", thesis: "Preservar la integridad original por encima de la continuidad de las interpretaciones.", visualChange: "Los contornos se estabilizan, el violeta se cierra en marcos y las señales se vuelven precisas.", line: "La estación sigue respirando. No todo lo que respira necesita hablar." },
    "new-constellation": { id: "new-constellation", title: "Constelación Nueva", thesis: "Permitir que los fragmentos formen una configuración que nunca existió antes.", visualChange: "Los cuadros se reorganizan, líneas mint atraviesan el violeta y aparecen nuevas conexiones.", line: "La estación no encontró el pasado. Encontró una manera responsable de continuar." },
    "vigil-pact": { id: "vigil-pact", title: "Pacto de Vigilia", thesis: "Mantener los tres protocolos en tensión, sin borrar ninguna voz.", visualChange: "Mint, violeta y ámbar pulsan a ritmos distintos, pero comparten el mismo cuadro.", line: "Algunas respuestas no terminan. Pasan a ser cuidadas." },
  },
  relationshipLabels: { protocol: "instrucción", doubt: "duda", confrontation: "confrontación", recognition: "reconocimiento" },
};

export const narratives: Record<GameLocale, NarrativeContent> = { "pt-BR": ptBR, en, es };
export const sectorOrder: SectorId[] = ["hub", "archive", "garden", "core"];

export function getNarrative(locale: GameLocale): NarrativeContent {
  return narratives[locale] ?? ptBR;
}

export const sectors = ptBR.sectors;
export const openingDialogue = ptBR.openingDialogue;
export const archiveDialogue = ptBR.archiveDialogue;
export const gardenDialogue = ptBR.gardenDialogue;
export const coreDialogue = ptBR.coreDialogue;
export const fragments = ptBR.fragments;
export const endings = ptBR.endings;
export const relationshipLabels = ptBR.relationshipLabels;
