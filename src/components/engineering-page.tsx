import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export function EngineeringPage({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const copy = dictionary.engineering;
  const homePath = localePath(locale);
  const engineeringPath = `${homePath}/engineering`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.breadcrumbHome, item: `https://www.charlles.dev${homePath}` },
      { "@type": "ListItem", position: 2, name: copy.breadcrumbCurrent, item: `https://www.charlles.dev${engineeringPath}` },
    ],
  };

  return (
    <main id="conteudo" className="engineering-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="engineering-header">
        <a className="engineering-brand" href={homePath} aria-label="Charlles.dev">
          <Image src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
        <nav className="engineering-nav" aria-label={dictionary.nav.main}>
          <a href={homePath}>{copy.backHome}</a>
          <a href={`${homePath}#work`}>{copy.openWork}</a>
          <a href={`${homePath}/now`}>{dictionary.now.routeLabel}</a>
          <LanguageSwitcher currentLocale={locale} label={dictionary.nav.language} />
        </nav>
      </header>

      <div className="engineering-shell">
        <nav className="engineering-breadcrumbs" aria-label={copy.breadcrumbLabel}>
          <a href={homePath}>{copy.breadcrumbHome}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumbCurrent}</span>
        </nav>
        <section className="engineering-intro" aria-labelledby="engineering-title">
          <p className="reference-eyebrow">{copy.eyebrow}</p>
          <h1 id="engineering-title">{copy.title}</h1>
          <p className="engineering-description">{copy.description}</p>
          <div className="engineering-intro-line" aria-hidden="true"><span /><span /><span /></div>
        </section>

        <div className="engineering-sections">
          {copy.sections.map((section, sectionIndex) => {
            const sectionId = `engineering-section-${sectionIndex + 1}`;
            return (
              <section key={section.title} className="engineering-section" aria-labelledby={sectionId}>
                <div className="engineering-section-heading">
                  <span className="engineering-section-index" aria-hidden="true">0{sectionIndex + 1}</span>
                  <div>
                    <h2 id={sectionId}>{section.title}</h2>
                    <p>{section.description}</p>
                  </div>
                </div>
                <div className="engineering-notes">
                  {section.items.map((item) => (
                    <article key={item.title} className="engineering-note-card">
                      <IconGlyph name={sectionIndex === 0 ? "solar-layers" : sectionIndex === 1 ? "solar-route" : "solar-document"} className="engineering-note-icon" />
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                      <ul aria-label={item.title}>
                        {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="engineering-quality" aria-labelledby="engineering-quality-title">
          <div>
            <p className="reference-eyebrow">{copy.quality.eyebrow}</p>
            <h2 id="engineering-quality-title">{copy.quality.title}</h2>
            <p>{copy.quality.description}</p>
          </div>
          <ol className="engineering-quality-steps">
            {copy.quality.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
          </ol>
        </section>

        <p className="engineering-disclaimer">{copy.note}</p>
      </div>

      <footer className="engineering-footer">
        <span>{dictionary.footer.rights}</span>
        <span>{dictionary.footer.built}</span>
        <a href={homePath}>{copy.backHome}<IconGlyph name="arrow-right" className="size-4" /></a>
      </footer>
    </main>
  );
}
