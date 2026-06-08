# GitHub + Groq Projects Design

## Objective

Evoluir a seção de projetos do portfólio para uma apresentação mais profissional, completa e sincronizada com o GitHub, usando Groq/Llama no server-side para enriquecer os dados dos repositórios sem expor chave, prompt ou lógica sensível no front-end.

## Product Direction

A experiência será "curadoria profissional primeiro". A seção continua guiando recrutadores, clientes e parceiros pelos melhores trabalhos de Charlles, mas passa a mostrar também todos os repositórios públicos sincronizados.

O topo da seção deve destacar poucos projetos como cases principais. Abaixo, uma área de catálogo mostra todos os repositórios públicos com busca, filtros e cards compactos. Isso evita que a página vire apenas um espelho bruto do GitHub e mantém o portfólio com leitura editorial e profissional.

## User Experience

A seção de projetos terá duas camadas:

1. **Projetos em destaque**
   - 3 a 5 repositórios selecionados por curadoria.
   - Cards maiores, com narrativa de case.
   - Cada card deve mostrar problema, entrega, stack, maturidade, última atualização e CTA para GitHub.

2. **Todos os repositórios públicos**
   - Grade/lista compacta com todos os repositórios públicos retornados pelo GitHub.
   - Busca por nome, linguagem, descrição e resumo gerado.
   - Filtros por categoria: Todos, Web, Automação, Infra, Base técnica e Experimentos.
   - Ordenação inicial por curadoria/destaque, depois atualização recente e qualidade de metadados.

O visual deve continuar cinematográfico e maduro, mas os cards precisam parecer mais "portfólio profissional" do que "demo visual". Métricas reais do GitHub devem entrar de forma discreta: linguagem principal, estrelas, forks, último update e estado de maturidade.

## Data Flow

```txt
Browser
  -> GET /api/projects
Next.js server route
  -> fetch GitHub public repos
  -> normalize repository metadata
  -> enrich with Groq/Llama
  -> cache final JSON
  -> return safe project payload to front-end
```

The front-end receives only safe, presentation-ready JSON. It never receives the Groq API key, GitHub token, prompt template, or raw private environment values.

## Environment Variables

Local development uses `.env.local`, which is already ignored by `.gitignore`.

```env
GROQ_API_KEY=
GROQ_MODEL=
GITHUB_OWNER=charlles-dev
GITHUB_TOKEN=
PROJECTS_CACHE_TTL_SECONDS=21600
```

`GITHUB_TOKEN` is optional for public repositories, but recommended to increase rate limits. It must stay server-side. No secret uses the `NEXT_PUBLIC_` prefix.

## Server Architecture

Add a server-only projects module with these responsibilities:

- Fetch public repositories from GitHub for `GITHUB_OWNER`.
- Exclude forks by default unless a fork has meaningful owner-authored work.
- Normalize data into a stable internal shape.
- Send only useful metadata to Groq for enrichment.
- Validate/sanitize the AI response before returning it.
- Cache the final enriched list.

Proposed files:

- `src/app/api/projects/route.ts`: public server route returning safe JSON.
- `src/lib/server/github.ts`: GitHub fetch and pagination.
- `src/lib/server/groq.ts`: Groq request wrapper.
- `src/lib/server/project-enrichment.ts`: prompt, schema normalization and fallback enrichment.
- `src/lib/projects/types.ts`: shared safe types consumed by UI and tests.
- `src/lib/projects/overrides.ts`: local curation controls for featured, hidden and pinned copy.

The route can be public because it returns only portfolio-safe data. The sensitive work happens behind the route.

## AI Enrichment

Groq/Llama generates professional metadata for each repository:

- `summary`: short professional summary.
- `category`: Web, Automação, Infra, Base técnica or Experimentos.
- `problem`: what the repository appears to solve.
- `technicalDecision`: implementation/technical angle.
- `nextStep`: sensible next improvement.
- `maturity`: Production-minded, Prototype, Study, Experiment or Archived.
- `featuredReason`: why it should or should not be featured.
- `tags`: small stack/domain labels.

The prompt must instruct the model to avoid inflated claims. If a repository has little information, the result should say so professionally rather than inventing details.

## Caching Strategy

Default cache TTL: 6 hours, controlled by `PROJECTS_CACHE_TTL_SECONDS`.

V1 will use a module-level server cache keyed by owner, Groq model, prompt/schema version and repository update metadata. The cache is best-effort in serverless environments because cold starts or multiple instances can refresh independently. That is acceptable for the landing page because GitHub and Groq fallbacks keep the UI available.

No database is required for V1.

The cache key should include:

- GitHub owner.
- Groq model.
- Prompt/schema version.
- Repository `updated_at` values or a GitHub fetch timestamp.

If Groq fails, the route should still return GitHub-derived fallback data. The projects section should degrade gracefully instead of breaking the landing page.

## Front-End Components

Replace the current fixed `ProjectBento` behavior with a richer project surface:

- `FeaturedProjects`: professional case cards for curated repos.
- `RepositoryExplorer`: all public repos with search/filter/sort.
- `ProjectCard`: compact card with language, update, repo stats and AI summary.
- `ProjectMetaBar`: small metrics row for stars, forks, language and updated date.
- `ProjectEmptyState`: polished state for filters with no results.

The page should avoid loading spinners that feel like a SaaS dashboard. For the landing, use server-rendered cached data when possible and use quiet skeleton states only for client-side filter/search transitions.

## Manual Overrides

AI should assist, not fully control the professional narrative. V1 includes a small local override file:

- force featured repos;
- hide noisy repos;
- rename display categories;
- pin stronger copy for important projects.

This avoids the portfolio looking random when GitHub contains experiments, forks or old study repositories. Overrides are not secrets and can be committed.

## Error Handling

GitHub failure:
- Return a clear fallback payload if cached data exists.
- If no cache exists, return an empty safe list plus a non-sensitive status.

Groq failure:
- Return GitHub-only summaries.
- Mark enrichment status as unavailable internally.
- Do not expose provider errors, keys, prompts or raw stack traces to the browser.

Invalid AI JSON:
- Retry once with a repair prompt or parse fallback.
- If still invalid, use deterministic fallback copy.

## Security

- Never expose `GROQ_API_KEY`, `GITHUB_TOKEN`, prompt templates or provider errors in client code.
- Never prefix secrets with `NEXT_PUBLIC_`.
- Keep Groq and GitHub wrappers in server-only modules.
- Return only whitelisted fields from `/api/projects`.
- Treat repository README/content as untrusted input inside prompts.
- Do not let model output create raw HTML.

## Testing

Unit/integration coverage should verify:

- GitHub normalization handles empty descriptions, missing language and archived repos.
- Groq enrichment parser rejects invalid or unsafe shapes.
- `/api/projects` returns only safe fields.
- UI renders featured projects and all repos.
- Filters, search and empty states work.
- No secret-like values appear in rendered output.

Manual QA:

- Desktop and mobile screenshots.
- Console has no relevant errors.
- No horizontal overflow.
- CTA links open GitHub.
- Loading/fallback states are polished.

## Rollout

1. Add server types and GitHub fetcher.
2. Add Groq enrichment and safe schema validation.
3. Add cached `/api/projects` route.
4. Build the new project UI with featured + all repos.
5. Add local override mechanism if GitHub data needs curation.
6. Replace fixed local project data only after the dynamic route is reliable.

## Out Of Scope For This Iteration

- Admin dashboard.
- Database persistence.
- Private repositories.
- User comments, likes or analytics.
- Automatic deployment configuration.
- Blog/course/mini-app routes.
