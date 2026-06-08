import "server-only";

import type { GitHubRepository } from "@/lib/projects/types";

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

type GitHubFetchInit = RequestInit & {
  next?: {
    revalidate: number;
  };
};

type GitHubFetch = (
  url: string,
  init: GitHubFetchInit,
) => Promise<{
  ok: boolean;
  status: number;
  json: () => Promise<GitHubRepositoryApi[]>;
}>;

const githubApiVersion = "2022-11-28";
const perPage = 100;
const maxPages = 10;

export function normalizeGitHubRepository(
  repo: GitHubRepositoryApi,
): GitHubRepository {
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
      openIssues: repo.open_issues_count,
    },
  };
}

export async function fetchGitHubRepositories({
  owner,
  token,
  fetchImpl = fetch as GitHubFetch,
}: {
  owner: string;
  token?: string;
  fetchImpl?: GitHubFetch;
}): Promise<GitHubRepository[]> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": githubApiVersion,
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const repos: GitHubRepositoryApi[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const url = new URL(`https://api.github.com/users/${owner}/repos`);
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", "updated");
    url.searchParams.set("type", "public");

    const response = await fetchImpl(url.toString(), {
      headers,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub repositories request failed with status ${response.status}`,
      );
    }

    const pageRepos = await response.json();
    repos.push(...pageRepos);

    if (pageRepos.length < perPage) {
      break;
    }
  }

  return repos
    .filter((repo) => !repo.private)
    .map((repo) => normalizeGitHubRepository(repo));
}
