# Roadmap amplo de melhorias para a landing page

**Projeto:** Charlles.dev  
**Escopo:** landing page profissional multilíngue para portfólio de desenvolvimento de software  
**Idiomas atuais:** PT-BR, EN e ES  
**Estado de referência:** hero com vídeo sincronizado ao scroll, avatar toy, navegação compacta, rail social, dialogs de Trabalhos/Sobre/Contato, carregamento inicial, SEO básico e layout responsivo.

> Este documento é um **backlog estratégico**, não uma autorização para implementar tudo simultaneamente. A recomendação é executar por ondas, medir o resultado de cada uma e evitar que a landing acumule efeitos, informações ou features que enfraqueçam a clareza da apresentação.

## 1. Princípios para decidir o que entra

A landing deve continuar sendo uma experiência de apresentação, não um painel administrativo nem uma demonstração de todas as tecnologias utilizadas. Cada feature deve responder a pelo menos uma destas perguntas: ela ajuda alguém a entender rapidamente quem é Charlles, aumenta a confiança profissional, torna o contato mais simples ou evidencia qualidade técnica sem poluir a interface?

A direção visual atual — fundo escuro, avatar toy, tipografia editorial, verde como sinal de ação e painéis sobrepostos — deve continuar reconhecível. Novas interações devem preservar o percurso principal: **ver o hero → entender o posicionamento → examinar trabalhos → conhecer o perfil → entrar em contato**.

### Sistema de avaliação

| Critério | Escala | Interpretação |
|---|---:|---|
| Impacto | 1–5 | Potencial de melhorar compreensão, confiança, conversão ou descoberta orgânica. |
| Esforço | S/M/L/XL | Complexidade de design, implementação, conteúdo, integração e QA. |
| Prioridade | P0–P3 | P0 é fundação; P1 é alto valor; P2 é enriquecimento; P3 é experimental. |
| Risco | Baixo/Médio/Alto | Chance de prejudicar performance, clareza, acessibilidade ou manutenção. |
| Dependência | — | Trabalho prévio necessário para implementar a ideia com segurança. |

## 2. Resumo executivo de prioridades

A primeira onda deveria fortalecer a conversão e a estabilidade: CTA de contato mais explícito, links reais nos projetos, dialogs com semântica completa, fallback de vídeo, performance do hero e revisão de copy. A segunda onda deveria transformar os trabalhos em casos mais convincentes, com problema, decisão, resultado e stack apresentados de forma escaneável. A terceira onda pode adicionar diferenciais interativos, como laboratório técnico, disponibilidade contextual, timeline de processo ou visualizador de arquitetura.

| Onda | Objetivo | Entregas principais | Prazo relativo |
|---|---|---|---|
| Onda 0 | Fundação e correção | inventário, conteúdo, links, acessibilidade, performance e métricas básicas | imediata |
| Onda 1 | Conversão | CTA, trabalhos com evidência, contato mais direto, prova social e estados de sucesso | curto prazo |
| Onda 2 | Autoridade | casos detalhados, processo de trabalho, stack verificável, artigos e dados de projetos | médio prazo |
| Onda 3 | Diferenciação | laboratório, playgrounds, timeline interativa, visualizações e personalização cuidadosa | médio/longo prazo |
| Onda 4 | Experimentação | recursos com IA, modo recrutador, exportação de currículo e experiências alternativas | somente após validação |

## 3. Fundação técnica e higiene do projeto

Estas melhorias reduzem risco de manutenção e criam uma base para qualquer feature posterior. Elas não precisam aparecer diretamente para o visitante, mas influenciam estabilidade, velocidade de publicação e capacidade de evoluir a landing sem regressões.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| F-01 | Pin completo de dependências de produção, não apenas TypeScript e ESLint, para evitar mudanças silenciosas com `latest`. | 5 | S | P0 | nenhuma |
| F-02 | Adicionar uma matriz de compatibilidade de Node, pnpm e navegador no README técnico. | 3 | S | P1 | F-01 |
| F-03 | Separar componentes de apresentação, dados de conteúdo e integrações externas em contratos explícitos. | 4 | M | P1 | inventário de imports |
| F-04 | Criar um comando único de quality gate executando type-check, lint, testes, build e verificação de rotas. | 5 | S | P0 | F-01 |
| F-05 | Criar teste que garanta que cada locale possui as mesmas chaves de conteúdo. | 5 | S | P0 | contrato i18n |
| F-06 | Criar teste que verifique a existência de todos os assets referenciados no build. | 4 | M | P1 | inventário de assets |
| F-07 | Validar o HTML gerado das três rotas com uma checagem de links quebrados e atributos essenciais. | 4 | M | P1 | F-04 |
| F-08 | Criar uma convenção de nomes para commits, mudanças de copy, assets, conteúdo e refactors. | 2 | S | P2 | nenhuma |
| F-09 | Adicionar um changelog curto para alterações visíveis ao visitante. | 2 | S | P2 | nenhuma |
| F-10 | Criar uma página de status técnico privada ou um relatório local de checks, sem expor dados de desenvolvimento. | 2 | M | P3 | F-04 |

## 4. Navegação e arquitetura de informação

A navegação atual é deliberadamente minimalista. O objetivo não é acrescentar um menu grande, mas fazer com que cada ação tenha intenção clara, URL ou estado previsível e comportamento consistente entre desktop, mobile, teclado e leitor de tela.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| N-01 | Tornar a marca no topo um link explícito para o início da rota atual. | 3 | S | P1 | nenhuma |
| N-02 | Adicionar indicador visual persistente de qual painel está aberto. | 4 | S | P1 | estado central de painel |
| N-03 | Permitir fechar painéis com clique no overlay, sem fechar quando o clique ocorre dentro do conteúdo. | 4 | S | P1 | testes de dialog |
| N-04 | Adicionar `aria-labelledby`, `aria-modal`, `role="dialog"` e botão de fechamento nomeado em todos os dialogs. | 5 | S | P0 | F-04 |
| N-05 | Aplicar `inert` ou equivalente ao conteúdo atrás de dialogs, evitando interação acidental. | 5 | M | P0 | N-04 |
| N-06 | Preservar o hash ou query string que representa o painel aberto, permitindo link direto para Trabalhos, Sobre ou Contato. | 5 | M | P1 | arquitetura de estado |
| N-07 | Permitir voltar/avançar no histórico do navegador entre painel aberto e fechado. | 4 | M | P1 | N-06 |
| N-08 | Criar um estado de navegação mobile que mostre claramente menu aberto, foco atual e ação de fechamento. | 5 | S | P0 | já há menu mobile |
| N-09 | Implementar navegação por setas dentro das tabs de Trabalhos quando isso fizer sentido sem conflitar com rolagem horizontal. | 3 | M | P2 | tabs acessíveis |
| N-10 | Adicionar uma ação “Voltar ao topo” no final de painéis longos. | 3 | S | P2 | conteúdo longo |
| N-11 | Manter o scroll interno do painel ao trocar de tab apenas quando isso não esconder o título da nova seção. | 3 | M | P2 | N-09 |
| N-12 | Adicionar uma pequena barra de progresso contextual em painéis muito extensos. | 2 | M | P3 | conteúdo final |
| N-13 | Criar um modo de navegação linear para recrutadores: Sobre → Trabalhos → Contato. | 4 | M | P2 | N-06 |
| N-14 | Oferecer links discretos para abrir o conteúdo em nova URL quando o usuário quiser compartilhar uma seção específica. | 4 | M | P2 | N-06 |
| N-15 | Evitar qualquer ação visual que pareça botão se ela não tiver comportamento acionável. | 5 | S | P0 | inventário de UI |

