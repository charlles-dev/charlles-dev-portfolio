# Assets: Núcleo em Órbita

## Direção aprovada

**Graphic novel de sinais**: RPG narrativo de exploração sci-fi toy em câmera 3/4 top-down, composição 2.5D e sensação de diorama orbital. A linguagem visual combina contornos editoriais limpos, blocos de cor, sombras desenhadas, sinais mint, energia violeta, arquitetura carvão/creme e pequenos acentos âmbar. O mundo deve parecer uma história em quadrinhos jogável: cada objeto importante tem uma silhueta clara, um contorno controlado e um estado visual legível.

A direção não é pixel art, não é um render fotorealista, não é um cyberpunk genérico e não deve usar ruído pesado. Halftone e textura de papel podem existir apenas como detalhe de superfície. A prioridade é **legibilidade de gameplay, consistência de personagem e expressão narrativa** em desktop e mobile.

### Regras visuais fixas

| Regra | Aplicação |
|---|---|
| Identidade do protagonista | Óculos redondos marrom-escuros, cabelo escuro contínuo e modelado como no bonequinho 3D canônico, pele morena, moletom carvão e silhueta toy/biscuit; não converter em cachos separados ou bolinhas |
| Perspectiva | 3/4 top-down consistente; personagens e props devem compartilhar base, sombra e escala |
| Linha | Contorno carvão escuro, firme e ligeiramente orgânico; não usar outline preto puro em tudo |
| Paleta | Carvão `#171923`, creme `#E9D9B5`, mint `#76F0C0`, violeta `#A879FF`, âmbar `#F3A65A` |
| Estados | Todo objeto interativo precisa de estado inativo, foco, ativo e, quando necessário, bloqueado |
| Sinais | Mint para leitura/energia/feedback positivo; violeta para memória/portal; âmbar para alerta; vermelho somente para dano ou falha |
| Cenário | Detalhe concentrado em áreas jogáveis; distância reduzida a massas de cor e silhuetas |
| UI | HTML/CSS sempre que houver texto, diálogo, inventário ou acessibilidade; arte gerada somente para ícones/retratos pequenos |
| Transparência | PNG com alpha real para sprites; sem halo claro, matte preto, sombra embutida ou borda de compressão |
| Texto | Nenhum texto essencial deve ser gravado em imagens de mundo; copy fica internacionalizável na camada React |

## Anchors aprovados

| Nome | Descrição | Tamanho alvo | Arquivo | Status |
|---|---|---:|---|---|
| `world_ref` | Cena-base com player, terminal, nó de sinal, portal, ameaça e HUD, na direção graphic novel de sinais | 2560x1440 px | `game-assets/art-directions/05-graphic-novel-sinais.png` | **Aprovado como visual target** |
| `player_ref` | Charlles toy/biscuit fiel ao bonequinho 3D da landing page, com o cabelo original contínuo/modelado e a identidade preservada | Não definido | `public/reference/charlles-toy-canonical.png` + `game-assets/production/player/player-master-reference-v2.png` | **Master v2 candidata; atlas aguardando validação final** |
| `player_ref_graphic_novel` | Estudo intermediário que reinterpretou incorretamente o cabelo em cachos separados | 1920x1920 px | `game-assets/player/player-ref-graphic-novel.png` | **Rejeitado; arquivado, não usar** |
| `charlles_canonical` | Avatar toy canônico do portfólio; fonte exclusiva de identidade, incluindo cabelo, óculos, rosto, pele e roupa; não alterar | conforme original | `public/reference/charlles-toy-canonical.png` | **Canônico; única fonte aprovada** |

## Pipeline de produção visual

A bible visual está em `docs/game-visual-bible.md`, os briefs operacionais estão em `docs/game-asset-briefs.md` e o registro de aprovação está em `game-assets/production/README.md`. Esses documentos são obrigatórios antes de promover qualquer imagem a asset final.

## Ordem de produção da vertical slice

A produção seguirá uma ordem que reduz retrabalho: primeiro o player e um setor jogável; depois os três NPCs e props interativos; em seguida o drone, efeitos e estados; por fim retratos, ícones e refinamentos de UI. Nenhum atlas será gerado antes de o player limpo e a pose 3/4 serem aprovados.

