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

const makeApiRepo = (overrides: Partial<typeof apiRepo> = {}) => ({
  ...apiRepo,
  ...overrides,
});

const makeApiRepos = (count: number, page: number) =>
  Array.from({ length: count }, (_, index) =>
    makeApiRepo({
      id: page * 1000 + index,
      name: `Repo-${page}-${index}`,
      full_name: `charlles-dev/Repo-${page}-${index}`,
      html_url: `https://github.com/charlles-dev/Repo-${page}-${index}`,
    }),
  );

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

    const repoWithMissingOptionalFields = {
      id: 2,
      name: "Defaults",
      full_name: "charlles-dev/Defaults",
      html_url: "https://github.com/charlles-dev/Defaults",
      description: null,
      homepage: null,
      language: null,
      archived: false,
      fork: false,
      private: false,
      created_at: "2025-02-01T00:00:00Z",
      updated_at: "2026-02-01T00:00:00Z",
      pushed_at: null,
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      open_issues_count: 0,
    };

    expect(
      normalizeGitHubRepository(repoWithMissingOptionalFields),
    ).toMatchObject({
      fullName: "charlles-dev/Defaults",
      language: "Unknown",
      topics: [],
      updatedAt: "2026-02-01T00:00:00Z",
      pushedAt: "2026-02-01T00:00:00Z",
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

  it("fetches page 2 when page 1 returns 100 repositories", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => makeApiRepos(100, 1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [makeApiRepo({ id: 2001, name: "PageTwo" })],
      });

    const repos = await fetchGitHubRepositories({
      owner: "charlles-dev",
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl.mock.calls[1][0]).toContain("page=2");
    expect(repos).toHaveLength(101);
  });

  it("stops before page 11 when every allowed page is full", async () => {
    const fetchImpl = vi.fn().mockImplementation(async (url: string) => {
      const page = Number(new URL(url).searchParams.get("page"));

      return {
        ok: true,
        json: async () => makeApiRepos(100, page),
      };
    });

    await fetchGitHubRepositories({
      owner: "charlles-dev",
      fetchImpl,
    });

    const requestedUrls = fetchImpl.mock.calls.map(([url]) => url);

    expect(fetchImpl).toHaveBeenCalledTimes(10);
    expect(requestedUrls).not.toEqual(
      expect.arrayContaining([expect.stringContaining("page=11")]),
    );
  });

  it("filters private repositories from the final result", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        makeApiRepo({ id: 1, full_name: "charlles-dev/Public" }),
        makeApiRepo({
          id: 2,
          full_name: "charlles-dev/Private",
          private: true,
        }),
      ],
    });

    const repos = await fetchGitHubRepositories({
      owner: "charlles-dev",
      fetchImpl,
    });

    expect(repos).toHaveLength(1);
    expect(repos[0]).toMatchObject({
      fullName: "charlles-dev/Public",
      private: false,
    });
  });

  it("throws sanitized error text when GitHub returns non-ok", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => "token leaked in body",
    });

    let thrownError: unknown;

    try {
      await fetchGitHubRepositories({
        owner: "charlles-dev",
        token: "github-token",
        fetchImpl,
      });
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(Error);
    expect((thrownError as Error).message).toBe(
      "GitHub repositories request failed with status 403",
    );
  });
});
