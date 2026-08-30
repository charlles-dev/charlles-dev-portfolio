"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale } from "@/lib/i18n";
import { getProfessionalContent } from "@/lib/professional-content";

export function ExperienceTimeline({ locale }: { locale: Locale }) {
  const content = getProfessionalContent(locale);
  return (
    <section className="experience-section" aria-labelledby="experience-title">
      <header>
        <p className="reference-eyebrow">{content.experience.eyebrow}</p>
        <h2 id="experience-title">{content.experience.title}</h2>
        <p>{content.experience.description}</p>
      </header>
      <ol>
        {content.experience.entries.map((entry) => (
          <li key={entry.caseSlug}>
            <span className="experience-period">{entry.period}</span>
            <div><h3>{entry.role}</h3><p>{entry.context}</p><strong>{entry.result}</strong></div>
            <Link href={`/${locale}/projects/${entry.caseSlug}`} aria-label={`${entry.role} — ${content.caseUi.demo}`}><IconGlyph name="arrow-right" className="size-5" /></Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StackEvidence({ locale }: { locale: Locale }) {
  const content = getProfessionalContent(locale);
  const [activeName, setActiveName] = useState(content.stackEvidence.items[0].name);
  const active = content.stackEvidence.items.find((item) => item.name === activeName) ?? content.stackEvidence.items[0];
  return (
    <section className="stack-evidence" aria-labelledby="stack-evidence-title">
      <div className="stack-evidence-heading">
        <p className="reference-eyebrow">{content.stackEvidence.eyebrow}</p>
        <h3 id="stack-evidence-title">{content.stackEvidence.title}</h3>
        <p>{content.stackEvidence.description}</p>
      </div>
      <div className="stack-evidence-layout">
        <div className="stack-evidence-media" aria-hidden="true">
          <Image src="/reference/story/charlles-stack.jpeg" alt="" fill sizes="(max-width: 820px) 100vw, 38vw" />
        </div>
        <div className="stack-evidence-tabs" role="tablist" aria-label={content.stackEvidence.eyebrow}>
          {content.stackEvidence.items.map((item) => <button key={item.name} type="button" role="tab" aria-selected={item.name === active.name} aria-controls="stack-evidence-panel" id={`stack-${item.name.replaceAll(/[^a-zA-Z0-9]/g, "-")}`} onClick={() => setActiveName(item.name)}>{item.name}</button>)}
        </div>
        <div className="stack-evidence-panel" id="stack-evidence-panel" role="tabpanel" aria-labelledby={`stack-${active.name.replaceAll(/[^a-zA-Z0-9]/g, "-")}`}>
          <p>{active.use}</p>
          <span>{content.stackEvidence.evidenceLabel}</span>
          <div>{active.cases.map((slug) => <Link href={`/${locale}/projects/${slug}`} key={slug}>{content.cases[slug].title}<IconGlyph name="arrow-right" className="size-4" /></Link>)}</div>
        </div>
      </div>
    </section>
  );
}
