# Matriz de compatibilidade técnica

**Projeto:** Charlles.dev  
**Referência:** `package.json`, `pnpm-lock.yaml` e quality gate atual.

## Runtime e ferramenta

| Componente | Versão pinada | Estado |
|---|---:|---|
| Node.js | `22.13.x` | Testado no ambiente de QA |
| pnpm | `11.21.x` | Testado no ambiente de QA |
| Next.js | `16.3.2` | Pinado e validado no build |
| React / React DOM | `19.2.8` | Pinados e validados no build |
| TypeScript | `5.9.3` | Pinado e validado no type-check |
| ESLint | `9.39.5` | Pinado e validado no lint |
| Vitest | `4.1.11` | Pinado e validado na suíte |
| Tailwind CSS | `3.4.17` | Pinado e validado no build |

## Browsers e contextos

| Contexto | Estado | Observação |
|---|---|---|
| Chromium headless estável | Verificado | QA pós-intro, desktop, mobile, reduced-motion e deep links. |
| Chromium com JavaScript habilitado | Verificado | Necessário para hero progressivo, dialogs e menu mobile; links e metadata continuam no HTML. |
| `prefers-reduced-motion: reduce` | Verificado | Poster estável, loops e scrub não essenciais interrompidos. |
| Firefox | Não auditado nesta onda | Deve ser incluído antes de uma mudança de mídia ou CSS estrutural. |
| Safari / iOS Safari | Não auditado nesta onda | Deve ser incluído em QA real mobile, especialmente para vídeo, safe areas e dialogs. |
| Android Chrome em dispositivo real | Não auditado nesta onda | Requer validação de performance, rede limitada e memória. |

## Comandos de verificação

O comando `pnpm quality` executa type-check, lint, Vitest, build de produção, verificação de assets referenciados e verificação das rotas localizadas prerenderizadas. O build atual gera `/pt-BR`, `/en`, `/es`, `/pt-BR/engineering`, `/en/engineering` e `/es/engineering`.

A matriz não é uma promessa de suporte universal. Qualquer mudança em vídeo, dependências, CSS de layout ou acessibilidade deve atualizar os contextos testados e repetir a validação em produção fresh.
