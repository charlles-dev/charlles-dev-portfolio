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

export const sectors: Record<SectorId, SectorBrief> = {
  hub: {
    id: "hub",
    title: "Doca / Hub",
    subtitle: "A estação ainda respira por três sinais.",
    palette: "hub",
    objective: "Descubra por que a Orbe-9 reconheceu a Lumen.",
    arrival: "A doca reconheceu uma assinatura que não deveria existir.",
    exit: "O Hub abre uma rota para o Arquivo e deixa o portal em espera.",
  },
  archive: {
    id: "archive",
    title: "Arquivo de Sinais",
    subtitle: "Nem todo fragmento perdeu a sua origem.",
    palette: "archive",
    objective: "Ajude PONTO a associar os três módulos de memória.",
    arrival: "As caixas não estão organizadas por mundo. Estão organizadas por ausência.",
    exit: "Uma frequência antiga aponta para o Jardim Orbital.",
  },
  garden: {
    id: "garden",
    title: "Jardim Orbital",
    subtitle: "A vida foi a última coisa a receber energia.",
    palette: "garden",
    objective: "Atravesse a passarela sem repetir o medo de NIX.",
    arrival: "Os tubos preservam água, mas não preservam a mesma história.",
    exit: "A sentinela reconhece que a assinatura de Charlles é anterior à missão.",
  },
  core: {
    id: "core",
    title: "Núcleo de Memória",
    subtitle: "Restaurar também é escolher uma versão.",
    palette: "core",
    objective: "Decida o que a Orbe-9 deve lembrar.",
    arrival: "Três protocolos esperaram tempo demais por uma confirmação.",
    exit: "A estação registra a primeira memória criada depois da Quietude.",
  },
};

export const openingDialogue: DialogueLine[] = [
  { speaker: "MIRA", text: "Operador identificado. Não… isso não é possível." },
  { speaker: "CHARLLES", text: "Você me chamou até aqui." },
  { speaker: "MIRA", text: "A Orbe-9 chamou a sua assinatura. Eu apenas abri a doca." },
  { speaker: "CHARLLES", text: "O que aconteceu com a estação?" },
  { speaker: "MIRA", text: "Ela preservou tudo o que não conseguiu compreender. Agora precisamos descobrir o que ainda pode ser reparado." },
];

export const archiveDialogue: DialogueLine[] = [
  { speaker: "PONTO", text: "Não toque nessa caixa como se ela estivesse vazia." },
  { speaker: "CHARLLES", text: "Ela não tem identificação." },
  { speaker: "PONTO", text: "Exatamente. Algumas coisas só parecem sem nome porque alguém chegou antes com pressa." },
  { speaker: "PONTO", text: "A Lente não encontra respostas. Ela mostra onde a pergunta foi escondida." },
];

export const gardenDialogue: DialogueLine[] = [
  { speaker: "NIX", text: "Assinatura não confirmada. Intervenção não autorizada." },
  { speaker: "CHARLLES", text: "Se eu quisesse destruir o núcleo, não teria restaurado os reservatórios." },
  { speaker: "NIX", text: "Restaurar uma parte pode ser a maneira mais eficiente de alcançar a parte protegida." },
  { speaker: "CHARLLES", text: "Então observe o que eu faço, não apenas de onde eu vim." },
];

export const coreDialogue: DialogueLine[] = [
  { speaker: "MIRA", text: "Escolha a versão que mantém a estação intacta." },
  { speaker: "PONTO", text: "Escolha a versão que deixa espaço para o que ainda não entendemos." },
  { speaker: "NIX", text: "Escolha a versão que não repete o dano." },
  { speaker: "NÚCLEO", text: "Não existe restauração sem interpretação. Confirme a memória que você aceita carregar." },
];

export const fragments = [
  { id: "arrival", title: "A assinatura", text: "A Orbe-9 reconhece uma versão anterior do operador." },
  { id: "unowned", title: "A caixa sem origem", text: "Um fragmento não precisa de dono para exigir cuidado." },
  { id: "damage", title: "O protocolo de dano", text: "NIX não lembra quem causou a perda, apenas que a perda aconteceu." },
  { id: "quietude", title: "A Quietude", text: "A estação parou de sobrescrever quando deixou de receber confirmações." },
  { id: "choice", title: "A primeira memória nova", text: "O futuro da estação começa no momento em que uma versão é escolhida." },
] as const;

export const endings: Record<EndingId, EndingDefinition> = {
  "archive-alive": {
    id: "archive-alive",
    title: "Arquivo Vivo",
    thesis: "Preservar a integridade original acima da continuidade das interpretações.",
    visualChange: "Os contornos se estabilizam, o violeta se fecha em molduras e os sinais ficam precisos.",
    line: "A estação continua respirando. Nem tudo que respira precisa falar.",
  },
  "new-constellation": {
    id: "new-constellation",
    title: "Constelação Nova",
    thesis: "Permitir que os fragmentos formem uma configuração que nunca existiu antes.",
    visualChange: "Os quadros se reorganizam, linhas mint atravessam o violeta e novas conexões aparecem.",
    line: "A estação não encontrou o passado. Encontrou uma maneira responsável de continuar.",
  },
  "vigil-pact": {
    id: "vigil-pact",
    title: "Pacto de Vigília",
    thesis: "Manter os três protocolos em tensão, com nenhuma voz apagada.",
    visualChange: "Mint, violeta e âmbar permanecem pulsando em ritmos diferentes, mas compartilham o mesmo quadro.",
    line: "Algumas respostas não terminam. Elas passam a ser cuidadas.",
  },
};

export const relationshipLabels: Record<RelationshipState, string> = {
  protocol: "MIRA: instrução",
  doubt: "MIRA: dúvida",
  confrontation: "NIX: confronto",
  recognition: "NIX: reconhecimento",
};

export const sectorOrder: SectorId[] = ["hub", "archive", "garden", "core"];