## 5. Hero, vídeo e comportamento de scroll

O hero é o elemento de maior impacto da landing e também o principal risco de performance. O princípio recomendado é que o vídeo enriqueça a apresentação, mas nunca seja a única forma de compreender o conteúdo. Em termos técnicos, `<video>` deve ter fallback, poster, dimensões previsíveis e estratégia de carregamento consciente; `preload` é uma dica ao navegador, não uma garantia de download ou reprodução [1] [2].

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| H-01 | Produzir um poster final cuidadosamente enquadrado para desktop e outro para mobile, evitando recorte excessivo do avatar. | 5 | M | P0 | asset final aprovado |
| H-02 | Definir `width` e `height` ou proporção estável no wrapper para eliminar qualquer layout shift. | 5 | S | P0 | H-01 |
| H-03 | Implementar fallback visual quando o vídeo falhar, demorar ou não tiver codec compatível. | 5 | M | P0 | H-01 |
| H-04 | Exibir um estado de carregamento honesto, sem escurecer o conteúdo por tempo indefinido. | 4 | M | P1 | telemetria de loading |
| H-05 | Exibir o hero estático para `prefers-reduced-motion`, conexão lenta ou dispositivo de baixo desempenho. | 5 | M | P0 | H-01 |
| H-06 | Permitir que o usuário pause a animação do hero sem introduzir controles visuais permanentes. | 4 | M | P1 | copy e design de controle |
| H-07 | Criar um controle acessível de “reduzir movimento” persistido apenas durante a sessão ou em preferência local. | 4 | M | P1 | H-05 |
| H-08 | Carregar o loop final somente quando a posição de scroll estiver próxima da transição. | 4 | M | P1 | estratégia de preload |
| H-09 | Evitar múltiplas decodificações simultâneas de vídeos grandes em dispositivos móveis. | 5 | M | P0 | H-08 |
| H-10 | Adicionar tratamento para `stalled`, `waiting`, `error`, `loadeddata` e `visibilitychange`. | 5 | M | P0 | H-03 |
| H-11 | Garantir que o retorno à aba não reinicie o vídeo de forma abrupta nem deixe frame congelado. | 4 | M | P1 | H-10 |
| H-12 | Ajustar o intervalo de scrub para não exigir atualizações de estado React a cada pixel de scroll. | 5 | M | P0 | profiling |
| H-13 | Usar `requestAnimationFrame` e cancelamento correto para sincronizar scroll e vídeo. | 5 | M | P0 | H-12 |
| H-14 | Respeitar `scroll-behavior` e reduzir transições em ambientes com movimento reduzido. | 4 | S | P0 | H-05 |
| H-15 | Definir pontos de loop visual com entrada e saída compatíveis, sem corte perceptível. | 5 | M | P1 | vídeo aprovado |
| H-16 | Acrescentar uma transcrição visual/descrição curta do que acontece no hero para tecnologias assistivas. | 4 | M | P1 | copy localizada |
| H-17 | Criar uma versão sem vídeo para impressão, exportação, crawler e pré-visualização social. | 4 | S | P1 | H-01 |
| H-18 | Exibir um hint de scroll somente enquanto houver conteúdo abaixo e removê-lo depois da primeira interação. | 3 | S | P2 | estado de scroll |
| H-19 | Criar uma entrada alternativa para usuários sem JavaScript, contendo título, apresentação e contato. | 4 | M | P1 | renderização server-side |
| H-20 | Testar o hero em 320px, 375px, 390px, 768px, 1024px, 1440px e telas ultrawide. | 5 | M | P0 | H-01 |

## 6. Conteúdo e posicionamento profissional

A copy atual já se afastou de uma linguagem genérica de produto. A próxima evolução deve comunicar com mais precisão o tipo de problema que Charlles resolve, o contexto em que trabalha e o que o visitante deve fazer em seguida. Uma boa regra é substituir adjetivos abstratos por evidências concretas.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| C-01 | Criar uma frase de posicionamento específica para interface, sistemas e automação. | 5 | S | P0 | revisão editorial |
| C-02 | Testar duas versões de headline: uma orientada a produto e outra orientada a engenharia. | 4 | S | P1 | C-01 |
| C-03 | Resumir a descrição do hero em uma promessa clara e uma evidência de método. | 5 | S | P0 | C-01 |
| C-04 | Substituir “Conheça meu trabalho” por CTA contextual quando o visitante já estiver em um painel. | 3 | S | P2 | N-02 |
| C-05 | Criar uma microbio curta, média e longa para hero, Sobre e SEO. | 4 | M | P1 | C-01 |
| C-06 | Incluir localização apenas quando ela ajudar a criar confiança ou contexto profissional. | 3 | S | P2 | revisão de posicionamento |
| C-07 | Explicitar disponibilidade sem usar linguagem genérica ou promessas desnecessárias. | 4 | S | P1 | informação real do usuário |
| C-08 | Criar uma seção “Como posso ajudar” com três formatos: construir, melhorar e automatizar. | 5 | M | P1 | C-01 |
| C-09 | Mostrar o tamanho de projeto ou perfil de parceria preferido, quando houver dados reais. | 4 | S | P1 | informação real do usuário |
| C-10 | Adicionar uma microfrase de método: entender, estruturar, construir, validar. | 4 | S | P1 | C-08 |
| C-11 | Diferenciar claramente projeto autoral, trabalho profissional, experimento e repositório. | 5 | M | P1 | dados de projetos |
| C-12 | Criar copy de estado vazio e erro para API de repositórios em todos os idiomas. | 4 | S | P0 | contrato i18n |
| C-13 | Revisar comprimento de headings para evitar que EN ou ES criem quebras visualmente ruins. | 5 | M | P0 | conteúdo localizado |
| C-14 | Criar glossário de termos técnicos traduzíveis e termos que devem permanecer em inglês. | 3 | M | P2 | C-13 |
| C-15 | Incluir uma mensagem de privacidade e transparência ao usar analytics ou formulário. | 3 | S | P1 | analytics escolhido |
| C-16 | Adicionar um pequeno texto editorial sobre o que significa “construir com intenção”. | 3 | M | P2 | direção de marca |
| C-17 | Criar uma página ou seção de notas técnicas sem tirar o foco da landing. | 4 | L | P2 | arquitetura de conteúdo |
| C-18 | Adicionar data de atualização apenas a conteúdos que realmente tenham manutenção periódica. | 2 | S | P3 | processo editorial |

