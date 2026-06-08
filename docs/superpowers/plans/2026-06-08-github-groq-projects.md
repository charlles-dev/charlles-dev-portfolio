# GitHub Groq Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional projects section that shows curated featured repositories plus all public GitHub repositories enriched server-side with Groq/Llama.

**Architecture:** Add a server-only GitHub/Groq pipeline behind `/api/projects`, protected by environment variables and a module-level cache. The browser receives only a safe JSON payload and renders a richer project showcase with featured cases, filters, search, metadata and fallback data from the current local project list.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS, native `fetch`, Vitest, Testing Library, GitHub REST API, Groq OpenAI-compatible chat completions.

---

## File Structure

- Create `src/lib/projects/types.ts`: shared public/safe project payload types.
- Create `src/lib/projects/overrides.ts`: committed curation controls for featured, hidden and pinned copy.
- Create `src/lib/projects/fallback.ts`: converts existing local `projects` data into the safe payload shape.
- Create `src/lib/server/github.ts`: server-only GitHub public repository fetcher and normalizer.
- Create `src/lib/server/groq.ts`: server-only Groq batch request wrapper.
- Create `src/lib/server/project-enrichment.ts`: prompt version, response parsing, fallback enrichment and final project composition.
- Create `src/lib/server/projects-service.ts`: cache orchestration and `getPortfolioProjects`.
- Create `src/app/api/projects/route.ts`: public route returning safe JSON only.
- Create `src/components/projects/project-showcase.tsx`: client component for featured projects, all repositories, search and filters.
- Modify `src/app/page.tsx`: replace `ProjectBento` usage with `ProjectShowcase` and pass initial fallback payload.
- Modify `src/components/icon-glyph.tsx`: add any missing icons required by the richer cards.
- Add tests under `src/test/`: `github-projects.test.ts`, `project-enrichment.test.ts`, `projects-service.test.ts`, `projects-route.test.ts`, and update `page.test.tsx`.

## Task 1: Shared Project Types And Local Overrides

**Files:**
- Create: `src/lib/projects/types.ts`
- Create: `src/lib/projects/overrides.ts`
- Test: `src/test/project-overrides.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/test/project-overrides.test.ts`:

```ts
import { getProjectOverride, projectOverrides } from "@/lib/projects/overrides";
import { projectCategories, projectMaturities } from "@/lib/projects/types";

describe("project overrides", () => {
  it("defines stable public project enums", () => {
    expect(projectCategories).toEqual([
      "web",
      "automation",
      "infra",
      "technical-base",
      "experiment"
    ]);
    expect(projectMaturities).toEqual([
      "production-minded",
      "prototype",
      "study",
      "experiment",
      "archived"
    ]);
  });

  it("curates the known strongest repositories", () => {
    expect(getProjectOverride("Astrolink")).toMatchObject({
      featured: true,
      order: 1,
      category: "infra"
    });
    expect(getProjectOverride("Laudos-Proxxima")).toMatchObject({
      featured: true,
      order: 2,
      category: "automation"
    });
    expect(Object.keys(projectOverrides).length).toBeGreaterThanOrEqual(3);
  });

  it("normalizes repo names when looking up overrides", () => {
    expect(getProjectOverride("3035-TEACH")).toMatchObject({
      featured: true,
      category: "technical-base"
    });
    expect(getProjectOverride("unknown-repo")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```powershell
npm test -- src/test/project-overrides.test.ts
```

Expected: FAIL because `src/lib/projects/types.ts` and `src/lib/projects/overrides.ts` do not exist yet.

- [ ] **Step 3: Add shared types**

Create `src/lib/projects/types.ts`:

```ts
export const projectCategories = [
  "web",
  "automation",
  "infra",
  "technical-base",
  "experiment"
] as const;

export type PortfolioProjectCategory = (typeof projectCategories)[number];

export const projectMaturities = [
  "production-minded",
  "prototype",
  "study",
  "experiment",
  "archived"
] as const;

export type PortfolioProjectMaturity = (typeof projectMaturities)[number];

export type RepositoryStats = {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
};

export type GitHubRepository = {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  homepage: string;
  language: string;
  topics: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  stats: RepositoryStats;
};

export type ProjectEnrichment = {
  summary: string;
  category: PortfolioProjectCategory;
  problem: string;
  technicalDecision: string;
  nextStep: string;
  maturity: PortfolioProjectMaturity;
  featuredReason: string;
  tags: string[];
};

export type ProjectEnrichmentStatus = "ai" | "fallback" | "override";

export type PortfolioProject = GitHubRepository &
  ProjectEnrichment & {
    displayName: string;
    featured: boolean;
    order: number;
    hidden: boolean;
    source: "github";
    enrichmentStatus: ProjectEnrichmentStatus;
  };

export type ProjectsPayload = {
  owner: string;
  generatedAt: string;
  cache: "hit" | "miss" | "fallback";
  schemaVersion: string;
  featured: PortfolioProject[];
  projects: PortfolioProject[];
};

export type ProjectOverride = Partial<ProjectEnrichment> & {
  displayName?: string;
  featured?: boolean;
  hidden?: boolean;
  order?: number;
};
```

- [ ] **Step 4: Add local overrides**

Create `src/lib/projects/overrides.ts`:

```ts
import type { ProjectOverride } from "@/lib/projects/types";

function normalizeRepoName(name: string) {
  return name.trim().toLowerCase();
}

