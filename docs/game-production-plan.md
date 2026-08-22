# Núcleo em Órbita
## Plano de produção de estúdio

**Versão:** 0.1 — pré-produção

## 1. Objetivo de produção

Construir uma vertical slice web completa de um RPG toy sci-fi narrativo de exploração. A slice deve entregar uma experiência fechada, com começo, descoberta, tensão, puzzle, decisão e consequência. O objetivo não é provar que Babylon renderiza uma cena; é provar que história, level design, arte, action, UX e tecnologia formam um produto coerente.

A primeira versão jogável terá entre 25 e 40 minutos, quatro espaços conectados, três personagens principais, três ferramentas progressivas, dois encontros de risco, três puzzles, um núcleo de decisão e três estados de final. O conteúdo opcional aprofundará relações e contexto sem ser necessário para entender a trama.

## 2. Escopo fechado da vertical slice

| Área | Dentro da slice | Fora da slice inicial |
|---|---|---|
| Mundo | Doca/Hub, Arquivo de Sinais, Jardim Orbital e Núcleo | Outros mundos arquivados e campanha completa |
| Narrativa | Ato I completo e versão condensada dos Atos II/III | Todos os flashbacks e história dos criadores |
| Personagens | Charlles, MIRA, PONTO, NIX e Núcleo | Elenco secundário completo |
| Exploração | Movimento 3/4, retorno ao Hub, atalhos e pistas | Mundo aberto contínuo |
| Puzzles | Roteamento, frequência e ordem de memória | Editor de puzzles e proceduralidade |
| Action | Drone sentinela, cone, Pulso e rotas alternativas | Combate com múltiplas armas e chefes |
| Progressão | Lente, Pulso, Âncora e flags de relação | Árvore de habilidades e loot |
| Finais | Arquivo Vivo, Constelação Nova e Pacto de Vigília | Epílogo completo de cada final |
| Plataforma | Desktop, mobile touch e WebGL com fallback | Consoles e instalação nativa |

## 3. Disciplinas e entregáveis

### Game direction

Define a visão, resolve conflitos entre disciplinas, controla o escopo e mantém o projeto alinhado ao documento de visão. A direção deve bloquear features que pareçam interessantes, mas não reforcem exploração, memória, relação ou escolha.

### Narrative design

Produz a bíblia narrativa, roteiro de cenas, matriz de falas, estados de relação, registros ambientais e textos de acessibilidade. Cada diálogo precisa apontar para uma ação, uma pista ou uma mudança de relação.

### Level design

Entrega mapas de fluxo, graybox navegável, posicionamento de pistas, rotas críticas, rotas alternativas, zonas de risco e estados de cada setor. O graybox deve ser testável antes da arte final.

### Systems design

Define ferramentas, puzzle rules, action states, energia, Âncora, checkpoints, flags e feedback. O designer de sistemas deve documentar o estado inicial, a resposta do jogador, a consequência e a recuperação de cada mecânica.

### Art direction

Converte a direção graphic novel de sinais em regras reproduzíveis: silhueta, contorno, materiais, paleta, proporção toy, iluminação, efeitos e composição de quadro. A identidade do personagem só entra em produção após aprovação da referência fiel ao bonequinho 3D canônico.

### Technical art

Define atlas, pivôs, camadas de profundidade, parallax, máscaras, efeitos de sinal, loading progressivo e limites de textura. O trabalho deve preservar legibilidade em viewport pequeno e evitar depender de assets com alpha problemático.

### Engineering

Implementa runtime, estados, input, renderização, transições, persistência, UI bridge, acessibilidade, fallback WebGL, telemetria local de erro e testes. A engenharia não deve codificar copy narrativa diretamente em sistemas que precisam ser reusados.

### QA

Testa rota crítica, caminhos alternativos, estados de puzzle, action, pausa, touch, teclado, focus, reduced motion, alta escala de texto, refresh, retorno de rota, WebGL indisponível e consistência de flags. O teste de qualidade começa no graybox.

