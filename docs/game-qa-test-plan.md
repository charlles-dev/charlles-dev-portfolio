# Núcleo em Órbita
## Plano de QA e validação da vertical slice

**Versão:** 0.1 — pré-produção

## 1. Objetivo

Garantir que a vertical slice entregue uma experiência coerente do primeiro carregamento ao final escolhido. QA não será limitado a procurar bugs de código. O plano verifica se narrativa, espaço, interface, arte, action, puzzles e performance comunicam a mesma intenção.

Uma build não pode ser aprovada apenas porque compila. Ela precisa ser jogável por uma pessoa sem conhecer o design, manter a rota crítica, preservar estado e apresentar uma imagem que comunique o projeto.

## 2. Gates de build

| Gate | Build | Aprovação |
|---|---|---|
| G0 | Dados e contratos | Type-check, testes unitários e conteúdo sem IDs ausentes |
| G1 | Graybox | Rota crítica concluível com proxies neutros |
| G2 | Interação | Diálogos, puzzles, action e checkpoints integrados |
| G3 | Visual | Assets aprovados, alpha limpo e leitura por setor |
| G4 | Alpha | Slice completa sem intervenção de desenvolvimento |
| G5 | Beta | Mobile, acessibilidade, performance e estados finais |
| G6 | Release | Regressão completa, deploy e smoke test público |

## 3. Smoke test da rota crítica

O tester inicia na doca e confirma que o objetivo aparece sem tela vazia. Move-se até MIRA, lê a transmissão, interage com o primeiro nó, observa a transformação do sinal e abre o Arquivo. No Arquivo, conversa com PONTO, usa a Lente, resolve a associação e entra no Jardim. No Jardim, observa o drone, atravessa o cone ou usa Pulso, fala com NIX, entra no Núcleo e confirma um final.

| ID | Ação | Resultado esperado | Bloqueante se falhar |
|---|---|---|---|
| SMK-01 | Abrir rota localizada | Canvas e HUD carregam juntos | Sim |
| SMK-02 | Mover por teclado | Player responde sem movimento preso | Sim |
| SMK-03 | Abrir MIRA | Diálogo pausa o mundo e fecha por input | Sim |
| SMK-04 | Restaurar nó | Estado visual e objetivo mudam | Sim |
| SMK-05 | Entrar no Arquivo | Setor, objetivo e composição mudam | Sim |
| SMK-06 | Resolver frequência | Jardim é liberado, fragmento aparece | Sim |
| SMK-07 | Cruzar ameaça | Cone é legível e ação tem recuperação | Sim |
| SMK-08 | Falar com NIX | Relação e saída mudam | Sim |
| SMK-09 | Entrar no Núcleo | Diálogo de convergência aparece | Sim |
| SMK-10 | Confirmar final | Consequência e registro aparecem | Sim |

## 4. Testes de narrativa e estado

Cada diálogo deve ser acionado pelo evento correto e não por posição arbitrária. Uma fala repetida deve avançar ou retornar de maneira intencional. Flags não podem regredir ao voltar ao Hub. Fragmentos encontrados permanecem no painel de memória. Cada final pode ser alcançado apenas quando os pré-requisitos estão completos.

| Caso | Procedimento | Resultado |
|---|---|---|
| NAR-01 | Resolver nó fora da ordem sugerida | MIRA muda para estado de dúvida |
| NAR-02 | Entrar no Arquivo sem puzzle | Saída do Jardim permanece bloqueada |
| NAR-03 | Reabrir diálogo de PONTO | Fala não duplica fragmento |
| NAR-04 | Falar com NIX em três estágios | Relação chega ao estado correspondente |
| NAR-05 | Voltar ao Hub | Nós e fragmentos continuam restaurados |
| NAR-06 | Tentar final cedo | Núcleo informa o pré-requisito, sem concluir |
| NAR-07 | Escolher cada módulo | Cada final altera título, mensagem e estado |
| NAR-08 | Recarregar em checkpoint | Estado restaurado sem perder narrativa |

## 5. Testes de puzzle

Puzzles devem ser testados com solução correta, entrada parcialmente correta, entrada inválida, repetição, interrupção, pausa, mudança de setor e retorno. Uma entrada inválida nunca pode corromper a progressão ou exigir reinício da campanha.