export const projectOverrides: Record<string, ProjectOverride> = {
  astrolink: {
    featured: true,
    order: 1,
    category: "infra",
    maturity: "prototype",
    summary: "Infraestrutura e software de baixo custo para conectividade em areas remotas.",
    problem: "Pensar acesso a internet em regioes onde custo e disponibilidade sao barreiras reais.",
    technicalDecision: "Organiza a proposta em Go e estrutura a base tecnica para evoluir simulacoes e validacoes.",
    nextStep: "Documentar arquitetura, premissas de rede e etapas de validacao tecnica."
  },
  "laudos-proxxima": {
    featured: true,
    order: 2,
    category: "automation",
    maturity: "prototype",
    summary: "Ferramenta para padronizar e agilizar laudos tecnicos de manutencao.",
    problem: "Laudos repetitivos perdem padrao, contexto e velocidade em rotinas operacionais.",
    technicalDecision: "Usa interface em TypeScript para reduzir retrabalho e organizar preenchimento.",
    nextStep: "Refinar exportacao, validacoes e experiencia de uso em campo."
  },
  "3035-teach": {
    featured: true,
    order: 3,
    category: "technical-base",
    maturity: "study",
    summary: "Repositorio de pratica tecnica em Java com exercicios e estruturas organizadas.",
    problem: "Bases tecnicas precisam ser consultaveis, reutilizaveis e faceis de evoluir.",
    technicalDecision: "Registra exercicios e padroes em Java para consolidar fundamentos.",
    nextStep: "Transformar exemplos em documentacao objetiva e reaproveitavel."
  }
};

export function getProjectOverride(name: string) {
  return projectOverrides[normalizeRepoName(name)];
}
```

- [ ] **Step 5: Verify the task**

Run:

```powershell
npm test -- src/test/project-overrides.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add src/lib/projects/types.ts src/lib/projects/overrides.ts src/test/project-overrides.test.ts
git commit -m "feat: add project payload types and overrides"
```

## Task 2: GitHub Repository Fetcher

**Files:**
- Create: `src/lib/server/github.ts`
- Test: `src/test/github-projects.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/test/github-projects.test.ts`:

```ts
import { fetchGitHubRepositories, normalizeGitHubRepository } from "@/lib/server/github";

const apiRepo = {
  id: 1,
  name: "Astrolink",
  full_name: "charlles-dev/Astrolink",
  html_url: "https://github.com/charlles-dev/Astrolink",
  description: null,
  homepage: null,
  language: "Go",
  topics: ["network"],
  archived: false,
  fork: false,
  private: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  pushed_at: "2026-01-02T00:00:00Z",
  stargazers_count: 2,
  forks_count: 1,
  watchers_count: 2,
  open_issues_count: 0
};

