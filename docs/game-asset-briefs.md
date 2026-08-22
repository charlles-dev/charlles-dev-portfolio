# Núcleo em Órbita
## Asset briefs — produção da vertical slice

**Versão:** 0.1 — briefs prontos para geração e integração

**Direção:** Graphic Novel de Sinais

## 1. Como usar este documento

Cada brief abaixo define o trabalho visual antes da geração. A equipe não deve pedir “um personagem legal” ou “um cenário sci-fi bonito”. Cada pedido precisa informar função de jogo, escala, câmera, material, paleta, estados, exclusões e teste de integração.

Todos os assets devem usar a bible visual em `docs/game-visual-bible.md`, a composição aprovada em `game-assets/reference-approved.png` e, quando envolverem Charlles, a referência canônica da landing page e a master player aprovada. Assets de personagem não podem ser produzidos a partir de estudos rejeitados.

## 2. Convenções comuns

### Câmera e escala

A câmera de gameplay é ortográfica 3/4, com o chão em perspectiva de diorama e contornos editoriais. Props críticos precisam permanecer legíveis em uma escala de aproximadamente 64–128 pixels no quadro de gameplay. NPCs devem possuir silhueta clara em distância média. O player nunca deve ser tão pequeno que os óculos e o cabelo deixem de formar a identidade principal.

### Paleta

Carvão organiza estrutura e profundidade. Creme cria área de leitura. Mint representa orientação, disponibilidade e conexão correta. Violeta representa memória e interpretação. Âmbar representa manutenção, dúvida e ameaça. Vermelho é reservado para alerta crítico e sempre vem acompanhado de forma, ruído ou ritmo.

### Entrega

O arquivo de trabalho é PNG com alpha real quando for sprite ou overlay. Não aceitar quadriculado rasterizado, fundo verde, fundo preto, sombra de estúdio, moldura, texto incorporado ou artefatos de geração. Os estados do mesmo asset devem compartilhar proporção, pivô, outline, material e direção de luz.

## 3. Player

### Brief P-01 — folha de identidade

A folha deve mostrar frente, 3/4, costas, escala ao lado de um nó de sinal e seis estados básicos. O cabelo precisa ser uma massa contínua, lisa/ondulada e modelada, conforme o bonequinho 3D da landing page. O cabelo não pode virar cachos em bolinhas. Óculos redondos marrom-escuros, pele morena, rosto, moletom e proporções são anchors obrigatórios.

**Aceite:** todas as vistas representam a mesma pessoa; cabelo mantém volume e direção; óculos não mudam de espessura; moletom não troca de cor; olhos fechados podem ser usados no idle; nenhuma pose introduz cabelo espetado.

### Brief P-02 — idle

Sprite isolado, corpo inteiro, 3/4, olhos fechados, braços relaxados, respiração curta sugerida por dois frames discretos. Sem ferramenta, sem sombra e sem chão. Contorno carvão consistente e pequeno acento de luz mint apenas se necessário para separação do fundo.

### Brief P-03 — walk

Dois ou quatro frames de caminhada compacta. O corpo mantém escala e direção de luz. O cabelo continua estável, sem crescer, espetar ou mudar para cachos. Os pés precisam possuir contato legível com a base do diorama.

### Brief P-04 — interact

Pose inclinada levemente para frente, uma mão estendida, rosto e óculos visíveis. O objeto interagido será renderizado separadamente; o sprite não deve embutir console ou painel.

### Brief P-05 — use Lumen

Pose central com a Lumen próxima ao peito. A ferramenta possui anel mint/violeta pequeno e controlado. A luz não pode cobrir o rosto, alterar o cabelo ou apagar o contorno do óculos.

### Brief P-06 — dash e hit

Dash é uma pose curta, com inclinação e um arco mint mínimo. Hit é uma reação clara, com corpo deslocado, sem deformidade cartunesca e sem mudança de expressão que descaracterize o personagem. Os dois sprites compartilham a mesma linha de cabelo da folha de identidade.

## 4. NPCs

### Brief N-01 — MIRA

Unidade de manutenção toy, silhueta compacta e funcional. Corpo com painel de diagnóstico, ferramenta de reparo e pequenos sinais mint. O rosto deve transmitir precisão e cansaço sem parecer humano realista. MIRA precisa ser reconhecida em silhueta e em um retrato de diálogo.

