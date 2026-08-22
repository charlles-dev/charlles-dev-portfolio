# Núcleo em Órbita — briefing profissional do RPG

## Visão do produto

**Núcleo em Órbita** será um RPG narrativo de exploração sci-fi toy para browser, com aventura, puzzles ambientais e action em tempo real. O jogador controlará uma versão toy/biscuit do Charlles em uma estação orbital quebrada, conhecerá seus habitantes, investigará a falha do núcleo, restaurará sistemas e tomará decisões que mudam a leitura do final.

A proposta não é apresentar um jogo genérico anexado ao site. O jogo deve funcionar como um **case de engenharia e design**: a primeira interação precisa ensinar o controle sem tutorial excessivo; cada espaço deve introduzir uma ideia, combiná-la com uma anterior e revelar algo sobre a estação; a interface precisa ser legível no desktop e no toque; e o conjunto deve demonstrar domínio de renderização, estado, navegação, diálogo, puzzles, ação, responsividade, acessibilidade e performance.

A primeira entrega será uma vertical slice de aproximadamente 15–25 minutos, composta por um hub, dois setores exploráveis e um núcleo final. Esse recorte é deliberado: **acabamento profissional em uma experiência menor é mais valioso para o portfólio do que um RPG amplo com conteúdo inacabado**.

## Subgênero e fantasia do jogador

A base será um **RPG narrativo de exploração com ação leve**. A exploração conduz a maior parte da experiência; diálogos e escolhas dão contexto; puzzles mudam o estado dos ambientes; e action aparece em encontros curtos que testam uma ferramenta ou uma decisão. Não haverá grind, dezenas de armas ou uma árvore de habilidades inflada.

A fantasia do jogador é: **“Eu sou uma pessoa pequena, habilidosa e curiosa tentando devolver vida a uma estação que perdeu sua memória.”** A escala toy não significa uma narrativa infantil. Ela cria contraste entre objetos arredondados e colecionáveis e temas de memória, manutenção, abandono, responsabilidade e escolha.

| Camada | Função | Presença |
|---|---|---:|
| Exploração | Descobrir setores, atalhos, personagens, pistas e objetos interativos | Muito alta |
| Narrativa | Conversar, interpretar registros e escolher respostas | Alta |
| Puzzles | Redirecionar energia, combinar módulos e alterar ambientes | Média/alta |
| Action | Enfrentar ou evitar drones de manutenção corrompidos | Média |
| Progressão | Desbloquear ferramentas que mudam o que é possível explorar | Contínua |

## Câmera e controle

A câmera será **3/4 top-down em 2.5D**, com aparência de diorama sci-fi. O personagem se moverá em oito direções e poderá interagir com objetos, usar ferramentas, executar um pulso defensivo e realizar um dash curto. A câmera acompanhará com suavidade dentro dos limites de cada setor e manterá o personagem, NPCs e objetos interativos em uma zona segura.

No teclado, o movimento usará WASD/setas, a ação usará `E` ou `X`, a ferramenta usará `Space`, o dash usará `Shift` e a pausa usará `Esc`. No toque, haverá um pad direcional à esquerda e botões grandes de ação à direita. O layout deverá respeitar safe areas e impedir que os controles cubram NPCs, puzzles ou texto de diálogo.

## Loop principal

Cada ciclo seguirá seis passos: **observar o setor; conversar ou escanear; escolher uma rota; resolver um puzzle ou atravessar um risco; receber um módulo ou revelação; alterar o estado do mundo e abrir uma nova possibilidade**. A mudança no ambiente será visível, para que a progressão não dependa apenas de números em uma tela.

O jogador poderá voltar ao hub e revisitar setores com novas ferramentas. Um painel de memória registrará pistas, personagens conhecidos e sistemas restaurados. A progressão será baseada em conhecimento e ferramentas, não em acumular experiência até ficar forte o bastante para ignorar o level design.

## Estrutura narrativa

A estação **Orbe-9** foi criada para preservar pequenos mundos e histórias em módulos colecionáveis. Depois de uma falha no núcleo, os setores entraram em modos contraditórios: um tenta economizar energia, outro tenta manter tudo funcionando e um terceiro apagou partes da própria memória. Charlles chega como operador externo, mas descobre que seus acessos estão ligados à história da própria estação.