| Prioridade | Entrega | Critério de aceite |
|---:|---|---|
| P0 | Validar visualmente um player fiel ao bonequinho 3D canônico | Cabelo correto, óculos intactos, rosto e roupa coerentes; nenhuma geração automática antes do aceite |
| P0 | Hub em três layers de parallax | Caminhos jogáveis claros, terminal, nó, checkpoint e saída legíveis |
| P0 | MIRA e PONTO | Silhuetas distintas, retratos consistentes e estados de conversa |
| P1 | Arquivo/jardim orbital | Pistas visuais do puzzle de frequência e memória, sem poluição visual |
| P1 | NIX e drone sentinela | Leitura imediata de aliado/ameaça, cone de varredura e estados de alerta |
| P1 | Núcleo de memória e portal | Composição final forte, três pontos de decisão e mudanças de cor visíveis |
| P1 | Props e efeitos de gameplay | Todos os estados têm feedback visual e não dependem apenas de texto |
| P2 | Ícones, retratos e controles touch | Uso consistente na UI e boa leitura em viewport estreito |
| P2 | Variações opcionais e colecionáveis | Só entram depois que o ciclo principal estiver jogável |

## Personagens e NPCs

| Nome | Função | Tamanho alvo | Entrega |
|---|---|---:|---|
| `player` | Protagonista Charlles com Lumen e mochila de manutenção | 256x256 px por frame | Sprite atlas, sombra separada ou procedural e quatro direções |
| `mira` | Unidade de manutenção que preserva o protocolo original | 192x192 px | Corpo, retrato, idle, fala e reação |
| `ponto` | Arquivista pequeno que coleciona memórias incompletas | 160x160 px | Corpo, retrato, idle, fala e reação |
| `nix` | Sentinela de segurança que pode tratar o player como ameaça | 224x224 px | Corpo, retrato, alerta, recuo e fala |

Todos os NPCs devem ter um detalhe de silhueta que sobreviva à redução de tamanho. Os retratos usarão o mesmo sistema de contorno e blocos de cor, com fundo simples por personagem: mint para MIRA, creme/violeta para PONTO e âmbar/violeta para NIX.

## Cenários e layers

Cada setor será composto por um plano distante, um plano estrutural e um plano próximo. As imagens de fundo não devem carregar HUD nem copy.

| Nome | Conteúdo | Tamanho alvo | Status |
|---|---|---:|---|
| `hub_far` | Espaço orbital quase preto, estrelas e sinais distantes | 2560x1440 px | Planejado |
| `station_mid` | Silhueta violeta/creme da estação Orbe-9 | 2560x1440 px | Planejado |
| `room_near` | Consoles, bordas, passarelas e barreiras mint | 2560x1440 px | Planejado |
| `archive_room` | Arquivo modular, estantes, registros e caminho do puzzle de frequência | 1920x1080 px | Planejado |
| `orbital_garden` | Jardim orbital com tubos, plantas toy e energia difusa | 1920x1080 px | Planejado |
| `memory_core` | Núcleo final, portal e três pontos de decisão | 1920x1080 px | Planejado |

## Props interativos

| Nome | Estados | Tamanho alvo | Status |
|---|---|---:|---|
| `signal_node` | Inativo, foco, carregando e restaurado | 96x96 px | Planejado |
| `portal` | Fechado, instável e aberto | 160x224 px | Planejado |
| `memory_module` | Três frequências/cor e coletado | 72x72 px | Planejado |
| `lumen_console` | Desligado, pronto e acionado pelo Pulso | 128x128 px | Planejado |
| `frequency_terminal` | Neutro, pista ativa e solução | 160x128 px | Planejado |
| `checkpoint_beacon` | Inativo, focado e ativo | 96x128 px | Planejado |
| `interference_zone` | Invisível, indicado, ativo e dissipando | 192x128 px | Planejado |
| `memory_record` | Fechado, descoberto e lido | 96x96 px | Planejado |

## Ameaça e action