**Estados:** neutra, explicando, preocupada, reconhecendo Charlles.

**Exclusões:** não usar a aparência de Charlles, não criar cabelo humano, não usar uniforme militar genérico, não transformar MIRA em robô ameaçador.

### Brief N-02 — PONTO

Arquivista pequeno com compartimentos visíveis, etiquetas e objetos de memória presos ao corpo. A silhueta deve conter assimetrias controladas que expressem coleção. Paleta violeta, creme e carvão com pequenos sinais mint.

**Estados:** observando, associando fragmentos, surpreso, aceitando uma conclusão aberta.

### Brief N-03 — NIX

Sentinela de núcleo com formas mais rígidas, placas de proteção e uma luz âmbar central. A forma deve sugerir uma máquina que poderia bloquear uma passagem, mas ainda pertencer ao mesmo universo toy. Violeta aparece em sobrecarga, não como cor permanente.

**Estados:** patrulha, suspeita, alerta, sobrecarga, conversa.

## 5. Drone e ameaça

### Brief T-01 — drone sentinela

Drone flutuante pequeno, corpo modular, núcleo âmbar, duas hastes e um cone de varredura projetado como overlay separado. O drone deve possuir estados visuais fortes sem precisar de detalhes pequenos.

| Estado | Asset | Requisito |
|---|---|---|
| Patrulha | corpo + luz baixa | Movimento lento e previsível |
| Suspeita | corpo + arco de busca | Contorno âmbar pulsante |
| Alerta | corpo + luz forte | Forma de alerta clara, não apenas vermelho |
| Sobrecarga | corpo + linhas violeta | Núcleo instável e vulnerável |
| Recuperação | corpo + luz descendente | Retorno legível à patrulha |

### Brief T-02 — cone de varredura

Overlay transparente em forma de setor angular com borda âmbar, textura de linhas editoriais e opacidade baixa. O interior não deve escurecer todo o cenário. A versão reduzida troca expansão por mudança de espessura e ícone.

## 6. Props interativos

### Brief R-01 — nó de sinal

Objeto modular em pedestal baixo, núcleo central e três conexões. Deve existir em estados inativo, orientado, ativo e instável. A silhueta deve ser compreendida sem texto. Mint aparece na rota correta; violeta aparece no eco; âmbar aparece quando o sistema aguarda confirmação.

### Brief R-02 — conector giratório

Peça com quatro orientações possíveis, cada uma legível pela posição do recorte e do símbolo. O estado selecionado recebe contorno, não apenas brilho. O puzzle deve funcionar visualmente sem exigir que o jogador leia números.

### Brief R-03 — terminal de MIRA

Console toy alto o suficiente para enquadrar MIRA. Painel frontal com três linhas de sinal, luz mint no estado disponível e uma pequena área âmbar para diagnósticos. Não usar teclado realista nem excesso de texto ilegível.

### Brief R-04 — módulo de memória

Peça cúbica arredondada com janela violeta, etiqueta gráfica e encaixe. Três módulos terão variações de símbolo, não apenas cores. O estado revelado pela Lente mostra linhas internas curtas.

### Brief R-05 — caixa sem origem

Caixa de arquivo com lacre rompido, etiqueta incompleta e pequeno fragmento visível. Deve parecer importante por composição, mas não brilhar como item de RPG.

### Brief R-06 — portal de memória

Moldura vertical ou arco modular, com centro vazio e linhas violetas que se conectam quando o Hub está pronto. Os estados fechado, carregando, aberto e final devem mudar o quadro inteiro sem alterar a silhueta base.

### Brief R-07 — reservatório orbital

Tanque toy ligado a tubos. Estado seco tem creme apagado; estado instável apresenta âmbar; estado restaurado possui mint e pequenos sinais de vida. A função precisa ser legível pela continuidade dos tubos.

## 7. Ambientes e camadas

### Brief E-01 — kit modular do Hub

Kit de piso, trilhos, painéis, colunas, placas, cabos e portais para montar a Doca/Hub. Tudo deve compartilhar material de metal toy fosco, contorno carvão e placas creme. O kit deve permitir um quadro limpo, um quadro parcialmente restaurado e um quadro final.

### Brief E-02 — kit do Arquivo

