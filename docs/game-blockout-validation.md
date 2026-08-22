# Validação do blockout — Núcleo em Órbita

## Estado verificado

A rota de produção `/pt-BR/game` foi capturada localmente após o loading inicial. O build Next carregou os chunks Babylon corretamente em `next start` e o canvas renderizou uma cena 3/4 com câmera ortográfica. A captura confirmou o hub em perspectiva de diorama, o piso com linhas de sinal, partículas/estrelas, terminal da MIRA, três nós violeta, portal de memória e drone sentinela.

O HUD React recebeu o snapshot do mundo: o objetivo aparece como “Reative os três nós de sinal”, a energia inicia em 100/100, o status do setor aparece estável e a mensagem inicial informa que a doca reconheceu uma assinatura Lumen. Isso comprova a ponte `GameStateStore` → `GameShell` → `GameUi` no build de produção. A UI também inclui pausa funcional por `Escape`, painel de mapa com três destinos e painel de memória com progresso dos sinais, todos fora do canvas e preparados para foco/teclado.

O player visível na captura é intencionalmente um **marcador geométrico de blockout**, composto sem cabelo, rosto ou sprites finais. Ele não representa o personagem oficial e não deve ser confundido com uma aprovação de identidade. O player final permanece bloqueado até existir uma referência fiel ao bonequinho 3D canônico da landing page.

## Verificações automatizadas

| Verificação | Resultado |
|---|---|
| `./node_modules/.bin/vitest run` | 61 testes passando em 11 arquivos |
| `./node_modules/.bin/tsc --noEmit` | Passou |
| `./node_modules/.bin/next build` | Passou |
| Pause por `Escape` | Implementada no `InputManager` e `GameWorld` |
| Painéis Mapa/Memória | Implementados em React/HTML |
| Rotas geradas | `/pt-BR/game`, `/en/game`, `/es/game` |
| Captura HTML local | HTTP 200 e shell presente |
| Captura Babylon em produção | Canvas e hub renderizados |
| Navegador conectado | Extensão expirou ao abrir localhost; validação foi feita com Chromium headless local |

## Próximo trabalho seguro

A próxima etapa pode evoluir o blockout sem gerar personagem: criar os setores Arquivo/Jardim e Núcleo como variações de layout, adicionar um `PuzzleSystem` separado para roteamento/frequência/memória, criar checkpoints e separar o `ThreatSystem` do `GameWorld`. A produção de sprites, NPCs e atlas continua bloqueada pela regra de identidade visual.

## Reconstrução narrativa — validação técnica

A camada de conteúdo foi separada em `src/game/data/narrative-content.ts`, com setores, falas, fragmentos, estados de relação e três definições de final. O mundo agora monta quatro raízes de setor — Doca/Hub, Arquivo de Sinais, Jardim Orbital e Núcleo de Memória — e alterna a visibilidade conforme a progressão, preservando um único engine e um único player.

A rota crítica implementada é Hub → Arquivo → Jardim → Núcleo. O Hub apresenta MIRA e os nós; o Arquivo apresenta PONTO e o puzzle de associação; o Jardim apresenta NIX, drone, cone e Pulso; o Núcleo apresenta as três configurações de encerramento. O retorno ao Hub mantém os sinais restaurados e a progressão de conteúdo.

O runtime passou a manter setor, título, fragmentos encontrados, estados de relação, ferramentas desbloqueadas, checkpoint, final e última interação no snapshot. A UI deixou de usar o rótulo `BLOCKOUT 01` e passou a refletir o setor, o objetivo narrativo, o mapa da slice, a memória de fragmentos, as relações e as ferramentas da Lumen.

O player continua deliberadamente geométrico como proxy de gameplay. Nenhum asset de personagem com cabelo incorreto foi importado. A master visual v2 e os sprites finais continuam fora do runtime até a disponibilidade da geração e a aprovação de identidade.

## Verificações após a reconstrução

| Verificação | Resultado |
|---|---|
| TypeScript | Passou |
| Vitest | 61 testes passando |
| Next production build | Passou |
| Rotas localizadas | `/pt-BR/game`, `/en/game`, `/es/game` |
| Hub em produção local | Renderizado em captura headless |
| Setores e progressão | Implementados no `GameWorld` |
| Conteúdo narrativo | Separado em módulo de dados |
| Arte final do player | Intencionalmente bloqueada |

## Captura de produção — lógica completa com proxies

A captura de produção em 1440×900 confirma que o canvas Babylon e o HUD narrativo carregam juntos após a integração de save, puzzles, progressão e telegraphing. O snapshot restaurado exibe a mensagem de retorno sem bloquear a exploração. A hierarquia de objetivo, setor, mapa/memória, ameaça, Lumen, ferramentas e footer permanece legível.

O player exibido continua sendo o marcador geométrico deliberadamente provisório. Isso é uma pendência de arte, não uma falha escondida: a produção final será feita depois que a lógica estiver completa, conforme a ordem aprovada.

A validação automatizada atual está em 82 testes passando, com type-check e build de produção concluídos. A antiga contagem de 61 testes permanece apenas como histórico das etapas iniciais.

## QA mobile — 390×844

A captura mobile confirma que o canvas vertical, o HUD, o mapa/memória, a energia e os controles touch são renderizados. Os controles possuem área de toque visível e o footer é corretamente removido em viewport estreito.

Foi identificado um ponto de polish: o painel de objetivo fica alto e largo demais para 390 px, comprimindo a leitura do título do setor e sobrepondo visualmente a parte superior do diorama. Antes de considerar a UI responsiva concluída, o painel deve ser reduzido em altura, o subtítulo deve ganhar limite de linhas e os botões de mapa/memória devem manter respiro consistente. Essa correção não exige assets e será feita na etapa de polish com proxies.

## Correção da validação mobile

A captura v2 foi descartada porque atingiu um processo de produção antigo e exibiu a página em estado de loading/HTML sem a hidratação atual. Após reiniciar o servidor contra a build recém-compilada, a captura v3 em 390×844 confirmou a composição correta.

Na captura v3, o painel de objetivo está abaixo do cabeçalho, com altura reduzida e subtítulo limitado; mapa, memória, ameaça, energia e controles touch permanecem visíveis. O diorama ocupa a maior parte da área central e não há tela vazia nem sobreposição crítica. O player permanece o proxy geométrico esperado.
