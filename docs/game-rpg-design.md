# Núcleo em Órbita — design do RPG narrativo

## Identidade do jogo

**Núcleo em Órbita** será um RPG narrativo de exploração sci-fi toy com aventura, puzzles ambientais e action em tempo real. O jogador não estará entrando em uma arena de combate com uma história colada por cima; estará explorando uma estação quebrada, conhecendo seus habitantes, entendendo por que o sistema falhou e decidindo quais partes restaurar primeiro.

A fantasia do jogador é: **“Eu sou uma pessoa pequena, habilidosa e curiosa tentando devolver vida a uma estação que perdeu sua memória.”** A escala toy não significa que a narrativa será infantil. Ela cria contraste: objetos arredondados, personagens colecionáveis e espaços de brinquedo convivem com temas de memória, manutenção, abandono, responsabilidade e escolha.

## Subgênero escolhido

A base será um **RPG narrativo de exploração com ação leve**. A exploração conduz a maior parte da experiência; diálogos e escolhas dão contexto; puzzles mudam o estado dos ambientes; e action entra em encontros curtos que testam uma ferramenta ou uma decisão. Não haverá grind, dezenas de armas ou árvore de habilidades inflada.

| Camada | Função | Frequência |
|---|---|---:|
| Exploração | Descobrir setores, atalhos, personagens, pistas e objetos interativos | Muito alta |
| Narrativa | Conversar, interpretar registros e escolher respostas | Alta |
| Puzzles | Redirecionar energia, combinar módulos e alterar ambientes | Média/alta |
| Action | Enfrentar drones de manutenção corrompidos e proteger núcleos | Média |
| Progressão | Desbloquear ferramentas que mudam onde o jogador consegue chegar | Contínua |

## Câmera e controle

A câmera será **3/4 top-down em 2.5D**, com aparência de diorama sci-fi. O personagem se move em oito direções, mas a primeira slice poderá usar quatro conjuntos de sprites principais com variações de espelhamento e animações curtas, evitando multiplicar assets sem ganho real. A câmera acompanha com suavidade dentro de limites por setor e mantém uma zona segura para o personagem, NPCs e objetos interativos.

No teclado, o movimento usa WASD/setas, a ação usa `E` ou `X`, a ferramenta usa `Space`, o dash usa `Shift` e a pausa usa `Esc`. No toque, haverá um stick virtual ou pad direcional à esquerda e botões grandes de ação à direita. Todos os controles terão remapeamento visual futuro, mas a primeira slice precisa funcionar sem depender de mouse preciso.

## Loop principal

Cada ciclo de jogo seguirá seis passos: **observar o setor; conversar ou escanear; escolher uma rota; resolver um puzzle ou enfrentar um risco; receber um módulo/revelação; alterar o estado do mundo e abrir uma nova possibilidade**. A mudança no ambiente será visível, para que a progressão não dependa apenas de números em uma tela.

O jogador poderá voltar ao hub e revisitar setores com novas ferramentas. Um painel de memória registrará pistas, personagens conhecidos e sistemas restaurados. A progressão será baseada em conhecimento e ferramentas, não em acumular experiência até ficar forte o bastante para ignorar o level design.

## Narrativa

A estação **Orbe-9** foi criada para preservar pequenos mundos e histórias em módulos colecionáveis. Depois de uma falha no núcleo, os setores entraram em modos contraditórios: um tenta economizar energia, outro tenta manter tudo funcionando e um terceiro apagou partes da própria memória. Charlles chega como um operador externo, mas descobre que seus acessos estão ligados à história da própria estação.

A vertical slice contará um arco completo de descoberta. No início, o jogador acredita que deve apenas religar o sistema. No meio, percebe que a estação não está simplesmente quebrada: seus módulos de memória estão escolhendo o que preservar. No final, o jogador decide entre restaurar uma ordem antiga ou permitir que a estação forme uma nova configuração. A escolha muda a cor, a música/ambiente e alguns diálogos da conclusão, sem exigir duas campanhas inteiras.

| Ato | Espaço | Revelação | Decisão |
|---|---|---|---|
| I — Acordar | Hub e doca | A estação reconhece o protagonista, mas não lembra por quê | Qual setor receberá energia primeiro |
| II — Interpretar | Arquivo e jardim orbital | Os conflitos entre módulos são escolhas de preservação | Em quem confiar e qual registro recuperar |
| III — Recompor | Núcleo e sala de memória | O “erro” pode ser uma nova forma de consciência | Restaurar o padrão antigo ou criar um novo |

