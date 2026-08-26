# Plano de evolução visual e de experiência

## Objetivo

Transformar o portfólio em uma narrativa coerente sobre Charlles como engenheiro de software full stack. Os assets do personagem devem explicar, orientar, reagir ou comprovar alguma coisa. Eles não serão usados como decoração ou como uma galeria de imagens geradas.

O visitante principal é um recrutador, cliente ou possível colaborador. Em poucos segundos, ele precisa entender:

1. Quem é Charlles e o que ele constrói.
2. Quais trabalhos públicos comprovam isso.
3. Como experiência, educação, certificações e stack se conectam.
4. Como iniciar uma conversa.

### O que não será construído

- Um dashboard sobre a vida do autor.
- Uma página para cada assunto pequeno.
- Uma coleção de cards, badges, glows e animações concorrentes.
- Um sticker diferente para cada repositório.
- Uma vitrine que tenta utilizar todo arquivo só porque ele existe.

## Diagnóstico atual

### O que já funciona

- O hero tem uma assinatura clara e apresenta o personagem como elemento central.
- O explorador mostra apenas repositórios públicos e oferece categorias úteis.
- A nova sequência de experiência, educação, certificações e stack tem conteúdo real e boa presença editorial.
- WhatsApp, Cal.com, e-mail e Discord estão disponíveis.
- A base multilíngue, responsiva e acessível já existe.

### O que ainda fragmenta a experiência

- Sobre e Contato aparecem como janelas de produto, enquanto deveriam concluir a narrativa do portfólio no próprio fluxo. A solução planejada é conteúdo inline antes de modal (`rule/inline-before-modal`).
- Now, Process e Notas de engenharia continuam como rotas isoladas, embora o conteúdo pertença aos projetos ou à narrativa principal. Preservaremos links antigos com redirecionamentos (`rule/preserve-mental-model`).
- O contato usa sprites antigos e esconde os personagens que deveriam ser o centro das duas ações.
- A página 404 ainda usa o avatar antigo, apesar de existir uma cena e um vídeo feitos especificamente para procurar uma rota.
- O explorador de trabalhos tem o happy path bem resolvido, mas seus estados de carregamento, erro e busca vazia ainda não utilizam a linguagem visual criada (`rule/cover-reachable-states`).
- A numeração 01–04 em experiência, educação, certificações e stack sugere uma sequência que não existe. É um recurso editorial genérico e deve ser substituído por rótulos com significado.
- Há excesso de texto de leitura abaixo de 16 px em áreas como projetos, contato e páginas editoriais. Isso será normalizado; textos pequenos ficarão restritos a legenda, dado e rótulo (`size-body-text`).
- A tipografia ainda usa muitos valores pontuais. Será consolidada em um sistema de tokens (`hierarchy-consistent-system`).

## Direção visual

### Ideia central

**O personagem interage fisicamente com o software.**

Ele conecta módulos, encontra bugs, organiza conhecimento, fixa uma credencial, ilumina uma rota e aparece junto das ações de contato. Essa relação entre personagem e conteúdo será a assinatura do portfólio, não o uso isolado de verde, gradiente ou cards arredondados.

### Regras anti-AI-slop

1. Cada asset precisa ter uma frase que explique sua função. Se a frase for apenas “deixa mais bonito”, ele não entra.
2. Uma cena protagonista por viewport. Outras imagens permanecem estáticas ou fora da tela.
3. Movimento somente para orientação, feedback, continuidade ou um momento raro de personalidade.
4. Nenhuma imagem diferente por repositório. Projetos são diferenciados por conteúdo, linguagem, categoria e evidência.
5. Cards só para objetos realmente interativos. Conteúdo editorial usa hierarquia, espaço e divisores (`rule/structure-before-containers`).
6. Pills ficam restritas a filtros, estados e metadados compactos. Tech stack em texto corrido usa barras ou listas.
7. Nada de números 01, 02, 03 quando a ordem não carregar significado.
8. Copy deve citar trabalho, tecnologia ou comportamento verdadeiro. Humor aparece em uma linha por seção, não em toda frase.
9. O personagem mantém o mesmo rosto, cabelo, óculos, roupa, escala e material entre cenas.
10. Model sheets e folhas de expressão são referência de produção, não conteúdo de tela.

## Arquitetura proposta

### Landing page

Ordem planejada:

1. **Hero cinematográfico:** manter a tese atual e revisar apenas compressão, enquadramento e transição final.
2. **Trabalhos selecionados inline:** três projetos com evidência curta. “Ver todos os repositórios” abre o explorador completo.
3. **Sobre inline:** apresentação humana curta, integrada à página, usando a cena do mapa de aprendizado. O item de navegação vira link para `#about` (`rule/navigation-vs-action`).
4. **Experiência, educação, certificações e stack:** manter a base atual, remover numeração artificial, reduzir tags em pills e revisar ritmo.
5. **Contato como encerramento:** um grande bloco final com WhatsApp como ação primária, Cal.com como secundária e e-mail/Discord como canais terciários (`rule/one-primary-action`).
6. **Footer mínimo:** disponibilidade, GitHub, LinkedIn e informação técnica curta.

