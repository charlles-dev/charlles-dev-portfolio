# Game Plan: Núcleo em Órbita

## Objetivo do produto

Construir uma vertical slice de RPG narrativo de exploração sci-fi toy, jogável no browser, com hub, setores exploráveis, personagens, diálogos, puzzles ambientais, ação leve, ferramentas de progressão, checkpoints e uma escolha final. A experiência deve funcionar como jogo e como case profissional de engenharia e design.

## Risk Tasks

### 1. Babylon dentro do ciclo de vida React/Next
- **Why isolated:** o canvas precisa inicializar a engine uma única vez, sobreviver ao Strict Mode, redimensionar e liberar listeners e recursos no unmount.
- **Approach:** `GameCanvas` será o único dono do `Engine`; `createGameScene(engine, canvas)` devolverá um `GameHandle` com `scene` e `dispose()`. O game code não importará React. A UI de loading e fallback ficará fora do canvas.
- **Verify:** entrar e sair da rota, redimensionar o viewport, abrir/fechar pausa e alternar desktop/mobile sem engines duplicadas, listeners acumulados ou erros de console.

### 2. Exploração 2.5D, câmera e parallax
- **Why isolated:** câmera 3/4, profundidade visual, layers de parallax e limites por setor podem produzir cortes, jitter ou escala inconsistente.
- **Approach:** câmera ortográfica com coordenadas de mundo independentes do viewport; três planos de profundidade com fatores fixos; follow suave e limites declarados por mapa; sprites sem distorção de aspect ratio.
- **Verify:** navegar no hub, arquivo/jardim orbital e núcleo em 16:9, 4:3, 390×844 e 320×740; o player, NPCs, objetos interativos e portas permanecem enquadrados.

### 3. Máquina de estados do jogador e animações
- **Why isolated:** exploração, interação, uso de ferramenta, dash, dano e recuperação precisam trocar de estado sem reinícios visíveis ou conflitos de input.
- **Approach:** ações semânticas alimentam uma máquina explícita. Animações usam atlas e tempo baseado em elapsed time; mudanças de estado são eventos discretos e não reiniciam loops a cada frame.
- **Verify:** testar idle→walk, walk→interact, walk→use-tool, walk→dash→walk, hit→recover e pause→resume; não pode haver pose estourada, frame preso ou direção incorreta.

### 4. Puzzles e estados persistentes do mundo
- **Why isolated:** decisões de roteamento, frequência e memória precisam alterar portas, iluminação, diálogos e atalhos sem inconsistência.
- **Approach:** cada puzzle terá estado serializável, pistas visuais e feedback imediato. O `GameWorld` será a fonte de verdade; a UI apenas exibirá o estado. Checkpoints guardarão setor, módulos, nós e flags narrativas.
- **Verify:** resolver, pedir dica, sair e retornar a cada puzzle; o estado permanecerá correto após checkpoint e não haverá solução baseada em tentativa cega.

### 5. Action, telegraphing e dano
- **Why isolated:** um encontro de ação precisa ser legível e justo em teclado e toque, sem transformar o RPG em combate genérico.
- **Approach:** drone com patrulha, alerta e sobrecarga; cone de varredura visível; pulso curto e dash defensivo; encontros evitáveis sempre que o level design permitir. Energia e recuperação terão feedback visual e textual.
- **Verify:** observar o cone, evitar, usar pulso, receber dano, recuperar no checkpoint e concluir o encontro; todos os estados devem ser perceptíveis sem depender de áudio.

### 6. Diálogo, escolhas e progressão
- **Why isolated:** escolhas precisam afetar o mundo e o final sem exigir uma árvore narrativa impossível de produzir.
- **Approach:** três NPCs terão nós de diálogo curtos com flags compartilhadas. Cada escolha altera uma condição visível, uma fala posterior ou uma camada do final. Ferramentas desbloqueadas abrem novas interações em espaços anteriores.
- **Verify:** seguir as duas principais variações de escolha, retornar ao hub e confirmar mudança em diálogo, cor do ambiente ou estado do portal.

## Main Build

A rota `/game` terá tela inicial, controles, hub, dois setores exploráveis, núcleo final, três NPCs, três ferramentas, três puzzles, um drone, checkpoints, inventário de módulos, diálogo, pausa, configurações de acessibilidade, vitória, derrota e retorno ao case do portfólio.

- **Assets:** personagem toy/biscuit de Charlles; atlas de idle/walk/interact/use-tool/dash/hit; MIRA, PONTO e NIX; drone sentinela; nós de sinal; portal; plataformas e portas; três camadas de parallax; props orbitais; partículas; ícones de HUD; painel de diálogo; controles touch.
- **Verify:**
  - o jogador entende o objetivo inicial sem tutorial longo;
  - movimento, interação e ferramentas respondem no teclado e no toque;
  - puzzles possuem pistas, estados claros e solução determinística;
  - action tem telegraphing, dano e recuperação previsíveis;
  - diálogos e escolhas alteram ao menos um estado visível;
  - HUD, menus e textos são legíveis, focáveis e sem overlap;
  - não há assets faltando, materiais de fallback ou console errors;
  - a experiência mantém a paleta, escala e linguagem sci-fi toy aprovadas;
  - a captura de apresentação mostra exploração e gameplay real, não uma tela estática.

## Critério de não expansão

Não adicionar multiplayer, combate em grupo, procedural generation, árvore de habilidades extensa, crafting, inventário grande, dezenas de inimigos ou uma campanha aberta antes de a vertical slice cumprir todos os critérios acima. Esses itens podem ser roadmap do case, não dívida escondida na primeira entrega.
