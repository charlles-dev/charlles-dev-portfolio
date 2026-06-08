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

  it("does not expose server-only prompt or secret material", async () => {
    vi.stubEnv("GROQ_API_KEY", "groq_super_secret");
    vi.stubEnv("GITHUB_TOKEN", "github_super_secret");
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("api.groq.com")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            choices: [
              {
                message: {
                  content: "{}",
                },
              },
            ],
          }),
        };
      }

      return {
        ok: true,
        status: 200,
        json: async () => [apiRepo],
      };
    });

    const response = await GET();
    const text = await response.text();

    expect(text).not.toContain("groq_super_secret");
    expect(text).not.toContain("github_super_secret");
    expect(text).not.toContain("Do not invent production usage");
    expect(text).not.toContain("authorization");
  });

  it.each([
    ["rejects", () => Promise.reject(new Error("upstream github_secret boom"))],
    [
      "returns non-ok",
      () =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({ message: "upstream error github_secret" }),
        }),
    ],
  ])(
    "returns a safe fallback response when GitHub fetch %s",
    async (_name, fetchResponse) => {
      global.fetch = vi.fn().mockImplementation(fetchResponse);

      const response = await GET();
      const payload = await response.json();
      const serialized = JSON.stringify(payload);

      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toContain("s-maxage=60");
      expect(payload.cache).toBe("fallback");
      expect(payload.projects.length).toBeGreaterThan(0);
      expect(payload.featured.length).toBeGreaterThan(0);
      expect(
        payload.projects.some(
          (project: { name: string }) => project.name === "Astrolink",
        ),
      ).toBe(true);
      expect(serialized).not.toContain("github_secret");
      expect(serialized).not.toContain("upstream error");
      expect(serialized).not.toContain("boom");
    },
  );
});