A slice contará um arco completo. No início, o jogador acredita que deve apenas religar o sistema. No meio, percebe que a estação não está simplesmente quebrada: seus módulos de memória estão escolhendo o que preservar. No final, decide entre restaurar uma ordem antiga ou permitir que a estação forme uma nova configuração. A escolha muda cor, ambiente e diálogos da conclusão, sem exigir duas campanhas inteiras.

| Ato | Espaço | Revelação | Decisão |
|---|---|---|---|
| I — Acordar | Hub e doca | A estação reconhece o protagonista, mas não lembra por quê | Qual setor receberá energia primeiro |
| II — Interpretar | Arquivo e jardim orbital | Os conflitos entre módulos são escolhas de preservação | Em quem confiar e qual registro recuperar |
| III — Recompor | Núcleo de memória | O “erro” pode ser uma nova forma de consciência | Restaurar o padrão antigo ou criar um novo |

## Personagens

O protagonista é o Charlles toy/biscuit: curioso, observador e competente, sem ser apresentado como super-herói. Ele utiliza uma ferramenta de manutenção chamada **Lumen**, que escaneia, redireciona energia e projeta pulsos defensivos. A ferramenta funciona como extensão narrativa, não apenas como arma.

A slice terá três NPCs com funções distintas: **MIRA**, uma unidade de manutenção que quer preservar o protocolo original; **PONTO**, um pequeno arquivista que coleciona memórias incompletas; e **NIX**, uma sentinela que considera o jogador uma ameaça. Cada um terá uma conversa curta, uma necessidade concreta e uma reação visível a uma decisão.

## Puzzles ambientais

O primeiro puzzle será de **roteamento de energia**, com conectores que precisam ser girados para alimentar uma porta. O segundo será de **frequência**, em que o jogador combina sinais a partir de pistas encontradas em diálogos e registros. O terceiro será de **memória**, em que a ordem de três módulos muda a configuração de uma sala.

Nenhum puzzle dependerá de tentativa aleatória. O jogo oferecerá pistas visuais, feedback imediato e a possibilidade de pedir uma dica sem reiniciar a resolução. A acessibilidade incluirá alto contraste, redução de movimento e alternativa textual para frequências e padrões.

## Action em tempo real

O action terá função de tensão e leitura espacial. Drones corrompidos patrulharão zonas específicas, projetarão cones de varredura e poderão ser evitados, desativados por um pulso ou atraídos para um mecanismo do cenário. O jogador terá energia limitada, um pulso de curto alcance e um dash defensivo.

A primeira slice terá um tipo de drone com três estados claros: patrulha, alerta e sobrecarga. O encontro final combinará um drone, um puzzle de energia e o posicionamento do jogador, mas não exigirá um chefe com múltiplas barras ou uma IA complexa. O esforço ficará concentrado em telegraphing, resposta de controle e feedback visual.

## Progressão

A progressão terá três módulos principais. **Lente** revela objetos e pistas ocultas. **Pulso** permite ativar ou desativar máquinas e afastar drones. **Âncora** cria um checkpoint temporário e libera atalhos de retorno. Cada módulo muda a leitura dos espaços anteriores e abre pelo menos uma nova interação.

Além das ferramentas, o jogador coletará fragmentos de memória opcionais. Eles não serão uma moeda de grind; servirão para aprofundar personagens e alterar a interpretação do final. O status da estação será mostrado por setores restaurados, personagens ajudados e registros recuperados.

## UI e UX

A tela inicial terá título, botão **Jogar**, controles, idioma e acessibilidade. Durante a exploração, a HUD exibirá energia, módulos restaurados, objetivo atual e um botão de pausa. O menu de pausa terá continuar, reiniciar checkpoint, configurações e retorno ao case.

As configurações incluirão redução de movimento, alto contraste, intensidade de flashes, tamanho de interface e volume após o primeiro gesto. A interface será HTML/React quando precisar de semântica, foco e leitura assistiva; o canvas ficará responsável pela cena e pela apresentação espacial.

## Critério profissional de aceite

A vertical slice somente será considerada pronta quando o jogador compreender o objetivo sem tutorial longo, souber por que está explorando cada setor, conseguir resolver puzzles com pistas, puder evitar ou enfrentar o risco, enxergar a consequência de uma escolha e completar a experiência em uma sessão curta. O case do portfólio deverá explicar não apenas as tecnologias, mas as decisões de design e as razões pelas quais cada sistema existe.