describe("GitHub project fetcher", () => {
  it("normalizes GitHub repository fields into safe camelCase data", () => {
    expect(normalizeGitHubRepository(apiRepo)).toMatchObject({
      id: 1,
      name: "Astrolink",
      fullName: "charlles-dev/Astrolink",
      htmlUrl: "https://github.com/charlles-dev/Astrolink",
      description: "",
      homepage: "",
      language: "Go",
      stats: {
        stars: 2,
        forks: 1,
        watchers: 2,
        openIssues: 0
      }
    });
  });

  it("fetches public repos with the server-side GitHub token header when provided", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify([apiRepo]), {
        status: 200,
        headers: { "content-type": "application/json" }
      })
    );

    const repos = await fetchGitHubRepositories({
      owner: "charlles-dev",
      token: "ghp_secret",
      fetchImpl: fetchMock
    });

    expect(repos).toHaveLength(1);
    expect(repos[0].name).toBe("Astrolink");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/users/charlles-dev/repos?per_page=100&page=1&sort=updated&type=public",
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer ghp_secret"
        })
      })
    );
  });

  it("throws a sanitized error when GitHub fails", async () => {
    const fetchMock = vi.fn(async () => new Response("rate limit", { status: 403 }));

    await expect(
      fetchGitHubRepositories({
        owner: "charlles-dev",
        fetchImpl: fetchMock
      })
    ).rejects.toThrow("GitHub repositories request failed with status 403");
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```powershell
npm test -- src/test/github-projects.test.ts
```

Expected: FAIL because `src/lib/server/github.ts` does not exist.

- [ ] **Step 3: Implement the fetcher**

Create `src/lib/server/github.ts`:

```ts
import "server-only";

import type { GitHubRepository } from "@/lib/projects/types";

type FetchLike = typeof fetch;

type GitHubRepositoryApi = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
};

export function normalizeGitHubRepository(repo: GitHubRepositoryApi): GitHubRepository {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    description: repo.description ?? "",
    homepage: repo.homepage ?? "",
    language: repo.language ?? "Unknown",
    topics: repo.topics ?? [],
    archived: repo.archived,
    fork: repo.fork,
    private: repo.private,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at ?? repo.updated_at,
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count
    }
  };
}

export async function fetchGitHubRepositories({
  owner,
  token,
  fetchImpl = fetch
}: {
  owner: string;
  token?: string;
  fetchImpl?: FetchLike;
}) {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28"
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const repos: GitHubRepository[] = [];
  let page = 1;

  while (page <= 10) {
    const url = `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}&sort=updated&type=public`;
    const response = await fetchImpl(url, { headers, next: { revalidate: 300 } } as RequestInit);

    if (!response.ok) {
      throw new Error(`GitHub repositories request failed with status ${response.status}`);
    }

    const data = (await response.json()) as GitHubRepositoryApi[];
    repos.push(...data.map(normalizeGitHubRepository));

    if (data.length < 100) {
      break;
    }

    page += 1;
  }

  return repos.filter((repo) => !repo.private);
}
```

- [ ] **Step 4: Verify the task**

Run:

```powershell
npm test -- src/test/github-projects.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add src/lib/server/github.ts src/test/github-projects.test.ts
git commit -m "feat: fetch public github repositories"
```

## Task 3: Groq Enrichment Parser And Fallbacks

**Files:**
- Create: `src/lib/server/project-enrichment.ts`
- Create: `src/lib/server/groq.ts`
- Test: `src/test/project-enrichment.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/test/project-enrichment.test.ts`:

```ts
import {
  PROJECT_ENRICHMENT_SCHEMA_VERSION,
  buildEnrichmentPrompt,
  createFallbackEnrichment,
  parseGroqEnrichmentResponse,
  toPortfolioProject
} from "@/lib/server/project-enrichment";

const repo = {
  id: 1,
  name: "Astrolink",
  fullName: "charlles-dev/Astrolink",
  htmlUrl: "https://github.com/charlles-dev/Astrolink",
  description: "Low-cost connectivity",
  homepage: "",
  language: "Go",
  topics: ["network"],
  archived: false,
  fork: false,
  private: false,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
  pushedAt: "2026-01-02T00:00:00Z",
  stats: {
    stars: 2,
    forks: 1,
    watchers: 2,
    openIssues: 0
  }
};

describe("project enrichment", () => {
  it("builds a prompt that avoids inflated claims and raw html", () => {
    const prompt = buildEnrichmentPrompt([repo]);

    expect(PROJECT_ENRICHMENT_SCHEMA_VERSION).toBe("github-groq-projects-v1");
    expect(prompt.messages[0].content).toContain("Do not invent production usage");
    expect(prompt.messages[0].content).toContain("Return JSON only");
    expect(prompt.messages[1].content).toContain("Astrolink");
  });

  it("parses valid Groq JSON into repo-keyed enrichment", () => {
    const parsed = parseGroqEnrichmentResponse(
      JSON.stringify({
        repositories: [
          {
            name: "Astrolink",
            summary: "Infra project for remote connectivity.",
            category: "infra",
            problem: "Remote areas need cheaper connectivity options.",
            technicalDecision: "Uses Go to structure connectivity logic.",
            nextStep: "Document network assumptions.",
            maturity: "prototype",
            featuredReason: "Strong applied infrastructure signal.",
            tags: ["Go", "network"]
          }
        ]
      })
    );

    expect(parsed.astrolink).toMatchObject({
      category: "infra",
      maturity: "prototype",
      tags: ["Go", "network"]
    });
  });

  it("rejects unsafe or invalid Groq JSON", () => {
    expect(parseGroqEnrichmentResponse("<script>alert(1)</script>")).toEqual({});
    expect(
      parseGroqEnrichmentResponse(
        JSON.stringify({
          repositories: [{ name: "Astrolink", category: "made-up" }]
        })
      )
    ).toEqual({});
  });

  it("creates professional fallback copy without AI", () => {
    expect(createFallbackEnrichment(repo)).toMatchObject({
      summary: "Repositorio em Go com foco em Low-cost connectivity",
      category: "infra",
      maturity: "prototype"
    });
  });

  it("applies overrides and produces safe portfolio projects", () => {
    const project = toPortfolioProject(repo, createFallbackEnrichment(repo), {
      featured: true,
      order: 1,
      summary: "Pinned summary."
    });

    expect(project).toMatchObject({
      displayName: "Astrolink",
      featured: true,
      order: 1,
      summary: "Pinned summary.",
      source: "github",
      enrichmentStatus: "override"
    });
    expect(Object.keys(project)).not.toContain("apiKey");
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```powershell
npm test -- src/test/project-enrichment.test.ts
```

Expected: FAIL because the enrichment files do not exist.

- [ ] **Step 3: Implement enrichment helpers**

Create `src/lib/server/project-enrichment.ts`:

```ts
import "server-only";

import type {
  GitHubRepository,
  PortfolioProject,
  PortfolioProjectCategory,
  PortfolioProjectMaturity,
  ProjectEnrichment,
  ProjectOverride
} from "@/lib/projects/types";

export const PROJECT_ENRICHMENT_SCHEMA_VERSION = "github-groq-projects-v1";

const validCategories = new Set<PortfolioProjectCategory>([
  "web",
  "automation",
  "infra",
  "technical-base",
  "experiment"
]);

const validMaturities = new Set<PortfolioProjectMaturity>([
  "production-minded",
  "prototype",
  "study",
  "experiment",
  "archived"
]);

export function projectKey(name: string) {
  return name.trim().toLowerCase();
}

function plainText(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 320) || fallback;
}

function cleanTags(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => plainText(tag, ""))
    .filter(Boolean)
    .slice(0, 6);
}

export function inferCategory(repo: GitHubRepository): PortfolioProjectCategory {
  const haystack = `${repo.name} ${repo.description} ${repo.language} ${repo.topics.join(" ")}`.toLowerCase();

  if (haystack.includes("laudo") || haystack.includes("automation") || haystack.includes("automacao")) {
    return "automation";
  }

  if (haystack.includes("astro") || haystack.includes("network") || haystack.includes("infra")) {
    return "infra";
  }

  if (haystack.includes("teach") || haystack.includes("java") || haystack.includes("study")) {
    return "technical-base";
  }

  if (["typescript", "javascript", "react", "next.js"].includes(repo.language.toLowerCase())) {
    return "web";
  }

  return "experiment";
}

export function createFallbackEnrichment(repo: GitHubRepository): ProjectEnrichment {
  const topic = repo.description || `projeto publico ${repo.name}`;

  return {
    summary: `Repositorio em ${repo.language} com foco em ${topic}`,
    category: inferCategory(repo),
    problem: repo.description || "O repositorio ainda tem pouca descricao publica para inferir o problema com precisao.",
    technicalDecision: `Base tecnica publicada em ${repo.language}, com historico e codigo acessiveis no GitHub.`,
    nextStep: "Melhorar README, escopo, exemplos de uso e proximas etapas tecnicas.",
    maturity: repo.archived ? "archived" : repo.description ? "prototype" : "experiment",
    featuredReason: "Pode compor o repertorio publico, mas precisa de contexto para virar case forte.",
    tags: [repo.language, ...repo.topics].filter(Boolean).slice(0, 6)
  };
}

