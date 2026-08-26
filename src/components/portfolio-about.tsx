import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";

export function PortfolioAbout({ dictionary }: { dictionary: PortfolioDictionary }) {
  return (
    <section className="portfolio-about-section" id="about" aria-labelledby="portfolio-about-title">
      <div className="portfolio-about-media">
        <Image
          src="/reference/states/charlles-flashlight.jpeg"
          alt={dictionary.about.mediaAlt}
          fill
          sizes="(max-width: 820px) 100vw, 48vw"
        />
        <span aria-hidden="true">{dictionary.about.mediaCaption}</span>
      </div>

      <div className="portfolio-about-copy">
        <p className="reference-eyebrow">{dictionary.about.eyebrow}</p>
        <h2 id="portfolio-about-title">{dictionary.about.title}</h2>
        <p className="portfolio-about-lead">{dictionary.about.body}</p>
        <ul>
          {dictionary.about.values.map((value) => (
            <li key={value.title}>
              <IconGlyph name={value.icon} className="size-5" />
              <div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <a className="portfolio-text-action" href="https://www.linkedin.com/in/charlles-augusto/" target="_blank" rel="noreferrer">
          {dictionary.about.link}
          <IconGlyph name="arrow-right" className="size-4" />
        </a>
      </div>
    </section>
  );
}
