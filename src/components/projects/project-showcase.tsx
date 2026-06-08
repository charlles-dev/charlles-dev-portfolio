"use client";

import { useEffect, useMemo, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type {
  PortfolioProject,
  PortfolioProjectCategory,
  ProjectsPayload,
} from "@/lib/projects/types";

type CategoryFilter = "all" | PortfolioProjectCategory;

const categoryFilters: Array<{ label: string; value: CategoryFilter }> = [
  { label: "Todos", value: "all" },
  { label: "Web", value: "web" },
  { label: "Automacao", value: "automation" },
  { label: "Infra", value: "infra" },
  { label: "Base tecnica", value: "technical-base" },
  { label: "Experimento", value: "experiment" },
];

const categoryLabels: Record<PortfolioProjectCategory, string> = {
  web: "Web",
  automation: "Automacao",
  infra: "Infra",
  "technical-base": "Base tecnica",
  experiment: "Experimento",
};

const categoryTone: Record<PortfolioProjectCategory, string> = {
  web: "from-sky-300/18 via-accent/10 to-transparent",
  automation: "from-emerald-300/20 via-accent/10 to-transparent",
  infra: "from-accent/24 via-cyan-400/10 to-transparent",
  "technical-base": "from-white/16 via-accent/8 to-transparent",
  experiment: "from-fuchsia-300/14 via-accent/8 to-transparent",
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatUpdatedDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Atualizacao recente";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function matchesQuery(project: PortfolioProject, query: string) {
  if (!query) {
    return true;
  }

  const searchableText = [
    project.displayName,
    project.name,
    project.fullName,
    project.summary,
    project.description,
    project.language,
    project.category,
    ...project.tags,
    ...project.topics,
  ].join(" ");

  return normalizeSearch(searchableText).includes(query);
}

function FeaturedProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <a
      className="project-shimmer group relative isolate flex min-h-[470px] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07100d]/78 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-accent/50 hover:bg-[#0b1713] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-8"
      href={project.htmlUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${categoryTone[project.category]} opacity-70`} />
      <div className="absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-accent/10 blur-3xl transition duration-700 group-hover:bg-accent/18" />
      <span className="absolute right-5 top-4 font-mono text-[5.5rem] font-bold leading-none text-white/[0.035] sm:right-7 sm:top-6 sm:text-[7rem]">
        {String(project.order).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(34,186,157,0.8)]" />
            {categoryLabels[project.category]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/46">
            {project.language || "Codigo"}
          </span>
        </div>

        <div className="mt-10 max-w-[720px]">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/38">
            {project.featuredReason}
          </p>
          <h3 className="mt-4 text-[3rem] font-semibold leading-[0.95] text-white sm:text-[4.6rem]">
            {project.displayName}
          </h3>
          <p className="mt-7 text-[1.05rem] leading-8 text-white/58 sm:text-[1.16rem]">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Problema", project.problem],
            ["Decisao tecnica", project.technicalDecision],
            ["Proximo passo", project.nextStep],
          ].map(([label, value]) => (
            <div className="border-t border-white/10 pt-4" key={label}>
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/34">
                {label}
              </p>
              <p className="mt-2 text-[0.9rem] leading-6 text-white/56">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/42">
            Atualizado em {formatUpdatedDate(project.updatedAt)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[0.82rem] font-semibold text-accent transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[#041714]">
            Ver repositorio
            <IconGlyph name="external-link" className="size-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

function RepositoryCard({ project }: { project: PortfolioProject }) {
  return (
    <a
      className="project-shimmer group relative isolate flex min-h-[290px] flex-col justify-between overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-accent/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-6"
      href={project.htmlUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${categoryTone[project.category]} opacity-45`} />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
            {categoryLabels[project.category]}
          </span>
          <span className="rounded-full border border-white/10 bg-[#050807]/55 px-3 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/46">
            {project.language || "Codigo"}
          </span>
        </div>

        <div className="mt-7 flex items-start justify-between gap-5">
          <h3 className="text-[1.7rem] font-semibold leading-tight text-white sm:text-[2rem]">
            {project.displayName}
          </h3>
          <IconGlyph
            name="external-link"
            className="mt-1 size-5 shrink-0 text-accent transition duration-300 group-hover:scale-110"
          />
        </div>

        <p className="mt-5 text-[0.98rem] leading-7 text-white/56">{project.summary}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/40">
        <span>{project.stats.stars} stars</span>
        <span>{formatUpdatedDate(project.updatedAt)}</span>
      </div>
    </a>
  );
}

export function ProjectShowcase({ initialPayload }: { initialPayload: ProjectsPayload }) {
  const [payload, setPayload] = useState(initialPayload);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    let cancelled = false;

    async function refreshProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          return;
        }

        const nextPayload = (await response.json()) as ProjectsPayload;

        if (!cancelled && nextPayload.projects.length > 0) {
          setPayload(nextPayload);
        }
      } catch {
        // Keep the curated fallback if the live GitHub payload is unavailable.
      }
    }

    refreshProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredProjects = payload.featured.length > 0 ? payload.featured : payload.projects.slice(0, 3);
  const normalizedQuery = normalizeSearch(query);

  const filteredProjects = useMemo(
    () =>
      payload.projects.filter((project) => {
        const categoryMatches = category === "all" || project.category === category;

        return categoryMatches && matchesQuery(project, normalizedQuery);
      }),
    [category, normalizedQuery, payload.projects],
  );

  return (
    <div className="mt-12 space-y-12">
      <section aria-labelledby="featured-projects-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Curadoria
            </p>
            <h3 id="featured-projects-heading" className="mt-3 text-[2rem] font-semibold leading-tight text-white">
              Projetos em destaque
            </h3>
          </div>
          <p className="max-w-[430px] text-[0.96rem] leading-7 text-white/48">
            Repositorios com problema, decisao tecnica e proximo passo visiveis.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.fullName} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="repository-explorer-heading">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Explorer
            </p>
            <h3 id="repository-explorer-heading" className="mt-3 text-[2rem] font-semibold leading-tight text-white">
              Todos os repositorios publicos
            </h3>
          </div>

          <label className="w-full max-w-[440px]">
            <span className="sr-only">Buscar repositorios publicos</span>
            <input
              className="h-14 w-full rounded-full border border-white/10 bg-[#07100d]/88 px-5 text-[0.92rem] font-semibold text-white outline-none shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition placeholder:text-white/32 focus:border-accent/70 focus:bg-[#0b1713]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, stack ou resumo"
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="mt-5 flex w-full max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-[#07100d]/88 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:w-fit">
          {categoryFilters.map((filter) => {
            const selected = category === filter.value;

            return (
              <button
                aria-pressed={selected}
                className={`inline-flex shrink-0 items-center rounded-full px-4 py-2.5 text-[0.82rem] font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  selected
                    ? "bg-white text-[#06100d] shadow-[0_12px_34px_rgba(255,255,255,0.08)]"
                    : "text-white/52 hover:bg-white/[0.06] hover:text-white"
                }`}
                key={filter.value}
                onClick={() => setCategory(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <RepositoryCard key={project.fullName} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-8 text-center">
            <p className="text-[1.1rem] font-semibold text-white">Nenhum repositorio encontrado</p>
            <p className="mt-3 text-[0.95rem] leading-7 text-white/46">
              Ajuste a busca ou selecione outra categoria para navegar pelos repositorios.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
