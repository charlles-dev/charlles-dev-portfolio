"use client";

import { useEffect, useMemo, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import { localizeProjects } from "@/lib/projects/localize";
import { trackTelemetry } from "@/lib/telemetry";
import type { PortfolioProject, PortfolioProjectCategory, ProjectsPayload } from "@/lib/projects/types";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";

type CategoryFilter = "all" | PortfolioProjectCategory;

const categoryFilters: CategoryFilter[] = ["all", "web", "automation", "infra", "technical-base", "experiment"];

function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function formatUpdatedDate(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent";

  const dateLocale = locale === "pt-BR" ? "pt-BR" : locale;
  return new Intl.DateTimeFormat(dateLocale, { day: "2-digit", month: "short", timeZone: "UTC", year: "numeric" }).format(date);
}

function matchesQuery(project: PortfolioProject, query: string) {
  if (!query) return true;
  const searchableText = [project.displayName, project.name, project.fullName, project.summary, project.description, project.language, project.category, ...project.tags, ...project.topics].join(" ");
  return normalizeSearch(searchableText).includes(query);
}

function FeaturedProjectCard({ project, dictionary, index }: { project: PortfolioProject; dictionary: PortfolioDictionary; index: number }) {
  return (
    <a className="featured-project" href={project.htmlUrl} target="_blank" rel="noreferrer" aria-label={`${project.displayName}: ${dictionary.work.openProject}`}>
      <div className="project-index">0{index + 1}</div>
      <div className="project-topline">
        <span className="project-type">{dictionary.work.featuredLabel}</span>
        <span className="project-language">{project.language || "Code"}</span>
      </div>
      <div className="project-main">
        <p className="project-reason">{project.featuredReason}</p>
        <h3>{project.displayName}</h3>
        <p className="project-summary">{project.summary}</p>
      </div>
      <div className="project-case-grid">
        {[
          [dictionary.work.problem, project.problem],
          [dictionary.work.decision, project.technicalDecision],
          [dictionary.work.next, project.nextStep],
        ].map(([label, value]) => (
          <div className="project-case-item" key={label}>
            <span>{label}</span>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className="project-footer">
        <span>{dictionary.work.filters[project.category]}</span>
        <span className="project-open">{dictionary.work.openProject} <IconGlyph name="arrow-right" className="size-4" /></span>
      </div>
    </a>
  );
}

function RepositoryCard({ project, dictionary, locale }: { project: PortfolioProject; dictionary: PortfolioDictionary; locale: Locale }) {
  return (
    <a className="repository-card" href={project.htmlUrl} target="_blank" rel="noreferrer" aria-label={project.displayName}>
      <div className="repository-card-topline">
        <span>{dictionary.work.filters[project.category]}</span>
        <IconGlyph name="external-link" className="size-4" />
      </div>
      <h3>{project.displayName}</h3>
      <p>{project.summary}</p>
      <div className="repository-card-meta">
        <span>{project.language || "Code"}</span>
        <span>{dictionary.work.updated} {formatUpdatedDate(project.updatedAt, locale)}</span>
      </div>
    </a>
  );
}

export function ProjectShowcase({ initialPayload, locale, dictionary }: { initialPayload: ProjectsPayload; locale: Locale; dictionary: PortfolioDictionary }) {
  const [payload, setPayload] = useState(initialPayload);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    let cancelled = false;

    async function refreshProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) return;
        const nextPayload = (await response.json()) as ProjectsPayload;
        if (!cancelled && nextPayload.projects.length > 0) setPayload(nextPayload);
      } catch {
        trackTelemetry({ name: "projects_refresh_error", source: "api" });
        // The curated server fallback remains visible when GitHub is unavailable.
      }
    }

    void refreshProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const localizedProjects = useMemo(() => localizeProjects(payload.projects, locale), [locale, payload.projects]);
  const localizedFeatured = useMemo(() => localizeProjects(payload.featured.length > 0 ? payload.featured : payload.projects.slice(0, 3), locale), [locale, payload.featured, payload.projects]);
  const normalizedQuery = normalizeSearch(query);
  const filteredProjects = useMemo(() => localizedProjects.filter((project) => (category === "all" || project.category === category) && matchesQuery(project, normalizedQuery)), [category, localizedProjects, normalizedQuery]);

  return (
    <div className="projects-showcase">
      <section className="featured-projects" aria-labelledby="featured-projects-heading">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">{dictionary.work.eyebrow}</p>
            <h2 id="featured-projects-heading">{dictionary.work.title}</h2>
          </div>
          <p>{dictionary.work.description}</p>
        </div>
        <div className="featured-project-grid">
          {localizedFeatured.map((project, index) => <FeaturedProjectCard key={project.fullName} project={project} dictionary={dictionary} index={index} />)}
        </div>
      </section>

      <section className="repository-explorer" aria-labelledby="repository-explorer-heading">
        <div className="explorer-header">
          <div>
            <p className="eyebrow">{dictionary.work.explorerLabel}</p>
            <h2 id="repository-explorer-heading">{dictionary.work.explorerTitle}</h2>
          </div>
          <label className="search-field">
            <span className="sr-only">{dictionary.work.searchLabel}</span>
            <IconGlyph name="world" className="size-4" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={dictionary.work.searchPlaceholder} />
          </label>
        </div>
        <div className="filter-row" role="group" aria-label={dictionary.work.filtersLabel}>
          {categoryFilters.map((filter) => (
            <button type="button" key={filter} aria-pressed={category === filter} className={category === filter ? "filter-button is-active" : "filter-button"} onClick={() => setCategory(filter)}>
              {dictionary.work.filters[filter]}
            </button>
          ))}
        </div>
        {filteredProjects.length > 0 ? (
          <div className="repository-grid">{filteredProjects.map((project) => <RepositoryCard key={project.fullName} project={project} dictionary={dictionary} locale={locale} />)}</div>
        ) : (
          <div className="empty-state"><strong>{dictionary.work.noResults}</strong><p>{dictionary.work.noResultsDescription}</p></div>
        )}
      </section>
    </div>
  );
}
