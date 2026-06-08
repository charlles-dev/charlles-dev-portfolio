import { projects } from "@/lib/portfolio";
import type { PortfolioProject, ProjectsPayload } from "@/lib/projects/types";

const owner = "charlles-dev";
const createdAt = "2025-01-01T00:00:00.000Z";
const updatedAt = "2026-01-01T00:00:00.000Z";

const getProjectCategory = (
  category: (typeof projects)[number]["category"],
): PortfolioProject["category"] => {
  if (category === "automation") {
    return "automation";
  }

  if (category === "infra") {
    return "infra";
  }

  return "technical-base";
};

export const fallbackProjects: PortfolioProject[] = projects.map(
  (project, index) => ({
    id: index + 1,
    name: project.name,
    displayName: project.name,
    fullName: `${owner}/${project.name}`,
    htmlUrl: project.href,
    description: project.description,
    homepage: "",
    language: project.language,
    topics: [project.categoryLabel, project.focus].filter(Boolean),
    archived: false,
    fork: false,
    private: false,
    createdAt,
    updatedAt,
    pushedAt: updatedAt,
    stats: {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0,
    },
    summary: project.description,
    category: getProjectCategory(project.category),
    problem: project.problem,
    technicalDecision: project.built,
    nextStep: project.next,
    maturity: "prototype",
    featuredReason:
      "Projeto curado manualmente para a primeira versao do portfolio.",
    tags: [project.language, project.categoryLabel],
    featured: true,
    order: index + 1,
    hidden: false,
    source: "github",
    enrichmentStatus: "override",
  }),
);

export const fallbackProjectsPayload: ProjectsPayload = {
  owner,
  generatedAt: updatedAt,
  cache: "fallback",
  schemaVersion: "local-fallback-v1",
  featured: fallbackProjects,
  projects: fallbackProjects,
};
