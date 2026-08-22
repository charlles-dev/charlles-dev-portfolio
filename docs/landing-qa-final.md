# QA final da landing

**Data:** 22 de agosto de 2026.  
**Build:** Next.js 16.3.2, React 19, TypeScript 5.9.3, pnpm 11.21.0.  
**Ambiente:** build de produção iniciado com `next start` em portas isoladas e Chromium headless para screenshots pós-intro, com orçamento virtual mínimo de 5 segundos.

## Quality gate

O comando oficial `pnpm quality` passou integralmente após as últimas ondas. O resultado mais recente executou type-check, ESLint, Vitest, build de produção, verificação de assets, verificação de rotas e integridade do HTML; foram aprovados **16 arquivos de teste e 92 testes**.

O Vitest continua emitindo somente os avisos conhecidos do jsdom sobre métodos de `HTMLMediaElement` não implementados e o aviso do carregador CommonJS/ESM da configuração do Vite. Eles não bloquearam a suíte nem o build.

## Rotas verificadas

| Rota | Resultado |
|---|---:|
| `/pt-BR` | HTTP 200 |
| `/en` | HTTP 200 |
| `/es` | HTTP 200 |
| `/pt-BR/engineering` | HTTP 200 |
| `/en/engineering` | HTTP 200 |
| `/es/engineering` | HTTP 200 |
| `/pt-BR/now` | HTTP 200 |
| `/en/now` | HTTP 200 |
| `/es/now` | HTTP 200 |
| `/pt-BR/process` | HTTP 200 |
| `/en/process` | HTTP 200 |
| `/es/process` | HTTP 200 |
| `/sitemap.xml` | HTTP 200 |
| `/robots.txt` | HTTP 200 |
| `/manifest.webmanifest` | HTTP 200 |

O sitemap contém as doze URLs localizadas — home, engenharia, Agora e Processo — com alternates recíprocas. As páginas editoriais entregam conteúdo no HTML inicial, metadata própria, canonical, `x-default` em PT-BR e schemas de breadcrumb, ItemList ou HowTo conforme a rota. O quality gate verificou 20 assets referenciados, 12 páginas localizadas de conteúdo e os endpoints públicos essenciais.

## Inspeção visual

Os screenshots pós-intro cobriram a landing em desktop e mobile, reduced-motion em EN, a página de engenharia em desktop, as páginas Agora e Processo e os deep links `#work`, `#contact` e `#about`. O hero preservou a identidade do avatar toy, o headline e o CTA; o mobile não apresentou overflow horizontal. O painel de Trabalhos reflowou para uma coluna, manteve tabs e exibiu cases com problema, decisão, próximo passo e link público. Contato apresentou e-mail direto, cópia, WhatsApp, agenda e sprites. Sobre apresentou avatar, ícones sociais contrastados e o link para Notas de engenharia.

Duas capturas mobile de painéis foram feitas durante o frame de entrada do overlay, portanto apareceram temporariamente escurecidas. Isso é um estado de animação de captura, não perda de conteúdo: o reduced-motion é tratado em CSS/runtime e os testes de foco, fechamento e restauração do acionador permanecem verdes.

## Remoção do protótipo

Foi feita uma varredura final no código e documentação rastreados para nomes, runtime e rota da experiência experimental removida. A única frase histórica encontrada foi neutralizada no relatório de pesquisa. Não há rota, componente, dependência ou referência ativa do protótipo no build.

## Decisão

A landing e as páginas editoriais estão prontas para a publicação desta onda: hero preservado sem alteração nesta etapa, dialogs acessíveis, i18n PT-BR/EN/ES, deep links, páginas de Engenharia/Agora/Processo, schemas estruturados, observabilidade opt-in sem provedor, checks de links manuais e quality gate reproduzível. Nenhuma integração de analytics externo foi ativada.
