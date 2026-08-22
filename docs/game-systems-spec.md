# Núcleo em Órbita
## Especificação de sistemas — exploração, puzzles e action

**Versão:** 0.1 — pré-produção

## 1. Loop de experiência

O jogador começa cada setor com uma pergunta, não com uma lista de tarefas: “por que este espaço está se comportando assim?”. A exploração encontra sinais, personagens, rotas e objetos que fornecem partes da resposta. O jogador escolhe um caminho, usa uma ferramenta, resolve um sistema ou atravessa um risco, recebe uma mudança visível e retorna ao espaço com uma nova interpretação.

O loop principal tem seis passos:

| Passo | Ação do jogador | Resultado de design |
|---:|---|---|
| 1 | Observar | Identificar contraste, sinal, movimento e rota possível |
| 2 | Interpretar | Conversar, escanear ou comparar registros |
| 3 | Escolher | Priorizar caminho, NPC, puzzle ou risco |
| 4 | Intervir | Usar ferramenta, mover mecanismo ou evitar ameaça |
| 5 | Confirmar | Receber feedback visual, sonoro e narrativo |
| 6 | Recontextualizar | Retornar a um espaço anterior com nova possibilidade |

O jogo não terá grind, pontos de experiência ou loot aleatório. A progressão acontece porque o jogador aprendeu algo e recebeu uma ferramenta que expressa esse aprendizado.

## 2. Verbos do jogador

O conjunto de verbos deve ser pequeno o suficiente para ser lembrado e rico o bastante para produzir situações diferentes.

| Verbo | Input | Uso | Resposta visual |
|---|---|---|---|
| Mover | WASD/setas ou pad | Explorar, posicionar, evitar cone | Sombra e base acompanham o personagem |
| Interagir | E/X ou AÇÃO | Conversar, ativar, coletar, confirmar | Contorno mint e microanimação do objeto |
| Revelar | Lente | Mostrar pistas ocultas, rotas e registros | Linhas mint aparecem e persistem brevemente |
| Pulsar | Espaço ou PULSO | Ativar máquinas, desativar drones, abrir resposta | Onda curta violeta/mint com impacto legível |
| Ancorar | Shift longo ou ÂNCORA | Registrar estado seguro e testar configuração | Quadro do cenário recebe marcador de âncora |
| Pausar | Escape | Suspender tempo e abrir controles | Camada de pausa com foco e retorno claro |

O primeiro playable pode mapear Lente para uma ação de escaneamento simples, mesmo antes da implementação dos três módulos. O design deve evitar que um botão tenha comportamento secreto ou contextual demais.

## 3. Progressão por ferramentas

### Lente — revelar

A Lente identifica camadas que a estação tenta esconder: conectores sem energia, marcas de passagem, fragmentos de memória e padrões do ambiente. O jogador pode usá-la em qualquer setor. A revelação é temporária para não poluir permanentemente a cena, mas pistas importantes permanecem registradas no painel de memória.

### Pulso — responder

O Pulso emite uma onda curta de energia. Ele pode acordar um console, inverter um conector, interromper o cone de um drone e ativar um objeto que não aceita entrada manual. O custo de energia serve para criar decisão, não escassez punitiva. O jogador sempre deve conseguir recuperar energia ou resolver a situação por posicionamento.

### Âncora — testar

A Âncora registra uma configuração local. No puzzle final, o jogador pode testar a ordem de módulos e retornar ao último estado estável sem reiniciar o capítulo. A Âncora também funciona como checkpoint narrativo: ela marca que Charlles escolheu observar uma consequência antes de seguir.

## 4. Puzzle 01 — roteamento de energia

O puzzle acontece no Hub e ensina a linguagem base. Três conectores giratórios devem direcionar um sinal mint da bateria até a porta do Arquivo. A pista não é uma sequência numérica; é um diagrama de linhas no chão e uma repetição luminosa no terminal de MIRA.

### Regras

O jogador pode girar cada conector em 90 graus. Uma conexão correta acende uma linha do chão e emite um som de confirmação. Uma conexão incompleta não causa dano e não reseta o puzzle. Quando os três trechos formam uma rota contínua, a porta abre e a iluminação do hub muda de carvão para creme/mint.

| Estado | Visual | Feedback |
|---|---|---|
| Desconectado | Linhas interrompidas, núcleo apagado | Pulso grave e curto |
| Orientado | Um trecho mint | Linha acende por 0,3 s |
| Caminho completo | Rede mint contínua | Porta, NPC e HUD confirmam |
| Revisitado | Caminho permanece | Pista opcional aparece na Lente |

## 5. Puzzle 02 — frequência e testemunho

No Arquivo, três módulos reproduzem sinais de intensidades diferentes. PONTO encontrou os módulos, mas não sabe a ordem. A solução vem da relação entre uma gravação, três símbolos encontrados no ambiente e o ritmo de uma luz no corredor. O jogador pode tocar os módulos em qualquer ordem; o sistema oferece feedback de proximidade em vez de falha binária.

O puzzle tem três camadas. Primeiro, o jogador reconhece que os módulos são relacionados. Depois, aprende que a ordem é uma relação entre sinais, não uma cronologia. Por fim, conecta a frequência à história de um registro sem origem. A solução correta desbloqueia o Jardim Orbital e cria uma conexão visível entre Arquivo e Hub.

