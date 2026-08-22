# Núcleo em Órbita
## Matriz de localização da vertical slice

**Versão:** 0.1 — preparo para PT-BR, EN e ES

## 1. Objetivo

A narrativa deve nascer internacionalizável. O texto de gameplay não pode ficar gravado em sprites, materiais ou código de renderização. Cada fala, objetivo, fragmento, dica e estado possui uma chave estável e pode ser traduzido sem mudar a lógica do jogo.

O português brasileiro é a língua de criação. Inglês e espanhol serão revisados como textos de jogo, não traduzidos palavra por palavra. A prioridade é preservar intenção, ritmo, subtexto e clareza mecânica.

## 2. Convenção de chaves

| Prefixo | Conteúdo |
|---|---|
| `game.sector.*` | Nome e subtítulo de setor |
| `game.objective.*` | Objetivos do jogador |
| `game.dialogue.*` | Falas e respostas |
| `game.record.*` | Fragmentos e registros |
| `game.hint.*` | Dicas escalonadas |
| `game.ui.*` | HUD, mapa, memória e pausa |
| `game.ending.*` | Títulos e linhas de final |
| `game.accessibility.*` | Descrições e alternativas |

O código consulta chaves, nunca compara a string exibida. Os IDs de cena permanecem em inglês técnico ou em uma nomenclatura neutra, enquanto títulos e falas são localizados.

## 3. Limites de texto

A UI precisa suportar expansão de texto. O objetivo deve preferir uma linha curta e o subtítulo pode ocupar duas. Falas de personagem devem ser divididas em blocos pequenos para leitura e animação. A tradução pode alterar o tamanho, mas não deve exigir um quadro novo para cada idioma.

| Componente | Limite recomendado | Tratamento de excesso |
|---|---:|---|
| Objetivo | 58 caracteres visuais | Quebra em até duas linhas |
| Subtítulo de setor | 72 caracteres | Reduzir tracking antes de diminuir fonte |
| Mensagem contextual | 110 caracteres | Exibir em duas linhas e manter no log |
| Fala de diálogo | 180 caracteres | Dividir em dois nós |
| Nome de personagem | 18 caracteres | Nunca truncar |
| Rótulo de botão | 12 caracteres | Usar ícone + tooltip acessível |
| Título de final | 28 caracteres | Ajustar largura do modal |

## 4. Guia de tom

O português usa frases concretas, melancolia sem melodrama e humor discreto. O inglês deve evitar soar como technobabble militar. O espanhol deve preservar a clareza de ação e a cadência das pausas. Nomes próprios — Orbe-9, MIRA, PONTO, NIX e Lumen — não são traduzidos.

| Personagem | Voz em todos os idiomas |
|---|---|
| Charlles | Observador, direto e curioso |
| MIRA | Técnica, cuidadosa e controladora |
| PONTO | Associativo, sensível e incompleto |
| NIX | Condicional, preciso e vigilante |
| Núcleo | Neutro no começo, capaz de escolha no final |

## 5. Termos canônicos

| PT-BR | EN | ES | Nota |
|---|---|---|---|
| Doca / Hub | Dock / Hub | Muelle / Hub | “Hub” preserva a função de espaço-base |
| Arquivo de Sinais | Signal Archive | Archivo de Señales | Não usar “data vault” |
| Jardim Orbital | Orbital Garden | Jardín Orbital | Preservar contraste entre vida e máquina |
| Núcleo de Memória | Memory Core | Núcleo de Memoria | Termo do clímax |
| Lente | Lens | Lente | Ferramenta de revelar |
| Pulso | Pulse | Pulso | Ferramenta de responder |
| Âncora | Anchor | Ancla | Ferramenta de testar |
| A Quietude | The Quiet | La Quietud | Evento histórico, capitalizado |
| Caixa sem origem | Unowned Box | Caja sin origen | Não transformar em item de loot |
| Pacto de Vigília | Vigil Pact | Pacto de Vigilia | Final de equilíbrio |

## 6. Revisão de conteúdo

A revisão deve acontecer em três passagens. A primeira verifica sentido mecânico: o verbo traduzido ainda indica a ação correta? A segunda verifica voz: cada personagem ainda pode ser reconhecido sem nome? A terceira verifica layout: nenhum objetivo, botão, fala ou final foi cortado em viewport estreito.

Nenhuma tradução deve alterar uma flag, um nome de ID, uma condição ou a ordem de um puzzle. Se uma frase ficar grande demais, a solução é reescrever a frase localizada, não diminuir a fonte até prejudicar legibilidade.

## 7. Conteúdo obrigatório de cada idioma

| Categoria | PT-BR | EN | ES |
|---|---|---|---|
| Setores | 4 | 4 | 4 |
| Objetivos críticos | 8 | 8 | 8 |
| Falas principais | 30–45 | 30–45 | 30–45 |
| Fragmentos | 5 | 5 | 5 |
| Dicas | 6–9 | 6–9 | 6–9 |
| UI/HUD | Completa | Completa | Completa |
| Acessibilidade | Completa | Completa | Completa |
| Finais | 3 | 3 | 3 |

## 8. Critérios de aceite de localização

Um idioma está pronto quando a rota crítica pode ser concluída sem consultar o português, os nomes próprios permanecem consistentes, objetivos usam verbos inequívocos, diálogos preservam os conflitos de MIRA/PONTO/NIX, a memória não perde perguntas, e a UI suporta a expansão de texto sem corte ou sobreposição.
