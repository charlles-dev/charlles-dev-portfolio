vi.mock("server-only", () => ({}));

import {
  getPortfolioProjects,
  resetProjectsCacheForTests,
} from "@/lib/server/projects-service";

const apiRepo = {
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
  open_issues_count: 0,
};

const env = {
  GROQ_API_KEY: "groq_secret",
  GROQ_MODEL: "llama-test",
  GITHUB_OWNER: "charlles-dev",
  PROJECTS_CACHE_TTL_SECONDS: "21600",
};

function githubResponse(repos = [apiRepo]) {
  return {
    ok: true,
    status: 200,
    json: async () => repos,
  };
}

function makeApiRepo(overrides: Partial<typeof apiRepo> = {}) {
  return {
    ...apiRepo,
    ...overrides,
  };
}

function groqResponse() {
  return {
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
                  summary: "Repositorio em Go enriquecido por IA.",
                  category: "infra",
                  problem: "Conectividade de baixo custo.",
                  technicalDecision: "Usa Go para organizar simulacoes.",
                  nextStep: "Documentar arquitetura.",
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
  };
}

describe("projects service", () => {
  beforeEach(() => {
    resetProjectsCacheForTests();
  });

  afterEach(() => {
    resetProjectsCacheForTests();
    vi.restoreAllMocks();
  });

  it("returns safe enriched projects and featured repositories", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(githubResponse())
      .mockResolvedValueOnce(groqResponse());

    const payload = await getPortfolioProjects({ env, fetchImpl });

    expect(payload).toMatchObject({
      owner: "charlles-dev",
      cache: "miss",
      schemaVersion: "github-groq-projects-v1",
    });
    expect(payload.projects).toHaveLength(1);
    expect(payload.featured[0].name).toBe("Astrolink");
    expect(payload.projects[0]).toMatchObject({
      name: "Astrolink",
      private: false,
      source: "github",
      enrichmentStatus: "override",
    });
    expect(JSON.stringify(payload)).not.toContain("groq_secret");
  });

  it("uses fallback enrichment when Groq fails after GitHub succeeds", async () => {
    const fallbackRepo = makeApiRepo({
      id: 2,
      name: "Go-Tool",
      full_name: "charlles-dev/Go-Tool",
      html_url: "https://github.com/charlles-dev/Go-Tool",
    });
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(githubResponse([fallbackRepo]))
      .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });

    const payload = await getPortfolioProjects({ env, fetchImpl });

    expect(payload.cache).toBe("fallback");
    expect(payload.projects[0].summary).toContain("Repositorio em Go");
  });

  it("uses cached payload while TTL is active", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(githubResponse());

    const first = await getPortfolioProjects({
      env: {
        GITHUB_OWNER: "charlles-dev",
        GROQ_API_KEY: "",
        PROJECTS_CACHE_TTL_SECONDS: "21600",
      },
      fetchImpl,
    });
    const second = await getPortfolioProjects({
      env: {
        GITHUB_OWNER: "charlles-dev",
        GROQ_API_KEY: "",
        PROJECTS_CACHE_TTL_SECONDS: "21600",
      },
      fetchImpl,
    });

    expect(first.cache).toBe("miss");
    expect(second.cache).toBe("hit");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("fetches fresh payloads when public cache inputs change", async () => {
    const otherOwnerRepo = makeApiRepo({
      id: 3,
      name: "Other-Project",
      full_name: "octocat/Other-Project",
      html_url: "https://github.com/octocat/Other-Project",
    });
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(githubResponse([apiRepo]))
      .mockResolvedValueOnce(githubResponse([otherOwnerRepo]))
      .mockResolvedValueOnce(groqResponse());

    const first = await getPortfolioProjects({
      env: {
        GITHUB_OWNER: "charlles-dev",
        GROQ_API_KEY: "",
        PROJECTS_CACHE_TTL_SECONDS: "21600",
      },
      fetchImpl,
    });
    const second = await getPortfolioProjects({
      env: {
        GITHUB_OWNER: "octocat",
        GROQ_API_KEY: "groq_secret",
        GROQ_MODEL: "llama-test",
        PROJECTS_CACHE_TTL_SECONDS: "21600",
      },
      fetchImpl,
    });

    expect(first.cache).toBe("miss");
    expect(first.owner).toBe("charlles-dev");
    expect(second.cache).toBe("miss");
    expect(second.owner).toBe("octocat");
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("resetProjectsCacheForTests resets between tests", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(githubResponse());
    const serviceEnv = {
      GITHUB_OWNER: "charlles-dev",
      GROQ_API_KEY: "",
      PROJECTS_CACHE_TTL_SECONDS: "21600",
    };

    await getPortfolioProjects({ env: serviceEnv, fetchImpl });
    resetProjectsCacheForTests();
    const payload = await getPortfolioProjects({ env: serviceEnv, fetchImpl });

    expect(payload.cache).toBe("miss");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