export function buildEnrichmentPrompt(repositories: GitHubRepository[]) {
  return {
    messages: [
      {
        role: "system",
        content:
          "You write concise Brazilian Portuguese portfolio metadata for public GitHub repositories. Return JSON only. Do not invent production usage, clients, impact numbers, private context, or facts not supported by the metadata. Do not output HTML."
      },
      {
        role: "user",
        content: JSON.stringify({
          schemaVersion: PROJECT_ENRICHMENT_SCHEMA_VERSION,
          outputShape: {
            repositories: [
              {
                name: "repository name",
                summary: "short professional summary",
                category: "web | automation | infra | technical-base | experiment",
                problem: "problem the repository appears to address",
                technicalDecision: "technical angle or implementation decision",
                nextStep: "sensible next improvement",
                maturity: "production-minded | prototype | study | experiment | archived",
                featuredReason: "why it should or should not be highlighted",
                tags: ["short", "labels"]
              }
            ]
          },
          repositories: repositories.map((repo) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            topics: repo.topics,
            archived: repo.archived,
            fork: repo.fork,
            updatedAt: repo.updatedAt,
            stars: repo.stats.stars,
            forks: repo.stats.forks
          }))
        })
      }
    ]
  } as const;
}

export function parseGroqEnrichmentResponse(content: string): Record<string, ProjectEnrichment> {
  try {
    const parsed = JSON.parse(content) as { repositories?: Array<Record<string, unknown>> };

    if (!Array.isArray(parsed.repositories)) {
      return {};
    }

    return parsed.repositories.reduce<Record<string, ProjectEnrichment>>((acc, item) => {
      const name = plainText(item.name, "");
      const category = item.category;
      const maturity = item.maturity;

      if (!name || !validCategories.has(category as PortfolioProjectCategory)) {
        return acc;
      }

      if (!validMaturities.has(maturity as PortfolioProjectMaturity)) {
        return acc;
      }

      acc[projectKey(name)] = {
        summary: plainText(item.summary, "Resumo publico indisponivel."),
        category: category as PortfolioProjectCategory,
        problem: plainText(item.problem, "Problema publico pouco documentado."),
        technicalDecision: plainText(item.technicalDecision, "Decisao tecnica nao descrita publicamente."),
        nextStep: plainText(item.nextStep, "Melhorar documentacao e exemplos de uso."),
        maturity: maturity as PortfolioProjectMaturity,
        featuredReason: plainText(item.featuredReason, "Repositorio publico do portfólio."),
        tags: cleanTags(item.tags, [])
      };

      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function toPortfolioProject(
  repo: GitHubRepository,
  enrichment: ProjectEnrichment,
  override: ProjectOverride = {}
): PortfolioProject {
  const merged = { ...enrichment, ...override };
  const overrideTouchedCopy = Boolean(
    override.summary || override.problem || override.technicalDecision || override.nextStep || override.category
  );

  return {
    ...repo,
    ...merged,
    displayName: override.displayName ?? repo.name,
    featured: override.featured ?? false,
    order: override.order ?? 1000,
    hidden: override.hidden ?? false,
    source: "github",
    enrichmentStatus: overrideTouchedCopy ? "override" : "fallback"
  };
}
```

- [ ] **Step 4: Implement Groq wrapper**

Create `src/lib/server/groq.ts`:

```ts
import "server-only";

import type { GitHubRepository, ProjectEnrichment } from "@/lib/projects/types";
import { buildEnrichmentPrompt, parseGroqEnrichmentResponse } from "@/lib/server/project-enrichment";

type FetchLike = typeof fetch;

type GroqChatCompletion = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function enrichRepositoriesWithGroq({
  repositories,
  apiKey,
  model,
  fetchImpl = fetch
}: {
  repositories: GitHubRepository[];
  apiKey?: string;
  model?: string;
  fetchImpl?: FetchLike;
}): Promise<Record<string, ProjectEnrichment>> {
  if (!apiKey || repositories.length === 0) {
    return {};
  }

  const prompt = buildEnrichmentPrompt(repositories);
  const response = await fetchImpl("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: model || "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: prompt.messages
    })
  });

  if (!response.ok) {
    throw new Error(`Groq enrichment request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GroqChatCompletion;
  const content = data.choices?.[0]?.message?.content ?? "";

  return parseGroqEnrichmentResponse(content);
}
```

- [ ] **Step 5: Verify the task**

Run:

```powershell
npm test -- src/test/project-enrichment.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add src/lib/server/project-enrichment.ts src/lib/server/groq.ts src/test/project-enrichment.test.ts
git commit -m "feat: add groq project enrichment"
```

## Task 4: Projects Service, Cache And Route

**Files:**
- Create: `src/lib/server/projects-service.ts`
- Create: `src/app/api/projects/route.ts`
- Test: `src/test/projects-service.test.ts`
- Test: `src/test/projects-route.test.ts`

- [ ] **Step 1: Write service tests**

Create `src/test/projects-service.test.ts`:

```ts
import { getPortfolioProjects, resetProjectsCacheForTests } from "@/lib/server/projects-service";

const repo = {
  id: 1,
  name: "Astrolink",
  full_name: "charlles-dev/Astrolink",
  html_url: "https://github.com/charlles-dev/Astrolink",
  description: "Low-cost connectivity",
  homepage: "",
  language: "Go",
  topics: ["network"],
  archived: false,
  fork: false,
  private: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  pushed_at: "2026-01-02T00:00:00Z",
  stargazers_count: 2,
  forks_count: 1,
  watchers_count: 2,
  open_issues_count: 0
};

describe("projects service", () => {
  beforeEach(() => {
    resetProjectsCacheForTests();
  });

  it("returns safe enriched projects and featured repos", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([repo]), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    repositories: [
                      {
                        name: "Astrolink",
                        summary: "Infra project.",
                        category: "infra",
                        problem: "Remote connectivity.",
                        technicalDecision: "Go base.",
                        nextStep: "Document assumptions.",
                        maturity: "prototype",
                        featuredReason: "Strong infra signal.",
                        tags: ["Go", "network"]
                      }
                    ]
                  })
                }
              }
            ]
          }),
          { status: 200 }
        )
      );

    const payload = await getPortfolioProjects({
      env: {
        GROQ_API_KEY: "groq_secret",
        GROQ_MODEL: "llama-test",
        GITHUB_OWNER: "charlles-dev",
        PROJECTS_CACHE_TTL_SECONDS: "21600"
      },
      fetchImpl: fetchMock
    });

    expect(payload.owner).toBe("charlles-dev");
    expect(payload.cache).toBe("miss");
    expect(payload.projects).toHaveLength(1);
    expect(payload.featured[0].name).toBe("Astrolink");
    expect(JSON.stringify(payload)).not.toContain("groq_secret");
  });

  it("uses fallback data when Groq fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([repo]), { status: 200 }))
      .mockResolvedValueOnce(new Response("bad", { status: 500 }));

    const payload = await getPortfolioProjects({
      env: {
        GROQ_API_KEY: "groq_secret",
        GITHUB_OWNER: "charlles-dev"
      },
      fetchImpl: fetchMock
    });

    expect(payload.cache).toBe("fallback");
    expect(payload.projects[0].summary).toContain("Repositorio em Go");
  });

  it("returns cached payload on repeated calls", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify([repo]), { status: 200 }));

    const first = await getPortfolioProjects({
      env: { GITHUB_OWNER: "charlles-dev", PROJECTS_CACHE_TTL_SECONDS: "21600" },
      fetchImpl: fetchMock
    });
    const second = await getPortfolioProjects({
      env: { GITHUB_OWNER: "charlles-dev", PROJECTS_CACHE_TTL_SECONDS: "21600" },
      fetchImpl: fetchMock
    });

    expect(first.cache).toBe("miss");
    expect(second.cache).toBe("hit");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Write route tests**

Create `src/test/projects-route.test.ts`:

```ts
import { GET } from "@/app/api/projects/route";
import { resetProjectsCacheForTests } from "@/lib/server/projects-service";

const repo = {
  id: 1,
  name: "Astrolink",
  full_name: "charlles-dev/Astrolink",
  html_url: "https://github.com/charlles-dev/Astrolink",
  description: "Low-cost connectivity",
  homepage: "",
  language: "Go",
  topics: [],
  archived: false,
  fork: false,
  private: false,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  pushed_at: "2026-01-02T00:00:00Z",
  stargazers_count: 0,
  forks_count: 0,
  watchers_count: 0,
  open_issues_count: 0
};

describe("/api/projects", () => {
  beforeEach(() => {
    resetProjectsCacheForTests();
    vi.stubEnv("GITHUB_OWNER", "charlles-dev");
    vi.stubEnv("GROQ_API_KEY", "");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify([repo]), { status: 200 })));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns safe public project json", async () => {
    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.projects[0].name).toBe("Astrolink");
    expect(JSON.stringify(payload)).not.toContain("GROQ_API_KEY");
    expect(JSON.stringify(payload)).not.toContain("GITHUB_TOKEN");
    expect(response.headers.get("cache-control")).toContain("s-maxage");
  });
});
```

- [ ] **Step 3: Run the failing tests**

Run:

```powershell
npm test -- src/test/projects-service.test.ts src/test/projects-route.test.ts
```

Expected: FAIL because service and route do not exist.

- [ ] **Step 4: Implement the service**

Create `src/lib/server/projects-service.ts`:

```ts
import "server-only";

