import Image from "next/image";

import { IconGlyph } from "@/components/icon-glyph";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

const socialIconMap = {
  linkedin: "linkedin",
  github: "github",
  email: "mail",
} as const;

export function HeroSignature({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin") ?? socialLinks[0];
  const github = socialLinks.find((link) => link.kind === "github") ?? socialLinks[0];
  const email = socialLinks.find((link) => link.kind === "email") ?? socialLinks[0];

  return (
    <section id="top" className="hero-scene" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{dictionary.hero.eyebrow}</p>
          <h1 id="hero-title">{dictionary.hero.headline}</h1>
          <p className="hero-description">{dictionary.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={localePath(locale, "#trabalhos")}>
              {dictionary.hero.primaryCta}
              <IconGlyph name="arrow-right" className="size-4" />
            </a>
            <a className="button button-quiet" href={linkedIn.href} target="_blank" rel="noreferrer">
              {dictionary.hero.secondaryCta}
            </a>
          </div>
          <div className="hero-facts" aria-label="Resumo profissional">
            {dictionary.hero.facts.map((fact) => (
              <div className="hero-fact" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="portrait-ring portrait-ring-one" aria-hidden="true" />
          <div className="portrait-ring portrait-ring-two" aria-hidden="true" />
          <div className="hero-portrait">
            <Image
              src="/assets/charlles-portrait.png"
              alt="Retrato de Charlles Augusto"
              fill
              priority
              sizes="(max-width: 780px) 82vw, 52vw"
              className="hero-portrait-image"
            />
            <div className="portrait-shade" aria-hidden="true" />
            <div className="portrait-caption">
              <span className="status-dot" aria-hidden="true" />
              <span>{dictionary.hero.tagline}</span>
            </div>
          </div>
          <p className="portrait-note">{profile.name} <span>/</span> {dictionary.hero.role}</p>
        </div>
      </div>

      <div className="hero-socials" aria-label="Redes e contato">
        {[linkedIn, github, email].map((link) => (
          <a
            href={link.href}
            key={link.kind}
            aria-label={link.label}
            target={link.kind === "email" ? undefined : "_blank"}
            rel={link.kind === "email" ? undefined : "noreferrer"}
          >
            <IconGlyph name={socialIconMap[link.kind]} className="size-5" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      <a className="hero-scroll" href={localePath(locale, "#sobre")}>
        <span>{dictionary.hero.scrollLabel}</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