## 7. Trabalhos, cases e prova técnica

A seção de Trabalhos é a maior oportunidade de transformar o portfólio de uma vitrine bonita em evidência profissional. Cada projeto deve responder rapidamente: qual era o problema, qual foi a contribuição de Charlles, quais decisões foram tomadas, qual resultado foi obtido e onde alguém pode verificar o trabalho.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| W-01 | Tornar cada projeto um case com estrutura fixa: contexto, contribuição, decisões, resultado e links. | 5 | M | P0 | conteúdo dos projetos |
| W-02 | Adicionar links reais para demo, repositório, estudo ou documentação quando existirem. | 5 | S | P0 | URLs aprovadas |
| W-03 | Remover cards que não tenham conteúdo suficiente para sustentar uma narrativa profissional. | 4 | S | P1 | inventário de projetos |
| W-04 | Ordenar projetos por relevância profissional, não apenas por recência. | 5 | S | P1 | curadoria |
| W-05 | Exibir stack como evidência, sem transformar o case em lista de buzzwords. | 4 | S | P1 | W-01 |
| W-06 | Adicionar o papel exercido em cada projeto: solo, front-end, integração, automação, arquitetura etc. | 5 | S | P1 | dados reais |
| W-07 | Adicionar status do projeto: lançado, em evolução, experimento ou arquivado. | 3 | S | P2 | dados reais |
| W-08 | Exibir uma métrica de resultado somente quando for verificável. | 5 | M | P1 | dados reais |
| W-09 | Criar uma visualização de “antes → decisão → depois” para projetos de interface. | 4 | M | P2 | assets de projeto |
| W-10 | Criar uma visualização de fluxo para automações e integrações. | 4 | M | P2 | dados técnicos |
| W-11 | Adicionar tags filtráveis por categoria, stack e tipo de contribuição. | 4 | M | P2 | W-01 |
| W-12 | Permitir abrir um case completo sem perder o contexto do painel principal. | 4 | M | P2 | deep-link |
| W-13 | Criar um “case em 30 segundos” com resumo visual para recrutadores. | 5 | M | P1 | W-01 |
| W-14 | Adicionar um modo expandido com decisões técnicas e limitações assumidas. | 4 | M | P2 | W-01 |
| W-15 | Mostrar repositórios públicos relacionados quando a API estiver disponível. | 4 | M | P1 | integração GitHub |
| W-16 | Exibir data do último update do repositório com formato localizado. | 3 | S | P1 | W-15 |
| W-17 | Melhorar fallback quando a API do GitHub estiver indisponível, mantendo os cases estáticos. | 5 | M | P0 | W-15 |
| W-18 | Adicionar botão de copiar URL do case com feedback acessível. | 3 | S | P2 | W-12 |
| W-19 | Criar imagem social específica para cada case quando compartilhado. | 3 | M | P2 | metadata dinâmica |
| W-20 | Adicionar um bloco “o que eu faria a seguir” em projetos incompletos. | 3 | S | P2 | C-11 |
| W-21 | Permitir que o visitante abra o repositório sem que links de demo quebrados bloqueiem o restante do case. | 4 | S | P1 | W-02 |
| W-22 | Criar um pequeno índice no topo do case para conteúdos longos. | 3 | S | P2 | W-12 |
| W-23 | Adicionar estados de carregamento com skeleton estável para dados remotos. | 4 | M | P1 | W-15 |
| W-24 | Criar marcação estruturada para projetos, quando houver dados suficientes e sem exagerar no schema. | 3 | M | P2 | SEO estruturado |

## 8. Sobre, contato e conversão

O visitante não deveria precisar descobrir como entrar em contato. O objetivo é preservar o charme do popup, mas tornar a decisão simples: conversar, ver perfil profissional, enviar e-mail ou abrir uma agenda. Links de contato devem ter fallback claro e feedback quando uma ação é copiada ou concluída.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| K-01 | Criar CTA de contato primário e CTA secundário de LinkedIn com hierarquia visual inequívoca. | 5 | S | P0 | URLs reais |
| K-02 | Usar `mailto:` com assunto pré-preenchido e corpo curto, sem impedir o uso de webmail. | 4 | S | P1 | e-mail definido |
| K-03 | Adicionar ação “Copiar e-mail” com toast acessível e fallback quando Clipboard API falhar. | 5 | M | P1 | K-02 |
| K-04 | Adicionar ação “Copiar WhatsApp” somente se o número público estiver correto e autorizado. | 4 | M | P1 | dado confirmado |
| K-05 | Abrir agenda externa em nova aba com aviso textual e `rel` adequado. | 4 | S | P1 | URL de agenda |
| K-06 | Criar estado de sucesso visual após copiar ou iniciar contato. | 4 | S | P1 | K-03 |
| K-07 | Criar fallback quando `navigator.clipboard` não estiver disponível. | 4 | M | P1 | K-03 |
| K-08 | Adicionar horário ou expectativa de resposta apenas se for verdadeira e sustentável. | 3 | S | P2 | informação real |
| K-09 | Adicionar uma mini seção “o que enviar para começar” com escopo, prazo e referência. | 4 | M | P1 | copy |
| K-10 | Permitir selecionar o melhor canal: profissional, técnico ou conversa rápida. | 3 | M | P2 | K-01 |
| K-11 | Oferecer formulário curto somente se houver endpoint seguro, anti-spam e política de privacidade. | 5 | L | P2 | backend/serviço |
| K-12 | Validar formulário no cliente e no servidor com mensagens localizadas. | 5 | M | P2 | K-11 |
| K-13 | Nunca expor chave secreta no bundle estático ou enviar dados para serviço não aprovado. | 5 | M | P0 | K-11 |
| K-14 | Criar fallback de contato sem JavaScript, usando links HTML convencionais. | 5 | S | P0 | K-01 |
| K-15 | Adicionar links sociais apenas quando levam a perfis ativos, profissionais e coerentes com a marca. | 4 | S | P1 | curadoria |
| K-16 | Incluir link para currículo PDF somente se ele estiver atualizado e acessível. | 4 | S | P1 | arquivo revisado |
| K-17 | Criar versão “recrutador” do Sobre com foco em contribuição, stack e tipo de problema resolvido. | 4 | M | P2 | C-05 |
| K-18 | Criar versão “cliente” do Sobre com foco em clareza, processo e comunicação. | 4 | M | P2 | C-05 |

