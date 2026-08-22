# Núcleo em Órbita
## Technical design document

**Versão:** 0.1 — implementação da vertical slice

## 1. Objetivo técnico

O runtime deve suportar uma experiência narrativa 2.5D em navegador, com um único engine Babylon por rota, UI React acessível e conteúdo dirigido por dados. A tecnologia deve desaparecer atrás da experiência: o jogador não deve perceber quando um setor foi carregado, quando um estado de puzzle foi serializado ou quando um retrato veio de uma camada HTML.

A implementação atual é uma fundação de gameplay. A reconstrução visual deve preservar o contrato abaixo e substituir somente as entidades de proxy por assets aprovados. O sistema não deve misturar lógica de narrativa com nomes de arquivos ou posições arbitrárias espalhadas em componentes.

## 2. Camadas

| Camada | Responsabilidade | Não deve fazer |
|---|---|---|
| Route shell | Localização, metadata, mount e saída | Criar entidades Babylon |
| React UI | HUD, diálogo, mapa, memória, pausa e acessibilidade | Mover o player ou consultar meshes |
| Game bridge | Snapshot, comandos, lifecycle e resize | Guardar regra de puzzle |
| Game state | Flags serializáveis e eventos | Renderizar ou acessar DOM |
| Game world | Setores, entidades e colisores | Conhecer componentes React |
| Systems | Input, dialogue, puzzle, threat, progression, checkpoint | Criar UI diretamente |
| Asset registry | IDs, URLs, dimensões, pivôs e estados | Escolher assets em tempo de execução |

## 3. Contrato de inicialização

A rota monta `GameCanvas` uma vez. O canvas cria `Engine`, `Scene`, câmera, luzes, `GameStateStore`, `InputManager` e `GameWorld`. O mundo publica snapshots em eventos discretos, enquanto o loop Babylon atualiza entidades e sistemas. O React assina o store e nunca força renderização manual do canvas.

A inicialização deve ser idempotente em desenvolvimento. Se React Strict Mode montar o efeito duas vezes, a segunda execução não pode criar outro engine, outro listener ou outro render loop. No unmount, a ordem de limpeza é: parar render loop, remover observer, remover listeners, cancelar timers, liberar entidades/setores e por fim destruir scene/engine.

## 4. Estado serializável

O estado precisa representar a experiência, não a implementação visual. O contrato recomendado é:

```ts
type GameState = {
  sector: SectorId;
  objectiveId: string;
  energy: number;
  toolsUnlocked: ToolId[];
  nodesRestored: string[];
  puzzleStates: Record<string, string>;
  fragmentsFound: string[];
  relationships: RelationshipFlags;
  checkpoint: CheckpointId;
  ending: EndingId | null;
  completed: boolean;
};
```

Entidades temporárias — posição do drone, animação corrente, timer de alerta e partículas — não devem ser persistidas como verdade narrativa. Ao restaurar checkpoint, o setor reconstrói essas entidades a partir das flags.

## 5. Transição de setor

A transição é feita por `SectorManager.enter(sectorId)`. Primeiro, o sistema encerra interações e diálogos do setor anterior; depois registra o checkpoint de saída; em seguida oculta ou descarrega a raiz visual anterior, configura bounds, posiciona o player e ativa o novo setor. Por fim, publica o snapshot e dispara o beat de chegada.

```text
request transition
  → guard: dialogue/pause/completion
  → persist previous sector flags
  → dispose transient threat state
  → activate sector root
  → set camera framing and player bounds
  → run arrival beat
  → publish state snapshot
```

No primeiro ciclo, todos os setores podem permanecer em uma mesma scene e alternar raízes. Quando os assets reais entrarem, setores podem ser carregados sob demanda, desde que a troca não apague estado nem introduza tela vazia.

## 6. Input semântico

O input converte teclado, pointer e touch em ações: `move`, `interact`, `tool`, `dash`, `pause`, `map` e `memory`. Sistemas consomem ações, não teclas. Cada ação possui estado held e pressed, com limpeza obrigatória quando a aba perde foco para evitar movimento preso.

A configuração deve reservar teclas alternativas e deixar remapeamento preparado. Atalhos da UI não podem depender exclusivamente de letras que mudam em um layout de teclado internacional.

## 7. Sistema de diálogo

O diálogo usa um grafo simples de nós com condições e efeitos:

```ts
type DialogueNode = {
  id: string;
  speaker: SpeakerId;
  textKey: string;
  choices?: DialogueChoice[];
  condition?: Condition;
  effects?: StateEffect[];
};
```

