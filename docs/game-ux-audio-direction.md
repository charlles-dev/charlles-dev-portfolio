# Núcleo em Órbita
## UX, acessibilidade e direção audiovisual

**Versão:** 0.1 — pré-produção

## 1. Princípio de experiência

A interface do jogo deve ser uma camada de leitura, não uma moldura que compete com o diorama. O jogador precisa entender o objetivo, a ameaça, o estado das ferramentas e a próxima decisão sem sair do espaço narrativo. Texto, som, cor, contorno e movimento trabalham juntos, mas nenhum deles é a única fonte de informação.

A direção graphic novel de sinais cria uma regra simples: **mint orienta, violeta significa memória, âmbar avisa, carvão organiza e creme dá contexto**. A UI pode usar essa mesma gramática, mas deve respeitar contraste suficiente e não depender apenas de cor.

## 2. Hierarquia de interface

A tela de exploração tem quatro níveis. O primeiro é o mundo: rotas, personagens, objetos, sinais e ameaça. O segundo é o HUD persistente: objetivo, energia e estado do setor. O terceiro é o contexto: mensagem curta, prompt de interação e telegraphing de risco. O quarto é a camada modal: diálogo, mapa, memória, pausa e conclusão.

| Camada | Conteúdo | Persistência | Regra |
|---|---|---|---|
| Mundo | Elementos da cena e affordances | Sempre | Não esconder o caminho crítico |
| HUD | Objetivo, energia, progresso | Sempre, reduzido no mobile | Nunca ocupar o centro da ação |
| Contexto | Mensagens, prompts e alertas | Temporário | Uma informação por vez |
| Modal | Diálogo, mapa, memória e pausa | Sob demanda | Pausa o mundo e prende o foco |

## 3. HUD de exploração

O HUD padrão exibe o título do setor, o objetivo atual, energia da Lumen e um indicador compacto de sinais restaurados. Em desktop, objetivo e energia ocupam cantos opostos para deixar o centro livre. Em mobile, o objetivo fica no alto, a energia fica acima dos controles touch e mensagens não cobrem o personagem.

O objetivo deve usar verbos concretos: “Encontre MIRA”, “Siga o sinal mint”, “Reconecte os três módulos” e “Escolha o que o núcleo deve lembrar”. Evitar frases genéricas como “Complete a missão”. Cada mudança de objetivo precisa estar ligada a um evento do mundo.

## 4. Onboarding sem tutorial intrusivo

A introdução começa com controle imediato. O primeiro quadro mostra Charlles na doca, uma linha mint interrompida e o terminal de MIRA. O jogador pode andar antes de abrir qualquer painel. O primeiro prompt aparece somente quando o personagem entra na zona de interação.

| Momento | Mensagem possível | Como ensinar |
|---|---|---|
| Primeiro movimento | “A doca ainda responde.” | Sombra, linha no chão e movimento livre |
| Primeiro terminal | “Aproxime-se de MIRA.” | Contorno mint e prompt contextual |
| Primeiro nó | “O sinal precisa de uma rota.” | Linha interrompida e pulsação |
| Primeiro perigo | “O cone detecta movimento.” | Som, luz âmbar e área visível |
| Primeira Lente | “Nem todo registro aparece de imediato.” | Pista revelada por contraste |
| Primeira Âncora | “Você pode testar uma configuração.” | Quadro marcado antes da escolha |

O tutorial desaparece assim que o jogador demonstra a ação. Uma dica pode ser reaberta no painel de memória, mas nunca deve reaparecer a cada tentativa.

## 5. Diálogo e foco

O diálogo é uma camada HTML semântica. Quando aberto, o mundo pausa, o foco vai para o título ou para a primeira opção, a leitura pode ser feita por leitor de tela e `Escape` fecha apenas o diálogo antes de fechar a tela subjacente. O texto não deve exigir clique em uma área pequena.

As falas aparecem em blocos curtos, com identificação de personagem, estado emocional discreto e uma linha de contexto do local quando necessário. O jogador pode avançar com Enter/E, toque em qualquer área de avanço ou botão explícito. Escolhas aparecem somente quando alteram uma relação, uma pista ou uma configuração.

| Componente | Requisito |
|---|---|
| Nome do falante | Texto real, não apenas cor ou retrato |
| Retrato | Ajuda emocional, mas não substitui a fala |
| Corpo da fala | Largura legível, sem bloco excessivo |
| Avanço | Teclado, pointer e touch |
| Fechamento | Escape e botão visível |
| Leitura | Foco previsível e `aria-live` apenas para mudanças importantes |

## 6. Mapa e memória

O mapa não deve ser uma miniatura decorativa. Ele mostra relação entre Hub, Arquivo, Jardim e Núcleo, os caminhos já abertos e o próximo destino provável. O jogador pode abrir o mapa sem perder o contexto do objetivo.

O painel de memória registra personagens, ferramentas, fragmentos e perguntas abertas. Uma pergunta aberta é mais útil do que uma lista de colecionáveis: “Por que a Orbe-9 reconheceu a Lumen?”; “NIX protege o núcleo de quê?”; “Qual registro PONTO não consegue completar?”.