## 9. Acessibilidade e inclusão

A implementação atual já recebeu foco em dialogs e menu mobile. A próxima etapa deve tratar acessibilidade como qualidade do produto, não como camada separada. O padrão modal recomenda foco dentro do dialog, ciclo de `Tab`, fechamento por `Escape`, retorno ao acionador e nome acessível; também exige que o conteúdo externo realmente fique inerte quando `aria-modal="true"` é usado [3].

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| A-01 | Auditar todos os headings para manter uma hierarquia única e previsível em cada estado de painel. | 5 | M | P0 | conteúdo |
| A-02 | Garantir foco visível com contraste suficiente em botões, links, tabs e idiomas. | 5 | S | P0 | tokens CSS |
| A-03 | Garantir área de toque mínima confortável para menu, idiomas e rail social em mobile. | 5 | S | P0 | layout mobile |
| A-04 | Adicionar `aria-current` consistente à linguagem ativa e aos estados de navegação. | 4 | S | P0 | i18n |
| A-05 | Garantir que ícones decorativos tenham `aria-hidden="true"` e que ícones acionáveis tenham nome textual. | 5 | S | P0 | inventário de ícones |
| A-06 | Revisar contraste do texto sobre cada estado do vídeo, incluindo frames claros do final. | 5 | M | P0 | vídeo final |
| A-07 | Oferecer descrição alternativa para o avatar e para imagens de projeto. | 4 | M | P1 | copy localizada |
| A-08 | Adicionar transcript ou descrição equivalente para o movimento relevante do vídeo. | 4 | M | P1 | H-16 |
| A-09 | Permitir navegação completa apenas com teclado, incluindo menu, tabs, dialogs e links externos. | 5 | M | P0 | A-02 |
| A-10 | Impedir que `Escape` feche algo inesperado quando um campo ou editor estiver ativo. | 4 | S | P1 | N-04 |
| A-11 | Testar zoom de 200% e 400% sem esconder CTA ou cortar conteúdo essencial. | 5 | M | P0 | layout responsivo |
| A-12 | Testar modo de alto contraste e forced colors em sistemas compatíveis. | 4 | M | P1 | tokens CSS |
| A-13 | Respeitar `prefers-reduced-motion`, `prefers-contrast` quando suportado e preferência de transparência do sistema. | 4 | M | P1 | H-05 |
| A-14 | Evitar que texto em caixa alta e letter-spacing excessivo prejudique leitura em mobile. | 3 | S | P1 | revisão visual |
| A-15 | Adicionar mensagens de status com `aria-live` para carregamento, cópia e falhas de API. | 5 | S | P0 | integrações |
| A-16 | Validar que dialogs longos permitem scroll por teclado e não prendem o foco em elementos invisíveis. | 5 | M | P0 | N-04 |
| A-17 | Testar com leitor de tela em pelo menos um ambiente real antes de publicar grandes mudanças. | 5 | M | P1 | A-01–A-16 |
| A-18 | Criar checklist de acessibilidade para cada nova feature visual. | 4 | S | P1 | F-04 |

## 10. SEO, compartilhamento e descoberta

A estrutura multilíngue deve continuar com URLs distintas, canonical coerente e alternates completos. Para versões localizadas, cada página deve apontar para si própria e para as demais versões com URLs absolutas e links recíprocos; também é possível declarar alternativas em HTML, headers ou sitemap [4].

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| S-01 | Revisar title e description de cada locale para evitar tradução literal ou promessa genérica. | 5 | S | P0 | copy editorial |
| S-02 | Garantir canonical próprio para `/pt-BR`, `/en` e `/es`. | 5 | S | P0 | metadata |
| S-03 | Garantir `hreflang` recíproco, com `x-default` apontando para uma escolha segura. | 5 | M | P0 | S-02 |
| S-04 | Validar sitemap com os três locales e nenhuma rota removida do jogo. | 5 | S | P0 | S-02 |
| S-05 | Criar Open Graph image principal com identidade consistente e texto legível em thumbnail. | 5 | M | P1 | asset aprovado |
| S-06 | Criar Twitter/X card sem depender de uma rede social que não seja prioridade editorial. | 3 | S | P2 | S-05 |
| S-07 | Configurar `og:locale` e alternates corretamente por página. | 4 | S | P1 | S-02 |
| S-08 | Garantir favicon, Apple touch icon e manifest coerentes com a marca atual. | 4 | S | P1 | identidade visual |
| S-09 | Adicionar JSON-LD de `Person` ou `ProfilePage` somente com dados públicos verdadeiros. | 4 | M | P1 | dados revisados |
| S-10 | Adicionar schema de `WebSite` sem criar busca fictícia nem propriedades irrelevantes. | 3 | S | P2 | S-09 |
| S-11 | Criar dados estruturados de projetos apenas quando cada projeto tiver URL, nome e descrição verificáveis. | 3 | M | P2 | W-24 |
| S-12 | Revisar `robots.txt` para permitir indexação da landing e bloquear apenas endpoints inadequados. | 4 | S | P1 | S-04 |
| S-13 | Garantir textos importantes no HTML inicial, não somente dentro de client components. | 5 | M | P0 | arquitetura SSR |
| S-14 | Criar rota de currículo ou perfil resumido rastreável, se houver conteúdo suficiente. | 4 | M | P2 | K-16 |
| S-15 | Gerar imagens sociais com dimensões corretas e peso controlado. | 4 | M | P1 | S-05 |
| S-16 | Verificar título e descrição em compartilhamento real por locale. | 4 | S | P1 | S-01–S-07 |
| S-17 | Rodar auditoria periódica de links quebrados externos. | 3 | M | P1 | F-07 |
| S-18 | Criar uma política para URLs permanentes antes de adicionar novas páginas. | 3 | S | P2 | S-02 |

