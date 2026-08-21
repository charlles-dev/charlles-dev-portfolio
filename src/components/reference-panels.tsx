"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import { profile, projects, socialLinks } from "@/lib/portfolio";

type Panel = "work" | "about" | "contact" | null;
type WorkTab = "product" | "visual" | "motion";

function PanelClose({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <button type="button" className="reference-panel-close" aria-label={label} onClick={onClose}>
      <span aria-hidden="true">×</span>
    </button>
  );
}

function SocialLinks() {
  return (
    <nav className="profile-social-links" aria-label="Social links">
      {socialLinks.map((link) => {
        const icon = link.kind === "github" ? "github" : link.kind === "linkedin" ? "linkedin" : link.kind === "email" ? "mail" : null;
        return (
          <a key={link.kind} href={link.href} target={link.kind === "email" ? undefined : "_blank"} rel={link.kind === "email" ? undefined : "noreferrer"} aria-label={link.label}>
            {icon ? <IconGlyph name={icon} className="size-5" /> : <span aria-hidden="true" className="profile-social-letter">{link.label.slice(0, 1)}</span>}
          </a>
        );
      })}
    </nav>
  );
}

function ContactActions({ dictionary }: { dictionary: PortfolioDictionary }) {
  const whatsapp = socialLinks.find((link) => link.kind === "whatsapp");
  const email = socialLinks.find((link) => link.kind === "email");

  return (
    <div className="profile-actions">
      {whatsapp && (
        <a className="profile-action profile-action-primary" href={whatsapp.href} target="_blank" rel="noreferrer">
          <span>{dictionary.contact.primaryCta}</span>
          <IconGlyph name="arrow-right" className="size-4" />
        </a>
      )}
      {email && (
        <a className="profile-action profile-action-secondary" href={email.href}>
          <span>
            <strong>{dictionary.contact.secondaryCta}</strong>
            <small>{profile.email}</small>
          </span>
          <IconGlyph name="arrow-right" className="size-4" />
        </a>
      )}
    </div>
  );
}

