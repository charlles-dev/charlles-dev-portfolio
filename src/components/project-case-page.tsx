import Link from "next/link";

import { IconGlyph } from "@/components/icon-glyph";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { getNextCaseSlug, getProfessionalContent, type ProjectCase } from "@/lib/professional-content";

export function ProjectCasePage({ locale, dictionary, project }: { locale: Locale; dictionary: PortfolioDictionary; project: ProjectCase }) {
  const content = getProfessionalContent(locale);
  const ui = content.caseUi;
  const next = content.cases[getNextCaseSlug(project.slug)];

  return (
    <div className="case-page" id="conteudo">
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <header className="case-hero">
          <Link className="case-back" href={`${localePath(locale)}#work`}>
            <IconGlyph name="arrow-right" className="size-4 case-back-icon" />
            {ui.back}
          </Link>
          <p className="reference-eyebrow">{project.kicker}</p>
          <h1>{project.title}</h1>
          <p className="case-summary">{project.summary}</p>
          <dl className="case-facts">
            <div><dt>{ui.role}</dt><dd>{project.role}</dd></div>
            <div><dt>{ui.period}</dt><dd>{project.period}</dd></div>
            <div><dt>{ui.status}</dt><dd><span className="case-status-dot" />{project.status}</dd></div>
          </dl>
          <div className="case-actions">
            <a className="reference-primary-button" href={project.repository} target="_blank" rel="noreferrer">{ui.repository}<IconGlyph name="external-link" className="size-4" /></a>
            {project.demo && <a className="case-secondary-action" href={project.demo} target="_blank" rel="noreferrer">{ui.demo}<IconGlyph name="external-link" className="size-4" /></a>}
          </div>
        </header>

        <section className="case-dual" aria-label={`${ui.problem} — ${ui.context}`}>
          <article><p className="reference-eyebrow">{ui.problem}</p><p>{project.problem}</p></article>
          <article><p className="reference-eyebrow">{ui.context}</p><p>{project.context}</p></article>
        </section>

        <section className="case-built" aria-labelledby="case-built-title">
          <p className="reference-eyebrow">{ui.built}</p>
          <h2 id="case-built-title">{project.title}</h2>
          <ol>{project.built.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
        </section>

        <section className="case-architecture" aria-labelledby="case-architecture-title">
          <div>
            <p className="reference-eyebrow">{ui.architecture}</p>
            <h2 id="case-architecture-title">{project.architecture.map((step) => step.label).join(" → ")}</h2>
          </div>
          <ol>
            {project.architecture.map((step, index) => (
              <li key={step.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.label}</h3><p>{step.detail}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-decisions" aria-labelledby="case-decisions-title">
          <p className="reference-eyebrow">{ui.decisions}</p>
          <h2 id="case-decisions-title">{project.decisions[0]?.title}</h2>
          <div>{project.decisions.map((decision) => <article key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div>
        </section>

        <section className="case-reality">
          <article>
            <p className="reference-eyebrow">{ui.results}</p>
            <ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul>
          </article>
          <article>
            <p className="reference-eyebrow">{ui.limitations}</p>
            <ul>{project.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
          </article>
        </section>

        <footer className="case-next">
          <p className="reference-eyebrow">{ui.nextCase}</p>
          <Link href={`/${locale}/projects/${next.slug}`}>{next.title}<IconGlyph name="arrow-right" className="size-6" /></Link>
        </footer>
      </main>
    </div>
  );
}
