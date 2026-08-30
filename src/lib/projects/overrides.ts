import type { ProjectOverride } from "@/lib/projects/types";

function normalizeRepoName(name: string) {
  return name.trim().toLowerCase();
}

export const projectOverrides: Partial<Record<string, ProjectOverride>> = {
  astrolink: {
    featured: true,
    order: 1,
    category: "infra",
    maturity: "prototype",
    summary:
      "Infraestrutura e software de baixo custo para conectividade em areas remotas.",
    problem:
      "Pensar acesso a internet em regioes onde custo e disponibilidade sao barreiras reais.",
    technicalDecision:
      "Organiza a proposta em Go e estrutura a base tecnica para evoluir simulacoes e validacoes.",
    nextStep:
      "Documentar arquitetura, premissas de rede e etapas de validacao tecnica.",
  },
  "3035-teach": {
    featured: true,
    order: 2,
    category: "technical-base",
    maturity: "study",
    summary: "Repositorio de pratica tecnica em Java com exercicios e estruturas organizadas.",
    problem:
      "Bases tecnicas precisam ser consultaveis, reutilizaveis e faceis de evoluir.",
    technicalDecision:
      "Registra exercicios e padroes em Java para consolidar fundamentos.",
    nextStep: "Transformar exemplos em documentacao objetiva e reaproveitavel.",
  },
};

export function getProjectOverride(name: string): ProjectOverride | undefined {
  return projectOverrides[normalizeRepoName(name)];
}