import { getProjectOverride } from "@/lib/projects/overrides";
import type { ProjectsPayload } from "@/lib/projects/types";
import { enrichRepositoriesWithGroq } from "@/lib/server/groq";
import { fetchGitHubRepositories } from "@/lib/server/github";
import {
  PROJECT_ENRICHMENT_SCHEMA_VERSION,
  createFallbackEnrichment,
  projectKey,
  toPortfolioProject
} from "@/lib/server/project-enrichment";

type FetchLike = typeof fetch;

type ServiceEnv = Record<string, string | undefined>;

let cache:
  | {
      expiresAt: number;
      payload: ProjectsPayload;
    }
  | undefined;

function ttlSeconds(env: ServiceEnv) {
  const parsed = Number(env.PROJECTS_CACHE_TTL_SECONDS ?? "21600");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 21600;
}

function sortProjects(projects: ProjectsPayload["projects"]) {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function resetProjectsCacheForTests() {
  cache = undefined;
}

export async function getPortfolioProjects({
  env = process.env,
  fetchImpl = fetch
}: {
  env?: ServiceEnv;
  fetchImpl?: FetchLike;
} = {}): Promise<ProjectsPayload> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return { ...cache.payload, cache: "hit" };
  }

  const owner = env.GITHUB_OWNER || "charlles-dev";
  const repositories = await fetchGitHubRepositories({
    owner,
    token: env.GITHUB_TOKEN,
    fetchImpl
  });
  const publicRepos = repositories.filter((repo) => !repo.fork || Boolean(getProjectOverride(repo.name)));

  let aiByRepo: Awaited<ReturnType<typeof enrichRepositoriesWithGroq>> = {};
  let cacheState: ProjectsPayload["cache"] = "miss";

  try {
    aiByRepo = await enrichRepositoriesWithGroq({
      repositories: publicRepos,
      apiKey: env.GROQ_API_KEY,
      model: env.GROQ_MODEL,
      fetchImpl
    });
  } catch {
    cacheState = "fallback";
  }

  const projects = sortProjects(
    publicRepos
      .map((repo) => {
        const override = getProjectOverride(repo.name);
        const enrichment = aiByRepo[projectKey(repo.name)] ?? createFallbackEnrichment(repo);
        return toPortfolioProject(repo, enrichment, override);
      })
      .filter((project) => !project.hidden)
  );

  const payload: ProjectsPayload = {
    owner,
    generatedAt: new Date(now).toISOString(),
    cache: cacheState,
    schemaVersion: PROJECT_ENRICHMENT_SCHEMA_VERSION,
    featured: projects.filter((project) => project.featured).slice(0, 5),
    projects
  };

  cache = {
    expiresAt: now + ttlSeconds(env) * 1000,
    payload
  };

  return payload;
}
```

- [ ] **Step 5: Implement the route**

Create `src/app/api/projects/route.ts`:

```ts
import { getPortfolioProjects } from "@/lib/server/projects-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPortfolioProjects();

    return Response.json(payload, {
      headers: {
        "cache-control": "public, s-maxage=300, stale-while-revalidate=3600"
      }
    });
  } catch {
    return Response.json(
      {
        owner: process.env.GITHUB_OWNER || "charlles-dev",
        generatedAt: new Date().toISOString(),
        cache: "fallback",
        schemaVersion: "github-groq-projects-v1",
        featured: [],
        projects: []
      },
      {
        status: 200,
        headers: {
          "cache-control": "public, s-maxage=60, stale-while-revalidate=300"
        }
      }
    );
  }
}
```

- [ ] **Step 6: Verify the task**

Run:

```powershell
npm test -- src/test/projects-service.test.ts src/test/projects-route.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 7: Commit**