| Nome | Conteúdo | Tamanho alvo | Status |
|---|---|---:|---|
| `drone` | Drone de manutenção corrompido, side-facing/3-4, com olho-sinal violeta | 128x128 px | Planejado |
| `scan_beam` | Cone mint com borda âmbar de alerta | Procedural | Planejado |
| `pulse_fx` | Pulso Lumen em expansão curta, violeta/mint | Procedural | Planejado |
| `hit_feedback` | Flash curto de contorno e deslocamento mínimo | Procedural | Planejado |
| `dash_trail` | Rastro curto de linhas editoriais | Procedural | Planejado |

O action deve ser lido em menos de um segundo: patrulha é silenciosa, alerta recebe contorno âmbar e pulso de sinal, sobrecarga usa distorção violeta e janela de reação clara. A ameaça nunca deve depender de partículas confusas para indicar colisão.

## Atlas de animação do player

O atlas está **suspenso até a validação final da master v2**. Os arquivos `player-ref-graphic-novel.png`, `player-ref-final.png` e a master v1 são estudos rejeitados por apresentarem uma interpretação incorreta ou exagerada do cabelo e não podem ser usados como base. Quando a produção for retomada, cada frame deverá manter o cabelo original contínuo/modelado, o mesmo centro de base, a altura aparente e a proporção dos óculos.

| Ação | Tipo | Duração alvo | Frames alvo | Observação |
|---|---|---:|---:|---|
| `idle` | Loop | 1.6 s | 6–8 | Respiração toy e pequeno ajuste de postura |
| `walk` | Loop | 0.7 s | 8 | Passos curtos, leitura clara em 3/4 |
| `interact` | One-shot | 0.55 s | 5–6 | Aproxima Lumen do objeto, sem esconder o rosto |
| `use-tool` | One-shot | 0.65 s | 6–8 | Emite pulso ou escaneia, com sinal mint/violeta |
| `dash` | One-shot | 0.35 s | 4–5 | Inclinação simples e rastro procedural |
| `hit` | One-shot | 0.3 s | 3–4 | Reação legível, sem deformar identidade |

Para a primeira slice, quatro conjuntos de direção poderão atender às oito direções de movimento por espelhamento controlado. Não espelhar poses que contenham assimetria importante no Lumen ou em acessórios.

## Atlas do drone

| Ação | Tipo | Duração alvo | Frames alvo |
|---|---|---:|---:|
| `hover` | Loop | 1.2 s | 6 |
| `alert` | Loop | 0.8 s | 5 |
| `overload` | One-shot | 0.45 s | 5 |

## UI e acessibilidade

HUD, diálogo, mapa, inventário, pausa e configurações serão renderizados em React/HTML/CSS para permitir internacionalização e acessibilidade. A arte gerada fica limitada a ícones e retratos pequenos.

| Elemento | Conteúdo | Tamanho alvo | Status |
|---|---|---:|---|
| `signal_icon` | Nó de sinal para HUD e diálogo | 32x32 px | Planejado |
| `lumen_icon` | Lente, Pulso e Âncora, incluindo bloqueado/ativo | 40x40 px | Planejado |
| `dialogue_portraits` | MIRA, PONTO e NIX | 96x96 px | Planejado |
| `module_badges` | Fragmentos e ferramentas | 32–40 px | Planejado |
| `touch_controls` | Direção, ação, ferramenta e dash | 48–56 px | Planejado |
| `focus_ring` | Estado de foco de alta visibilidade | CSS/SVG simples | Planejado |

A interface terá modo de alto contraste, redução de movimento, dica textual para frequências e suporte a teclado. Nenhum ícone gerado deve ser a única forma de comunicar estado; cor, forma ou texto auxiliar também serão usados.

## Fora do escopo da primeira slice

Ficam fora da primeira produção: múltiplos tipos de inimigo, chefes com várias fases, inventário grande, mundo aberto, dublagem, cutscenes longas, modelos 3D completos, dezenas de colecionáveis e variações cosméticas. Esses itens só serão reavaliados depois que o hub, os dois setores e a conclusão estiverem jogáveis e testados.
