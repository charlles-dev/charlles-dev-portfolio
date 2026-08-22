# Núcleo em Órbita
## Roteiro jogável da vertical slice

**Versão:** 0.1 — roteiro de implementação

**Duração-alvo:** 25–40 minutos

**Formato:** diálogo contextual, cenas curtas, registros ambientais e consequência espacial

## 1. Regras de implementação

Este roteiro não deve virar uma sequência de cutscenes longas. Cada cena começa ou termina em um espaço jogável. O jogador mantém controle sempre que a ação não exigir foco de leitura. Falas curtas podem ser interrompidas por movimento; falas críticas ficam registradas no painel de memória.

Os IDs de fala são estáveis para internacionalização. Nenhum sistema deve depender do texto exibido para decidir uma flag. Triggers usam `sceneId`, `interactionId`, `relationshipState` e `fragmentId`.

## 2. Abertura — “A doca reconheceu você”

**Scene ID:** `hub.arrival`

**Trigger:** primeira entrada no Hub.

**Estado:** player na doca, MIRA indisponível até aproximação, três nós apagados, portal fechado.

| ID | Falante | Texto | Ação |
|---|---|---|---|
| HUB_001 | MIRA | Operador identificado. Não… isso não é possível. | Sinal mint oscila no terminal |
| HUB_002 | CHARLLES | Você me chamou até aqui. | Player pode avançar |
| HUB_003 | MIRA | A Orbe-9 chamou a sua assinatura. Eu apenas abri a doca. | O terminal mostra um símbolo incompleto |
| HUB_004 | CHARLLES | O que aconteceu com a estação? | Câmara recua suavemente |
| HUB_005 | MIRA | Ela preservou tudo o que não conseguiu compreender. | Um ruído violeta atravessa o chão |
| HUB_006 | MIRA | Agora precisamos descobrir o que ainda pode ser reparado. | Objetivo é atualizado |

**Saída:** objetivo `hub.discoverSignature`, fragmento `arrival` ainda oculto, interação dos nós liberada.

## 3. MIRA — “O protocolo é uma promessa”

**Scene ID:** `hub.mira.first`

**Trigger:** segunda interação com o terminal.

MIRA oferece uma ordem recomendada para os nós, mas não bloqueia a exploração. O jogador deve entender que seguir a ordem é uma escolha relacional, não uma obrigação de tutorial.

| ID | Falante | Texto | Condição |
|---|---|---|---|
| MIRA_001 | MIRA | Três nós. Uma estação. Uma sequência que costumava funcionar. | Sempre |
| MIRA_002 | CHARLLES | “Costumava” não parece uma instrução. | Sempre |
| MIRA_003 | MIRA | Instruções são memórias com menos espaço para discordância. | MIRA em `protocol` |
| MIRA_004 | MIRA | Comece pelo sinal central. Depois, siga a linha mint. | Se nenhum nó restaurado |
| MIRA_005 | MIRA | Você pode escolher outra ordem. Só não chame a consequência de erro. | Se nó restaurado |

**Saída:** primeira fala de MIRA muda sua relação para `doubt` se o jogador resolver nós fora da sugestão. O objetivo muda para `hub.restoreSignals`.

## 4. Primeiro nó — “O caminho não é o destino”

**Scene ID:** `hub.node.first`

**Trigger:** interação com qualquer nó não restaurado.

O nó mostra uma miniatura da rota no próprio material. O jogador orienta o conector e recebe feedback. A cena não inclui texto longo; a lógica é visual.

| Estado | Sinal | Diálogo/feedback |
|---|---|---|
| Antes | Anel violeta interrompido | “A linha termina antes de chegar.” |
| Tentativa | Trecho mint curto | “A estação respondeu, mas não abriu.” |
| Correto | Linha completa | “Sinal 01 restaurado.” |
| Retorno | Porta pulsa | “O Arquivo recebeu uma pergunta.” |

## 5. Travessia do drone — “Uma ameaça com memória”

**Scene ID:** `garden.drone.first`

**Trigger:** player entra na passarela do Jardim.

O drone não aparece como inimigo de combate tradicional. Ele atravessa o quadro, emite um pulso âmbar e abre o cone. O jogador recebe tempo para observar antes de qualquer dano.

