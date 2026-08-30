import Link from "next/link";

import { CvPrintButton } from "@/components/cv-print-button";
import { IconGlyph } from "@/components/icon-glyph";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";
import { getProfessionalContent } from "@/lib/professional-content";

export function CvPage({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const content = getProfessionalContent(locale);
  const education = dictionary.journey.sections.find((section) => section.id === "education");
  const certifications = dictionary.journey.sections.find((section) => section.id === "certifications");
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin");
  const github = socialLinks.find((link) => link.kind === "github");
  return (
    <div className="cv-page" id="conteudo">
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <div className="cv-actions">
          <Link href={localePath(locale)}><IconGlyph name="arrow-right" className="size-4 case-back-icon" />{content.cv.back}</Link>
          <CvPrintButton label={content.cv.print} />
        </div>
        <header className="cv-header">
          <div><p className="reference-eyebrow">Charlles.dev / CV</p><h1>{profile.name}</h1><p>{dictionary.hero.role}</p></div>
          <address><a href={`mailto:${profile.email}`}>{profile.email}</a>{github && <a href={github.href}>github.com/charlles-dev</a>}{linkedIn && <a href={linkedIn.href}>linkedin.com/in/charlles-augusto</a>}</address>
        </header>
        <section className="cv-profile"><h2>{content.cv.sections.profile}</h2><p>{content.cv.description}</p><p>{dictionary.about.body}</p></section>
        <section><h2>{content.cv.sections.experience}</h2><ol className="cv-timeline">{content.experience.entries.map((entry) => <li key={entry.caseSlug}><span>{entry.period}</span><div><h3>{entry.role}</h3><p>{entry.context}</p><strong>{entry.result}</strong></div></li>)}</ol></section>
        <section><h2>{content.cv.sections.projects}</h2><div className="cv-projects">{Object.values(content.cases).map((project) => <article key={project.slug}><div><h3>{project.title}</h3><span>{project.status}</span></div><p>{project.summary}</p><p>{project.stack.join(" · ")}</p><Link href={`/${locale}/projects/${project.slug}`}>{content.caseUi.demo}</Link></article>)}</div></section>
        {education && <section><h2>{content.cv.sections.education}</h2><ul className="cv-list">{education.items.map((item) => <li key={item.title}><span>{item.label}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ul></section>}
        {certifications && <section><h2>{content.cv.sections.certifications}</h2><ul className="cv-list">{certifications.items.map((item) => <li key={item.title}><span>{item.label}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ul></section>}
        <section><h2>{content.cv.sections.stack}</h2><p className="cv-stack">{content.stackEvidence.items.map((item) => item.name).join(" / ")}</p></section>
        <footer><h2>{content.cv.sections.contact}</h2><a href={`mailto:${profile.email}`}>{profile.email}</a></footer>
      </main>
    </div>
  );
}