function ProjectEntry({ dictionary, index }: { dictionary: PortfolioDictionary; index: number }) {
  const project = projects[index];
  const copy = dictionary.projects[project.name] ?? {
    summary: project.description,
    problem: project.problem,
    decision: project.built,
    next: project.next,
    category: project.categoryLabel,
    reason: project.focus,
  };

  return (
    <li className="works-rise works-entry">
      <article className="works-project">
        <div className={`works-project-media works-project-media-${index + 1}`} aria-hidden="true">
          <span>{project.categoryLabel}</span>
          <strong>{project.scene}</strong>
          <i />
        </div>
        <div className="works-project-copy">
          <div className="works-project-kicker">
            <span>{index === 0 ? dictionary.work.featuredLabel : copy.category}</span>
            <span>{project.language}</span>
          </div>
          <h3>{project.name}</h3>
          <p className="works-project-summary">{copy.summary}</p>
          <ul className="works-project-bullets">
            <li>{copy.problem}</li>
            <li>{copy.decision}</li>
            <li>{copy.next}</li>
          </ul>
          <div className="works-tech-row">
            <span>{project.language}</span>
            <span>{project.categoryLabel}</span>
            <span>{project.metric}</span>
          </div>
          <div className="works-project-actions">
            <a className="link-underline" href={project.href} target="_blank" rel="noreferrer">
              {dictionary.work.openProject}
              <IconGlyph name="arrow-right" className="size-4" />
            </a>
            <button type="button" aria-label={`${project.name} ${dictionary.work.featuredLabel}`} className="works-like-button">
              <span aria-hidden="true">♡</span> 0
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}

function WorkTabPanel({ tab, dictionary }: { tab: WorkTab; dictionary: PortfolioDictionary }) {
  if (tab === "product") {
    return (
      <>
        <ul className="works-list" role="tabpanel" aria-label={dictionary.work.tabs.product}>
          {projects.map((_, index) => <ProjectEntry key={projects[index].name} dictionary={dictionary} index={index} />)}
        </ul>
        <div className="works-rise works-cta">
          <div>
            <p className="reference-eyebrow">{dictionary.work.eyebrow}</p>
            <h3>{dictionary.work.description}</h3>
          </div>
          <a className="reference-primary-button" href={`mailto:${profile.email}`}>
            {dictionary.contact.secondaryCta}
            <IconGlyph name="arrow-right" className="size-4" />
          </a>
        </div>
      </>
    );
  }

  const title = tab === "visual" ? dictionary.expertise.title : dictionary.now.title;
  const description = tab === "visual" ? dictionary.expertise.description : dictionary.now.description;
  const items = tab === "visual" ? dictionary.expertise.items : dictionary.now.items;

  return (
    <div className="works-tab-content" role="tabpanel" aria-label={tab === "visual" ? dictionary.work.tabs.visual : dictionary.work.tabs.motion}>
      <p className="reference-eyebrow">{tab === "visual" ? dictionary.work.tabs.visual : dictionary.work.tabs.motion}</p>
      <h3>{title}</h3>
      <p className="works-tab-description">{description}</p>
      <div className="works-tab-grid">
        {items.map((item) => (
          <article className="works-tab-card" key={item.title}>
            <IconGlyph name={item.icon} className="size-5" />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <span>{"tools" in item ? item.tools.join(" · ") : item.proof}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function WorkPanel({ dictionary, onClose }: { dictionary: PortfolioDictionary; onClose: () => void }) {
  const [tab, setTab] = useState<WorkTab>("product");
  const tabLabels: Record<WorkTab, string> = {
    product: dictionary.work.tabs.product,
    visual: dictionary.work.tabs.visual,
    motion: dictionary.work.tabs.motion,
  };

  return (
    <>
      <div className="works-veil" aria-hidden="true" onClick={onClose} />
      <section className="works-panel bg-card fixed inset-x-0 top-3 bottom-0 z-100 flex flex-col overflow-hidden rounded-t-3xl outline-none sm:inset-x-6 sm:top-6" data-state="open" role="dialog" aria-modal="true" aria-labelledby="reference-work-title" tabIndex={-1}>
        <header className="works-rise border-border/70 flex shrink-0 items-center gap-2 border-b px-4 py-3 sm:gap-4 sm:px-8 sm:py-4">
          <h2 id="reference-work-title">{dictionary.work.panelTitle}</h2>
          <div className="reference-work-tabs" role="tablist" aria-label={dictionary.work.panelTitle}>
            {(Object.keys(tabLabels) as WorkTab[]).map((value) => (
              <button type="button" role="tab" aria-selected={tab === value} className={tab === value ? "is-active" : ""} key={value} onClick={() => setTab(value)}>
                {tabLabels[value]}
              </button>
            ))}
          </div>
          <div className="reference-panel-spacer" />
          <PanelClose label={dictionary.work.panelClose} onClose={onClose} />
        </header>
        <div className="works-scroll-area">
          <WorkTabPanel tab={tab} dictionary={dictionary} />
        </div>
      </section>
    </>
  );
}

function ProfileDialog({ panel, dictionary, onClose }: { panel: "about" | "contact"; dictionary: PortfolioDictionary; onClose: () => void }) {
  const about = panel === "about";
  const title = about ? dictionary.about.title : dictionary.contact.title;
  const dialogLabel = about ? dictionary.nav.about : dictionary.nav.contact;

  return (
    <>
      <div className="works-veil profile-veil" aria-hidden="true" onClick={onClose} />
      <section className="profile-dialog" data-state="open" role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title" tabIndex={-1}>
        <div className="profile-dialog-cover">
          <Image src="/reference/charlles-toy-canonical.png" alt="" fill sizes="(max-width: 640px) 100vw, 420px" priority />
          <div className="profile-dialog-cover-tint" />
          <PanelClose label={dialogLabel} onClose={onClose} />
        </div>
        <div className="profile-dialog-body">
          <div className="profile-avatar">
            <Image src="/reference/charlles-toy-canonical.png" alt="" fill sizes="96px" />
          </div>
          <h2 id="profile-dialog-title">{profile.name}</h2>
          <p className="profile-dialog-role">{profile.role}</p>
          <div className="profile-stats">
            <div><strong>{projects.length}+</strong><span>{dictionary.work.featuredLabel}</span></div>
            <div><strong>PB</strong><span>{profile.location}</span></div>
            <div><strong>∞</strong><span>{dictionary.hero.facts[1]?.label ?? dictionary.hero.role}</span></div>
          </div>
          <h3>{title}</h3>
          {about ? (
            <>
              <p>{dictionary.about.body}</p>
              <p>{dictionary.expertise.description}</p>
            </>
          ) : (
            <p>{dictionary.contact.description}</p>
          )}
          <ContactActions dictionary={dictionary} />
          <SocialLinks />
        </div>
      </section>
    </>
  );
}

export function ReferencePanels({ panel, dictionary, onClose }: { panel: Panel; dictionary: PortfolioDictionary; onClose: () => void }) {
  useEffect(() => {
    if (!panel) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, panel]);

  if (panel === "work") return <WorkPanel dictionary={dictionary} onClose={onClose} />;
  if (panel === "about" || panel === "contact") return <ProfileDialog panel={panel} dictionary={dictionary} onClose={onClose} />;
  return null;
}
