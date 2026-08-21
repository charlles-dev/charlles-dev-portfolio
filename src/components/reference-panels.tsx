"use client";

import { useEffect, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import { profile, projects, socialLinks } from "@/lib/portfolio";

type Panel = "work" | "about" | "contact" | null;
type WorkTab = "product" | "visual" | "motion";

function PanelClose({ label, onClose }: { label: string; onClose: () => void }) {
  return <button type="button" className="reference-panel-close" aria-label={label} onClick={onClose}>×</button>;
}

function ContactActions({ dictionary }: { dictionary: PortfolioDictionary }) {
  const linkedin = socialLinks.find((link) => link.kind === "linkedin");
  const email = socialLinks.find((link) => link.kind === "email");

  return (
    <div className="reference-dialog-actions">
      {linkedin && <a className="reference-primary-button" href={linkedin.href} target="_blank" rel="noreferrer">{dictionary.contact.primaryCta}<IconGlyph name="arrow-right" className="size-4" /></a>}
      {email && <a className="reference-secondary-button" href={email.href}>{dictionary.contact.secondaryCta}</a>}
    </div>
  );
}

function WorkPanel({ dictionary, onClose }: { dictionary: PortfolioDictionary; onClose: () => void }) {
  const [tab, setTab] = useState<WorkTab>("product");
  const tabLabels: Record<WorkTab, string> = { product: dictionary.work.tabs.product, visual: dictionary.work.tabs.visual, motion: dictionary.work.tabs.motion };

  return (
    <>
      <div className="reference-overlay" aria-hidden="true" onClick={onClose} />
      <section className="reference-work-panel" role="dialog" aria-modal="true" aria-labelledby="reference-work-title">
        <header className="reference-panel-header">
          <h2 id="reference-work-title">{dictionary.work.panelTitle}</h2>
          <div className="reference-work-tabs" role="tablist" aria-label={dictionary.work.panelTitle}>
            {(Object.keys(tabLabels) as WorkTab[]).map((value) => (
              <button type="button" role="tab" aria-selected={tab === value} className={tab === value ? "is-active" : ""} key={value} onClick={() => setTab(value)}>{tabLabels[value]}</button>
            ))}
          </div>
          <div className="reference-panel-spacer" />
          <PanelClose label={dictionary.work.panelClose} onClose={onClose} />
        </header>
        <div className="reference-panel-scroll">
          {tab === "product" && (
            <div className="reference-work-grid" role="tabpanel">
              {projects.map((project, index) => (
                <a className={`reference-work-card work-card-${index + 1}`} href={project.href} target="_blank" rel="noreferrer" key={project.name}>
                  <div className="reference-project-visual" aria-hidden="true"><span>{project.language}</span><strong>{String(index + 1).padStart(2, "0")}</strong></div>
                  <div className="reference-work-card-copy"><span>{project.categoryLabel} · {project.language}</span><h3>{project.name}</h3><p>{project.description}</p><span className="reference-card-link">{dictionary.work.openProject} <IconGlyph name="arrow-right" className="size-4" /></span></div>
                </a>
              ))}
            </div>
          )}
          {tab === "visual" && (
            <div className="reference-tab-intro" role="tabpanel">
              <p className="reference-eyebrow">{dictionary.work.tabs.visual}</p>
              <h3>{dictionary.about.title}</h3>
              <p>{dictionary.about.body}</p>
              <div className="reference-visual-board"><span>Interface</span><span>Hierarchy</span><span>Motion</span><span>Clarity</span></div>
            </div>
          )}
          {tab === "motion" && (
            <div className="reference-tab-intro" role="tabpanel">
              <p className="reference-eyebrow">{dictionary.work.tabs.motion}</p>
              <h3>{dictionary.now.title}</h3>
              <p>{dictionary.now.description}</p>
              <div className="reference-motion-board" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function InfoDialog({ panel, dictionary, onClose }: { panel: "about" | "contact"; dictionary: PortfolioDictionary; onClose: () => void }) {
  const linkedin = socialLinks.find((link) => link.kind === "linkedin");
  const email = socialLinks.find((link) => link.kind === "email");
  const about = panel === "about";
  const title = about ? dictionary.about.title : dictionary.contact.title;

  return (
    <>
      <div className="reference-overlay reference-overlay-soft" aria-hidden="true" onClick={onClose} />
      <section className="reference-info-dialog" role="dialog" aria-modal="true" aria-labelledby="reference-info-title">
        <div className="reference-dialog-avatar"><span>{profile.name.split(" ").map((part) => part[0]).join("")}</span></div>
        <div className="reference-dialog-topline"><span>{dictionary.hero.role}</span><span className="reference-status-pill"><span className="status-dot" aria-hidden="true" />{dictionary.hero.status}</span></div>
        <h2 id="reference-info-title">{title}</h2>
        {about ? (
          <>
            <div className="reference-facts"><div><strong>+3</strong><span>{dictionary.work.featuredLabel}</span></div><div><strong>PB</strong><span>{dictionary.hero.facts[0].label}</span></div><div><strong>∞</strong><span>{dictionary.expertise.eyebrow}</span></div></div>
            <p>{dictionary.about.body}</p>
            <p>{dictionary.expertise.description}</p>
            <ContactActions dictionary={dictionary} />
          </>
        ) : (
          <>
            <div className="reference-facts"><div><strong>3</strong><span>{dictionary.work.featuredLabel}</span></div><div><strong>24h</strong><span>{dictionary.hero.facts[1].label}</span></div><div><strong>BR</strong><span>{dictionary.hero.facts[0].value}</span></div></div>
            <p>{dictionary.contact.description}</p>
            <ContactActions dictionary={dictionary} />
            <div className="reference-dialog-links">{linkedin && <a href={linkedin.href} target="_blank" rel="noreferrer">LinkedIn</a>}{email && <a href={email.href}>{profile.email}</a>}</div>
          </>
        )}
        <PanelClose label={about ? dictionary.nav.about : dictionary.nav.contact} onClose={onClose} />
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
  if (panel === "about" || panel === "contact") return <InfoDialog panel={panel} dictionary={dictionary} onClose={onClose} />;
  return null;
}