| Beat | Comportamento | Informação transmitida |
|---:|---|---|
| 1 | Drone passa ao fundo | O perigo pertence ao espaço |
| 2 | Cone cresce lentamente | Varredura é previsível |
| 3 | Player entra na borda | Suspeita, não dano imediato |
| 4 | Player permanece | Alerta e redução de energia |
| 5 | Player evita ou pulsa | Estratégias são válidas |

**Fala contextual de NIX:** “Assinatura não confirmada. Intervenção não autorizada.”

Se o jogador usa Pulso imediatamente, NIX entra em `confrontation`. Se o jogador observa e evita, NIX entra em `doubt`. Se o jogador encontra o registro de dano antes de falar, NIX pode entrar diretamente em `recognition` após a conversa.

## 6. Arquivo — “A caixa sem origem”

**Scene ID:** `archive.ponto.introduction`

**Trigger:** aproximação de PONTO.

| ID | Falante | Texto | Intenção de direção |
|---|---|---|---|
| ARC_001 | PONTO | Não toque nessa caixa como se ela estivesse vazia. | A caixa recebe um contorno violeta |
| ARC_002 | CHARLLES | Ela não tem identificação. | Player observa a etiqueta |
| ARC_003 | PONTO | Exatamente. Algumas coisas só parecem sem nome porque alguém chegou antes com pressa. | Primeiro tema da incompletude |
| ARC_004 | PONTO | A Lente não encontra respostas. Ela mostra onde a pergunta foi escondida. | Desbloqueia uso contextual da Lente |

**Ação:** ao encerrar a fala, a Lente revela linhas dentro de três módulos. O jogador pode tentar a associação imediatamente ou explorar o Arquivo.

## 7. Puzzle de frequência — “O que ainda consegue ser ouvido”

**Scene ID:** `archive.frequency`

**Trigger:** interação com o primeiro módulo.

O jogo não mostra a solução em uma caixa de texto. PONTO fornece a pista, o cenário fornece o ritmo e o estado dos módulos fornece o feedback. A fala opcional pode ser repetida se o jogador permanecer na área.

| ID | Falante | Texto |
|---|---|---|
| ARC_005 | PONTO | O primeiro não é o começo. É aquilo que ainda consegue ser ouvido. |
| ARC_006 | PONTO | O segundo não está no meio porque chegou depois. Está no meio porque liga dois silêncios. |
| ARC_007 | PONTO | O terceiro não fecha a história. Apenas deixa a porta aberta. |

**Resolução:** quando a associação é correta, a sala muda de composição. Prateleiras recuam, a rota mint aparece e um fragmento violeta se desprende do módulo.

**Registro:** “Um fragmento não precisa de dono para exigir cuidado.”

## 8. Jardim — “A vida foi a última”

**Scene ID:** `garden.arrival`

**Trigger:** primeiro acesso ao Jardim.

O ambiente conta que o sistema poupou os reservatórios por último. Plantas e tubos funcionam como pistas. Nenhuma fala é obrigatória na entrada.

| Interação | Texto contextual |
|---|---|
| Planta seca | “A água parou antes da luz.” |
| Tubo violeta | “Memória residual. Não é uma rota segura.” |
| Reservatório | “A estação não chama isso de vida. PONTO chamaria.” |
| Registro de dano | “NIX guardou o impacto, mas perdeu o nome.” |

## 9. NIX — “Observe o que eu faço”

**Scene ID:** `garden.nix.confrontation`

**Trigger:** interação após o jogador atravessar ou enfrentar o drone.

| ID | Falante | Texto | Estado possível |
|---|---|---|---|
| NIX_001 | NIX | Assinatura não confirmada. Intervenção não autorizada. | Sempre |
| NIX_002 | CHARLLES | Se eu quisesse destruir o núcleo, não teria restaurado os reservatórios. | Sempre |
| NIX_003 | NIX | Restaurar uma parte pode ser a maneira mais eficiente de alcançar a parte protegida. | `protocol` |
| NIX_004 | NIX | Você atravessou o risco sem pedir que ele desaparecesse. | `doubt` |
| NIX_005 | NIX | Você registrou o dano antes de responder a ele. | `recognition` |
| NIX_006 | CHARLLES | Então observe o que eu faço, não apenas de onde eu vim. | Sempre |
| NIX_007 | NIX | A observação foi registrada. A passagem será aberta uma vez. | Depois de fala completa |

**Saída:** `gardenWitnessed = true`, fragmento `damage`, rota para o corredor liberada, NIX deixa de ser um obstáculo obrigatório.

## 10. Corredor — “A assinatura anterior”