A camada Babylon solicita `openDialogue(nodeId)`. React recebe o snapshot, mostra a transmissão e devolve `advanceDialogue`, `chooseDialogue` ou `closeDialogue`. O sistema não pode assumir que o texto foi renderizado para concluir um efeito; o efeito é aplicado no avanço confirmado.

## 8. Sistema de puzzle

Cada puzzle é uma máquina de estados isolada. Ele recebe interações, valida relações e emite eventos `progress`, `solved`, `reset` ou `hint`. A UI pode mostrar o progresso, mas a verdade fica no sistema do setor.

```text
idle
  ├── inspect → revealed
  ├── input valid → partial
  ├── input invalid → partial + feedback
  └── correct sequence → solved
```

Um puzzle nunca deve exigir um estado impossível de recuperar. A Âncora pode restaurar o último estado seguro. Dicas são escalonadas: primeiro destacam o conjunto, depois a relação, por fim a ordem.

## 9. Sistema de ameaça

A ameaça possui uma máquina de estados própria: `patrol`, `suspicious`, `alert`, `disabled`, `recovering`. Cada estado define velocidade, alcance, material, áudio, cone e resposta ao Pulso. O sistema publica apenas eventos e flags; a apresentação decide como animar.

A ameaça deve continuar testável sem assets finais. Um proxy geométrico pode representar estados, mas o contrato não deve mudar quando o sprite do drone for integrado.

## 10. Registro de assets

O runtime consome IDs do registro, nunca caminhos hardcoded dentro de cada entidade.

```ts
type AssetRecord = {
  id: string;
  kind: "sprite" | "texture" | "vfx" | "audio";
  url: string;
  width: number;
  height: number;
  pivot: { x: number; y: number };
  states: string[];
  sourceStatus: "proxy" | "candidate" | "approved";
};
```

Um asset com `sourceStatus !== "approved"` não pode ser usado na build de apresentação. Proxies ficam habilitados apenas em builds de desenvolvimento. Isso impede que a master visual candidata ou qualquer estudo rejeitado chegue ao jogo publicado por engano.

## 11. Parallax e composição

Cada setor possui raízes `far`, `mid`, `play`, `near` e `effects`. O player, os colliders e os objetos interativos ficam em `play`. Elementos de foreground podem cobrir parte do personagem apenas se houver uma regra de leitura clara. Parallax responde a movimento de câmera dentro de limites pequenos e é desligável.

A camada `near` não pode conter informação necessária para resolver puzzle. Efeitos não devem alterar a área de colisão nem capturar input.

## 12. Performance

A primeira meta é manter o loop estável em dispositivos móveis medianos, evitando materiais diferentes para cada instância, geometrias excessivas, texturas grandes sem necessidade e partículas contínuas. Materiais são compartilhados por paleta. Assets são atlases quando isso melhora draw calls sem prejudicar alpha.

| Área | Regra de produção |
|---|---|
| Texturas | Preferir dimensões potências de dois e resolução compatível com o quadro |
| Partículas | Limite por setor e desligamento em reduced motion |
| Meshes | Reutilizar kits e instâncias quando possível |
| Luz | Poucas luzes dinâmicas; emissive para sinais |
| UI | HTML simples, sem re-render por frame |
| Estado | Snapshots discretos; posição não precisa publicar a cada frame |
| Loading | Asset pesado carregado por setor e com fallback visível |

## 13. Fallback e falhas

Se WebGL não estiver disponível, a rota mostra uma mensagem de diagnóstico e uma imagem de apresentação da direção visual, sem deixar uma tela vazia. Se um asset falhar, o registro fornece um proxy explícito e publica um erro de desenvolvimento. Se um diálogo não for encontrado, o jogo registra a falha e permite retorno ao checkpoint.

Erros não podem ser silenciosos. O usuário final precisa receber uma mensagem curta; a build de desenvolvimento precisa guardar contexto de setor, entidade e evento.

## 14. Testes de sistema

Cada sistema deve ter testes unitários para transições e uma verificação de integração no setor. O mínimo é: Input limpa foco, Store notifica, Dialogue aplica effects uma vez, Puzzle aceita solução e reset, Threat transita corretamente, Checkpoint restaura flags e SectorManager não duplica entidades.

## 15. Critérios técnicos de aceite

O runtime é aceitável quando inicia uma única scene, termina sem listeners ou timers ativos, troca de setor sem tela vazia, preserva estado, suporta pausa, mantém o player dentro dos bounds, responde a teclado e touch, apresenta erro visível em falha de WebGL e permite substituir proxy por asset aprovado sem reescrever a regra de jogo.