## 4. Milestones

### M0 — visão bloqueada

A visão, a bíblia narrativa, os pilares e a direção graphic novel de sinais estão aprovados. Os arquivos rejeitados de personagem não podem ser usados como referência. A equipe sabe que o avatar final depende do bonequinho 3D canônico.

### M1 — paper design

História, mapa, ferramentas, puzzles, action, UI e critérios de aceite estão documentados. O paper design deve responder o que o jogador faz a cada cinco minutos e qual mudança torna cada setor diferente do anterior.

### M2 — graybox sistêmico

O Hub, Arquivo, Jardim e Núcleo existem com geometria provisória. Movimento, câmera, input, pausa, diálogo fake, puzzle mock e drone funcionam. O jogador consegue terminar a rota crítica sem arte final.

### M3 — vertical slice de interação

Os diálogos principais, flags de relação, puzzles reais, ferramenta Lente, Pulso e Âncora, checkpoints e três conclusões estão integrados. Ainda é possível usar proxies visuais, mas o ritmo e a consequência precisam estar aprovados.

### M4 — visual target em produção

O player fiel, NPCs, props, backgrounds, UI, efeitos e animações recebem o tratamento graphic novel de sinais. O trabalho usa uma bíblia visual curta com exemplos aprovados e rejeitados. Nenhum asset entra no jogo sem nome, origem, estado de licença e teste de escala.

### M5 — alpha de experiência

A slice pode ser concluída do início ao fim sem intervenção de desenvolvimento. A maior parte do conteúdo visual está presente, os estados de relação funcionam e o jogador entende a escolha final. Bugs de polish são aceitos; bloqueios de rota não.

### M6 — beta de apresentação

A performance está estável, o carregamento é progressivo, o mobile funciona, os textos estão revisados, a direção sonora tem mix mínimo e cada final tem uma captura ou gravação representativa. O jogo pode ser apresentado como case de portfólio.

## 5. Matriz de assets

| Pacote | Quantidade inicial | Dependência | Critério de aceite |
|---|---:|---|---|
| Player final | 1 personagem, 6 estados | Referência fiel aprovada | Silhueta, cabelo, óculos e roupa consistentes |
| NPCs | 3 personagens, 3 estados cada | Bíblia de personagens | Leitura sem nome e mudança de relação |
| Drone | 1 corpo, 5 estados | Action spec | Cone e alerta legíveis |
| Props de puzzle | 12–18 objetos | Level design | Forma comunica função |
| Backgrounds | 4 famílias de setor | Art direction | Parallax e contraste por setor |
| VFX | 8 famílias | Technical art | Não esconder o caminho |
| UI | HUD, mapa, memória, diálogo, pausa | UX spec | Teclado, touch e alto contraste |
| Áudio | 12 cues + 3 loops | Audio direction | Eventos distinguíveis sem imagem |
| Texto | 30–45 entradas | Narrative bible | Copy curta, reativa e revisada |

## 6. Pipeline de assets

Cada asset será criado a partir de um brief contendo função, escala, ângulo de câmera, paleta, material, contorno, estado normal, estado interativo, estado resolvido e restrições de acessibilidade. A arte deve ser validada em quatro contextos: quadro de gameplay, viewport estreito, estado de alerta e estado de reduced motion.

A nomenclatura deve seguir `sector_asset_state_variant`. Atlases devem manter pivô, margem, ordem de camada e origem documentados. Assets temporários devem conter o sufixo `-proxy` e nunca ser confundidos com arte final.

## 7. Arquitetura de runtime

A aplicação usa uma rota localizada com shell React. React controla HUD, diálogo, mapas, memória, pausa e estados de acessibilidade. Babylon controla câmera, mundo, entidades, colisores, efeitos e render loop. Um `GameState` serializável conecta os dois lados por snapshots e comandos explícitos.

