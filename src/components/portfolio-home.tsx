import { IconGlyph } from "@/components/icon-glyph";
import { HeroSignature } from "@/components/hero-signature";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { SiteHeader } from "@/components/site-header";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";
import type { ProjectsPayload } from "@/lib/projects/types";

function AboutSection({ dictionary }: { dictionary: PortfolioDictionary }) {
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin") ?? socialLinks[0];

  return (
    <section id="sobre" className="content-section about-section" aria-labelledby="about-heading">
      <div className="section-heading">
        <p className="eyebrow">{dictionary.about.eyebrow}</p>
        <h2 id="about-heading">{dictionary.about.title}</h2>
        <p>{dictionary.about.body}</p>
        <a className="text-link" href={linkedIn.href} target="_blank" rel="noreferrer">
          {dictionary.about.link} <IconGlyph name="arrow-right" className="size-4" />
        </a>
      </div>
      <div className="value-grid">
        {dictionary.about.values.map((value, index) => (
          <article className="value-card" key={value.title}>
            <span className="card-number">0{index + 1}</span>
            <IconGlyph name={value.icon} className="size-6" />
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExpertiseSection({ dictionary }: { dictionary: PortfolioDictionary }) {
  return (
    <section className="content-section expertise-section" aria-labelledby="expertise-heading">
      <div className="section-heading">
        <p className="eyebrow">{dictionary.expertise.eyebrow}</p>
        <h2 id="expertise-heading">{dictionary.expertise.title}</h2>
        <p>{dictionary.expertise.description}</p>
      </div>
      <div className="expertise-list">
        {dictionary.expertise.items.map((item, index) => (
          <article className="expertise-item" key={item.title}>
            <div className="expertise-index">0{index + 1}</div>
            <div className="expertise-icon"><IconGlyph name={item.icon} className="size-6" /></div>
            <div className="expertise-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="tool-list" aria-label={`${item.title} tools`}>{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NowSection({ dictionary }: { dictionary: PortfolioDictionary }) {
  return (
    <section id="agora" className="content-section now-section" aria-labelledby="now-heading">
      <div className="section-heading now-heading">
        <p className="eyebrow">{dictionary.now.eyebrow}</p>
        <h2 id="now-heading">{dictionary.now.title}</h2>
        <p>{dictionary.now.description}</p>
      </div>
      <div className="now-grid">
        {dictionary.now.items.map((item, index) => {
          const content = (
            <>
              <div className="now-topline"><span>0{index + 1}</span><span>{item.label}</span></div>
              <IconGlyph name={item.icon} className="size-6" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="now-proof">{item.proof}</span>
            </>
          );

          return item.href ? <a className="now-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}>{content}</a> : <article className="now-card" key={item.title}>{content}</article>;
        })}
      </div>
    </section>
  );
}

function ContactFooter({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin") ?? socialLinks[0];
  const github = socialLinks.find((link) => link.kind === "github") ?? socialLinks[0];
  const email = socialLinks.find((link) => link.kind === "email") ?? socialLinks[0];

  return (
    <footer id="contato" className="site-footer" aria-labelledby="contact-heading">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-copy">
          <p className="eyebrow">{dictionary.contact.eyebrow}</p>
          <h2 id="contact-heading">{dictionary.contact.title}</h2>
          <p>{dictionary.contact.description}</p>
          <div className="footer-actions">
            <a className="button button-primary" href={linkedIn.href} target="_blank" rel="noreferrer">{dictionary.contact.primaryCta}<IconGlyph name="arrow-right" className="size-4" /></a>
            <a className="button button-quiet" href={email.href}>{dictionary.contact.secondaryCta}</a>
          </div>
        </div>
        <div className="footer-links">
          <p className="footer-label">{dictionary.contact.direct}</p>
          <a href={linkedIn.href} target="_blank" rel="noreferrer"><IconGlyph name="linkedin" className="size-5" />LinkedIn<IconGlyph name="arrow-right" className="size-4" /></a>
          <a href={github.href} target="_blank" rel="noreferrer"><IconGlyph name="github" className="size-5" />GitHub<IconGlyph name="arrow-right" className="size-4" /></a>
          <a href={email.href}><IconGlyph name="mail" className="size-5" />{profile.email}<IconGlyph name="arrow-right" className="size-4" /></a>
        </div>
      </div>
      <div className="footer-signature">
        <a href={localePath(locale, "#top")} className="footer-name">Charlles <span>Augusto</span></a>
        <p>{dictionary.footer.built}</p>
        <p>{dictionary.footer.rights}</p>
      </div>
    </footer>
  );
}

export function PortfolioHome({ locale, dictionary, initialPayload }: { locale: Locale; dictionary: PortfolioDictionary; initialPayload: ProjectsPayload }) {
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <HeroSignature locale={locale} dictionary={dictionary} />
        <div className="page-shell">
          <AboutSection dictionary={dictionary} />
          <section id="trabalhos" className="content-section work-section" aria-label={dictionary.work.eyebrow}>
            <ProjectShowcase initialPayload={initialPayload} locale={locale} dictionary={dictionary} />
          </section>
          <ExpertiseSection dictionary={dictionary} />
          <NowSection dictionary={dictionary} />
        </div>
      </main>
      <ContactFooter locale={locale} dictionary={dictionary} />
    </>
  );
}
