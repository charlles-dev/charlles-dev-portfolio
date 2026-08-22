# Núcleo em Órbita
## Level design e vertical slice

**Versão:** 0.1 — pré-produção

## 1. Intenção de level design

A Orbe-9 deve ensinar o jogador sem se comportar como um tutorial que interrompe a experiência. Cada espaço apresenta uma regra, permite uma experimentação segura, cria uma complicação e depois combina a regra com outra. O jogador sempre consegue responder três perguntas: onde estou, o que mudou e por que vale a pena avançar.

A estrutura da vertical slice é um **loop de retorno**. O Hub é a base legível. O Arquivo ensina interpretação. O Jardim Orbital testa rota e risco. O Núcleo combina as aprendizagens e transforma a escolha final em consequência espacial.

```text
DOCA / HUB
  ├── Terminal de MIRA
  ├── Nó A — rota de energia
  ├── Nó B — risco do drone
  ├── Nó C — acesso ao portal
  ├── Porta do ARQUIVO ──> ARQUIVO DE SINAIS
  │                          └── atalho para HUB
  └── Portal de MEMÓRIA ──> NÚCLEO FINAL
                               └── três configurações de conclusão

ARQUIVO DE SINAIS ──> JARDIM ORBITAL ──> NÚCLEO FINAL
```

## 2. Macroprogressão

| Beat | Espaço | Nova regra | Teste | Recompensa |
|---:|---|---|---|---|
| 1 | Doca | Sinais representam objetivos | Encontrar o terminal | Contexto e controle |
| 2 | Hub | Roteamento altera o espaço | Resolver energia | Acesso ao Arquivo |
| 3 | Hub lateral | Drones possuem leitura espacial | Cruzar cone | Confiança e energia |
| 4 | Arquivo | Fragmentos podem ser associados | Puzzle de frequência | Lente aprimorada |
| 5 | Jardim | Rotas podem ser recontextualizadas | Risco + pista ambiental | Pulso estabilizado |
| 6 | Corredor | A assinatura do player é antiga | Escolher investigar | Âncora |
| 7 | Núcleo | Versões do passado competem | Puzzle de memória | Escolha final |
| 8 | Sala final | A decisão muda o quadro | Confirmar configuração | Final e registro |

## 3. Hub — Doca de retorno

### Função

O Hub é a sala de leitura da experiência. Ele apresenta a escala da estação, as três direções de progresso e os habitantes em um único quadro. O jogador deve conseguir voltar para o Hub mentalmente mesmo quando estiver em um setor mais complexo.

### Composição

O espaço tem uma plataforma central, o terminal de MIRA ao norte, três nós em um arco, o drone em uma rota lateral e o portal de memória no leste. A câmera deve manter o player, o próximo objetivo e uma ameaça potencial na mesma leitura, sem que o HUD esconda o centro do quadro.

| Região | Função | Estado inicial | Estado resolvido |
|---|---|---|---|
| Doca | Spawn e orientação | Luz baixa, sinais incompletos | Marca de chegada registrada |
| Terminal | Conversa e pista | MIRA em modo protocolo | MIRA libera hipótese |
| Nó A | Primeiro puzzle | Linha interrompida | Porta do Arquivo responde |
| Nó B | Teste de risco | Drone patrulha próximo | Atalho lateral disponível |
| Nó C | Fechamento do Hub | Sinal instável | Portal aceita configuração |
| Portal | Gating final | Violeta fechado | Quadro de memória abre |

### Guia de beats

A primeira entrada deve mostrar uma transmissão de MIRA sem exigir fala longa. O jogador pode se mover antes de interagir. Um brilho mint sutil aponta para o terminal, mas o cenário também contém uma porta com um símbolo violeta, plantando a promessa do portal.

Depois da conversa, MIRA sugere o Nó A. Se o jogador explorar o Nó B primeiro, o drone oferece uma prévia de action sem bloquear o progresso. Ao resolver o Nó A, a porta do Arquivo muda de cor e um som confirma a mudança. Ao resolver os três nós, o Hub não apenas muda o objetivo: o portal reorganiza seu contorno, demonstrando que o mundo lembra.