## 11. Performance, mídia e operação

A maior parte da percepção de qualidade virá do primeiro carregamento. A landing deve entregar uma primeira pintura útil, não depender de uma única mídia pesada e não gastar CPU continuamente quando a aba está oculta. O elemento de vídeo suporta poster, múltiplas fontes, eventos de estado e `preload`; o valor padrão recomendado pelo padrão é uma dica e deve ser testado no contexto do site [1] [2].

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| P-01 | Medir tamanho real de vídeo, posters, fontes e imagens antes de otimizar no escuro. | 5 | S | P0 | relatório de build |
| P-02 | Gerar versões comprimidas e dimensionadas do hero para desktop e mobile. | 5 | M | P0 | asset final |
| P-03 | Considerar WebM/AV1/H.264 conforme suporte real e fallback ordenado. | 5 | M | P1 | P-01 |
| P-04 | Usar poster otimizado e carregado com prioridade apropriada. | 5 | M | P0 | H-01 |
| P-05 | Adiar loop secundário até ele ser necessário, sem duplicar requests. | 5 | M | P0 | H-08 |
| P-06 | Pausar mídia e observers quando a aba estiver oculta ou a seção não estiver próxima. | 5 | M | P0 | H-10 |
| P-07 | Usar `content-visibility` ou estratégia equivalente em conteúdo abaixo da dobra quando isso não quebrar acessibilidade. | 3 | M | P2 | profiling |
| P-08 | Pré-carregar apenas fontes críticas e evitar fontes externas que bloqueiem o first paint. | 4 | M | P1 | auditoria de fontes |
| P-09 | Reduzir JavaScript enviado para a primeira dobra. | 5 | L | P1 | profiling |
| P-10 | Separar carregamento da API de repositórios do caminho crítico do hero. | 5 | M | P0 | W-15 |
| P-11 | Adicionar cache com revalidação para dados públicos do GitHub. | 4 | M | P1 | integração atual |
| P-12 | Criar fallback estático para a API em caso de rate limit, timeout ou erro 5xx. | 5 | M | P0 | W-17 |
| P-13 | Medir Core Web Vitals em celular real, não apenas em Chromium headless. | 5 | M | P1 | P-01 |
| P-14 | Testar conexões 3G/4G limitadas e modo de economia de dados. | 4 | M | P1 | P-02 |
| P-15 | Criar orçamento de bundle e mídia que falhe no CI quando for excedido. | 4 | M | P1 | F-04 |
| P-16 | Auditar imagens com dimensões incorretas, alpha desnecessário ou metadata excessiva. | 3 | M | P2 | inventário de assets |
| P-17 | Evitar efeitos de blur e filtros contínuos muito caros no mobile. | 4 | M | P1 | profiling |
| P-18 | Usar `will-change` somente em elementos realmente animados e removê-lo após transições. | 3 | S | P2 | CSS audit |
| P-19 | Testar primeira visita, cache quente, reload e retorno pelo histórico. | 5 | M | P0 | P-01 |
| P-20 | Criar relatório de performance anexado a cada release visual importante. | 3 | S | P2 | P-13 |

## 12. Internacionalização e localização

A tradução não deve ser somente substituição de frases. Layout, comprimento, ordem dos argumentos, rótulos de tecnologia e metadata também precisam ser validados por idioma. A rota deve continuar entendível mesmo quando a tradução cresce ou reduz a quantidade de palavras.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| I-01 | Criar teste de completude para todas as chaves PT-BR/EN/ES. | 5 | S | P0 | F-05 |
| I-02 | Criar teste que detecte frases PT-BR residuais nas rotas EN e ES. | 5 | M | P0 | I-01 |
| I-03 | Revisar espanhol para naturalidade regional, evitando tradução automática literal. | 4 | M | P1 | revisão humana |
| I-04 | Revisar inglês para tom profissional natural e consistente com o posicionamento. | 4 | M | P1 | revisão editorial |
| I-05 | Localizar `alt`, `aria-label`, `title`, estados de erro e mensagens de clipboard. | 5 | M | P0 | I-01 |
| I-06 | Localizar metadata, Open Graph, manifest e conteúdo de compartilhamento. | 5 | M | P0 | S-01 |
| I-07 | Adicionar `lang` e `hreflang` corretos nos links de troca de idioma. | 4 | S | P1 | S-03 |
| I-08 | Testar quebra de headlines e CTAs em viewport mobile para os três idiomas. | 5 | M | P0 | I-03–I-04 |
| I-09 | Evitar concatenar frases que mudam de ordem entre idiomas. | 4 | M | P1 | contrato de copy |
| I-10 | Separar nomes próprios, nomes de tecnologias e labels traduzíveis no modelo de dados. | 4 | M | P1 | I-01 |
| I-11 | Criar fallback explícito para locale inválido. | 4 | S | P1 | middleware |
| I-12 | Definir política para datas, números e status de projeto por locale. | 3 | M | P2 | W-07 |
| I-13 | Adicionar revisão de comprimento máximo para labels de tabs e botões. | 4 | S | P1 | I-08 |
| I-14 | Permitir que o usuário altere idioma sem perder a intenção do painel atual quando houver URL equivalente. | 4 | M | P2 | N-06 |
| I-15 | Criar checklist de revisão cultural de ícones, metáforas e sinais visuais. | 2 | M | P3 | revisão editorial |

## 13. Visual design, motion e microinterações

