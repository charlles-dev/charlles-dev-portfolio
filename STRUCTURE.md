# Structure: Núcleo em Órbita

## Runtime

A rota localizada `/[locale]/game` é uma experiência independente dentro do portfólio, disponível em `/pt-BR/game`, `/en/game` e `/es/game`. A página server-rendered entrega metadata própria e um shell client-side. O primeiro blockout já inicializa Babylon uma única vez, registra resize/input e libera engine, cena e listeners no unmount. A arte final do personagem ainda não entra no runtime; o player atual é uma forma geométrica deliberadamente provisória para validar o loop.

React será a moldura: loading, tela inicial, diálogo, mapa, inventário de módulos, pausa, configurações, acessibilidade, vitória, derrota e conteúdo do case. Babylon será a tela: câmera 3/4 ortográfica, layers de parallax, sprites, entidades, partículas, colisores e composição de cena. As regras de jogo não dependerão de React nem de componentes visuais.

## Modules

| Módulo | Responsabilidade | Não deve fazer |
|---|---|---|
| `GameCanvas` | Lifecycle da engine, canvas, resize, render loop e bridge de eventos | Guardar regras narrativas ou estado da UI |
| `GameShell` | Estado React do snapshot, conexão entre canvas e UI | Criar entidades Babylon ou tratar input bruto |
| `GameUi` | HUD do blockout, objetivo, energia, diálogo, completion e controles touch | Rodar física ou acessar meshes diretamente |
| `createGameScene` | Criar cena, câmera, layers, asset loading e `GameHandle` | Conhecer copy de diálogo |
| `GameWorld` | Estado do setor, entidades, flags, tempo e checkpoints | Manipular DOM diretamente |
| `InputManager` | Converter teclado, controle e toque em ações semânticas | Decidir dano ou alterar diálogos |
| `Player` | Movimento 8-direções, interação, ferramentas, dash e estados | Conhecer rotas ou textos |
| `Level` | Layout, portas, objetos interativos, spawns e regras de conclusão | Renderizar HUD |
| `DialogueSystem` | Nós de diálogo, escolhas e flags narrativas | Atualizar elementos DOM diretamente |
| `PuzzleSystem` | Roteamento, frequência, memória e dicas | Conhecer a apresentação do menu |
| `ThreatSystem` | Patrulha, telegraphing, alerta, sobrecarga e dano | Controlar progressão narrativa |
| `ProgressionSystem` | Módulos Lente, Pulso e Âncora e interações liberadas | Renderizar inventário |
| `CheckpointSystem` | Salvar setor, módulos, energia e flags necessárias | Recarregar a página inteira |
| `CameraController` | Follow 3/4, limites, zoom e parallax | Controlar input do jogador |
| `AssetManager` | Cache, loading progressivo, atlas e falhas | Criar entidades de gameplay |
| `GameUI` | HUD, mapa, diálogo, pausa e configurações acessíveis | Rodar física ou colisão |

### Blockout implementado

`src/game/scene.ts` cria a cena, a câmera ortográfica 3/4 e a luz. `src/game/core/game-world.ts` monta o hub em geometria temporária: piso, linhas de sinal, terminal da MIRA, três nós restauráveis, portal e drone sentinela. `src/game/entities/player.ts` fornece um marcador geométrico de movimento, sem representar o cabelo ou o rosto finais. `src/game/input/input-manager.ts` converte WASD/setas, E/X, Espaço, Shift e controles touch em ações semânticas. `src/game/core/game-state.ts` publica snapshots para o HUD React.

O primeiro ciclo jogável é: mover pelo hub, conversar com MIRA, restaurar três nós, evitar ou desativar o drone com Pulso e atravessar o portal. Arquivo, jardim orbital, núcleo final completo, progressão persistente e a arte final continuam fora deste blockout.

## World model

O mundo usa coordenadas independentes do viewport. Cada setor é uma área navegável com camadas de profundidade, colisores, portas, NPCs, puzzles, ameaças e checkpoints. O hub é a fonte de retorno entre setores; a progressão é representada por ferramentas e flags, não por grind de experiência.

A câmera 3/4 mantém o personagem em uma zona segura e acompanha apenas dentro dos limites do setor. Layers de fundo, arquitetura e objetos próximos usam fatores de parallax declarados. A interface pode abrir mapa, diálogo ou inventário sem alterar o estado físico do mundo de maneira implícita.

## Data flow

`InputManager` emite ações semânticas. `GameWorld` atualiza o setor em passos estáveis. Entidades publicam eventos de alto nível, como `dialogueStarted`, `choiceMade`, `puzzleSolved`, `coreRestored`, `checkpointReached`, `playerHit` e `sectorComplete`. A ponte client-side consome esses eventos para atualizar HUD, diálogo e menus. O fluxo inverso fica limitado a comandos explícitos, como `pause`, `resume`, `restart`, `selectDialogueChoice` e `setAccessibility`.

## Quality gates

A âncora visual `game-assets/reference-approved.png` está aprovada para a direção graphic novel de sinais. A identidade do player e o cabelo correto continuam bloqueados; nenhum atlas ou NPC visual será produzido até uma nova referência fiel ao bonequinho 3D canônico ser aprovada. O blockout atual passou no type-check, build de produção e suíte de 59 testes; a validação visual automatizada do navegador permanece pendente porque a extensão do navegador conectado expirou durante a abertura local. Antes da integração final ao portfólio, ainda será necessário validar teclado, toque, foco, reduced motion, alto contraste, viewport estreito, fallback WebGL e ausência de erros de console.
