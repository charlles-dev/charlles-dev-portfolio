# Núcleo em Órbita
## Game Design Bible — índice mestre

**Versão:** 0.1 — pré-produção de estúdio

**Responsável:** Charlles Augusto / Manus AI

**Status geral:** design reformulado; runtime anterior tratado como protótipo descartável; reconstrução aguardando alinhamento e execução do novo design

## Visão executiva

**Núcleo em Órbita** é um RPG narrativo de exploração toy sci-fi, com aventura, puzzles ambientais e action contextual em tempo real. O jogador explora a estação Orbe-9, um arquivo vivo de histórias interrompidas, e precisa decidir se o núcleo deve restaurar o passado, permitir uma nova interpretação ou manter uma vigília entre versões conflitantes.

A direção visual aprovada é **graphic novel de sinais**: contornos editoriais, blocos de cor, sinais mint/violeta/âmbar, composição 3/4 em diorama e personagens pequenos diante de uma arquitetura maior. A identidade do player está bloqueada até uma referência fiel ao bonequinho 3D canônico da landing page ser aprovada. Nenhum estudo com cabelo em cachos de bolinhas pode ser utilizado.

> **Regra de produção:** não implementar features novas no jogo só porque são tecnicamente fáceis. Cada sistema precisa provar que reforça exploração, interpretação, relação, tensão ou consequência.

## Ordem de leitura

| Ordem | Documento | Função | Status |
|---:|---|---|---|
| 1 | [Visão criativa](./game-studio-vision.md) | Fantasia, pilares, tom, diferenciais e anti-objetivos | Base aprovada |
| 2 | [Bíblia narrativa](./game-narrative-bible.md) | Mundo, premissa, atos, canon, cenas e finais | Nova base narrativa |
| 3 | [Arcos de personagens](./game-character-arcs.md) | Desejos, medos, relações, flags e mudanças jogáveis | Nova base de elenco |
| 4 | [Especificação de sistemas](./game-systems-spec.md) | Loop, ferramentas, puzzles, action, recursos e falha | Nova base sistêmica |
| 5 | [Level design](./game-level-design.md) | Hub, Arquivo, Jardim, Núcleo, rotas e ritmo | Nova base espacial |
| 6 | [UX e direção audiovisual](./game-ux-audio-direction.md) | HUD, diálogos, mapa, memória, acessibilidade e áudio | Nova base de experiência |
| 7 | [Plano de produção](./game-production-plan.md) | Escopo, milestones, assets, riscos, QA e Definition of Done | Plano de execução |
| 8 | [Bible visual](./game-visual-bible.md) | Regras de graphic novel de sinais, identidade, alpha e consistência | Contrato visual |
| 9 | [Briefs de assets](./game-asset-briefs.md) | Especificações de player, NPCs, props, ambientes, VFX e UI | Pipeline de geração |
| 10 | [Roteiro da slice](./game-vertical-slice-script.md) | Triggers, falas, registros, relações e finais | Roteiro de implementação |
| 11 | [Technical design](./game-technical-design.md) | Estado, transições, sistemas, assets, performance e fallback | Contrato de engenharia |
| 12 | [Plano de QA](./game-qa-test-plan.md) | Smoke tests, acessibilidade, action, lifecycle e severidade | Gates de qualidade |
| 13 | [Matriz de localização](./game-localization-matrix.md) | PT-BR, EN, ES, chaves, termos e limites de texto | Preparada |
| 14 | [Decisão de engine](./game-engine-decision.md) | Babylon 2.5D + React/HTML | Decisão técnica |
| 15 | [Validação do blockout anterior](./game-blockout-validation.md) | Registro do protótipo técnico inicial | Histórico; não é alvo visual |
| 16 | [Direções de arte](./game-art-directions.md) | Comparação que levou à direção escolhida | Opção 5 aprovada |

## Estado real do projeto

O repositório possui um blockout técnico Babylon com uma rota localizada e uma cena simples de Hub. Esse trabalho serviu para validar engine, lifecycle, input e bridge de UI. Ele não representa o padrão de qualidade final e não deve ser expandido como se fosse o jogo acabado.

| Elemento | Estado atual | Próxima decisão |
|---|---|---|
| História | Reformulada neste pacote | Roteiro da slice e diálogos |
| Personagens | Conceito e arcos definidos | Brief visual fiel ao avatar canônico |
| Direção de arte | Graphic novel de sinais aprovada | Criar bible visual de produção |
| Player | Proxy geométrico no blockout | Substituir somente após referência aprovada |
| Hub | Blockout funcional e simples | Reconstruir segundo beats e composição do level design |
| Arquivo | Documentado, sem setor final | Graybox com puzzle de frequência |
| Jardim | Documentado, sem setor final | Graybox com ameaça e rota alternativa |
| Núcleo | Documentado, sem setor final | Graybox do puzzle final e finais |
| Puzzles | Regras documentadas, mock anterior | Implementar sistemas isolados |
| Action | Drone mock anterior | Separar ThreatSystem com telegraphing |
| UI | HUD, pausa, mapa e memória de proxy | Reescrever com conteúdo da nova narrativa |
| Documentação de produção | Bible visual, briefs, roteiro, engenharia, QA e localização publicados | Pronta para execução |
| Assets visuais | Master v2 candidata; recortes com halo e sprites de tentativa rejeitados/quarentenados | Retomar geração individual após renovação da cota gratuita |
| Áudio | Direção documentada | Prototipar cues leves depois do graybox |

## Pacote mínimo de aprovação antes de código novo

A reconstrução deve começar somente quando o documento de visão, a bíblia narrativa, a matriz de personagens, o fluxo de níveis e o Definition of Done forem tratados como contrato de trabalho. A referência final do player pode permanecer pendente, desde que o graybox utilize marcadores neutros e não consuma produção de sprites.

## Decisões que não podem ser revertidas sem revisão

A experiência é narrativa e exploratória, não um platformer. A câmera é 3/4 em 2.5D. O action é contextual e não baseado em grind. As ferramentas funcionam como verbos narrativos. Os puzzles devem ser deduzíveis. A estação deve reagir ao jogador. O toy sci-fi pode ter temas maduros. A arte escolhida é graphic novel de sinais. A landing page canônica não deve ser alterada para resolver um problema do jogo.

## Definição de sucesso

O projeto será considerado bem-sucedido quando uma pessoa jogar a slice, entender que os três habitantes defendem respostas diferentes à perda, explorar quatro espaços com regras distintas, resolver puzzles por observação, atravessar riscos com mais de uma estratégia, tomar uma decisão final e perceber visualmente que a estação mudou por causa dela.
