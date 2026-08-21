"use client";

import { useState } from "react";

import { ReferenceHero } from "@/components/reference-hero";
import { ReferencePanels } from "@/components/reference-panels";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import { profile } from "@/lib/portfolio";
import type { ProjectsPayload } from "@/lib/projects/types";

type Panel = "work" | "about" | "contact" | null;

export function PortfolioHome({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary; initialPayload?: ProjectsPayload }) {
  const [panel, setPanel] = useState<Panel>(null);
  const closePanel = () => setPanel(null);

  return (
    <div className="reference-app" id="conteudo">
      <SiteHeader locale={locale} dictionary={dictionary} onOpenWork={() => setPanel("work")} onOpenAbout={() => setPanel("about")} onOpenContact={() => setPanel("contact")} />
      <main>
        <ReferenceHero dictionary={dictionary} onOpenWork={() => setPanel("work")} />
        <section className="reference-after-scene" aria-label={dictionary.contact.eyebrow}>
          <div className="reference-after-inner">
            <p className="reference-eyebrow">{dictionary.contact.eyebrow}</p>
            <h2>{dictionary.contact.title}</h2>
            <p>{dictionary.contact.description}</p>
            <button type="button" className="reference-primary-button" onClick={() => setPanel("contact")}>{dictionary.contact.primaryCta}</button>
            <div className="reference-after-signature"><span>{profile.handle}</span><span>{dictionary.footer.rights}</span></div>
          </div>
        </section>
      </main>
      <ReferencePanels panel={panel} dictionary={dictionary} onClose={closePanel} />
    </div>
  );
}
