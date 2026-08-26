import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import styles from "@/components/not-found-page.module.css";
import { LanguageSwitcher } from "@/components/language-switcher";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

export function NotFoundPage({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const copy = dictionary.notFound;
  const homePath = localePath(locale);
  const routePath = `${homePath}/not-found`;
  const directions = [
    { label: copy.work, href: `${homePath}#work`, icon: "target" as const },
    { label: copy.about, href: `${homePath}#about`, icon: "brain" as const },
    { label: copy.contact, href: `${homePath}#contact`, icon: "mail" as const },
  ];

  const notFoundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.routeLabel,
    description: copy.description,
    url: `https://www.charlles.dev${routePath}`,
    isPartOf: { "@type": "WebSite", name: "Charlles.dev", url: "https://www.charlles.dev" },
  };

  return (
    <main id="conteudo" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(notFoundSchema) }} />
      <header className={styles.header}>
        <a className={styles.brand} href={homePath} aria-label="Charlles.dev">
          <Image src="/assets/charlles-dev.svg" alt="Charlles.dev" width={34} height={34} priority />
        </a>
        <nav className={styles.nav} aria-label={dictionary.nav.main}>
          <a className={styles.navLink} href={homePath}>{copy.homeCta}</a>
          <span className={styles.switcher}><LanguageSwitcher currentLocale={locale} label={dictionary.nav.language} /></span>
        </nav>
      </header>

      <div className={styles.shell}>
        <section className={styles.copy} aria-labelledby="not-found-title">
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title} id="not-found-title">{copy.title}</h1>
          <p className={styles.description}>{copy.description}</p>
          <p className={styles.status}><span aria-hidden="true">›</span> {copy.routeStatus}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={homePath}>{copy.homeCta}<IconGlyph name="arrow-right" className={styles.icon} /></a>
          </div>
        </section>

        <section className={styles.scene} aria-labelledby="route-scene-title">
          <div className={styles.media}>
            <Image src="/reference/states/charlles-flashlight.jpeg" alt={copy.avatarAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
            <video src="/reference/states/charlles-flashlight.mp4" poster="/reference/states/charlles-flashlight.jpeg" muted autoPlay playsInline preload="metadata" aria-hidden="true" />
          </div>
          <div className={styles.sign}>
            <p className={styles.signTitle} id="route-scene-title">{copy.signTitle}</p>
            <div className={styles.directions}>
              {directions.map((direction) => (
                <a key={direction.href} href={direction.href} className={styles.direction}>
                  <IconGlyph name={direction.icon} className={styles.icon} />
                  <span>{direction.label}</span>
                  <IconGlyph name="arrow-right" className={styles.icon} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>{dictionary.footer.rights}</span>
        <span>{dictionary.footer.built}</span>
      </footer>
    </main>
  );
}