Prateleiras, caixas, módulos, linhas duplicadas, documentos gráficos e nichos. A densidade deve ser organizada por grupos. Não gerar texto falso grande; usar símbolos e etiquetas abstratas que funcionem como linguagem visual.

### Brief E-03 — kit do Jardim

Plataformas, tubos, plantas, reservatórios, passarela, cabos e observatório. Plantas devem ser toy, porém não infantis. O verde natural não domina a paleta; o ambiente continua pertencendo à estação.

### Brief E-04 — kit do Núcleo

Três plataformas, quadro central, conectores de memória, colunas baixas e molduras. O kit deve permitir reconfigurar contornos e luz para os três finais.

### Brief E-05 — fundos e parallax

Quatro camadas por setor: estrelas/estrutura distante, arquitetura média, props de rota e elementos de primeiro plano. O parallax deve ser discreto e desligável. Fundo não pode competir com o player ou o puzzle.

## 8. VFX

### Brief V-01 — linha de sinal

Linha mint/violeta que surge em segmentos curtos, com início e fim claros. Deve ter versão estática para reduced motion.

### Brief V-02 — revelação da Lente

Máscara ou desenho de linhas que revela uma pista durante um intervalo curto. Não usar bloom excessivo. O efeito deve separar o que foi revelado do que já estava visível.

### Brief V-03 — Pulso

Anel curto em expansão, com borda violeta e núcleo mint. O impacto deve ser compreendido por escala e som, não por flash branco.

### Brief V-04 — Âncora

Quadro pequeno que marca um estado seguro. Ao registrar, a imagem recebe uma moldura momentânea e volta ao jogo. O marcador persistente é discreto.

### Brief V-05 — transição de final

Elementos da sala se reorganizam como quadros de uma graphic novel. O efeito não deve apagar a estação em fade preto; deve mostrar consequência espacial.

## 9. UI de produção

### Brief U-01 — HUD

Painel de objetivo, energia, ferramentas e sinais restaurados. Tipografia clara, áreas de segurança mobile e contornos consistentes. O HUD não pode parecer uma sobreposição militar genérica.

### Brief U-02 — diálogo

Caixa de transmissão com nome do personagem, retrato pequeno, texto e ação de avanço. A versão sem retrato precisa continuar distinguindo o falante por nome e estilo de cabeçalho.

### Brief U-03 — mapa

Folha de sinais com Hub, Arquivo, Jardim e Núcleo. Caminhos ativos, bloqueados e descobertos possuem ícone, linha e texto auxiliar. Não usar mapa cheio de marcadores sem função.

### Brief U-04 — memória

Painel com personagens, ferramentas, fragmentos e perguntas abertas. O estado “não compreendido” deve parecer um espaço em construção, não uma tarefa de coleta.

### Brief U-05 — pausa

Modal com retomar, controles, acessibilidade, reiniciar Âncora e sair para o portfólio. O mundo deve congelar completamente atrás dele.

## 10. Retratos e direção emocional

Os retratos dos NPCs não devem virar ilustrações de estilo diferente do gameplay. Cada retrato usa o mesmo contorno, material toy e direção de luz do asset em campo. A emoção vem de olhos, inclinação, luz de sinal e microexpressão, sem deformações exageradas.

## 11. Checklist obrigatório antes de importar

| Verificação | Resultado esperado |
|---|---|
| Identidade | Personagem continua sendo o mesmo em todas as poses |
| Cabelo | Massa contínua modelada; sem bolinhas, espirais ou pontas improvisadas |
| Óculos | Redondos, marrom-escuros e legíveis |
| Alpha | Transparência verdadeira e bordas limpas |
| Silhueta | Função compreensível em escala de gameplay |
| Paleta | Sinal comunica estado sem depender só de cor |
| Perspectiva | Compatível com câmera 3/4 |
| Estado | Base, interação e resolução diferenciam-se sem redesign |
| Mobile | Não some nem vira ruído em viewport estreito |
| Runtime | Pivô, escala, nome e camada documentados |

## 12. Ordem de produção

A ordem de menor risco é: master do player; cinco estados individuais do player; MIRA; PONTO; NIX; drone e cone; kit do Hub; nós e conector; kit do Arquivo; kit do Jardim; kit do Núcleo; portal; VFX; UI; retratos; variações de finais. Se qualquer etapa introduzir inconsistência no personagem, a produção para nessa etapa e não propaga o erro para os assets seguintes.
