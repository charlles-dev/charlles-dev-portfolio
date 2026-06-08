import { getPortfolioProjects } from "@/lib/server/projects-service";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
import type {
  PortfolioProject,
  ProjectsPayload,
} from "@/lib/projects/types";

const successCacheControl = "public, s-maxage=300, stale-while-revalidate=3600";
const fallbackCacheControl = "public, s-maxage=60, stale-while-revalidate=300";

export const dynamic = "force-dynamic";

function cloneProject(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    topics: [...project.topics],
    stats: { ...project.stats },
    tags: [...project.tags],
  };
}

function createFallbackResponsePayload(): ProjectsPayload {
  return {
    ...fallbackProjectsPayload,
    generatedAt: new Date().toISOString(),
    cache: "fallback",
    featured: fallbackProjectsPayload.featured.map(cloneProject),
    projects: fallbackProjectsPayload.projects.map(cloneProject),
  };
}

export async function GET() {
  try {
    const payload = await getPortfolioProjects();

    return Response.json(payload, {
      headers: {
        "cache-control": successCacheControl,
      },
    });
  } catch {
    return Response.json(
      createFallbackResponsePayload(),
      {
        status: 200,
        headers: {
          "cache-control": fallbackCacheControl,
        },
      },
    );
  }
}
