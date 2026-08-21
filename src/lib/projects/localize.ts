import type { PortfolioProject } from "@/lib/projects/types";
import { getDictionary, projectKey, type Locale } from "@/lib/i18n";

export function localizeProject(project: PortfolioProject, locale: Locale): PortfolioProject {
  const key = projectKey(project.name) ?? projectKey(project.displayName) ?? projectKey(project.fullName);
  const copy = key ? getDictionary(locale).projects[key] : undefined;

  if (!copy) {
    return project;
  }

  return {
    ...project,
    summary: copy.summary,
    problem: copy.problem,
    technicalDecision: copy.decision,
    nextStep: copy.next,
    featuredReason: copy.reason,
  };
}

export function localizeProjects(projects: PortfolioProject[], locale: Locale) {
  return projects.map((project) => localizeProject(project, locale));
}
