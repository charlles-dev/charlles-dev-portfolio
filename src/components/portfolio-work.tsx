import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import { localizeProjects } from "@/lib/projects/localize";
import type { PortfolioProject, ProjectsPayload } from "@/lib/projects/types";

const selectedProjectNames = ["charlles-dev-portfolio", "Astrolink", "trakr"];

function selectProjects(payload: ProjectsPayload, locale: Locale) {
  const publicProjects = localizeProjects(
    payload.projects.filter((project) => !project.private && !project.hidden),
    locale,
  );

  return selectedProjectNames
    .map((name) => publicProjects.find((project) => project.name.toLowerCase() === name.toLowerCase()))
    .filter((project): project is PortfolioProject => Boolean(project));
}

export function PortfolioWork({
  locale,
  dictionary,
  payload,
  onOpenExplorer,
}: {
  locale: Locale;
  dictionary: PortfolioDictionary;
  payload: ProjectsPayload;
  onOpenExplorer: () => void;
}) {
  const projects = selectProjects(payload, locale);

  return (
    <section className="portfolio-work-section" id="work" aria-labelledby="portfolio-work-title">
      <div className="portfolio-section-heading">
        <div>
          <p className="reference-eyebrow">{dictionary.work.eyebrow}</p>
          <h2 id="portfolio-work-title">{dictionary.work.title}</h2>
        </div>
        <p>{dictionary.work.description}</p>
      </div>

      <div className="portfolio-work-scene">
        <Image
          src="/reference/work/charlles-blocks.jpeg"
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, 42vw"
        />
      </div>

      <ol className="portfolio-selected-projects">
        {projects.map((project) => (
          <li key={project.fullName}>
            <a href={project.htmlUrl} target="_blank" rel="noreferrer">
              <div className="portfolio-project-line">
                <span>{dictionary.work.filters[project.category]}</span>
                <span>{project.language || dictionary.work.repository}</span>
              </div>
              <h3>{project.displayName}</h3>
              <p>{project.summary}</p>
              <dl>
                <div>
                  <dt>{dictionary.work.problem}</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>{dictionary.work.decision}</dt>
                  <dd>{project.technicalDecision}</dd>
                </div>
              </dl>
              <span className="portfolio-project-open">
                {dictionary.work.openProject}
                <IconGlyph name="arrow-right" className="size-4" />
              </span>
            </a>
          </li>
        ))}
      </ol>

      <button type="button" className="portfolio-text-action" onClick={onOpenExplorer}>
        {dictionary.work.explorerTitle}
        <IconGlyph name="arrow-right" className="size-4" />
      </button>
    </section>
  );
}
