import "server-only";

import type {
  GitHubRepository,
  PortfolioProject,
  PortfolioProjectCategory,
  PortfolioProjectMaturity,
  ProjectEnrichment,
  ProjectOverride,
} from "@/lib/projects/types";

export const PROJECT_ENRICHMENT_SCHEMA_VERSION = "github-groq-projects-v1";

const categories = [
  "web",
  "automation",
  "infra",
  "technical-base",
  "experiment",
] as const satisfies readonly PortfolioProjectCategory[];

const maturities = [
  "production-minded",
  "prototype",
  "study",
  "experiment",
  "archived",
] as const satisfies readonly PortfolioProjectMaturity[];

const copyFields = [
  "summary",
  "problem",
  "technicalDecision",
  "nextStep",
  "featuredReason",
] as const;

const overrideStatusFields = [
  ...copyFields,
  "category",
  "maturity",
  "tags",
  "displayName",
  "featured",
  "order",
  "hidden",
] as const;

type GroqEnrichmentItem = {
  name?: unknown;
  summary?: unknown;
  category?: unknown;
  problem?: unknown;
  technicalDecision?: unknown;
  nextStep?: unknown;
  maturity?: unknown;
  featuredReason?: unknown;
  tags?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCategory(value: unknown): value is PortfolioProjectCategory {
  return (
    typeof value === "string" &&
    categories.includes(value as PortfolioProjectCategory)
  );
}

function isMaturity(value: unknown): value is PortfolioProjectMaturity {
  return (
    typeof value === "string" &&
    maturities.includes(value as PortfolioProjectMaturity)
  );
}

export function projectKey(name: string): string {
  return name.trim().toLowerCase();
}

function plainText(value: unknown, fallback: string): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 320);

  return cleaned || fallback;
}

function cleanTags(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((tag) => typeof tag === "string")) {
    return [];
  }

  return value
    .map((tag) => plainText(tag, ""))
    .filter(Boolean)
    .slice(0, 6);
}

export function inferCategory(
  repo: GitHubRepository,
): PortfolioProjectCategory {
  const language = repo.language.trim().toLowerCase();
  const searchable = [
    repo.name,
    repo.description,
    repo.language,
    ...repo.topics,
  ]
    .join(" ")
    .toLowerCase();

  if (
    searchable.includes("laudo") ||
    searchable.includes("automation") ||
    searchable.includes("automacao")
  ) {
    return "automation";
  }

  if (
    searchable.includes("astro") ||
    searchable.includes("network") ||
    searchable.includes("infra")
  ) {
    return "infra";
  }

  if (
    ["typescript", "javascript", "react", "next.js", "nextjs"].some((term) =>
      searchable.includes(term),
    ) ||
    /\b(ts|js)\b/.test(searchable)
  ) {
    return "web";
  }

  if (
    searchable.includes("teach") ||
    language === "java" ||
    /\bjava\b/.test(searchable) ||
    searchable.includes("study")
  ) {
    return "technical-base";
  }

  return "experiment";
}

export function createFallbackEnrichment(
  repo: GitHubRepository,
): ProjectEnrichment {
  const topic = plainText(
    repo.description,
    `projeto publico ${repo.name}`,
  );
  const language = plainText(repo.language, "tecnologia");

  return {
    summary: `Repositorio em ${language} com foco em ${topic}`,
    category: inferCategory(repo),
    problem: `Organiza uma base publica para explorar ${topic} com escopo tecnico claro.`,
    technicalDecision: `Usa ${language} e GitHub como base para evoluir o projeto com historico, codigo e colaboracao visiveis.`,
    nextStep:
      "Melhorar README, escopo, exemplos de uso e proximos passos para deixar a proposta mais verificavel.",
    maturity: repo.archived ? "archived" : repo.description ? "prototype" : "experiment",
    featuredReason:
      "Ajuda a compor um repertorio publico de projetos tecnicos com contexto e evolucao.",
    tags: [repo.language, ...repo.topics].filter(Boolean).slice(0, 6),
  };
}

export function buildEnrichmentPrompt(repositories: GitHubRepository[]) {
  return {
    messages: [
      {
        role: "system",
        content:
          "You enrich GitHub repository metadata for a Brazilian Portuguese portfolio. Return concise Brazilian Portuguese metadata. Return JSON only. Do not invent production usage, clients, impact, private context, or unsupported facts. Do not use HTML.",
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
                category: categories,
                problem: "problem or purpose",
                technicalDecision: "technical decision grounded in metadata",
                nextStep: "practical next step",
                maturity: maturities,
                featuredReason: "why it matters in a public portfolio",
                tags: ["up to 6 concise tags"],
              },
            ],
          },
          repositories: repositories.map((repo) => ({
            name: repo.name,
            fullName: repo.fullName,
            description: repo.description,
            homepage: repo.homepage,
            language: repo.language,
            topics: repo.topics,
            archived: repo.archived,
            fork: repo.fork,
            createdAt: repo.createdAt,
            updatedAt: repo.updatedAt,
            pushedAt: repo.pushedAt,
            stats: repo.stats,
          })),
        }),
      },
    ],
  } as const;
}

export function parseGroqEnrichmentResponse(
  content: string,
): Record<string, ProjectEnrichment> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    return {};
  }

  if (!isRecord(parsed) || !Array.isArray(parsed.repositories)) {
    return {};
  }

  const enrichments: Record<string, ProjectEnrichment> = {};

  for (const item of parsed.repositories as GroqEnrichmentItem[]) {
    if (!isRecord(item)) {
      continue;
    }

    const name = plainText(item.name, "");
    if (!name || !isCategory(item.category) || !isMaturity(item.maturity)) {
      continue;
    }

    enrichments[projectKey(name)] = {
      summary: plainText(item.summary, "Resumo indisponivel."),
      category: item.category,
      problem: plainText(item.problem, "Problema ainda nao documentado."),
      technicalDecision: plainText(
        item.technicalDecision,
        "Decisao tecnica ainda nao documentada.",
      ),
      nextStep: plainText(item.nextStep, "Documentar proximos passos."),
      maturity: item.maturity,
      featuredReason: plainText(
        item.featuredReason,
        "Projeto publico com contexto tecnico.",
      ),
      tags: cleanTags(item.tags),
    };
  }

  return Object.keys(enrichments).length > 0 ? enrichments : {};
}

export function toPortfolioProject(
  repo: GitHubRepository,
  enrichment: ProjectEnrichment,
  override: ProjectOverride = {},
): PortfolioProject {
  const merged = {
    ...enrichment,
    ...override,
  };
  const hasOverride = overrideStatusFields.some((field) => field in override);

  return {
    ...repo,
    summary: merged.summary,
    category: merged.category,
    problem: merged.problem,
    technicalDecision: merged.technicalDecision,
    nextStep: merged.nextStep,
    maturity: merged.maturity,
    featuredReason: merged.featuredReason,
    tags: merged.tags,
    displayName: override.displayName ?? repo.name,
    featured: override.featured ?? false,
    order: override.order ?? 1000,
    hidden: override.hidden ?? false,
    source: "github",
    enrichmentStatus: hasOverride ? "override" : "fallback",
  };
}
