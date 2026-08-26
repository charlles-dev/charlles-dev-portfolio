"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import { type Locale, type PortfolioDictionary } from "@/lib/i18n";
import { profile } from "@/lib/portfolio";
import { copyText } from "@/lib/clipboard";
import { localizeProjects } from "@/lib/projects/localize";
import type { PortfolioProject, PortfolioProjectCategory, ProjectsPayload } from "@/lib/projects/types";
import { trackTelemetry } from "@/lib/telemetry";

type Panel = "work" | null;
type WorkCategory = "all" | PortfolioProjectCategory;

function PanelClose({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <button type="button" className="reference-panel-close" aria-label={label} onClick={onClose}>
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18M18 18 6 6" /></svg>
    </button>
  );
}

function useDialogFocus(onClose: () => void) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = (): HTMLElement[] => Array.from(dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [contenteditable="true"], [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
    const focusTimer = window.setTimeout(() => (getFocusable()[0] ?? dialog).focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return dialogRef;
}


function formatProjectDate(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function ProjectEntry({ dictionary, locale, project, index }: { dictionary: PortfolioDictionary; locale: Locale; project: PortfolioProject; index: number }) {
  const category = dictionary.work.filters[project.category];
  const tags = Array.from(new Set([project.language, ...project.tags, ...project.topics].filter(Boolean))).slice(0, 5);
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <li className="works-rise works-entry">
      <article className="works-project">
        <div className="works-project-media" data-category={project.category} aria-hidden="true">
          <div className="works-repo-topline"><span>{dictionary.work.repository}</span><span>PUBLIC / {projectNumber}</span></div>
          <div className="works-repo-mark"><IconGlyph name="github" className="size-5" /><span>{project.fullName}</span></div>
          <strong>{project.displayName}</strong>
          <div className="works-repo-lines"><i /><i /><i /><i /></div>
          <div className="works-repo-footer"><span>{project.language || "Code"}</span><span>{dictionary.work.updated} {formatProjectDate(project.updatedAt, locale)}</span></div>
        </div>
        <div className="works-project-copy">
          <div className="works-project-kicker">
            <span>{category}</span>
            <span>{project.enrichmentStatus === "ai" ? "AI / GitHub" : "GitHub"}</span>
          </div>
          <h3>{project.displayName}</h3>
          <p className="works-project-summary">{project.summary}</p>
          <div className="works-project-quickview" aria-label={dictionary.work.quickLabel}>
            <span className="works-project-quickview-label">{dictionary.work.quickLabel}</span>
            <p>{project.featuredReason}</p>
            <div className="works-project-quickview-meta"><span>{project.language || "Code"}</span><span>{category}</span><span>{project.stats.stars} ★</span></div>
          </div>
          <ul className="works-project-bullets">
            <li><strong>{dictionary.work.problem}:</strong> {project.problem}</li>
            <li><strong>{dictionary.work.decision}:</strong> {project.technicalDecision}</li>
            <li><strong>{dictionary.work.next}:</strong> {project.nextStep}</li>
          </ul>
          <div className="works-tech-row">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="works-project-actions">
            <a className="link-underline" href={project.htmlUrl} target="_blank" rel="noreferrer">
              {dictionary.work.openProject}
              <IconGlyph name="arrow-right" className="size-4" />
            </a>
            <span className="works-project-index" aria-hidden="true">/{projectNumber}</span>
          </div>
        </div>
      </article>
    </li>
  );
}

function WorkRepositoryList({ projects, category, dictionary, locale, loading, source, onCopyWorkLink, linkCopied }: { projects: PortfolioProject[]; category: WorkCategory; dictionary: PortfolioDictionary; locale: Locale; loading: boolean; source: ProjectsPayload["cache"]; onCopyWorkLink: () => void; linkCopied: boolean }) {
  return (
    <div id="painel-repositories" role="tabpanel" aria-labelledby={`work-tab-${category}`}>
      <div className="works-explorer-intro">
        <div>
          <p className="reference-eyebrow">{dictionary.work.publicOnly}</p>
          <h3>{dictionary.work.explorerTitle}</h3>
        </div>
        <div className="works-source" aria-live="polite"><i aria-hidden="true" />{loading ? dictionary.work.loadingProjects : source === "fallback" ? dictionary.work.fallbackSource : dictionary.work.liveSource}<span>{projects.length} {dictionary.work.repository.toLowerCase()}{projects.length === 1 ? "" : "s"}</span></div>
      </div>
      {projects.length > 0 ? (
        <ul className="works-list">
          {projects.map((project, index) => <ProjectEntry key={project.fullName} dictionary={dictionary} locale={locale} project={project} index={index} />)}
        </ul>
      ) : (
        <div className="works-empty-state"><Image src="/reference/states/charlles-bug.jpeg" alt="" width={220} height={220} /><strong>{dictionary.work.noResults}</strong><p>{dictionary.work.noResultsDescription}</p></div>
      )}
      <div className="works-rise works-cta">
        <div><p className="reference-eyebrow">{dictionary.work.eyebrow}</p><h3>{dictionary.work.description}</h3></div>
        <div className="works-cta-actions">
          <button type="button" className="reference-secondary-button" onClick={onCopyWorkLink} aria-live="polite"><IconGlyph name="external-link" className="size-4" />{linkCopied ? dictionary.work.workLinkCopied : dictionary.work.copyWorkLink}</button>
          <a className="reference-primary-button" href={`mailto:${profile.email}`}>{dictionary.contact.secondaryCta}<IconGlyph name="arrow-right" className="size-4" /></a>
        </div>
      </div>
    </div>
  );
}

function WorkPanel({ dictionary, locale, initialPayload, onClose }: { dictionary: PortfolioDictionary; locale: Locale; initialPayload?: ProjectsPayload; onClose: () => void }) {
  const [payload, setPayload] = useState(initialPayload);
  const [category, setCategory] = useState<WorkCategory>("all");
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dialogRef = useDialogFocus(onClose);

  useEffect(() => {
    let cancelled = false;
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) return;
        const nextPayload = (await response.json()) as ProjectsPayload;
        if (!cancelled) setPayload(nextPayload);
      } catch {
        trackTelemetry({ name: "projects_refresh_error", source: "api" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadProjects();
    return () => { cancelled = true; };
  }, []);

  const publicProjects = useMemo(() => localizeProjects((payload?.projects ?? []).filter((project) => !project.private && !project.hidden), locale), [locale, payload?.projects]);
  const categories = useMemo<WorkCategory[]>(() => ["all", ...Array.from(new Set(publicProjects.map((project) => project.category)))], [publicProjects]);
  const activeCategory = categories.includes(category) ? category : "all";
  const visibleProjects = useMemo(() => activeCategory === "all" ? publicProjects : publicProjects.filter((project) => project.category === activeCategory), [activeCategory, publicProjects]);

  const handleCopyWorkLink = async () => {
    const copied = await copyText(`${window.location.origin}${window.location.pathname}${window.location.search}#repositories`);
    if (!copied) return;
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2200);
  };
  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentTab: WorkCategory) => {
    const currentIndex = categories.indexOf(currentTab);
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? categories.length - 1 : event.key === "ArrowRight" || event.key === "ArrowDown" ? (currentIndex + 1) % categories.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (currentIndex + categories.length - 1) % categories.length : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    const nextTab = categories[nextIndex];
    setCategory(nextTab);
    window.setTimeout(() => tabRefs.current[nextTab]?.focus(), 0);
  };

  return (
    <>
      <div className="works-veil" aria-hidden="true" onClick={onClose} />
      <section ref={dialogRef} className="works-panel bg-card fixed inset-x-0 top-3 bottom-0 z-100 flex flex-col overflow-hidden rounded-t-3xl outline-none" id="reference-work-panel" data-state="open" role="dialog" aria-modal="true" aria-label={dictionary.work.panelTitle} tabIndex={-1}>
        <header className="works-rise border-border/70 flex shrink-0 items-center gap-2 border-b px-4 py-3 sm:gap-4 sm:px-8 sm:py-4">
          <h2 id="reference-work-title">{dictionary.work.panelTitle}</h2>
          <div className="reference-work-tabs" role="tablist" aria-label={dictionary.work.panelTitle}>
            {categories.map((value) => (
              <button ref={(node) => { tabRefs.current[value] = node; }} type="button" role="tab" id={`work-tab-${value}`} tabIndex={activeCategory === value ? 0 : -1} aria-selected={activeCategory === value} aria-controls="painel-repositories" className={activeCategory === value ? "is-active" : ""} key={value} onKeyDown={(event) => handleTabKeyDown(event, value)} onClick={() => setCategory(value)}>
                <span>{dictionary.work.filters[value]}</span>
                <small>{value === "all" ? publicProjects.length : publicProjects.filter((project) => project.category === value).length}</small>
              </button>
            ))}
          </div>
          <div className="reference-panel-spacer" />
          <PanelClose label={dictionary.work.panelClose} onClose={onClose} />
        </header>
        <div className="works-scroll-area">
          <WorkRepositoryList projects={visibleProjects} category={activeCategory} dictionary={dictionary} locale={locale} loading={loading} source={payload?.cache ?? "fallback"} onCopyWorkLink={handleCopyWorkLink} linkCopied={linkCopied} />
        </div>
      </section>
    </>
  );
}

export function ReferencePanels({ panel, locale, dictionary, initialPayload, onClose }: { panel: Panel; locale: Locale; dictionary: PortfolioDictionary; initialPayload?: ProjectsPayload; onClose: () => void }) {
  useEffect(() => {
    if (!panel) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, panel]);

  if (panel === "work") return <WorkPanel dictionary={dictionary} locale={locale} initialPayload={initialPayload} onClose={onClose} />;
  return null;
}
