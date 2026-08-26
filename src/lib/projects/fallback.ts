import type { PortfolioProject, PortfolioProjectCategory, ProjectsPayload } from "@/lib/projects/types";

const owner = "charlles-dev";

type PublicRepositorySnapshot = {
  id: number; name: string; description: string; homepage?: string; language: string; topics?: string[];
  createdAt: string; updatedAt: string; pushedAt: string; stars: number;
  category: PortfolioProjectCategory; featured?: boolean;
};

// Safe, public-only snapshot used only when GitHub cannot be reached.
const publicRepositorySnapshot: PublicRepositorySnapshot[] = [
  { id: 1263065441, name: "charlles-dev-portfolio", description: "Portfólio profissional em Next.js com projetos sincronizados do GitHub e enriquecimento server-side via Groq.", homepage: "https://charlles-dev.vercel.app", language: "TypeScript", topics: ["groq", "nextjs", "portfolio", "tailwindcss", "typescript", "vercel"], createdAt: "2026-06-08T15:32:05Z", updatedAt: "2026-08-22T19:09:33Z", pushedAt: "2026-08-22T19:09:25Z", stars: 1, category: "web", featured: true },
  { id: 1327015653, name: "trakr", description: "Maleta de ferramentas inteligente com detecção RFID/NFC em Kotlin e ESP32.", language: "Kotlin", createdAt: "2026-08-07T18:09:08Z", updatedAt: "2026-08-17T20:03:26Z", pushedAt: "2026-08-17T20:01:49Z", stars: 1, category: "experiment", featured: true },
  { id: 1074505926, name: "3035-TEACH", description: "Atividades e projetos organizados por temas para facilitar o aprendizado prático da programação.", language: "Java", createdAt: "2025-10-11T23:28:09Z", updatedAt: "2026-06-19T13:34:30Z", pushedAt: "2026-06-01T04:55:24Z", stars: 1, category: "technical-base", featured: true },
  { id: 1170304852, name: "Astrolink", description: "Infraestrutura e software de baixo custo para ampliar o acesso à internet em áreas remotas.", language: "Go", createdAt: "2026-03-02T01:12:37Z", updatedAt: "2026-05-23T06:30:09Z", pushedAt: "2026-05-23T06:30:22Z", stars: 1, category: "infra", featured: true },
  { id: 1040249335, name: "charlles-dev", description: "Repositório público do perfil charlles-dev no GitHub.", language: "Code", createdAt: "2025-08-18T17:22:15Z", updatedAt: "2025-09-23T11:46:12Z", pushedAt: "2025-09-06T22:19:24Z", stars: 1, category: "experiment" },
  { id: 1044480536, name: "bfd-labs", description: "Atividades em Python desenvolvidas no projeto BFD, organizadas por temas de aprendizado prático.", language: "Python", createdAt: "2025-08-25T18:44:10Z", updatedAt: "2025-09-10T19:07:00Z", pushedAt: "2025-09-10T19:06:56Z", stars: 1, category: "technical-base" },
  { id: 1049961296, name: "Streamly", description: "Experimento público em Python mantido como parte do repertório técnico.", language: "Python", createdAt: "2025-09-03T18:41:41Z", updatedAt: "2025-09-08T18:02:33Z", pushedAt: "2025-09-08T18:02:29Z", stars: 2, category: "experiment" },
];

export const fallbackProjects: PortfolioProject[] = publicRepositorySnapshot.map((repo, index) => ({
  id: repo.id, name: repo.name, displayName: repo.name, fullName: `${owner}/${repo.name}`,
  htmlUrl: `https://github.com/${owner}/${repo.name}`, description: repo.description, homepage: repo.homepage ?? "",
  language: repo.language, topics: repo.topics ?? [], archived: false, fork: false, private: false,
  createdAt: repo.createdAt, updatedAt: repo.updatedAt, pushedAt: repo.pushedAt,
  stats: { stars: repo.stars, forks: 0, watchers: repo.stars, openIssues: 0 },
  summary: repo.description, category: repo.category,
  problem: `Transformar a proposta de ${repo.name} em uma base pública clara, verificável e fácil de evoluir.`,
  technicalDecision: `Organizar o projeto em ${repo.language}, mantendo código, histórico e contexto acessíveis no GitHub.`,
  nextStep: "Aprofundar documentação, exemplos de uso e evidências de funcionamento.",
  maturity: repo.featured ? "prototype" : "experiment",
  featuredReason: "Repositório público que ajuda a mostrar repertório técnico, decisões e evolução.",
  tags: [repo.language, ...(repo.topics ?? [])].filter(Boolean).slice(0, 6),
  featured: repo.featured ?? false, order: index + 1, hidden: false, source: "github", enrichmentStatus: "fallback",
}));

const cloneFallbackProject = (project: PortfolioProject): PortfolioProject => ({ ...project, topics: [...project.topics], stats: { ...project.stats }, tags: [...project.tags] });

export const fallbackProjectsPayload: ProjectsPayload = {
  owner, generatedAt: "2026-08-22T19:09:33Z", cache: "fallback", schemaVersion: "public-github-snapshot-v2",
  featured: fallbackProjects.filter((project) => project.featured).map(cloneFallbackProject),
  projects: fallbackProjects.map(cloneFallbackProject),
};
