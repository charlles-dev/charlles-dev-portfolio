vi.mock("server-only", () => ({}));

import {
  PROJECT_ENRICHMENT_SCHEMA_VERSION,
  buildEnrichmentPrompt,
  createFallbackEnrichment,
  inferCategory,
  parseGroqEnrichmentResponse,
  toPortfolioProject,
} from "@/lib/server/project-enrichment";
import { enrichRepositoriesWithGroq } from "@/lib/server/groq";
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

  it("sanitizes HTML from otherwise valid Groq JSON", () => {
    const enrichment = parseGroqEnrichmentResponse(
      JSON.stringify({
        repositories: [
          {
            name: "Astrolink",
            summary:
              "<strong>Repositorio</strong> <script>alert('x')</script> em Go.",
            category: "infra",
            problem: "<p>Explora conectividade.</p>",
            technicalDecision: "<em>Usa Go</em> para uma base simples.",
            nextStep: "<a href='https://example.com'>Melhorar README</a>.",
            maturity: "prototype",
            featuredReason: "<span>Mostra repertorio tecnico publico.</span>",
            tags: ["<script>alert('tag')</script>Go", "<b>network</b>"],
          },
        ],
      }),
    );

    const serialized = JSON.stringify(enrichment.astrolink);

    expect(enrichment.astrolink).toBeDefined();
    expect(serialized).not.toContain("<script");
    expect(serialized).not.toMatch(/<\/?[a-z][^>]*>/i);
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

  it("sanitizes HTML from portfolio project overrides", () => {
    const fallback: ProjectEnrichment = createFallbackEnrichment(repo);
    const project = toPortfolioProject(repo, fallback, {
      displayName: "<img src=x onerror=alert(1)>Astrolink",
      summary: "<script>alert('summary')</script>Resumo curado.",
      tags: ["<b>Go</b>", "<script>alert('tag')</script>network"],
    });

    const serialized = JSON.stringify({
      displayName: project.displayName,
      summary: project.summary,
      tags: project.tags,
    });

    expect(project).toMatchObject({
      displayName: "Astrolink",
      summary: "Resumo curado.",
      tags: ["Go", "network"],
      enrichmentStatus: "override",
    });
    expect(serialized).not.toContain("<script");
    expect(serialized).not.toMatch(/<\/?[a-z][^>]*>/i);
  });

  it("classifies JavaScript repositories as web", () => {
    expect(
      inferCategory({
        ...repo,
        name: "frontend-js",
        description: "JavaScript portfolio interface",
        language: "JavaScript",
        topics: ["react", "js"],
      }),
    ).toBe("web");
  });

  it("classifies Java repositories as technical-base", () => {
    expect(
      inferCategory({
        ...repo,
        name: "java-study",
        description: "Java study repository",
        language: "Java",
        topics: ["oop"],
      }),
    ).toBe("technical-base");
  });

  it("skips Groq enrichment without an api key", async () => {
    const fetchImpl = vi.fn();

    await expect(
      enrichRepositoriesWithGroq({ repositories: [repo], fetchImpl }),
    ).resolves.toEqual({});

    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("skips Groq enrichment for an empty repository list", async () => {
    const fetchImpl = vi.fn();

    await expect(
      enrichRepositoriesWithGroq({
        repositories: [],
        apiKey: "groq-secret",
        fetchImpl,
      }),
    ).resolves.toEqual({});

    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts repository metadata to Groq and parses repo-keyed enrichment", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
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
            },
          },
        ],
      }),
    });

    await expect(
      enrichRepositoriesWithGroq({
        repositories: [repo],
        apiKey: "groq-secret",
        model: "llama-test",
        fetchImpl,
      }),
    ).resolves.toMatchObject({
      astrolink: {
        summary: "Repositorio em Go com foco em conectividade.",
        category: "infra",
      },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.groq.com/openai/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: {
          authorization: "Bearer groq-secret",
          "content-type": "application/json",
        },
      }),
    );

    const [, requestInit] = fetchImpl.mock.calls[0];
    const body = JSON.parse(requestInit.body as string);

    expect(body).toMatchObject({
      model: "llama-test",
      response_format: { type: "json_object" },
    });
    expect(body.messages[1].content).toContain("Astrolink");
  });

  it("uses the default Groq model when none is provided", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [
          { message: { content: JSON.stringify({ repositories: [] }) } },
        ],
      }),
    });

    await enrichRepositoriesWithGroq({
      repositories: [repo],
      apiKey: "groq-secret",
      fetchImpl,
    });

    const [, requestInit] = fetchImpl.mock.calls[0];
    const body = JSON.parse(requestInit.body as string);

    expect(body.model).toBe("llama-3.3-70b-versatile");
  });

  it("throws a sanitized error for failed Groq responses", async () => {
    const json = vi.fn().mockResolvedValue({
      error: "groq-secret leaked in body",
    });
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json,
    });

    try {
      await enrichRepositoriesWithGroq({
        repositories: [repo],
        apiKey: "groq-secret",
        fetchImpl,
      });
      expect.unreachable("expected Groq enrichment to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(
        "Groq enrichment request failed with status 500",
      );
      expect((error as Error).message).not.toContain("groq-secret");
      expect((error as Error).message).not.toContain("leaked in body");
    }

    expect(json).not.toHaveBeenCalled();
  });
});