A acessibilidade terá uma alternativa textual: cada módulo apresenta nome, frequência e relação (“primeiro”, “entre”, “depois”) quando a opção de texto auxiliar está habilitada. O modo não entrega a solução gratuitamente; ele traduz o padrão visual para linguagem.

## 6. Puzzle 03 — ordem de memória

No Núcleo, três módulos representam Preservar, Interpretar e Proteger. O jogador deve colocá-los em uma ordem que reflita as relações descobertas. A solução esperada na primeira rota é ouvir o fragmento antes de proteger, e interpretar antes de restaurar. Outras ordens permanecem jogáveis, mas mudam qual protocolo fala primeiro e qual final ganha mais força.

A Âncora permite testar as três configurações sem custo de reinício. O jogador pode retornar ao estado anterior, conversar novamente com um protocolo e escolher a configuração que deseja confirmar.

## 7. Action — ameaça de baixa intensidade

O action existe para converter a leitura do espaço em tensão. O drone não deve surgir em grupos nem exigir mira precisa. Seu cone de varredura mostra a área de risco, o caminho do cone pode ser previsto e a ameaça tem um som identificável antes de detectar o jogador.

### Estados do drone

| Estado | Comportamento | Visual | Resposta do jogador |
|---|---|---|---|
| Patrulha | Percorre rota curta repetível | Âmbar baixo, sem cone forte | Observar ou passar |
| Suspeita | Faz pausa e varre um arco | Contorno âmbar, cone cresce | Mover, esconder ou preparar Pulso |
| Alerta | Persegue dentro de área limitada | Sinal vermelho/violeta pulsante | Dash, Pulso ou usar cenário |
| Sobrecarga | Fica vulnerável após Pulso | Anel violeta instável | Atravessar ou desativar mecanismo |
| Recuperação | Retorna gradualmente | Luz volta a âmbar | Reposicionar e continuar |

O jogador não perde toda a energia ao tocar no cone. O primeiro contato reduz energia e empurra o personagem; contatos repetidos em uma janela curta ampliam o risco. A recuperação fora do perigo é lenta, para que o jogador sinta consequência sem entrar em espiral de falha.

### Táticas válidas

O level design deve aceitar quatro soluções: evitar, distrair, pulsar ou conduzir o drone para um mecanismo ambiental. Um jogador que nunca usa action ainda deve conseguir concluir a slice, mas enfrentará rotas mais longas. Um jogador agressivo economiza tempo, mas gasta energia e pode perder confiança de NIX.

## 8. Falha, recuperação e checkpoints

Falhar significa receber informação. Se Charlles for atingido, retorna à última Âncora com uma parte da energia e um registro curto sobre o que causou o dano. O jogo não deve interromper a narrativa com uma tela de “game over” em cada erro. A falha de um puzzle não apaga pistas; a falha de action não desfaz uma conversa concluída.

Os checkpoints são locais de decisão, não apenas pontos automáticos. A Âncora salva setor, módulos obtidos, estados dos puzzles, flags de relação e a última energia segura. O estado pode ser serializado em localStorage em uma futura implementação, com botão explícito de limpar progresso.

## 9. Feedback e telegraphing

Todo evento importante deve ter pelo menos três canais de feedback: visual, sonoro e textual/contextual, sempre que não houver sobrecarga. Por exemplo, um nó restaurado muda cor, emite um pulso e atualiza o objetivo. Um drone em alerta muda o contorno, altera seu som e mostra o cone.

| Evento | Visual | Som | UI/contexto |
|---|---|---|---|
| Pista revelada | Linhas mint | Tom fino ascendente | Mensagem curta ou memória |
| Puzzle parcialmente correto | Trecho aceso | Clique tonal | Sem penalidade |
| Puzzle resolvido | Transformação de cor | Acorde breve | Objetivo muda |
| Perigo próximo | Cone/contorno | Pulso grave | Status da ameaça |
| Dano | Flash de contorno | Impacto seco | Energia reduzida |
| Checkpoint | Quadro de âncora | Sinal estável | “Âncora registrada” |
| Escolha confirmada | Quadro se reorganiza | Acorde da facção | Registro final |

## 10. Economia e recursos

Não haverá moeda nem inventário de objetos sem função. Os recursos são energia, ferramentas, fragmentos de memória e confiança relacional. Energia limita o uso repetido do Pulso. Ferramentas mudam affordances. Fragmentos aprofundam interpretação. Confiança muda permissões, rotas e fala.

O HUD deve mostrar apenas o que apoia uma decisão imediata. O painel de memória pode carregar informações históricas sem ocupar a tela de exploração. A ausência de números desnecessários faz parte da direção narrativa.

## 11. Critérios de aceite dos sistemas

O loop estará pronto quando um jogador novo conseguir encontrar o primeiro nó sem tutorial textual longo, entender que o terminal possui relação com a porta, perceber o risco antes de ser atingido, resolver o primeiro puzzle por observação, usar o Pulso com intenção e compreender que o portal depende do estado dos sinais. Cada sistema precisa existir para produzir uma leitura, uma escolha ou uma consequência.
