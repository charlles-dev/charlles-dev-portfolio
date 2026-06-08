vi.mock("server-only", () => ({}));

import {
  fetchGitHubRepositories,
  normalizeGitHubRepository,
} from "@/lib/server/github";

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
  open_issues_count: 0,
};

describe("GitHub repository projects", () => {
  it("normalizes GitHub API snake_case and null fields into safe camelCase data", () => {
    expect(normalizeGitHubRepository(apiRepo)).toMatchObject({
      id: 1,
      name: "Astrolink",
      fullName: "charlles-dev/Astrolink",
      htmlUrl: "https://github.com/charlles-dev/Astrolink",
      description: "",
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
    });
  });

  it("fetches public repositories for charlles-dev with authorization when token is provided", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [apiRepo],
    });

    const repos = await fetchGitHubRepositories({
      owner: "charlles-dev",
      token: "github-token",
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.github.com/users/charlles-dev/repos?per_page=100&page=1&sort=updated&type=public",
      {
        headers: {
          accept: "application/vnd.github+json",
          authorization: "Bearer github-token",
          "x-github-api-version": "2022-11-28",
        },
        next: { revalidate: 300 },
      },
    );
    expect(repos).toHaveLength(1);
    expect(repos[0]).toMatchObject({
      fullName: "charlles-dev/Astrolink",
      private: false,
    });
  });

  it("throws sanitized error text when GitHub returns non-ok", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => "token leaked in body",
    });

    await expect(
      fetchGitHubRepositories({
        owner: "charlles-dev",
        token: "github-token",
        fetchImpl,
      }),
    ).rejects.toThrow("GitHub repositories request failed with status 403");
  });
});