A landing já possui uma identidade visual forte. Melhorias devem aumentar acabamento, legibilidade e sensação de controle, não competir com o avatar. Motion deve explicar estado e continuidade; não deve existir apenas porque é tecnicamente possível.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| V-01 | Consolidar tokens de cor para ink, muted, accent, border, panel e focus. | 5 | M | P0 | CSS atual |
| V-02 | Criar escala tipográfica com regras explícitas para hero, panels, cards e metadata. | 4 | M | P1 | V-01 |
| V-03 | Refinar o contraste do rail social em frames claros do vídeo. | 5 | M | P0 | H-06 |
| V-04 | Criar estados hover/focus/active/pressed consistentes para todos os controles. | 5 | M | P0 | A-02 |
| V-05 | Adicionar transição de painel com origem espacial coerente com o botão acionador. | 4 | M | P1 | N-02 |
| V-06 | Criar microfeedback de clique, cópia, abertura e fechamento sem excesso de escala. | 4 | M | P1 | K-06 |
| V-07 | Reduzir ou remover animações decorativas quando elas não informam estado. | 4 | S | P1 | H-05 |
| V-08 | Definir enquadramentos diferentes para avatar no mobile sem distorção. | 5 | M | P0 | H-01 |
| V-09 | Melhorar transições entre fundo escuro e frames iluminados. | 5 | M | P1 | vídeo final |
| V-10 | Criar fallback de rail social quando o espaço horizontal for insuficiente. | 4 | M | P1 | mobile QA |
| V-11 | Adicionar textura visual de baixa frequência somente se não reduzir legibilidade nem performance. | 2 | M | P3 | performance |
| V-12 | Criar sistema de ícones SVG consistente, sem misturar glyphs, emojis e símbolos de fallback. | 5 | M | P1 | inventário de ícones |
| V-13 | Criar estados de imagem quebrada que mantenham composição e mensagem. | 4 | M | P1 | assets |
| V-14 | Definir regras para bordas, sombras e radius para evitar aparência de componentes de bibliotecas distintas. | 4 | M | P1 | V-01 |
| V-15 | Revisar o mobile com foco em respiro entre headline, descrição, CTA e rail social. | 5 | M | P0 | H-20 |
| V-16 | Criar modo de contraste elevado opcional se houver demanda real. | 3 | M | P3 | A-12 |

## 14. Analytics, privacidade e observabilidade

Medir o comportamento pode ajudar a escolher melhorias, mas a landing não deve transformar uma apresentação pessoal em um sistema de rastreamento invasivo. O mínimo recomendado é observar eventos agregados, sem registrar texto de mensagens, dados de contato ou identificadores desnecessários.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| O-01 | Definir uma pergunta de negócio para cada evento antes de instrumentá-lo. | 5 | S | P0 | estratégia de medição |
| O-02 | Medir abertura de Trabalhos, Sobre e Contato como eventos anônimos e agregados. | 4 | M | P1 | ferramenta escolhida |
| O-03 | Medir clique no CTA principal e no canal de contato, sem registrar dados pessoais. | 5 | M | P1 | K-01 |
| O-04 | Medir erro de reprodução do hero e fallback acionado. | 4 | M | P1 | H-03 |
| O-05 | Medir tempo até conteúdo útil com uma marcação interna de performance. | 4 | M | P1 | P-13 |
| O-06 | Registrar falhas de API sem enviar conteúdo privado ou tokens. | 4 | M | P1 | W-15 |
| O-07 | Criar dashboard simples de conversão por locale. | 3 | M | P2 | O-02–O-03 |
| O-08 | Adicionar consentimento somente se a ferramenta usada realmente exigir cookies não essenciais. | 4 | M | P1 | ferramenta escolhida |
| O-09 | Criar documentação de retenção e finalidade dos eventos. | 3 | S | P1 | O-01 |
| O-10 | Criar modo de desenvolvimento que desabilite analytics automaticamente. | 4 | S | P0 | ambiente |
| O-11 | Adicionar monitoramento de disponibilidade da landing e das APIs públicas. | 4 | M | P1 | operação |
| O-12 | Criar alertas apenas para falhas acionáveis, evitando ruído de observabilidade. | 3 | M | P2 | O-11 |

## 15. Features de diferenciação — recomendadas após a fundação

Estas ideias podem transformar a landing em um portfólio memorável, mas somente devem entrar depois que conteúdo, performance e conversão estiverem resolvidos. A recomendação é escolher poucas e executar com alto acabamento.

| ID | Feature | Experiência proposta | Impacto | Esforço | Prioridade |
|---|---|---|---:|---|---|
| X-01 | Modo recrutador | Um switch discreto reorganiza o conteúdo para mostrar stack, experiência, cases e contato em sequência curta. | 5 | L | P2 |
| X-02 | Modo cliente | Mostra problemas resolvidos, processo de colaboração, entregáveis e caminho para iniciar conversa. | 5 | L | P2 |
| X-03 | Case “30 segundos” | Cada projeto tem um resumo visual com uma frase, papel, stack e resultado antes do conteúdo completo. | 5 | M | P1 |
| X-04 | Timeline de processo | Uma linha visual mostra descoberta, estrutura, construção, validação e entrega. | 4 | M | P2 |
| X-05 | Laboratório técnico | Área com pequenos experimentos de interface, dados, automação ou acessibilidade. | 4 | L | P2 |
| X-06 | Playground de performance | Demonstra, com dados controlados, o efeito de carregamento, fallback e redução de movimento. | 3 | L | P3 |
| X-07 | Visualizador de arquitetura | Diagramas simples e interativos mostram como uma solução se organiza. | 4 | L | P2 |
| X-08 | Comparador antes/depois | Para projetos de interface, alterna visual antigo e solução final com contexto. | 4 | M | P2 |
| X-09 | Mapa de competências | Organiza tecnologias por domínio e profundidade, sem transformar em ranking vazio. | 3 | M | P3 |
| X-10 | Gerador de resumo | O visitante seleciona “interface”, “automação” ou “sistemas” e recebe um recorte da apresentação. | 3 | L | P3 |
| X-11 | Currículo interativo | Permite abrir uma versão curta e uma versão detalhada do percurso profissional. | 4 | M | P2 |
| X-12 | Exportar currículo | Gera ou disponibiliza um PDF/HTML acessível com conteúdo equivalente ao perfil. | 4 | M | P1 |
| X-13 | Link de compartilhamento de contexto | Uma URL abre diretamente um projeto, idioma ou modo de apresentação. | 5 | M | P1 |
| X-14 | Agenda contextual | A agenda recebe parâmetros opcionais de origem, sem capturar informações indevidas. | 3 | M | P2 |
| X-15 | Disponibilidade dinâmica | Mostra status atual apenas se houver uma fonte confiável e manutenção simples. | 3 | M | P2 |
| X-16 | Notas de release | Uma seção curta mostra mudanças recentes na landing e novos projetos. | 3 | M | P2 |
| X-17 | Página de engenharia | Apresenta decisões de stack, testes, acessibilidade e performance da própria landing. | 5 | L | P2 |
| X-18 | Página de processo | Mostra como um trabalho sai de briefing para entrega, com artefatos selecionados. | 4 | L | P2 |
| X-19 | Transcrição do hero em camada opcional | O visitante pode abrir uma descrição completa do movimento e da intenção visual. | 4 | M | P1 |
| X-20 | “Peça uma análise” | CTA leva a um formulário ou e-mail com escopo curto para discutir um problema real. | 5 | L | P2 |