## 4. Arquivo de Sinais

### Função

O Arquivo é o espaço de interpretação. Ele deve parecer mais cheio do que o Hub, mas não mais confuso. Estantes, caixas, registros e linhas de sinal criam sobreposição controlada. A leitura central é que cada fragmento parece ter uma origem, mas não necessariamente pertence a ela.

### Subáreas

| Subárea | Entrada | Atividade | Saída |
|---|---|---|---|
| Recepção | Porta mint do Hub | Encontrar PONTO | Pista de associação |
| Corredor de caixas | Linhas duplicadas | Usar Lente | Fragmento opcional |
| Câmara de frequência | Três módulos | Resolver ordem | Jardim liberado |
| Estante quebrada | Atalho bloqueado | Pulso no mecanismo | Retorno rápido ao Hub |

### Puzzle de frequência

O jogador vê três módulos com sinais diferentes e uma parede com três marcas repetidas. PONTO oferece uma pista incompleta: “o primeiro não é o começo; é aquilo que ainda consegue ser ouvido”. A Lente mostra que cada módulo tem duas relações possíveis. O jogador compara o ritmo de luz, a posição dos objetos e o registro sonoro.

A sala evita tentativa e erro cega por meio de feedback graduado. Uma combinação parcialmente correta acende um contorno, uma ordem incompatível produz uma nota grave sem resetar o estado e a solução completa reorganiza as estantes. A transformação abre a entrada do Jardim e revela um registro com a assinatura antiga de Charlles.

## 5. Jardim Orbital

### Função

O Jardim é o espaço de contraste. Ele foi projetado para conservar pequenas formas de vida em ambientes artificiais, mas economizou energia durante a Quietude. Plantas toy, tubos, reservatórios e painéis formam uma rota que parece orgânica, mas segue um sistema de distribuição rígido.

### Leitura de rota

O jogador deve perceber que a energia não percorre o caminho mais curto, e sim o caminho que preserva os reservatórios vivos. Os tubos mint indicam uma rota segura; os tubos violetas indicam memória residual; o âmbar indica uma zona observada pelo drone.

| Zona | Risco | Pista | Decisão |
|---|---|---|---|
| Estufa seca | Nenhum | Plantas apontam para o reservatório | Seguir sinais naturais |
| Passarela de manutenção | Cone do drone | Luz âmbar pulsa antes da varredura | Evitar, distrair ou pulsar |
| Reservatório | Interferência | Ordem dos tubos revela frequência | Usar Lente |
| Observatório | NIX bloqueia a saída | Registro de dano | Conversar ou forçar |

### Encontro com NIX

NIX não deve ser um chefe. O encontro acontece em uma passarela estreita com duas rotas: a rota direta passa pelo cone e a rota longa permite observar um mecanismo. O jogador pode usar Pulso para desligar o drone, esperar a janela do cone, atrair o drone ao reservatório ou investigar o registro que permite diálogo.

Quando o jogador chega ao observatório, NIX faz uma pergunta condicional. A cena não precisa de uma árvore extensa. A resposta é representada pelo que o jogador fez no Jardim: evitou, atacou, investigou ou restaurou.

## 6. Corredor de retorno

O corredor entre Jardim e Núcleo é curto, silencioso e deliberadamente menos cheio. Ele funciona como uma respiração antes do clímax e como o lugar da revelação da assinatura. A Lente revela marcas de manutenção antigas com a mesma forma do equipamento de Charlles. Uma Âncora pode registrar a descoberta.

O jogador não deve receber uma cutscene longa. A revelação acontece em três quadros ambientais: um selo com a assinatura, um log incompleto e uma porta que abre antes de receber input. O Núcleo já estava esperando.

## 7. Núcleo de Memória

### Função