### Trabalhos

- Manter somente repositórios públicos.
- Manter filtros visíveis: Todos, Web, Automação, Infraestrutura, Base técnica e Experimentos.
- Destacar três casos editoriais antes da lista completa: charlles.dev, Astrolink e Trakr.
- Usar o personagem montando blocos apenas na abertura do explorador ou na introdução dos casos.
- Usar o personagem inspecionando um bug nos estados de erro e busca sem resultado.
- Estado de carregamento informa o objeto: “Buscando repositórios públicos…”; erro oferece tentar novamente; busca vazia oferece limpar filtros (`rule/loading-state-specific`, `rule/error-states-recovery`, `rule/empty-state-action`).
- O explorador completo pode continuar como sheet focado. Conteúdo Sobre e Contato não precisam de modal.

### Sobre

- Deixar de ser um profile card modal.
- Virar uma seção curta da landing, com uma afirmação, dois parágrafos e links sociais discretos.
- Experiência formal não será inventada. Projetos públicos continuam sendo a prova.
- A cena “organizando mapa de aprendizado” conecta curiosidade, formação e prática sem repetir a cidade ou idiomas.

### Contato

- Substituir o modal atual por uma seção final inspirada no peso visual do Davi AXS, mas com composição própria.
- Dois territórios de ação:
  - **WhatsApp, primário:** personagem associado à microinteração do WhatsApp.
  - **Agendar uma call, secundário:** personagem na mesa, acenando ou ajustando a luz.
- E-mail e Discord permanecem como ícones menores. O e-mail usa `mailto:` contextualizado.
- Em desktop, o personagem reage em hover e foco. Em touch, a pose principal já comunica a ação.
- As imagens com checkerboard incorporado não serão publicadas assim. Precisam virar recortes limpos com transparência real, bordas revisadas e enquadramento consistente.
- O vídeo só carrega quando o bloco está próximo e só toca durante hover, foco ou visibilidade. Movimento reduzido mantém o pôster.

### Página 404

- Trocar o avatar antigo pela imagem do personagem com lanterna.
- Usar o vídeo da lanterna como um único momento de busca; o feixe deve apontar para as rotas de recuperação.
- Reduzir o cenário construído em CSS para não competir com o asset.
- A ação principal volta ao início. Trabalhos e contato ficam como caminhos secundários (`rule/one-primary-action`).
- Movimento reduzido usa a imagem estática.

### Erro da aplicação

- Usar o personagem inspecionando um pequeno bug como apoio ao erro recuperável.
- Manter a mensagem objetiva: o que falhou e como tentar novamente.
- Não usar o mesmo tratamento da 404: rota ausente e falha de execução são problemas diferentes.

### Now, Process e Notas de engenharia

- Remover essas rotas da arquitetura pública e do sitemap.
- Redirecionar URLs antigas para destinos coerentes na landing.
- Reaproveitar apenas o conteúdo útil:
  - Now vira uma linha curta “construindo agora” perto dos trabalhos, se houver informação realmente atual.
  - Process vira parte da explicação de um case, não uma página institucional.
  - Notas de engenharia viram decisões dentro de projetos ou são removidas.
- Não criar novos controles ou rotas para preservar conteúdo sem função (`rule/smallest-intervention`).

### Compartilhamento e metadados

- Editar a imagem social gerada para um recorte 1200 × 630 com área segura.
- Não inserir texto pequeno dentro da imagem.
- Atualizar Open Graph, Twitter card e dados estruturados para a nova imagem.
- Validar PT, EN e ES sem produzir três composições visuais inconsistentes.

## Mapa dos assets

### Entram na experiência

| Asset | Função planejada | Tratamento |
|---|---|---|
| Boy connecting cable at workstation | Experiência prática | Já usado como imagem estática |
| Charlles studying system diagram | Educação | Já usado como pôster |
| Charlles turns book page | Educação | Loop sob demanda |
| Character pinning green badge | Certificações | Pôster |
| Man pinning green badge | Certificações | Loop sob demanda |
| Person connecting software modules | Tech stack | Pôster |
| Modular blocks slide into alignment | Tech stack | Loop sob demanda |
| Man organizing learning map nodes | Sobre inline | Imagem editorial |
| Boy assembles blocks / modular system | Introdução dos trabalhos | Escolher apenas uma composição |
| Character inspects tiny software bug | Erro e busca vazia | Imagem de estado |
| WhatsApp contact microinteraction | Ação de WhatsApp | Vídeo em hover/foco |
| Character waving at desk | Ação de call | Vídeo em hover/foco |
| Man adjusting desk light | Pôster da call | Recorte e correção de fundo |
| Character sliding note into envelope | Ação de e-mail | Imagem estática pequena |
| Boy holding flashlight | 404 | Pôster principal |
| Man redirecting flashlight | 404 | Vídeo sob demanda |
| Creating social sharing image | Open Graph | Recorte e tratamento final |