## 16. Conteúdo contínuo e autoridade

Uma landing profissional pode ganhar relevância sem virar um blog pesado. O caminho mais sustentável é publicar poucos conteúdos de alta densidade: uma decisão técnica, uma análise de interface, um aprendizado de projeto ou uma pequena demonstração de automação.

| ID | Melhoria ou implementação | Impacto | Esforço | Prioridade | Dependência |
|---|---|---:|---|---|---|
| ATO-01 | Criar seção “Notas” com três a cinco textos selecionados, não um feed infinito. | 4 | M | P2 | C-17 |
| ATO-02 | Publicar estudos curtos sobre decisões de interface e acessibilidade. | 4 | M | P2 | processo editorial |
| ATO-03 | Publicar um case de automação com diagrama simples e limitações. | 5 | M | P2 | W-10 |
| ATO-04 | Publicar uma nota sobre performance do hero, com medições antes/depois. | 4 | M | P2 | P-13 |
| ATO-05 | Adicionar RSS/Atom somente se houver frequência sustentável. | 2 | M | P3 | ATO-01 |
| ATO-06 | Adicionar leitura estimada e data de atualização aos textos longos. | 3 | S | P2 | ATO-01 |
| ATO-07 | Criar metadata e Open Graph para cada nota. | 3 | M | P2 | ATO-01 |
| ATO-08 | Permitir compartilhar uma nota por URL estável. | 3 | S | P2 | ATO-07 |
| ATO-09 | Criar uma página de recursos recomendados com curadoria pessoal. | 2 | M | P3 | conteúdo |
| ATO-10 | Evitar publicar tutoriais genéricos apenas para produzir volume de SEO. | 5 | S | P0 | política editorial |

## 17. Ideias que devem ser evitadas ou avaliadas com cautela

Uma landing profissional também demonstra maturidade pelo que decide não fazer. A lista abaixo não é uma proibição absoluta, mas representa riscos concretos de diluir o posicionamento ou aumentar custo de manutenção.

| Ideia | Motivo de cautela | Alternativa melhor |
|---|---|---|
| Música ou áudio automático | Pode surpreender o visitante, prejudicar acessibilidade e aumentar rejeição. | Vídeo silencioso, opção explícita e descrição alternativa. |
| Cursor customizado pesado | Frequentemente piora precisão e acessibilidade sem agregar conteúdo. | Microinterações de hover e foco bem definidas. |
| Partículas em excesso | Consomem CPU e competem com o avatar e a headline. | Poucos sinais decorativos com função visual clara. |
| Chatbot genérico | Pode parecer artificial e introduzir custo, privacidade e respostas ruins. | CTA de contato direto e FAQ curto. |
| Formulário longo | Aumenta fricção e exige backend, anti-spam e tratamento de dados. | Formulário curto ou e-mail com contexto pré-preenchido. |
| Blog automático com IA | Pode reduzir confiança e criar conteúdo sem autoridade real. | Notas autorais curtas e verificáveis. |
| Muitas tecnologias em destaque | Lista extensa não prova profundidade. | Mostrar stack associada a decisões e resultados. |
| Página com dezenas de projetos | Quantidade pode esconder falta de curadoria. | Três a seis cases fortes. |
| Dark/light mode sem intenção | Pode quebrar a direção visual e duplicar QA. | Tema único bem contrastado ou modo alternativo justificado. |
| Reprodução de vídeo em várias camadas | Eleva uso de memória e causa travamentos em mobile. | Um caminho principal, poster e fallback. |
| Gamificação da navegação | Pode desviar da apresentação profissional. | Progressão editorial e estados de leitura claros. |
| Copiar literalmente outra landing | Pode gerar inconsistência de marca e risco de manutenção. | Estudar padrões e criar uma composição própria. |
| Integrações sociais demais | Aumentam ruído e deixam perfis abandonados visíveis. | Manter somente canais ativos e relevantes. |
| Dados inventados ou métricas sem fonte | Destroem confiança profissional. | Usar evidências verificáveis ou omitir a métrica. |

## 18. Roadmap recomendado de execução

### Fase A — Fundação e confiança

A primeira fase deve tratar os itens que o visitante sente mesmo sem saber nomeá-los: foco correto, contraste, links que funcionam, fallback do vídeo, copy objetiva, mobile estável, metadata correta e ausência de dependência crítica de uma API remota. Os itens de maior prioridade são F-04, F-05, H-02, H-03, H-05, H-10, H-12, C-01, W-01, W-02, W-17, K-01, K-03, A-02, A-09, A-15, S-01, S-03, S-04, P-01, P-05, P-10, I-01 e I-08.

### Fase B — Conversão e autoridade

Depois da fundação, o foco deve passar para cases fortes, canais de contato e prova técnica. A landing deve permitir que alguém entenda em menos de um minuto o que Charlles faz, quais projetos sustentam essa afirmação e qual é o próximo passo para conversar. Aqui entram W-04, W-06, W-08, W-13, W-15, K-05, K-09, K-16, C-08, C-10, S-05, S-09, P-13, V-03 e V-15.

### Fase C — Diferenciação controlada

Somente após observar a experiência real e confirmar que o caminho principal está claro, vale adicionar X-01, X-03, X-04, X-07, X-12, X-13, X-17 e X-19. A seleção ideal é de duas ou três features, não de todas. A landing deve parecer mais refinada depois delas, e não mais complexa.

### Fase D — Conteúdo e evolução contínua

A última frente é editorial: ATO-01 a ATO-08, notas de engenharia, cases atualizados e uma política de manutenção. A frequência deve ser realista. Um texto útil por mês é melhor que um feed abandonado com muitos itens superficiais.

## 19. Backlog inicial recomendado para implementação