Run:

```powershell
git add src/lib/server/projects-service.ts src/app/api/projects/route.ts src/test/projects-service.test.ts src/test/projects-route.test.ts
git commit -m "feat: add cached projects api route"
```

## Task 5: Fallback Payload From Current Local Projects

**Files:**
- Create: `src/lib/projects/fallback.ts`
- Test: `src/test/projects-fallback.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/test/projects-fallback.test.ts`:

```ts
import { fallbackProjectsPayload } from "@/lib/projects/fallback";

describe("fallback projects payload", () => {
  it("converts current curated projects into the new safe payload shape", () => {
    expect(fallbackProjectsPayload.owner).toBe("charlles-dev");
    expect(fallbackProjectsPayload.featured.map((project) => project.name)).toEqual([
      "Astrolink",
      "Laudos Proxxima",
      "3035 Teach"
    ]);
    expect(fallbackProjectsPayload.projects.every((project) => project.source === "github")).toBe(true);
    expect(JSON.stringify(fallbackProjectsPayload)).not.toContain("GROQ_API_KEY");
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```powershell
npm test -- src/test/projects-fallback.test.ts
```

Expected: FAIL because `src/lib/projects/fallback.ts` does not exist.

- [ ] **Step 3: Implement fallback conversion**

Create `src/lib/projects/fallback.ts`:

```ts
import { projects } from "@/lib/portfolio";
import type { PortfolioProject, ProjectsPayload } from "@/lib/projects/types";

function fallbackProject(project: (typeof projects)[number], index: number): PortfolioProject {
  return {
    id: index + 1,
    name: project.name,
    displayName: project.name,
    fullName: `charlles-dev/${project.name}`,
    htmlUrl: project.href,
    description: project.description,
    homepage: "",
    language: project.language,
    topics: [project.categoryLabel, project.focus].filter(Boolean),
    archived: false,
    fork: false,
    private: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    pushedAt: "2026-01-01T00:00:00.000Z",
    stats: {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0
    },
    summary: project.description,
    category:
      project.category === "automation"
        ? "automation"
        : project.category === "infra"
          ? "infra"
          : "technical-base",
    problem: project.problem,
    technicalDecision: project.built,
    nextStep: project.next,
    maturity: "prototype",
    featuredReason: "Projeto curado manualmente para a primeira versao do portfolio.",
    tags: [project.language, project.categoryLabel],
    featured: true,
    order: index + 1,
    hidden: false,
    source: "github",
    enrichmentStatus: "override"
  };
}

const fallbackProjects = projects.map(fallbackProject);

export const fallbackProjectsPayload: ProjectsPayload = {
  owner: "charlles-dev",
  generatedAt: "2026-01-01T00:00:00.000Z",
  cache: "fallback",
  schemaVersion: "local-fallback-v1",
  featured: fallbackProjects,
  projects: fallbackProjects
};
```

- [ ] **Step 4: Verify the task**

Run:

```powershell
npm test -- src/test/projects-fallback.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add src/lib/projects/fallback.ts src/test/projects-fallback.test.ts
git commit -m "feat: add local projects fallback payload"
```

## Task 6: Professional Projects UI

**Files:**
- Create: `src/components/projects/project-showcase.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Update page tests first**

Modify the projects tests in `src/test/page.test.tsx` to assert the new UX while still using fallback data:

```ts
  it("renders featured projects and the public repository explorer", () => {
    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    expect(within(projects).getByText(/Projetos em destaque/i)).toBeInTheDocument();
    expect(within(projects).getByText(/Todos os reposit.rios p.blicos/i)).toBeInTheDocument();
    expect(within(projects).getByRole("link", { name: /Astrolink/i })).toHaveAttribute(
      "href",
      "https://github.com/charlles-dev/Astrolink"
    );
    expect(within(projects).getByPlaceholderText(/Buscar por nome/i)).toBeInTheDocument();
    expect(within(projects).getByText(/Problema/i)).toBeInTheDocument();
    expect(within(projects).getByText(/Decis.o t.cnica/i)).toBeInTheDocument();
    expect(within(projects).getByText(/Pr.ximo passo/i)).toBeInTheDocument();
  });

  it("filters and searches repositories with client-side state", () => {
    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });
    const search = within(projects).getByPlaceholderText(/Buscar por nome/i);

    fireEvent.change(search, { target: { value: "Laudos" } });

    expect(within(projects).getByRole("link", { name: /Laudos Proxxima/i })).toBeInTheDocument();
    expect(within(projects).queryByRole("link", { name: /Astrolink/i })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "sem resultado real" } });

    expect(within(projects).getByText(/Nenhum reposit.rio encontrado/i)).toBeInTheDocument();
  });
```

Remove the old assertions that require exactly 3 "Problema", "Decisao tecnica" and "Proximo passo" labels.

- [ ] **Step 2: Run the failing page tests**

