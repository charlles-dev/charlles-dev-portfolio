vi.mock("server-only", () => ({}));

import { GET } from "@/app/api/projects/route";
import { resetProjectsCacheForTests } from "@/lib/server/projects-service";

const originalEnv = { ...process.env };
const originalFetch = global.fetch;

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

describe("projects API route", () => {
  beforeEach(() => {
    resetProjectsCacheForTests();
    process.env = {
      ...originalEnv,
      GITHUB_OWNER: "charlles-dev",
      GROQ_API_KEY: "",
      GITHUB_TOKEN: "github_secret",
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [apiRepo],
    });
  });

  afterEach(() => {
    resetProjectsCacheForTests();
    process.env = { ...originalEnv };
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns safe public project JSON with shared cache headers", async () => {
    const response = await GET();
    const payload = await response.json();
    const serialized = JSON.stringify(payload);

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toContain("s-maxage");
    expect(payload.projects[0].name).toBe("Astrolink");
    expect(payload.projects[0].private).toBe(false);
    expect(serialized).not.toContain("GROQ_API_KEY");
    expect(serialized).not.toContain("GITHUB_TOKEN");
    expect(serialized).not.toContain("github_secret");
  });
});