| Ordem | Item | Razão |
|---:|---|---|
| 1 | Criar quality gate único e testes de completude i18n. | Evita regressões em qualquer mudança posterior. |
| 2 | Finalizar fallback do hero, poster responsivo e comportamento reduced motion. | Protege a primeira impressão e a acessibilidade. |
| 3 | Transformar três projetos em cases verificáveis com links reais. | Aumenta confiança mais do que adicionar novas animações. |
| 4 | Implementar CTA de contato, copiar e-mail e estados de sucesso. | Reduz a distância entre interesse e conversa. |
| 5 | Validar canonical, hreflang, sitemap, Open Graph e JSON-LD. | Melhora descoberta sem depender de mudanças visuais. |
| 6 | Testar mobile real, zoom, teclado e leitor de tela. | Fecha a qualidade percebida em diferentes contextos. |
| 7 | Medir somente abertura de painel, CTA, contato e falha de mídia. | Cria evidência para priorizar a próxima onda. |
| 8 | Criar case de 30 segundos e modo recrutador. | Diferencia o portfólio para visitantes com pouco tempo. |
| 9 | Publicar uma página de engenharia da própria landing. | Demonstra maturidade técnica sem poluir o hero. |
| 10 | Escolher no máximo duas features experimentais. | Mantém foco e protege a manutenção. |

## 20. Definition of Done para qualquer nova feature

Uma nova feature da landing só deve ser considerada pronta quando estiver disponível nos três idiomas ou tiver uma justificativa explícita para não estar; funcionar sem teclado e em viewport estreito; possuir estado de loading, erro e sucesso quando aplicável; respeitar reduced motion; não depender de um serviço remoto para o conteúdo principal; não introduzir texto residual em outro idioma; estar coberta por teste ou checklist manual; passar type-check, lint, testes e build; e ser avaliada em uma build de produção fresh.

Antes de publicar, também é necessário responder se a feature tornou a proposta de valor mais clara. Se o resultado for apenas “a página ficou mais cheia”, ela deve voltar para o backlog até que exista uma função profissional evidente.

## Referências técnicas

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video "MDN — `<video>` HTML video embed element"

[2]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/preload "MDN — HTMLMediaElement preload"

[3]: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ "WAI-ARIA Authoring Practices — Dialog (Modal) Pattern"

[4]: https://developers.google.com/search/docs/specialty/international/localized-versions "Google Search Central — Localized versions of your pages"

## 21. Matriz de prioridade recomendada

Para tornar o backlog acionável, a prioridade abaixo considera impacto alto, esforço baixo ou médio, dependências compartilhadas e risco de regressão. Itens que protegem conteúdo principal, acessibilidade e carregamento entram antes de features novas, mesmo quando estas parecem mais chamativas.

| Rank | Item | Impacto | Esforço | Dependências | Decisão |
|---:|---|---:|---|---|---|
| 1 | F-04 — quality gate único | 5 | S | nenhuma | Fazer primeiro; reduz risco de todas as próximas ondas. |
| 2 | F-05/I-01 — contrato de completude i18n | 5 | S | dados de copy | Fazer junto da fundação. |
| 3 | H-02/H-03/H-05 — poster, fallback e reduced motion | 5 | M | asset aprovado | Tratar antes de novos efeitos. |
| 4 | H-10/H-12/H-13 — estados de mídia e scrub eficiente | 5 | M | profiling | Prioridade de performance do hero. |
| 5 | A-02/A-05/A-09/A-15 — foco, ícones, teclado e status | 5 | M | markup atual | Fechar acessibilidade base antes de publicar features. |
| 6 | C-01/C-03/C-13 — posicionamento e copy do hero | 5 | S/M | revisão editorial | Alto retorno sem depender de backend. |
| 7 | W-01/W-02/W-04/W-06 — cases e links reais | 5 | M | conteúdo dos projetos | Principal ganho de autoridade. |
| 8 | W-17/P-10/P-12 — fallback da API de repositórios | 5 | M | integração atual | Evita que serviço externo controle a landing. |
| 9 | K-01/K-03/K-06/K-07 — contato e cópia de e-mail | 5 | M | dados públicos reais | Principal redução de fricção de conversão. |
| 10 | S-01/S-03/S-04 — metadata, hreflang e sitemap | 5 | M | copy final | Base de descoberta internacional. |
| 11 | P-01/P-02/P-05/P-06 — orçamento de mídia | 5 | M | H-01 | Deve acompanhar a troca de hero. |
| 12 | V-03/V-08/V-15 — contraste e composição mobile | 5 | M | H-01 | Resolve o maior risco visual observado. |
| 13 | I-03/I-04/I-08 — revisão de EN/ES e quebra de layout | 4 | M | copy final | Necessário antes de divulgar as rotas. |
| 14 | K-05/K-14/K-16 — agenda, fallback e currículo | 4 | S/M | links/arquivos reais | Boa camada de conversão profissional. |
| 15 | O-01/O-02/O-03/O-04 — eventos mínimos | 4 | M | política de privacidade | Só depois de definir o que medir. |
| 16 | X-03 — case em 30 segundos | 5 | M | W-01 | Primeira feature de diferenciação recomendada. |
| 17 | X-13 — link direto de contexto | 5 | M | N-06 | Melhora compartilhamento e SEO interno. |
| 18 | X-12 — exportar currículo | 4 | M | K-16 | Útil para recrutadores, sem poluir o hero. |
| 19 | X-17 — página de engenharia | 5 | L | conteúdo técnico | Excelente prova de maturidade, mas não é fundação. |
| 20 | X-05/X-07 — laboratório ou arquitetura interativa | 4 | L | X-03 e performance | Escolher no máximo uma inicialmente. |

### Dependências que devem ser tratadas como blocos

A troca de vídeo deve ser tratada como um bloco único formado por H-01, H-02, H-03, H-05, H-08, H-10, P-02, P-05 e V-08. Alterar apenas o arquivo de vídeo sem revisar poster, fallback, carregamento, enquadramento e reduced motion tende a criar inconsistências.

A evolução de cases deve ser tratada como W-01, W-02, W-04, W-05, W-06, W-13, W-15 e W-17. O conteúdo precisa ser estruturado antes de receber filtros, dados remotos ou visualizações adicionais.

A conversão de contato deve ser tratada como K-01, K-02, K-03, K-05, K-06, K-07 e K-14. Formulário deve permanecer fora dessa primeira versão até que exista uma solução segura para endpoint, anti-spam, privacidade e mensagens de erro.

A internacionalização deve ser tratada como I-01, I-02, I-05, I-06, I-08, S-01, S-02, S-03 e S-04. Não é suficiente traduzir apenas o texto visível se metadata, atributos de acessibilidade e sitemap continuarem inconsistentes.
