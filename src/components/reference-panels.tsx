"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import type { IconName } from "@/components/icon-glyph";
import { bookingUrl, profile, projects, socialLinks } from "@/lib/portfolio";

type Panel = "work" | "about" | "contact" | null;
type WorkTab = "product" | "visual" | "motion";

function PanelClose({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <button type="button" className="reference-panel-close" aria-label={label} onClick={onClose}>
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18M18 18 6 6" /></svg>
    </button>
  );
}

type PanelSocialKind = "github" | "linkedin" | "email" | "discord" | "whatsapp";

function PanelSocialGlyph({ kind }: { kind: PanelSocialKind }) {
  if (kind === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.7 3.2A2.3 2.3 0 1 1 4.7 7.8a2.3 2.3 0 0 1 0-4.6ZM2.7 9.2h4v11.6h-4V9.2Zm6.4 0h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12v5.92h-4v-5.25c0-1.25-.02-2.86-1.75-2.86-1.75 0-2.02 1.37-2.02 2.77v5.34h-4V9.2Z" /></svg>;
  if (kind === "email") return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M13.948 15.685a3 3 0 0 0 4.114.006l10.075-9.464A3 3 0 0 0 27 6H5a3 3 0 0 0-1.08.209z" /><path d="M19.431 17.149a5.007 5.007 0 0 1-6.857-.01L2.4 7.527A3 3 0 0 0 2 9v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V9a2.96 2.96 0 0 0-.377-1.425z" /></svg>;
  if (kind === "discord") return <svg aria-hidden="true" viewBox="0 0 256 199"><path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0C96.911 9.645 94.193 4.113 91.897 0a207.9 207.9 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.633 108.636 108.636 0 0 0 5.356-4.236c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.236 136.07 136.07 0 0 1-21.887 10.653 160.469 160.469 0 0 0 13.873 22.848c21.142-6.581 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.055-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.148-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.168 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.015-11.805-23.015-26.18s10.148-26.2 23.015-26.2c12.866 0 23.236 11.804 23.015 26.2 0 14.375-10.149 26.18-23.015 26.18Z" /></svg>;
  if (kind === "whatsapp") return <svg aria-hidden="true" viewBox="0 0 512 512"><path d="M256.064 0h-.128C114.784 0 0 114.816 0 256c0 56 18.048 107.904 48.736 150.048l-31.904 95.104 98.4-31.456C155.712 496.512 204 512 256.064 512 397.216 512 512 397.152 512 256S397.216 0 256.064 0m148.96 361.504c-6.176 17.44-30.688 31.904-50.24 36.128-13.376 2.848-30.848 5.12-89.664-19.264-75.232-31.168-123.68-107.616-127.456-112.576-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624 26.176-62.304c6.176-6.304 16.384-9.184 26.176-9.184 3.168 0 6.016.16 8.576.288 7.52.32 11.296.768 16.256 12.64 6.176 14.88 21.216 51.616 23.008 55.392 1.824 3.776 3.648 8.896 1.088 13.856-2.4 5.12-4.512 7.392-8.288 11.744s-7.36 7.68-11.136 12.352c-3.456 4.064-7.36 8.416-3.008 15.936 4.352 7.36 19.392 31.904 41.536 51.616 28.576 25.44 51.744 33.568 60.032 37.024 6.176 2.56 13.536 1.952 18.048-2.848 5.728-6.176 12.8-16.416 20-26.496 5.12-7.232 11.584-8.128 18.368-5.568 6.912 2.4 43.488 20.48 51.008 24.224 7.52 3.776 12.48 5.568 14.304 8.736 1.792 3.168 1.792 18.048-4.384 35.52" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 512 512"><path d="M255.968 5.329C114.624 5.329 0 120.401 0 262.353c0 113.536 73.344 209.856 175.104 243.872 12.8 2.368 17.472-5.568 17.472-12.384 0-6.112-.224-22.272-.352-43.712-71.2 15.52-86.24-34.464-86.24-34.464-11.616-29.696-28.416-37.6-28.416-37.6-23.264-15.936 1.728-15.616 1.728-15.616 25.696 1.824 39.2 26.496 39.2 26.496 22.848 39.264 59.936 27.936 74.528 21.344 2.304-16.608 8.928-27.936 16.256-34.368-56.832-6.496-116.608-28.544-116.608-127.008 0-28.064 9.984-51.008 26.368-68.992-2.656-6.496-11.424-32.64 2.496-68 0 0 21.504-6.912 70.4 26.336 20.416-5.696 42.304-8.544 64.096-8.64 21.728.128 43.648 2.944 64.096 8.672 48.864-33.248 70.336-26.336 70.336-26.336 13.952 35.392 5.184 61.504 2.56 68 16.416 17.984 26.304 40.928 26.304 68.992 0 98.72-59.84 120.448-116.864 126.816 9.184 7.936 17.376 23.616 17.376 47.584 0 34.368-.32 62.08-.32 70.496 0 6.88 4.608 14.88 17.6 12.352C438.72 472.145 512 375.857 512 262.353 512 120.401 397.376 5.329 255.968 5.329Z" /></svg>;
}

function useDialogFocus(onClose: () => void) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = (): HTMLElement[] => Array.from(dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
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


function ContactSpriteSwap({ base, hover, className }: { base: string; hover: string; className?: string }) {
  const spriteClass = `contact-sprite ${className ?? ""}`;
  return (
    <>
      <Image src={base} alt="" width={320} height={314} className={`${spriteClass} contact-sprite-base`} unoptimized draggable={false} />
      <Image src={hover} alt="" width={320} height={314} className={`${spriteClass} contact-sprite-hover`} unoptimized draggable={false} />
    </>
  );
}

function AboutSocialLinks() {
  return (
    <nav className="profile-social-links" aria-label="Social links">
      {socialLinks.filter((link) => link.kind !== "whatsapp").map((link) => (
        <a key={link.kind} href={link.href} target={link.kind === "email" ? undefined : "_blank"} rel={link.kind === "email" ? undefined : "noreferrer"} aria-label={link.label}>
          <PanelSocialGlyph kind={link.kind} />
          <span className="sr-only">{link.label}</span>
        </a>
      ))}
    </nav>
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
        <div className={`works-project-media works-project-media-${index + 1}`}>
          <span>{project.categoryLabel}</span>
          <strong>{project.scene}</strong>
          <i aria-hidden="true" />
          <span className="works-media-button" aria-hidden="true">{dictionary.work.mediaLabel}</span>
          <div className="works-media-dots" aria-hidden="true"><b /><b /><b /><b /></div>
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
        <ul id="painel-product" className="works-list" role="tabpanel" aria-label={dictionary.work.tabs.product}>
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
    <div id={`painel-${tab}`} className="works-tab-content" role="tabpanel" aria-label={tab === "visual" ? dictionary.work.tabs.visual : dictionary.work.tabs.motion}>
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
  const dialogRef = useDialogFocus(onClose);
  const tabLabels: Record<WorkTab, string> = {
    product: dictionary.work.tabs.product,
    visual: dictionary.work.tabs.visual,
    motion: dictionary.work.tabs.motion,
  };
  const tabIcons: Record<WorkTab, IconName> = { product: "stack", visual: "sparkles", motion: "route" };

  return (
    <>
      <div className="works-veil" aria-hidden="true" onClick={onClose} />
      <section ref={dialogRef} className="works-panel bg-card fixed inset-x-0 top-3 bottom-0 z-100 flex flex-col overflow-hidden rounded-t-3xl outline-none" data-state="open" role="dialog" aria-modal="true" aria-label={dictionary.work.panelTitle} tabIndex={-1}>
        <header className="works-rise border-border/70 flex shrink-0 items-center gap-2 border-b px-4 py-3 sm:gap-4 sm:px-8 sm:py-4">
          <h2 id="reference-work-title">{dictionary.work.panelTitle}</h2>
          <div className="reference-work-tabs" role="tablist" aria-label={dictionary.work.panelTitle}>
            <span className="reference-tab-indicator" aria-hidden="true" />
            {(Object.keys(tabLabels) as WorkTab[]).map((value) => (
              <button type="button" role="tab" aria-selected={tab === value} aria-controls={`painel-${value}`} className={tab === value ? "is-active" : ""} key={value} onClick={() => setTab(value)}>
                <IconGlyph name={tabIcons[value]} className="size-3.5" />
                <span>{tabLabels[value]}</span>
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

function MeetGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 6.5h9.7A2.8 2.8 0 0 1 17 9.3v5.4a2.8 2.8 0 0 1-2.8 2.8H4.5a2.5 2.5 0 0 1-2.5-2.5V9a2.5 2.5 0 0 1 2.5-2.5Z" fill="currentColor" /><path d="m17 10.1 4.2-2.4a.55.55 0 0 1 .8.48v7.7a.55.55 0 0 1-.8.48L17 13.9v-3.8Z" fill="currentColor" /></svg>;
}

function ContactDialog({ dictionary, onClose }: { dictionary: PortfolioDictionary; onClose: () => void }) {
  const whatsapp = socialLinks.find((link) => link.kind === "whatsapp");
  const discord = socialLinks.find((link) => link.kind === "discord");
  const dialogCloseLabel = dictionary.work.panelClose;
  const dialogRef = useDialogFocus(onClose);
  const stats = [
    { value: dictionary.contact.stats.projects, label: dictionary.contact.stats.projectsLabel },
    { value: dictionary.contact.stats.experience, label: dictionary.contact.stats.experienceLabel },
    { value: dictionary.contact.stats.response, label: dictionary.contact.stats.responseLabel },
  ];

  return (
    <>
      <div className="works-veil profile-veil" aria-hidden="true" onClick={onClose} />
      <section ref={dialogRef} className="profile-dialog profile-dialog-contact contact-dialog" data-panel="contact" data-state="open" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title" tabIndex={-1}>
        <div className="contact-dialog-body">
          <PanelClose label={dialogCloseLabel} onClose={onClose} />
          <div className="contact-dialog-socials" aria-label={dictionary.contact.direct}>
            <div className="contact-dialog-avatar"><Image src="/reference/charlles-contact-avatar.webp" alt="" fill sizes="86px" priority unoptimized /></div>
            {whatsapp && <a className="contact-dialog-social contact-dialog-social-whatsapp" href={whatsapp.href} target="_blank" rel="noreferrer" aria-label={whatsapp.label}><PanelSocialGlyph kind="whatsapp" /></a>}
            {discord && <a className="contact-dialog-social contact-dialog-social-discord" href={discord.href} target="_blank" rel="noreferrer" aria-label={discord.label}><PanelSocialGlyph kind="discord" /></a>}
          </div>
          <div className="contact-dialog-tags">
            <span className="contact-dialog-tag">{dictionary.contact.specialty}</span>
            <span className="contact-dialog-status"><i aria-hidden="true" />{dictionary.contact.availability}</span>
          </div>
          <h2 id="contact-dialog-title">{dictionary.contact.cardTitle}</h2>
          <div className="contact-dialog-stats" aria-label={dictionary.contact.direct}>
            {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
          <div className="contact-dialog-actions">
            {whatsapp && <div className="contact-action-group contact-action-group-whatsapp">
              <ContactSpriteSwap base="/reference/charlles-contact-whatsapp.webp" hover="/reference/charlles-contact-whatsapp-hover.webp" />
              <a className="contact-dialog-action contact-dialog-action-primary" href={whatsapp.href} target="_blank" rel="noreferrer"><span className="contact-dialog-action-label">{dictionary.contact.primaryCta}</span><IconGlyph name="external-link" className="size-4" /></a>
            </div>}
            <div className="contact-action-group contact-action-group-call">
              <ContactSpriteSwap base="/reference/charlles-contact-call.webp" hover="/reference/charlles-contact-call-hover.webp" />
              <a className="contact-dialog-action contact-dialog-action-secondary" href={bookingUrl} target="_blank" rel="noreferrer"><span className="contact-dialog-call-icon"><MeetGlyph /></span><span className="contact-dialog-action-copy"><strong>{dictionary.contact.callCta}</strong><small>{dictionary.contact.callMeta}</small></span><IconGlyph name="external-link" className="size-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProfileDialog({ dictionary, onClose }: { dictionary: PortfolioDictionary; onClose: () => void }) {
  const dialogRef = useDialogFocus(onClose);
  return (
    <>
      <div className="works-veil profile-veil" aria-hidden="true" onClick={onClose} />
      <section ref={dialogRef} className="profile-dialog profile-dialog-about" data-panel="about" data-state="open" role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title" tabIndex={-1}>
        <div className="profile-dialog-cover">
          <Image src="/reference/charlles-toy-canonical.png" alt="" fill sizes="(max-width: 640px) 100vw, 420px" priority />
          <div className="profile-dialog-cover-tint" />
          <PanelClose label={dictionary.work.panelClose} onClose={onClose} />
        </div>
        <div className="profile-dialog-body">
          <div className="profile-avatar"><Image src="/reference/charlles-contact-avatar.webp" alt="" fill sizes="96px" unoptimized /></div>
          <h2 id="profile-dialog-title">{profile.name}</h2>
          <p className="profile-dialog-role">{profile.role}</p>
          <div className="profile-stats">
            <div><strong>{projects.length}+</strong><span>{dictionary.work.featuredLabel}</span></div>
            <div><strong>PB</strong><span>{profile.location}</span></div>
            <div><strong>∞</strong><span>{dictionary.hero.facts[1]?.label ?? dictionary.hero.role}</span></div>
          </div>
          <p className="profile-dialog-eyebrow">{dictionary.about.eyebrow}</p>
          <h3>{dictionary.about.title}</h3>
          <p>{dictionary.about.body}</p>
          <p>{dictionary.expertise.description}</p>
          <AboutSocialLinks />
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
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, panel]);

  if (panel === "work") return <WorkPanel dictionary={dictionary} onClose={onClose} />;
  if (panel === "contact") return <ContactDialog dictionary={dictionary} onClose={onClose} />;
  if (panel === "about") return <ProfileDialog dictionary={dictionary} onClose={onClose} />;
  return null;
}
