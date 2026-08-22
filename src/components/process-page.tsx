import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import { LanguageSwitcher } from "@/components/language-switcher";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

export function ProcessPage({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const copy = dictionary.process;
  const homePath = localePath(locale);
  const processPath = `${homePath}/process`;
  const processSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: copy.title,
    description: copy.description,
    url: `https://www.charlles.dev${processPath}`,
    step: copy.steps.map((step, index) => ({ "@type": "HowToStep", position: index + 1, name: step.title, text: step.description })),
  };

  return (
    <main id="conteudo" className="process-page now-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }} />
      <header className="engineering-header">
        <a className="engineering-brand" href={homePath} aria-label="Charlles.dev">
          <Image src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
        <nav className="engineering-nav" aria-label={dictionary.nav.main}>
          <a href={homePath}>{copy.breadcrumbHome}</a>
          <a href={`${homePath}/now`}>{dictionary.now.routeLabel}</a>
          <a href={`${homePath}/engineering`}>{dictionary.engineering.linkLabel}</a>
          <LanguageSwitcher currentLocale={locale} label={dictionary.nav.language} />
        </nav>
      </header>

      <div className="engineering-shell">
        <nav className="engineering-breadcrumbs" aria-label={copy.breadcrumbLabel}>
          <a href={homePath}>{copy.breadcrumbHome}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumbCurrent}</span>
        </nav>
        <section className="now-intro" aria-labelledby="process-title">
          <p className="reference-eyebrow">{copy.eyebrow}</p>
          <h1 id="process-title">{copy.title}</h1>
          <p className="engineering-description">{copy.description}</p>
          <div className="engineering-intro-line" aria-hidden="true"><span /><span /><span /></div>
        </section>

        <ol className="process-steps" aria-label={copy.title}>
          {copy.steps.map((step, index) => (
            <li className="process-step" key={step.title}>
              <div className="process-step-index" aria-hidden="true">0{index + 1}</div>
              <IconGlyph name={step.icon} className="process-step-icon" />
              <div>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <footer className="engineering-footer">
        <span>{dictionary.footer.rights}</span>
        <span>{dictionary.footer.built}</span>
        <a href={homePath}>{copy.breadcrumbHome}<IconGlyph name="arrow-right" className="size-4" /></a>
      </footer>
    </main>
  );
}