A progressão pode ser mostrada como uma linha de sinais, não como uma árvore de talentos. Cada módulo tem estado bloqueado, descoberto, ativo e compreendido. “Compreendido” significa que o jogador encontrou contexto suficiente para usar a ferramenta em uma decisão.

## 7. Controles e remapeamento

O teclado usa WASD/setas para movimento, E/X para interação, Espaço para Pulso, Shift para Âncora ou dash contextual e Escape para pausa. Na primeira slice, o gesto de segurar Shift pode registrar uma Âncora, enquanto um toque curto realiza dash. Se essa distinção ficar confusa, a UI deve separar os comandos em dois botões explícitos.

No touch, o pad direcional fica no canto inferior esquerdo e os botões de ação no canto inferior direito. Cada alvo deve ter pelo menos 48 CSS px de área útil, espaçamento suficiente para evitar toques acidentais e estado pressionado visível. Gestos de arrastar no cenário não devem mover a câmera e o personagem ao mesmo tempo.

## 8. Acessibilidade

A primeira versão deve oferecer alto contraste, redução de movimento, alternativa textual para padrões de frequência, escala de interface, remapeamento futuro documentado, pausa completa e uma forma de distinguir perigo sem usar apenas vermelho.

| Necessidade | Solução de design |
|---|---|
| Baixa visão | Contraste alto, outlines maiores e tipografia escalável |
| Daltonismo | Forma, textura, ícone e texto junto da cor |
| Sensibilidade a movimento | Desligar parallax excessivo, flashes e câmera elástica |
| Motricidade | Teclas alternativas, botões touch grandes e tolerância de interação |
| Leitura | Texto pausável, ritmo controlado e copy curta |
| Audição | Todo alerta sonoro tem equivalente visual |
| Cognição | Objetivo único, memória organizada e dica opcional |

A opção `prefers-reduced-motion` será respeitada pelo shell. A cena deve manter estados estáveis sem depender de animação contínua para comunicar progresso.

## 9. Direção sonora

O som deve fazer a estação parecer presente sem disputar com a narrativa. O ambiente do Hub é um zumbido grave e irregular, com pequenos cliques de relé. O Arquivo acrescenta ecos curtos e tons que lembram dados armazenados. O Jardim usa ar, tubos e pulsos vivos. O Núcleo combina as três camadas e muda de acordo com a configuração final.

| Evento | Assinatura sonora |
|---|---|
| Interação | Clique curto de relé com cauda mint |
| Pista revelada | Tom fino ascendente em dois passos |
| Nó conectado | Acorde de três notas, resolvido mas não triunfal |
| Drone em suspeita | Pulso grave espaçado, aumentando de frequência |
| Drone em alerta | Ruído de sinal com batida regular para antecipação |
| Pulso Lumen | Expansão curta, brilho violeta e retorno seco |
| Âncora | Som reverso curto seguido de nota estável |
| Registro de memória | Textura granular baixa e nota sustentada |
| Final Arquivo Vivo | Harmonia estável, poucos elementos |
| Final Constelação Nova | Camadas que se conectam gradualmente |
| Final Pacto de Vigília | Pulso irregular compartilhado entre três timbres |

A primeira versão pode usar Web Audio para tons e ruídos simples, sem depender de arquivos pesados. O áudio só começa depois de gesto do usuário, respeitando as restrições do navegador.

## 10. Música

A trilha deve ser minimalista e modular. O tema da estação usa sintetizador suave, ruído de fita muito discreto, sino processado e pulsos percussivos leves. A música cresce quando o jogador compreende uma relação, não apenas quando entra em uma área grande.

A composição precisa suportar silêncio. Nos momentos de exploração, o ambiente ocupa o primeiro plano. Durante diálogos, a música reduz densidade. No puzzle, um pulso rítmico pode acompanhar conexões sem entregar a solução. No final, as mesmas notas são reorganizadas para que a consequência pareça construída, não escolhida em uma tela.

## 11. Motion e transições

A animação do HUD usa transições curtas e interrompíveis. Aberturas de painéis devem partir do ponto de origem e terminar sem elasticidade excessiva. O mundo pode usar pulsos e linhas, mas partículas não devem esconder colisores ou objetivos. O final da cena usa uma reorganização de quadros, inspirada em página editorial, em vez de um fade genérico.

| Situação | Movimento |
|---|---|
| Prompt de interação | Contorno pulsa uma vez |
| Nó ativo | Linha acende em sequência |
| Alerta | Cone expande em dois tempos |
| Dano | Flash curto e deslocamento pequeno |
| Mapa | Folha entra da lateral, sem escala de zero |
| Pausa | Mundo congela; UI permanece estável |
| Final | Camadas se reorganizam e cores mudam |

## 12. Critérios de aceite de UX

A UX está pronta quando um jogador consegue começar sem instrução externa, abrir o mapa, entender o objetivo, identificar um perigo antes de ser atingido, fechar um diálogo com teclado, diferenciar estados de puzzle em alto contraste e concluir a slice sem que a interface esconda o caminho. Uma captura do jogo deve parecer uma experiência com intenção, não uma lista de widgets sobre um canvas.