O Núcleo é o espaço de síntese. Ele deve reutilizar formas vistas antes em escala maior: os três nós tornam-se três módulos de decisão, as linhas do Hub tornam-se conexões de memória e o portal torna-se o enquadramento da sala final.

### Geometria

A sala tem três plataformas em arco, uma no eixo de Preservar, outra no eixo de Interpretar e outra no eixo de Proteger. O centro é ocupado por um quadro de memória sem conteúdo. Os módulos não são coletados como itens; são posicionados em uma ordem que representa a leitura do jogador.

### Puzzle final

O jogador usa as pistas dos três setores para definir a ordem dos módulos. Cada ordem gera uma prévia visível: o contorno da sala fica mais preciso, mais aberto ou mais protegido. A Âncora permite testar sem transformar a experimentação em punição. Ao confirmar, o jogador escolhe uma configuração, e a estação altera o quadro de cor, sinais, iluminação e falas.

## 8. Rota crítica e rotas opcionais

A rota crítica precisa caber em 25–30 minutos para um jogador atento. Conteúdos opcionais devem adicionar interpretação, não uma segunda campanha escondida.

| Tipo | Exemplo | Valor |
|---|---|---|
| Crítico | Nós, puzzle de frequência, encontro com NIX, puzzle final | Compreensão e conclusão |
| Opcional de contexto | Fragmentos de PONTO | Relação e interpretação |
| Opcional de domínio | Desativar drone sem ser detectado | Maestria de action |
| Opcional de consequência | Seguir ordem alternativa de energia | Variação de diálogo |
| Opcional de atmosfera | Observar o jardim após restaurá-lo | Ritmo e recompensa visual |

## 9. Câmera e composição

A câmera 3/4 deve funcionar como uma lente editorial. O personagem ocupa uma zona de leitura próxima ao terço inferior, enquanto objetivos e portas usam zonas superiores ou laterais. Nenhum puzzle importante deve depender de um detalhe menor do que o tamanho mínimo de toque.

A câmera acompanha o player apenas em setores maiores. No Hub, a câmera pode ser quase fixa para reforçar a leitura de maquete. No Arquivo, um deslocamento suave revela subáreas. No Jardim, o movimento de câmera deve mostrar a relação entre a rota segura e o cone do drone. No Núcleo, a câmera abre levemente no início e aproxima a decisão final.

## 10. Ritmo de onboarding

O jogo deve colocar o controle na mão do jogador em menos de trinta segundos, mas não entregar toda a cosmologia nesse momento. Os primeiros minutos comunicam apenas: mover, observar, aproximar, interagir. A Lente é ensinada por necessidade, não por uma tela de instrução.

| Tempo aproximado | O que o jogador deve saber |
|---:|---|
| 0:30 | Mover e reconhecer o Hub |
| 2:00 | Interagir com MIRA e ler sinais |
| 5:00 | Resolver uma alteração simples de energia |
| 8:00 | Entender o cone do drone |
| 12:00 | Usar Lente para encontrar contexto |
| 18:00 | Relacionar pistas entre setores |
| 25:00 | Entender que o final é uma escolha de interpretação |

## 11. Estados persistentes

O retorno ao Hub precisa carregar mudanças. Portas abertas, nós restaurados, confiança, fragmentos, energia segura e ordem de acesso devem sobreviver à transição de setor. O jogador não deve refazer uma tarefa apenas porque mudou de sala.

A implementação pode começar com um `GameState` serializável. Cada setor recebe flags próprias e uma lista de eventos concluídos. O desenho de nível deve ser capaz de renderizar o estado inicial, o estado parcialmente restaurado e o estado final com o mesmo layout-base.

## 12. Critérios de aceite de nível

Cada setor está pronto quando possui uma leitura inicial clara, uma regra ensinada, uma complicação, uma recompensa visual, uma rota crítica sem becos sem saída e ao menos uma alternativa significativa. O layout deve funcionar sem depender de texto explicativo externo. Uma captura parada deve comunicar o objetivo do quadro, a direção provável e a diferença entre objeto decorativo e objeto interativo.
