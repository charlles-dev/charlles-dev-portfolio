vi.mock("server-only", () => ({}));

import {
  PROJECT_ENRICHMENT_SCHEMA_VERSION,
  buildEnrichmentPrompt,
  createFallbackEnrichment,
  parseGroqEnrichmentResponse,
  toPortfolioProject,
} from "@/lib/server/project-enrichment";
import type { GitHubRepository, ProjectEnrichment } from "@/lib/projects/types";

const repo: GitHubRepository = {
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
  stats: { stars: 2, forks: 1, watchers: 2, openIssues: 0 },
};

describe("project enrichment", () => {
  it("defines the Groq enrichment schema version", () => {
    expect(PROJECT_ENRICHMENT_SCHEMA_VERSION).toBe("github-groq-projects-v1");
  });

  it("builds a strict enrichment prompt with repository metadata", () => {
    const prompt = buildEnrichmentPrompt([repo]);

    expect(prompt.messages[0].content).toContain(
      "Do not invent production usage",
    );
    expect(prompt.messages[0].content).toContain("Return JSON only");
    expect(prompt.messages[1].content).toContain("Astrolink");
  });

  it("parses valid JSON into repo-keyed enrichment", () => {
    const enrichment = parseGroqEnrichmentResponse(
      JSON.stringify({
        repositories: [
          {
            name: "Astrolink",
            summary: "Repositorio em Go com foco em conectividade.",
            category: "infra",
            problem: "Explora conectividade de baixo custo.",
            technicalDecision: "Usa Go para uma base simples.",
            nextStep: "Melhorar README e exemplos.",
            maturity: "prototype",
            featuredReason: "Mostra repertorio tecnico publico.",
            tags: ["Go", "network"],
          },
        ],
      }),
    );

    expect(enrichment.astrolink).toMatchObject({
      category: "infra",
      maturity: "prototype",
      tags: ["Go", "network"],
    });
  });

  it("rejects unsafe or invalid Groq content", () => {
    expect(parseGroqEnrichmentResponse("<script>alert(1)</script>")).toEqual(
      {},
    );
    expect(
      parseGroqEnrichmentResponse(
        JSON.stringify({
          repositories: [
            {
              name: "Astrolink",
              summary: "Resumo valido.",
              category: "made-up",
              problem: "Problema valido.",
              technicalDecision: "Decisao valida.",
              nextStep: "Proximo passo valido.",
              maturity: "prototype",
              featuredReason: "Motivo valido.",
              tags: ["Go"],
            },
          ],
        }),
      ),
    ).toEqual({});
  });

  it("creates professional fallback enrichment for Astrolink", () => {
    expect(createFallbackEnrichment(repo)).toMatchObject({
      summary: "Repositorio em Go com foco em Low-cost connectivity",
      category: "infra",
      maturity: "prototype",
    });
  });

  it("converts a repository into a portfolio project with overrides", () => {
    const fallback: ProjectEnrichment = createFallbackEnrichment(repo);
    const project = toPortfolioProject(repo, fallback, {
      summary: "Resumo curado para o portfolio.",
      featured: true,
      order: 2,
    });

    expect(project).toMatchObject({
      displayName: "Astrolink",
      featured: true,
      order: 2,
      summary: "Resumo curado para o portfolio.",
      source: "github",
      enrichmentStatus: "override",
    });
    expect(project).not.toHaveProperty("apiKey");
  });
});
