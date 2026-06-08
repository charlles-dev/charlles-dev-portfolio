import { getPortfolioProjects } from "@/lib/server/projects-service";

const successCacheControl = "public, s-maxage=300, stale-while-revalidate=3600";
const fallbackCacheControl = "public, s-maxage=60, stale-while-revalidate=300";

export const dynamic = "force-dynamic";

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
      {
        owner: process.env.GITHUB_OWNER || "charlles-dev",
        generatedAt: new Date().toISOString(),
        cache: "fallback",
        schemaVersion: "github-groq-projects-v1",
        featured: [],
        projects: [],
      },
      {
        status: 200,
        headers: {
          "cache-control": fallbackCacheControl,
        },
      },
    );
  }
}