## Personagens

O protagonista é o Charlles toy/biscuit: curioso, observador e competente, sem ser apresentado como um super-herói. Ele utiliza uma ferramenta de manutenção chamada **Lumen**, que escaneia, redireciona energia e projeta pulsos defensivos. A ferramenta deve funcionar como extensão narrativa, não somente como arma.

A primeira slice terá três NPCs com funções distintas: **MIRA**, uma unidade de manutenção que quer preservar o protocolo original; **PONTO**, um pequeno arquivista que coleciona memórias incompletas; e **NIX**, uma sentinela que considera o jogador uma ameaça. Cada um terá uma conversa curta, uma necessidade concreta e uma reação visível a uma decisão do jogador.

## Puzzles ambientais

Os puzzles devem ensinar sistemas que também aparecem na exploração. O primeiro é de **roteamento de energia**, em que o jogador gira conectores para acender uma porta. O segundo é de **frequência**, em que o jogador combina sinais a partir de pistas encontradas em diálogos e registros. O terceiro é de **memória**, em que a ordem de três módulos muda a configuração de uma sala.

Nenhum puzzle deve depender de tentativa aleatória. O jogo deve oferecer pistas visuais, feedback imediato e a possibilidade de pedir uma dica sem reiniciar a resolução. A acessibilidade incluirá modo de alto contraste, redução de movimento e uma alternativa textual para frequências e padrões.

## Action em tempo real

O action terá função de tensão e leitura espacial. Drones corrompidos patrulham zonas específicas, projetam um cone de varredura e podem ser evitados, desativados por um pulso ou atraídos para um mecanismo do cenário. O jogador terá energia limitada, um pulso de curto alcance e um dash defensivo. O objetivo não é derrotar muitos inimigos, e sim entender o risco e escolher como atravessá-lo.

A primeira slice terá um tipo de drone com três estados claros: patrulha, alerta e sobrecarga. O encontro final combina um drone, um puzzle de energia e o posicionamento do jogador, mas não exige um chefe com múltiplas barras ou uma IA complexa. Isso concentra o esforço em telegraphing, resposta dos controles e feedback visual.

## Progressão

A progressão terá três módulos principais. **Lente** revela objetos e pistas ocultas. **Pulso** permite ativar ou desativar máquinas e afastar drones. **Âncora** cria um checkpoint temporário e libera atalhos de retorno. Cada módulo muda a leitura dos espaços anteriores e abre pelo menos uma nova interação.

Além das ferramentas, o jogador coleta fragmentos de memória opcionais. Eles não serão uma moeda de grind; servem para aprofundar personagens e alterar a interpretação do final. O status da estação será mostrado por setores restaurados, personagens ajudados e registros recuperados.

## Escopo de vertical slice

A primeira versão profissional terá um hub, dois setores exploráveis e um núcleo final, com duração estimada de 15 a 25 minutos. O jogador verá o ciclo completo: apresentação, exploração, diálogo, puzzle, encontro de action, retorno com nova ferramenta, escolha narrativa e conclusão.

| Sistema | Slice inicial |
|---|---|
| Mapa | Hub, arquivo/jardim orbital e núcleo de memória |
| NPCs | MIRA, PONTO e NIX |
| Ferramentas | Lente, Pulso e Âncora |
| Puzzles | Roteamento, frequência e memória |
| Action | Drone sentinela com patrulha/alerta/sobrecarga |
| Progressão | Três módulos, checkpoints e atalhos |
| Narrativa | Três conversas, registros, uma escolha final |
| UI | HUD, mapa simples, diálogo, inventário de módulos, pausa e acessibilidade |

## Critérios de qualidade

O RPG será considerado bem-sucedido quando o jogador compreender o objetivo sem tutorial longo, souber por que está explorando cada setor, conseguir resolver os puzzles com pistas, puder evitar ou enfrentar o risco, enxergar as consequências de uma escolha e completar a slice em uma sessão curta. O case do portfólio deverá explicar não apenas as tecnologias, mas as decisões de design e as razões pelas quais cada sistema existe.
