import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import { LanguageSwitcher } from "@/components/language-switcher";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

export function NowPage({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const copy = dictionary.now;
  const homePath = localePath(locale);
  const nowPath = `${homePath}/now`;
  const nowSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.routeLabel,
    description: copy.description,
    url: `https://www.charlles.dev${nowPath}`,
    isPartOf: { "@type": "WebSite", name: "Charlles.dev", url: "https://www.charlles.dev" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: copy.items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, description: item.description })),
    },
  };

  return (
    <main id="conteudo" className="now-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nowSchema) }} />
      <header className="engineering-header">
        <a className="engineering-brand" href={homePath} aria-label="Charlles.dev">
          <Image src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
        <nav className="engineering-nav" aria-label={dictionary.nav.main}>
          <a href={homePath}>{copy.breadcrumbHome}</a>
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
        <section className="now-intro" aria-labelledby="now-title">
          <p className="reference-eyebrow">{copy.eyebrow}</p>
          <h1 id="now-title">{copy.title}</h1>
          <p className="engineering-description">{copy.description}</p>
          <div className="engineering-intro-line" aria-hidden="true"><span /><span /><span /></div>
        </section>

        <section className="now-grid" aria-labelledby="now-grid-title">
          <h2 id="now-grid-title" className="sr-only">{copy.routeLabel}</h2>
          {copy.items.map((item, index) => (
            <article className="now-card" key={item.title}>
              <div className="now-card-topline"><span>0{index + 1}</span><span>{item.label}</span></div>
              <IconGlyph name={item.icon} className="now-card-icon" />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="now-card-proof">{item.proof}</div>
              {item.href && <a href={item.href} target="_blank" rel="noreferrer">{copy.openProject}<IconGlyph name="external-link" className="size-4" /></a>}
            </article>
          ))}
        </section>
      </div>

      <footer className="engineering-footer">
        <span>{dictionary.footer.rights}</span>
        <span>{dictionary.footer.built}</span>
        <a href={homePath}>{copy.breadcrumbHome}<IconGlyph name="arrow-right" className="size-4" /></a>
      </footer>
    </main>
  );
}