O tester registra se a solução foi deduzida por pista, se o feedback foi suficiente e se o ambiente mudou quando o puzzle foi resolvido. Se a pessoa precisa ler o código ou perguntar ao designer, o puzzle retorna para revisão.

## 6. Testes de action

O drone é testado em patrulha, suspeita, alerta, Pulso, recuperação e saída do setor. O cone precisa ser distinguível em alto contraste, com reduced motion e sem áudio. O dano deve ter recuperação e não pode deixar o jogador preso em estado de alerta infinito.

| Caso | Risco verificado |
|---|---|
| ACT-01 | Cone aparece antes do dano |
| ACT-02 | Estado suspicious não vira alerta instantaneamente |
| ACT-03 | Pulso desativa drone somente dentro do alcance |
| ACT-04 | Timer de recuperação é cancelado no dispose |
| ACT-05 | Perder foco limpa inputs held |
| ACT-06 | Dano reduz energia sem zerar o fluxo narrativo |
| ACT-07 | Jogador pode evitar o encontro |
| ACT-08 | Jogador pode atravessar usando o cenário |

## 7. Testes de UI e acessibilidade

O foco deve entrar em diálogo, mapa, memória e pausa de forma previsível. `Escape` fecha a camada mais interna primeiro. O HUD não pode desaparecer quando a escala de texto aumenta. Todos os comandos touch precisam ter rótulo acessível e estado pressionado. O texto de objetivo deve continuar legível em viewport estreito.

| Condição | Verificação |
|---|---|
| Teclado apenas | Toda a slice pode ser concluída sem mouse |
| Touch | Movimento, ação, Pulso e dash funcionam sem sobreposição |
| Alto contraste | Estados de puzzle e perigo continuam distintos |
| Reduced motion | Parallax, flashes e transições são reduzidos |
| Texto 150–200% | Diálogo, objetivo e pausa não são cortados |
| Leitor de tela | Modal, título, status e botão têm nome útil |
| Sem áudio | Alertas têm equivalente visual |
| Sem cor | Símbolos, formas e texto sustentam estados |

## 8. Testes de arte e identidade

O player deve ser comparado ao avatar canônico antes de qualquer build visual. O cabelo precisa permanecer contínuo e modelado, sem bolinhas ou mechas independentes. Os óculos redondos marrom-escuros devem aparecer em poses legíveis. Nenhum asset rejeitado pode ser importado pelo registro.

Cada NPC é testado em silhueta, gameplay, retrato e estado de diálogo. O mesmo personagem não pode mudar de proporção entre campo e UI. Sprites com alpha falso, halo colorido, sombra embutida ou fundo rasterizado falham automaticamente.

## 9. Testes de performance

A build deve ser observada em desktop e viewport mobile. O tester registra tempo de entrada, tempo de troca de setor, frame pacing percebido, quantidade de efeitos, uso de memória quando disponível e comportamento depois de retornar várias vezes ao Hub.

O risco prioritário não é obter um número artificial em uma máquina específica, e sim evitar regressão: loops duplicados, listeners acumulados, timers ativos, texturas desnecessárias e efeitos que pioram com o tempo.

## 10. Testes de lifecycle

A rota é aberta, fechada, recarregada e aberta novamente. O canvas não cria dois engines. A troca de rota remove observers, listeners, timers e diálogos. O retorno do navegador não deixa o player andando sozinho. Um setor desativado não continua atualizando drone ou partículas.

## 11. Matriz de severidade

| Severidade | Definição | Ação |
|---|---|---|
| S0 | Não inicia, rota impossível ou perda de estado | Bloqueia qualquer build |
| S1 | Puzzle impossível, final inalcançável ou ameaça prende jogador | Corrigir antes do próximo gate |
| S2 | UI ilegível, input inconsistente ou asset descaracterizado | Corrigir antes da apresentação |
| S3 | Feedback menor, timing ou texto secundário | Priorizar em polish |
| S4 | Preferência subjetiva sem impacto de uso | Registrar, não interromper release |

## 12. Definition of Test Complete

A validação está completa quando três pessoas conseguem concluir a rota crítica sem ajuda, pelo menos uma utiliza touch, nenhuma encontra perda de estado, cada final é alcançado, a identidade do player foi aprovada, os testes automatizados passam, a build production não apresenta erro de console e as capturas de gameplay comunicam a direção graphic novel de sinais.