**Scene ID:** `corridor.signature`

**Trigger:** player entra no corredor entre Jardim e Núcleo.

A revelação é ambiental e curta. A Lente mostra três quadros: selo de operador, log interrompido e porta que abre antes do input. O Núcleo fala por uma única linha.

| ID | Falante | Texto |
|---|---|---|
| COR_001 | NÚCLEO | Assinatura reconhecida. Retorno confirmado. |
| COR_002 | CHARLLES | Eu nunca estive aqui. |
| COR_003 | NÚCLEO | Essa versão de você ainda não. |

**Registro desbloqueado:** “A estação não esperou o operador. Esperou a decisão.”

## 11. Núcleo — “Três maneiras de cuidar”

**Scene ID:** `core.convergence`

**Trigger:** entrada no Núcleo.

Os três protocolos falam de posições diferentes. A ordem das falas acompanha a predominância relacional do jogador.

| Prioridade | Falante | Texto |
|---:|---|---|
| 1 | MIRA | Escolha a versão que mantém a estação intacta. |
| 2 | PONTO | Escolha a versão que deixa espaço para o que ainda não entendemos. |
| 3 | NIX | Escolha a versão que não repete o dano. |
| 4 | NÚCLEO | Não existe restauração sem interpretação. |
| 5 | NÚCLEO | Confirme a memória que você aceita carregar. |

Ao interagir com cada módulo, o jogador recebe uma prévia visual e uma fala curta.

| Módulo | Fala do Núcleo | Prévia |
|---|---|---|
| Arquivo Vivo | “A forma permanece. O acesso diminui.” | Contornos estabilizam, violeta se fecha |
| Constelação Nova | “A forma muda. O sinal se multiplica.” | Linhas mint conectam quadros |
| Pacto de Vigília | “A forma permanece aberta. O risco também.” | Mint, violeta e âmbar compartilham pulso |

## 12. Finais

### Arquivo Vivo

**Scene ID:** `ending.archiveAlive`

A estação ganha contornos precisos. MIRA deixa o terminal, mas mantém uma luz acesa. PONTO consegue entrar em um arquivo, embora alguns fragmentos fiquem selados. NIX reduz a patrulha, mas mantém a chave de segurança.

**Última fala:** “A estação continua respirando. Nem tudo que respira precisa falar.”

### Constelação Nova

**Scene ID:** `ending.newConstellation`

As linhas de sinal atravessam os quadros, conectando fragmentos que antes ficavam isolados. MIRA não chama isso de restauração, mas aceita monitorar. PONTO recebe uma caixa sem origem e não tenta fechá-la. NIX permanece próximo sem bloquear a passagem.

**Última fala:** “A estação não encontrou o passado. Encontrou uma maneira responsável de continuar.”

### Pacto de Vigília

**Scene ID:** `ending.vigilPact`

Nenhum protocolo vence. A estação continua instável, mas cada sistema pode questionar os outros. O jogador vê três ritmos de luz compartilhando o quadro final. O portal não fecha totalmente.

**Última fala:** “Algumas respostas não terminam. Elas passam a ser cuidadas.”

## 13. Registros opcionais

Registros opcionais nunca devem interromper a rota crítica. Eles aparecem como objetos que a Lente torna legíveis e podem ser acessados no painel de memória.

| ID | Local | Texto | Efeito |
|---|---|---|---|
| REC_001 | Hub | A primeira confirmação falhou antes do primeiro alarme. | Contexto da chegada |
| REC_002 | Arquivo | O fragmento foi catalogado como ruído porque ninguém sabia esperar. | PONTO muda uma fala |
| REC_003 | Jardim | NIX recebeu a ordem de proteger, mas não a ordem de parar. | NIX reconhece o jogador |
| REC_004 | Corredor | A assinatura é a mesma. A intenção ainda não foi confirmada. | Aumenta dúvida do Núcleo |
| REC_005 | Núcleo | Uma memória nova começa quando alguém aceita responder por ela. | Variante do registro final |

## 14. Critérios de aceite do roteiro

O roteiro está implementado quando todos os IDs críticos podem ser disparados por eventos de jogo, as falas variam conforme flags sem duplicar cenas inteiras, cada setor possui pelo menos uma revelação visual, o jogador entende o conflito antes da escolha final e os três finais têm uma mudança espacial observável. Nenhuma caixa de diálogo longa pode ser necessária para explicar uma regra que o nível não demonstra.