Run:

```powershell
npm test -- src/test/page.test.tsx
```

Expected: FAIL because `ProjectShowcase` does not exist and `ProjectBento` still renders the old UI.

- [ ] **Step 3: Add the project showcase client component**

Create `src/components/projects/project-showcase.tsx`:

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioProject, PortfolioProjectCategory, ProjectsPayload } from "@/lib/projects/types";

const categoryLabels: Record<PortfolioProjectCategory | "all", string> = {
  all: "Todos",
  web: "Web",
  automation: "Automacao",
  infra: "Infra",
  "technical-base": "Base tecnica",
  experiment: "Experimentos"
};

function ProjectMetaBar({ project }: { project: PortfolioProject }) {
  return (
    <div className="flex flex-wrap gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/42">
      <span>{project.language}</span>
      <span>/</span>
      <span>{project.stats.stars} stars</span>
      <span>/</span>
      <span>{new Date(project.updatedAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}</span>
    </div>
  );
}

function FeaturedProjects({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {projects.map((project, index) => (
        <a
          className={`project-shimmer group relative isolate overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07100d]/82 p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
            index === 0 ? "lg:col-span-7" : "lg:col-span-5"
          }`}
          href={project.htmlUrl}
          key={project.fullName}
          rel="noreferrer"
          target="_blank"
        >
          <span className="absolute right-5 top-4 font-mono text-[5rem] font-bold leading-none text-white/[0.035]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="relative z-10">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Projeto em destaque
            </p>
            <h3 className="mt-8 text-[2.6rem] font-semibold leading-none text-white sm:text-[4rem]">
              {project.displayName}
            </h3>
            <p className="mt-5 max-w-[680px] text-[1rem] leading-7 text-white/60">{project.summary}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Problema", project.problem],
                ["Decisao tecnica", project.technicalDecision],
                ["Proximo passo", project.nextStep]
              ].map(([label, value]) => (
                <div className="border-t border-white/10 pt-4" key={label}>
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/34">
                    {label}
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-6 text-white/56">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <ProjectMetaBar project={project} />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[0.82rem] font-semibold text-accent">
                Ver GitHub
                <IconGlyph name="external-link" className="size-4" />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function RepositoryCard({ project }: { project: PortfolioProject }) {
  return (
    <a
      className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/45 hover:bg-accent/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      href={project.htmlUrl}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
            {categoryLabels[project.category]}
          </p>
          <h3 className="mt-3 text-[1.3rem] font-semibold text-white">{project.displayName}</h3>
        </div>
        <IconGlyph name="external-link" className="size-4 text-white/36 transition group-hover:text-accent" />
      </div>
      <p className="mt-4 line-clamp-3 text-[0.92rem] leading-6 text-white/56">{project.summary}</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <ProjectMetaBar project={project} />
      </div>
    </a>
  );
}

export function ProjectShowcase({ initialPayload }: { initialPayload: ProjectsPayload }) {
  const [payload, setPayload] = useState(initialPayload);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PortfolioProjectCategory | "all">("all");

  useEffect(() => {
    let alive = true;

    fetch("/api/projects")
      .then((response) => (response.ok ? response.json() : initialPayload))
      .then((nextPayload: ProjectsPayload) => {
        if (alive && nextPayload.projects.length > 0) {
          setPayload(nextPayload);
        }
      })
      .catch(() => {
        if (alive) {
          setPayload(initialPayload);
        }
      });

    return () => {
      alive = false;
    };
  }, [initialPayload]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return payload.projects.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      const searchable = `${project.displayName} ${project.name} ${project.language} ${project.summary} ${project.tags.join(" ")}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, payload.projects, query]);

  return (
    <div className="mt-12 space-y-12">
      <section aria-label="Projetos em destaque">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-[1.35rem] font-semibold text-white">Projetos em destaque</h3>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/42">
            {payload.featured.length} cases
          </p>
        </div>
        <FeaturedProjects projects={payload.featured} />
      </section>

      <section aria-label="Todos os repositorios publicos">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-[1.35rem] font-semibold text-white">Todos os repositorios publicos</h3>
            <p className="mt-2 text-[0.95rem] text-white/48">
              Repos sincronizados com GitHub e enriquecidos no servidor.
            </p>
          </div>
          <input
            className="min-h-12 rounded-full border border-white/10 bg-[#07100d] px-5 text-[0.92rem] text-white outline-none transition placeholder:text-white/30 focus:border-accent"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, stack ou resumo"
            value={query}
          />
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-[#07100d]/88 p-1.5">
          {(Object.keys(categoryLabels) as Array<PortfolioProjectCategory | "all">).map((item) => (
            <button
              aria-pressed={category === item}
              className={`shrink-0 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold transition ${
                category === item ? "bg-white text-[#06100d]" : "text-white/52 hover:bg-white/[0.06] hover:text-white"
              }`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {categoryLabels[item]}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <RepositoryCard key={project.fullName} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-[1.05rem] font-semibold text-white">Nenhum repositorio encontrado</p>
            <p className="mt-2 text-[0.92rem] text-white/50">Ajuste a busca ou escolha outro filtro.</p>
          </div>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Wire the page**

Modify imports in `src/app/page.tsx`:

```ts
import { HeroSignature } from "@/components/hero-signature";
import { IconGlyph, type IconName } from "@/components/icon-glyph";
import { NowSignals } from "@/components/now-signals";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
```

Remove this import:

```ts
import { ProjectBento } from "@/components/project-bento";
```

Modify the `Projects` component body:

```tsx
        <ProjectShowcase initialPayload={fallbackProjectsPayload} />
```

Remove `projects` from the `@/lib/portfolio` destructured import if it is no longer used in `src/app/page.tsx`.

- [ ] **Step 5: Verify the task**

Run:

```powershell
npm test -- src/test/page.test.tsx src/test/projects-fallback.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add src/components/projects/project-showcase.tsx src/app/page.tsx src/test/page.test.tsx
git commit -m "feat: redesign projects section"
```

## Task 7: Route Safety And Secret Exposure Tests

**Files:**
- Modify: `src/test/projects-route.test.ts`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Add route safety assertions**

Append this test to `src/test/projects-route.test.ts`:

```ts
  it("does not expose server-only prompt or secret material", async () => {
    vi.stubEnv("GROQ_API_KEY", "groq_super_secret");
    vi.stubEnv("GITHUB_TOKEN", "github_super_secret");

    const response = await GET();
    const text = await response.text();

    expect(text).not.toContain("groq_super_secret");
    expect(text).not.toContain("github_super_secret");
    expect(text).not.toContain("Do not invent production usage");
    expect(text).not.toContain("authorization");
  });
```

- [ ] **Step 2: Add page safety assertions**

Append these expectations to the existing AI-product chrome test in `src/test/page.test.tsx`:

```ts
    expect(screen.queryByText(/GROQ_API_KEY/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/GITHUB_TOKEN/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Do not invent production usage/i)).not.toBeInTheDocument();
```

- [ ] **Step 3: Verify the task**

Run:

```powershell
npm test -- src/test/projects-route.test.ts src/test/page.test.tsx
npm run lint
```

Expected: PASS.

- [ ] **Step 4: Commit**

Run:

```powershell
git add src/test/projects-route.test.ts src/test/page.test.tsx
git commit -m "test: protect project api secrets"
```

## Task 8: Environment Documentation

**Files:**
- Create: `docs/projects-env.md`

- [ ] **Step 1: Add environment documentation**

Create `docs/projects-env.md`:

```md
# Projects Environment

The GitHub + Groq projects pipeline runs only on the server.

Local development uses `.env.local`, which is ignored by git.

```env
GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.3-70b-versatile
GITHUB_OWNER=charlles-dev
GITHUB_TOKEN=github_public_repo_rate_limit_token
PROJECTS_CACHE_TTL_SECONDS=21600
```

Never use `NEXT_PUBLIC_GROQ_API_KEY` or `NEXT_PUBLIC_GITHUB_TOKEN`.

The browser calls `/api/projects` and receives only safe portfolio JSON.
```

- [ ] **Step 2: Verify docs are tracked**

Run:

```powershell
git status --short docs/projects-env.md
```

Expected: output starts with `?? docs/projects-env.md`.

- [ ] **Step 3: Commit**

Run:

```powershell
git add docs/projects-env.md
git commit -m "docs: document project sync environment"
```

## Task 9: Full Verification And Browser QA

**Files:**
- No source files required unless QA finds a bug.

- [ ] **Step 1: Run full automated checks**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all commands pass.

- [ ] **Step 2: Start production server**

Run:

```powershell
$port = 3001
$connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
foreach ($connection in $connections) {
  $pidToStop = $connection.OwningProcess
  $procInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $pidToStop" -ErrorAction SilentlyContinue
  if ($procInfo.CommandLine -match 'next|node|npm|npx') {
    Stop-Process -Id $pidToStop -Force
  }
}
$logDir = Join-Path $env:TEMP 'charlles-portfolio-next'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$out = Join-Path $logDir 'next-start.out.log'
$err = Join-Path $logDir 'next-start.err.log'
Start-Process -FilePath 'npx.cmd' -ArgumentList @('next','start','--hostname','127.0.0.1','--port','3001') -WorkingDirectory 'C:\Users\charl\OneDrive\Documentos\portifólio' -RedirectStandardOutput $out -RedirectStandardError $err -WindowStyle Hidden | Out-Null
Start-Sleep -Seconds 4
Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress,LocalPort,OwningProcess
```

Expected: port `3001` is listening.

- [ ] **Step 3: Validate `/api/projects` manually**

Run:

```powershell
Invoke-RestMethod http://127.0.0.1:3001/api/projects | Select-Object owner, cache, schemaVersion
```

Expected: output includes `owner` as `charlles-dev`, `cache` as `hit`, `miss` or `fallback`, and no secret values.

- [ ] **Step 4: Browser QA**

Open `http://127.0.0.1:3001/` in the in-app browser and verify:

- Hero still renders.
- Projects section shows "Projetos em destaque".
- Projects section shows "Todos os repositorios publicos".
- Search filters repositories.
- Category filter changes visible cards.
- GitHub links open in new tabs.
- No horizontal overflow on desktop and mobile.
- Console has no relevant errors or warnings.

- [ ] **Step 5: Capture screenshots**

Run:

```powershell
$dir = Join-Path $env:TEMP 'codex-portfolio-github-groq-projects'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
npx playwright screenshot --wait-for-timeout=1000 --viewport-size=1440,900 http://127.0.0.1:3001/#projetos (Join-Path $dir 'projects-desktop.png')
npx playwright screenshot --wait-for-timeout=1000 --viewport-size=390,844 http://127.0.0.1:3001/#projetos (Join-Path $dir 'projects-mobile.png')
```

Expected: screenshots show the new projects section without layout overlap.

- [ ] **Step 6: Final commit**

Run:

```powershell
git status --short
git add src docs
git commit -m "feat: sync and enrich github projects"
```

Only run the final commit after confirming no unrelated user changes are staged. If unrelated files appear in `git status --short`, stage only the files changed by this plan.

## Self-Review

- Spec coverage: The plan covers GitHub sync, Groq/Llama enrichment, server-only secrets, cache, API route, curated featured projects, all public repositories, filters, search, fallback behavior, manual overrides, tests and browser QA.
- Placeholder scan: The plan contains no unfinished markers or open-ended implementation steps.
- Type consistency: `GitHubRepository`, `ProjectEnrichment`, `PortfolioProject` and `ProjectsPayload` are introduced in Task 1 and reused consistently through server, route and UI tasks.
- Scope check: Database persistence, admin UI, private repositories, analytics and other roadmap items remain out of scope for this implementation.
