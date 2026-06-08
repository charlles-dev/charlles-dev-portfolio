export const projectCategories = [
  "web",
  "automation",
  "infra",
  "technical-base",
  "experiment",
] as const;

export type PortfolioProjectCategory = (typeof projectCategories)[number];

export const projectMaturities = [
  "production-minded",
  "prototype",
  "study",
  "experiment",
  "archived",
] as const;

export type PortfolioProjectMaturity = (typeof projectMaturities)[number];

export type RepositoryStats = {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
};

export type GitHubRepository = {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  homepage: string;
  language: string;
  topics: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  stats: RepositoryStats;
};

export type ProjectEnrichment = {
  summary: string;
  category: PortfolioProjectCategory;
  problem: string;
  technicalDecision: string;
  nextStep: string;
  maturity: PortfolioProjectMaturity;
  featuredReason: string;
  tags: string[];
};

export type ProjectEnrichmentStatus = "ai" | "fallback" | "override";

export type PortfolioProject = GitHubRepository &
  ProjectEnrichment & {
    displayName: string;
    featured: boolean;
    order: number;
    hidden: boolean;
    source: "github";
    enrichmentStatus: ProjectEnrichmentStatus;
  };

export type ProjectsPayload = {
  owner: string;
  generatedAt: string;
  cache: "hit" | "miss" | "fallback";
  schemaVersion: string;
  featured: PortfolioProject[];
  projects: PortfolioProject[];
};

export type ProjectOverride = Partial<ProjectEnrichment> & {
  displayName?: string;
  featured?: boolean;
  hidden?: boolean;
  order?: number;
};
