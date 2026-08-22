# Núcleo em Órbita — decisão de engine e arquitetura

## Decisão

O jogo usará **Babylon.js** como engine de renderização em uma composição 2.5D, com câmera 3/4 ortográfica, planos de profundidade, sprites próprios, partículas controladas e elementos de cena com acabamento de graphic novel. O projeto não dependerá de um modelo 3D completo do personagem; a prioridade é consistência de sprites e liberdade de composição.

A interface de menus, diálogos, mapa, inventário, pausa e acessibilidade ficará em React/HTML sobre o canvas. O canvas ficará responsável pela cena, entidades, colisões e efeitos. Essa divisão permite que textos de diálogo sejam selecionáveis, que o foco de teclado funcione de maneira previsível e que o jogo ainda tenha uma alternativa clara quando WebGL não estiver disponível.

## Por que não Phaser ou Pixi como escolha principal

Phaser continua sendo a opção mais direta para um jogo 2D puro e oferece WebGL, Canvas, TypeScript e integração com frameworks front-end [1]. PixiJS é uma camada 2D muito forte, com renderizadores WebGL/WebGPU, scene graph, asset loader e suporte a toque [2]. Nenhuma das duas opções é inadequada.

A escolha por Babylon.js é deliberada porque o projeto precisa comunicar mais do que um jogo 2D: ele precisa mostrar domínio de composição espacial, câmera 3/4, profundidade, iluminação estilizada, partículas, parallax e possibilidade de evolução para cenas 3D. O site oficial apresenta Babylon.js como uma engine web de renderização 3D com otimizações, ferramentas de cena e suporte a WebGL/WebGPU [3] [4]. O uso será contido: a vertical slice não deve carregar uma complexidade de engine maior do que o design exige.

| Necessidade do RPG | Decisão |
|---|---|
| Exploração 3/4 | Câmera ortográfica com limites por setor |
| Graphic novel | Sprites com contorno e blocos de cor, tratados como layers |
| UI e diálogo | HTML/React semântico, fora do canvas |
| Profundidade | Grupos de parallax e coordenada `depth` por entidade |
| Action | Colisores simples e telegraphing visual, sem física avançada |
| Performance | Asset loading progressivo, atlas, DPR limitado em mobile e fallback WebGL |
| Evolução | Possibilidade de receber meshes/profundidade 3D futuramente |

## Contrato de lifecycle

`GameCanvas` inicializa o `Engine` exatamente uma vez e possui uma ref para evitar duplicação no Strict Mode. Ele cria a cena por meio de `createGameScene(engine, canvas)`, inicia o render loop quando o handle resolve, reage a resize e chama `dispose()` ao desmontar. Listeners de teclado, ponteiro, toque e visibilidade são registrados e removidos no mesmo ciclo.

`createGameScene` retorna um `GameHandle` com `scene`, `dispose()` e uma ponte mínima de eventos. A função não conhece copy de diálogo nem estado de componentes React. O conteúdo de gameplay fica em classes TypeScript como `GameWorld`, `Player`, `Level`, `DialogueSystem`, `PuzzleSystem`, `ThreatSystem`, `ProgressionSystem` e `CheckpointSystem`.

## Organização proposta

```text
src/
  app/game/page.tsx
  components/game/GameCanvas.tsx
  components/game/GameShell.tsx
  components/game/GameUi.tsx
  game/
    scene.ts
    core/game-world.ts
    core/game-state.ts
    input/input-manager.ts
    entities/player.ts
    entities/npc.ts
    entities/drone.ts
    entities/signal-node.ts
    systems/dialogue-system.ts
    systems/puzzle-system.ts
    systems/threat-system.ts
    systems/progression-system.ts
    systems/checkpoint-system.ts
    levels/hub.ts
    levels/archive.ts
    levels/memory-core.ts
    assets/asset-manifest.ts
```

## Performance e qualidade

O carregamento começará pelo shell da UI, atlas do jogador, tiles essenciais e primeiro setor. Retratos de NPC, props distantes e efeitos decorativos entrarão em seguida. Em telas menores, o device pixel ratio será limitado para impedir que o custo de renderização cresça sem benefício visível. A opção de reduzir movimento desligará ou simplificará partículas, parallax excessivo, flashes e transições elásticas.

Os critérios de aceite são uma cena que entra sem travar, input que responde em teclado e toque, câmera sem jitter, nenhum texture fallback, nenhum erro de console, menus focáveis, diálogos legíveis, execução em viewport estreito e transição correta entre exploração, diálogo, puzzle, action, checkpoint e conclusão.

## Referências

[1]: [Phaser Docs — Welcome to Phaser](https://docs.phaser.io/)

[2]: [PixiJS — Introduction and features](https://pixijs.com/8.x/guides/getting-started/intro)

[3]: [Babylon.js — official engine overview](https://www.babylonjs.com/)

[4]: [Babylon.js — WebGPU support](https://doc.babylonjs.com/setup/support/webGPU)