### São candidatos, não obrigação

| Asset | Critério para entrar |
|---|---|
| Character opens eyes | Somente se melhorar a transição atual do hero |
| Character maintains awake idle | Somente se for visualmente contínuo com o hero atual |
| Character breathing idle | Somente se substituir, e não duplicar, o idle existente |
| 2D editorial stickers | No máximo um ou dois recortes limpos como marginalia; nunca por repositório |
| 3D contact sprite waving | Somente após remover o checkerboard real e conferir consistência |

### Permanecem como referência de identidade

- 3D modeling sheet.
- Turnaround reference e turnaround sheet.
- Facial expression sheet.
- Frames salvos duplicados.
- Vídeo bruto de awakening quando uma versão otimizada já cumprir a mesma função.

Esses arquivos ajudam a manter o personagem consistente em futuras gerações. Publicá-los não melhora a jornada do visitante.

## Sistema visual e tipográfico

- Manter Space Grotesk e JetBrains Mono locais. Não há motivo para voltar ao Google Fonts.
- Criar tokens para display, título de seção, subtítulo, corpo, legenda e dado técnico.
- Corpo de leitura: mínimo de 16 px. Tamanhos menores ficam restritos a metadados e legendas (`size-body-text`).
- Limitar parágrafos a aproximadamente 45–70 caracteres por linha (`size-line-length`).
- Manter grandes títulos, mas testar quebra e contexto em 320, 390, 768, 1280 e 1440 px (`size-responsive`).
- O verde continua como sinal de ação, estado e conexão. Ele não deve pintar toda informação importante.
- A paleta quente e escura permanece, mas a especificidade virá das cenas do personagem interagindo com o conteúdo, não de gradientes genéricos.

## Regras de movimento

- Nunca mais de um vídeo narrativo tocando visivelmente ao mesmo tempo.
- Hero pode ter movimento ambiente. Seções internas usam movimento apenas quando entram em foco.
- Contato reage a hover, foco e touch de forma equivalente.
- Loops fora da viewport são pausados.
- `prefers-reduced-motion` remove autoplay e mantém pôsteres.
- Nada de animação de entrada em todas as seções.
- A Intro deve acontecer apenas quando agregar valor; não deve reaparecer em 404, erro ou navegação interna.

## Fases de implementação

### Fase 1 — Preparar os assets

- Criar nomes canônicos e separar `reference/`, `production/` e `source/`.
- Limpar checkerboards, fundos e bordas dos assets de contato.
- Gerar pôsteres consistentes.
- Produzir WebM e MP4 otimizados, com dimensões adequadas ao uso.
- Registrar um pequeno guia do personagem.

**Aceite:** nenhum arquivo de produção tem checkerboard incorporado, personagem inconsistente ou tamanho desnecessário.

### Fase 2 — Corrigir a arquitetura da landing

- Adicionar trabalhos selecionados e Sobre inline.
- Transformar navegação de Sobre e Contato em âncoras.
- Remover numeração artificial e revisar pills da jornada.
- Construir o contato final com as duas cenas.

**Aceite:** o visitante entende atuação, evidência e contato sem abrir um modal.

### Fase 3 — Trabalhos e seus estados

- Refinar casos selecionados.
- Integrar assets de blocos e bug somente onde carregamento, vazio ou erro pedirem.
- Validar filtros, busca, dados antigos e fallback local (`rule/cover-reachable-states`).

**Aceite:** todos os estados possuem contexto e recuperação; nenhum repo recebe decoração arbitrária.

### Fase 4 — 404, erro e compartilhamento

- Implementar lanterna na 404.
- Implementar bug no erro recuperável.
- Atualizar imagem social e metadados.

**Aceite:** cada página excepcional tem identidade própria e próximo passo claro.

### Fase 5 — Consolidar rotas

- Remover Now, Process e Notas de engenharia do sitemap.
- Criar redirecionamentos localizados.
- Reaproveitar apenas conteúdo que fortaleça cases existentes.

**Aceite:** não há página com aparência de documentação de produto sem uma tarefa real de portfólio.

### Fase 6 — Auditoria final

- Desktop e mobile em três idiomas.
- Teclado, foco, leitor de tela e contraste.
- Movimento reduzido e dispositivos touch.
- Falha de rede, zero resultados, dados escassos e textos longos.
- Core Web Vitals e orçamento de mídia.
- Revisão de copy para remover generalidades e humor em excesso.

**Aceite:** lint, tipos, testes, build, console e revisão visual passam sem regressão.

## Ordem recomendada

1. Assets de contato e 404.
2. Arquitetura da landing e contato inline.
3. Trabalhos e estados de dados.
4. 404, erro e Open Graph.
5. Remoção e redirecionamento das rotas sem função.
6. Auditoria tipográfica, responsiva, acessível e de performance.

Essa ordem entrega primeiro as lacunas mais visíveis sem reabrir o hero, que já é a parte mais resolvida da experiência.
