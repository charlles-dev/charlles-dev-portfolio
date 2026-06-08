import "server-only";

import { getProjectOverride } from "@/lib/projects/overrides";
import type {
  GitHubRepository,
  PortfolioProject,
  ProjectsPayload,
} from "@/lib/projects/types";
import { enrichRepositoriesWithGroq } from "@/lib/server/groq";
import { fetchGitHubRepositories } from "@/lib/server/github";
import {
  PROJECT_ENRICHMENT_SCHEMA_VERSION,
  createFallbackEnrichment,
  projectKey,
  toPortfolioProject,
} from "@/lib/server/project-enrichment";

type ServiceEnv = Record<string, string | undefined>;

type ServiceFetch = typeof fetch;

let projectsCache:
  | {
      key: string;
      expiresAt: number;
      payload: ProjectsPayload;
    }
  | undefined;

const defaultGroqModelCacheMarker = "__default_groq_model__";

function ttlSeconds(env: ServiceEnv): number {
  const parsed = Number(env.PROJECTS_CACHE_TTL_SECONDS ?? "21600");

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 21600;
}

function createProjectsCacheKey(env: ServiceEnv, owner: string): string {
  return JSON.stringify({
    owner,
    groqModel: env.GROQ_MODEL || defaultGroqModelCacheMarker,
    hasGroqApiKey: Boolean(env.GROQ_API_KEY),
    hasGitHubToken: Boolean(env.GITHUB_TOKEN),
  });
}

function cloneProject(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    topics: [...project.topics],
    stats: { ...project.stats },
    tags: [...project.tags],
  };
}

function clonePayload(
  payload: ProjectsPayload,
  cache?: ProjectsPayload["cache"],
): ProjectsPayload {
  return {
    ...payload,
    cache: cache ?? payload.cache,
    featured: payload.featured.map(cloneProject),
    projects: payload.projects.map(cloneProject),
  };
}

function sortProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return [...projects].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    if (left.order !== right.order) {
      return left.order - right.order;
    }

    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
}

function composeProject(
  repo: GitHubRepository,
  aiByRepo: Awaited<ReturnType<typeof enrichRepositoriesWithGroq>>,
): PortfolioProject {
  const override = getProjectOverride(repo.name);
  const key = projectKey(repo.name);
  const aiEnrichment = aiByRepo[key];
  const enrichment = aiEnrichment ?? createFallbackEnrichment(repo);
  const project = toPortfolioProject(repo, enrichment, override);

  if (aiEnrichment && !override) {
    return {
      ...project,
      enrichmentStatus: "ai",
    };
  }

  return project;
}

export function resetProjectsCacheForTests(): void {
  projectsCache = undefined;
}

export async function getPortfolioProjects({
  env = process.env,
  fetchImpl = fetch,
}: {
  env?: ServiceEnv;
  fetchImpl?: ServiceFetch;
} = {}): Promise<ProjectsPayload> {
  const now = Date.now();
  const owner = env.GITHUB_OWNER || "charlles-dev";
  const cacheKey = createProjectsCacheKey(env, owner);

  if (
    projectsCache &&
    projectsCache.key === cacheKey &&
    projectsCache.expiresAt > now
  ) {
    return clonePayload(projectsCache.payload, "hit");
  }

  const repositories = await fetchGitHubRepositories({
    owner,
    token: env.GITHUB_TOKEN,
    fetchImpl,
  });
  const publicRepos = repositories.filter(
    (repo) => !repo.fork || Boolean(getProjectOverride(repo.name)),
  );
  let cacheState: ProjectsPayload["cache"] = "miss";
  let aiByRepo: Awaited<ReturnType<typeof enrichRepositoriesWithGroq>> = {};

  try {
    aiByRepo = await enrichRepositoriesWithGroq({
      repositories: publicRepos,
      apiKey: env.GROQ_API_KEY,
      model: env.GROQ_MODEL,
      fetchImpl,
    });
  } catch {
    cacheState = "fallback";
    aiByRepo = {};
  }

  const projects = sortProjects(
    publicRepos
      .map((repo) => composeProject(repo, aiByRepo))
      .filter((project) => !project.hidden),
  );
  const featured = projects.filter((project) => project.featured).slice(0, 5);
  const payload: ProjectsPayload = {
    owner,
    generatedAt: new Date(now).toISOString(),
    cache: cacheState,
    schemaVersion: PROJECT_ENRICHMENT_SCHEMA_VERSION,
    featured,
    projects,
  };

  projectsCache = {
    key: cacheKey,
    expiresAt: now + ttlSeconds(env) * 1000,
    payload: clonePayload(payload),
  };

  return payload;
}