| Sistema | Responsabilidade | Teste mínimo |
|---|---|---|
| InputManager | Teclas, touch e ações semânticas | Pressionar, segurar, soltar e limpar |
| GameState | Flags e snapshot | Patch, subscribe e reset |
| World/Level | Entidades e regras do setor | Entrada, saída e mudança de estado |
| Dialogue | Nós, escolhas e contexto | Abrir, avançar, fechar e flag |
| Puzzle | Estado, pistas e solução | Parcial, errado, correto e reset |
| Threat | Patrulha, cone, alerta e recuperação | Evitar, pulsar e sofrer dano |
| Progression | Lente, Pulso e Âncora | Desbloquear e reutilizar |
| Checkpoint | Salvar e restaurar | Falhar sem apagar narrativa |
| UI bridge | Snapshot e comandos | Foco, pausa e alta escala |

## 8. Riscos e mitigação

| Risco | Sinal de alerta | Mitigação |
|---|---|---|
| Arte do personagem inconsistente | Cabelo muda entre frames | Bloquear geração; usar referência canônica e revisão visual |
| Escopo maior que a slice | Novos setores antes do Hub funcionar | Gate M2 e backlog separado de expansão |
| Puzzles sem relação com história | Solução depende de tentativa cega | Pistas em cenário, fala e som; teste com jogador novo |
| Action domina a narrativa | Jogador corre de arena em arena | Encontros curtos e soluções por evitar/distrair |
| Canvas sem contexto | HUD explica tudo que o mundo não mostra | Revisar telegraphing e affordance no graybox |
| WebGL instável | Tela vazia ou console errors | Fallback, erro visível, build production e teste headless |
| Mobile ilegível | Textos ou botões cobrem o quadro | Layout dedicado e teste em viewport estreito |
| Performance baixa | Muitos draws/efeitos simultâneos | Limites de partículas, atlas e profiling por setor |
| Narrativa expositiva | Longas caixas de texto | Regra de diálogo curto e leitura ambiental |

## 9. QA e critérios de aceite

A rota crítica deve ser testada por uma pessoa que não viu a documentação. Ela precisa iniciar, entender o objetivo, encontrar MIRA, resolver o primeiro sistema sem explicação oral, reconhecer o cone do drone, usar uma ferramenta, encontrar PONTO, interpretar a relação dos sinais, conversar com NIX e chegar ao Núcleo.

| Gate | Pergunta de aprovação |
|---|---|
| Narrativa | O jogador entende o conflito sem conhecer o documento? |
| Level design | Cada setor ensina e combina uma regra? |
| Puzzle | A solução é deduzível e o feedback explica o estado? |
| Action | O perigo é antecipável e há alternativas? |
| Arte | A direção graphic novel permanece coerente em todos os setores? |
| UX | Teclado, touch, foco, pausa e texto funcionam? |
| Técnica | Sem erros de console, travamentos ou leaks após trocar de rota? |
| Portfólio | Uma captura transmite o projeto sem legenda longa? |

## 10. Definition of Done da slice

A slice está pronta quando o jogador consegue concluir os três atos condensados, os três finais podem ser alcançados por decisões compreensíveis, os personagens mudam de comportamento, todos os puzzles têm pistas, o action tem telegraphing, a UI é acessível, o player final está fiel à referência aprovada, o carregamento não bloqueia a entrada, o sistema funciona em desktop e touch e o projeto pode ser explicado como um case profissional de design e engenharia.

A existência de um canvas bonito não substitui esses critérios. O visual só será considerado pronto quando estiver sustentado por história, interação, feedback e consequência.

## 11. Backlog de expansão pós-slice

Após a aprovação da slice, o projeto pode crescer para um segundo módulo de mundo, mais registros, variações de NIX, relações com consequências maiores, modo de fotografia do diorama, seleção de finais e uma página de case integrada ao portfólio. Esses itens não devem entrar na primeira reconstrução antes de a experiência-base estar estável.
