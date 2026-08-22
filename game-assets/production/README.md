# Production Asset Register

## Player master reference

**Arquivo candidato:** `player/player-master-reference-v2.png`

**Estado:** candidato à aprovação visual; ainda não é atlas nem sprite final.

A folha foi corrigida para aproximar o cabelo do bonequinho 3D canônico: volume contínuo, modelado, com grandes seções lisas e conectadas, sem bolinhas separadas, cachos redondos individualizados, espirais ou mechas espetadas. O restante da identidade deve permanecer estável: óculos redondos marrom-escuros, pele morena, rosto, moletom escuro, proporções toy e expressão neutra.

A versão `rejected-player/player-master-reference.png` fica **rejeitada para produção** porque exagerou o cabelo em mechas arredondadas. Os arquivos `rejected-player/sprite-*.png` são tentativas com fundo artificial ou sem validação de alpha. Os arquivos históricos `player-ref.png`, `player-ref-clean.png`, `player-ref-graphic-novel.png`, `player-ref-final.png` e equivalentes também não podem ser importados pelo runtime.

## Gate de aprovação

Antes de gerar o atlas, a referência precisa ser aprovada visualmente contra `public/reference/charlles-toy-canonical.png`. A aprovação deve confirmar, nesta ordem: formato geral do cabelo, posição e cor dos óculos, forma do rosto, tom de pele, moletom, escala corporal, leitura 3/4 e consistência entre as seis poses.

Depois da aprovação, será criada uma sequência controlada de estados individuais — idle, walk, interact, use-tool, dash e hit — usando a folha aprovada como referência. Nenhuma geração de NPC, prop com personagem ou cena narrativa deve introduzir uma variação do cabelo antes desse gate.

## Regra de identidade

A direção graphic novel de sinais pode alterar contorno, paleta, luz, material e acabamento, mas não pode alterar a identidade do personagem. O cabelo não deve ser estilizado em cachos de bolinhas para “combinar” com o toy. O efeito toy vem da modelagem e das proporções; a forma do cabelo continua sendo a do avatar canônico.

## Controle de produção — 22 ago. 2026

A tentativa de gerar o primeiro lote de sprites finais foi interrompida pelo limite diário gratuito antes de concluir o lote. Os arquivos de tentativa foram movidos para `game-assets/production/rejected-player/` e não devem ser promovidos, importados ou tratados como aprovados. O pipeline permanece pronto para continuar após a renovação da cota, começando novamente pela validação da master `player-master-reference-v2.png` e pela geração individual de cada estado com recorte limpo.

Enquanto a geração estiver indisponível, a produção pode avançar sem risco em especificação, graybox, sistemas, documentação, briefs de NPCs, props, ambientes, VFX e testes de integração. Não será usada uma substituição visual improvisada para mascarar a ausência dos sprites finais.
