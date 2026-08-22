# Convenções de contribuição

## Antes de editar

Toda mudança deve começar pela identificação da rota, componente, contrato de i18n e teste afetados. O trabalho não deve tocar Hero, vídeo ou scroll-story quando a onda não tiver esse escopo. Arquivos em `public/reference` só entram em um commit quando são realmente usados pelo runtime e foram aprovados para esse uso.

## Conteúdo e localização

Copy visível, metadata e labels de acessibilidade devem existir nos três dicionários. Não usar concatenação que produza ordem gramatical estranha em inglês ou espanhol. Métricas, disponibilidade, papéis, resultados, calendários e links de projeto só podem ser publicados quando houver fonte verificável no repositório ou confirmação do proprietário.

## Commits

| Prefixo | Uso |
|---|---|
| `feat:` | Nova capacidade percebida pelo visitante. |
| `fix:` | Correção de comportamento ou regressão. |
| `a11y:` | Melhoria de acessibilidade ou navegação assistiva. |
| `seo:` | Metadata, sitemap, schema ou descoberta. |
| `perf:` | Mudança de carregamento ou custo mensurado. |
| `content:` | Copy, tradução ou conteúdo editorial. |
| `docs:` | Documentação sem alteração funcional. |
| `test:` | Cobertura sem mudança de comportamento. |
| `chore:` | Tooling, checks e manutenção. |

Cada commit deve representar uma unidade revisável, evitar misturar mídia com refactors e mencionar a consequência observável no corpo quando o título não for suficiente.

## Quality gate

Antes de publicar, executar `pnpm quality`. O comando deve passar por type-check, ESLint, Vitest, build, verificação de assets, verificação de rotas e integridade do HTML prerenderizado. Warnings conhecidos do jsdom e do carregador CommonJS/ESM não substituem a análise de falhas reais.

Depois do gate, revisar `git diff --check`, `git status --short` e a lista exata do commit. Assets, vídeos, frames e documentos históricos untracked devem permanecer fora quando não forem parte da entrega.
