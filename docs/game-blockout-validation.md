# Validação do blockout — Núcleo em Órbita

## Estado verificado

A rota de produção `/pt-BR/game` foi capturada localmente após o loading inicial. O build Next carregou os chunks Babylon corretamente em `next start` e o canvas renderizou uma cena 3/4 com câmera ortográfica. A captura confirmou o hub em perspectiva de diorama, o piso com linhas de sinal, partículas/estrelas, terminal da MIRA, três nós violeta, portal de memória e drone sentinela.

O HUD React recebeu o snapshot do mundo: o objetivo aparece como “Reative os três nós de sinal”, a energia inicia em 100/100, o status do setor aparece estável e a mensagem inicial informa que a doca reconheceu uma assinatura Lumen. Isso comprova a ponte `GameStateStore` → `GameShell` → `GameUi` no build de produção. A UI também inclui pausa funcional por `Escape`, painel de mapa com três destinos e painel de memória com progresso dos sinais, todos fora do canvas e preparados para foco/teclado.

O player visível na captura é intencionalmente um **marcador geométrico de blockout**, composto sem cabelo, rosto ou sprites finais. Ele não representa o personagem oficial e não deve ser confundido com uma aprovação de identidade. O player final permanece bloqueado até existir uma referência fiel ao bonequinho 3D canônico da landing page.

## Verificações automatizadas

| Verificação | Resultado |
|---|---|
| `./node_modules/.bin/vitest run` | 61 testes passando em 11 arquivos |
| `./node_modules/.bin/tsc --noEmit` | Passou |
| `./node_modules/.bin/next build` | Passou |
| Pause por `Escape` | Implementada no `InputManager` e `GameWorld` |
| Painéis Mapa/Memória | Implementados em React/HTML |
| Rotas geradas | `/pt-BR/game`, `/en/game`, `/es/game` |
| Captura HTML local | HTTP 200 e shell presente |
| Captura Babylon em produção | Canvas e hub renderizados |
| Navegador conectado | Extensão expirou ao abrir localhost; validação foi feita com Chromium headless local |

## Próximo trabalho seguro

A próxima etapa pode evoluir o blockout sem gerar personagem: criar os setores Arquivo/Jardim e Núcleo como variações de layout, adicionar um `PuzzleSystem` separado para roteamento/frequência/memória, criar checkpoints e separar o `ThreatSystem` do `GameWorld`. A produção de sprites, NPCs e atlas continua bloqueada pela regra de identidade visual.
