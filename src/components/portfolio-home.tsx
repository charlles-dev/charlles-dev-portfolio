"use client";

import { useState } from "react";

import { ReferenceHero } from "@/components/reference-hero";
import { ReferencePanels } from "@/components/reference-panels";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
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
      </main>
      <ReferencePanels panel={panel} dictionary={dictionary} onClose={closePanel} />
    </div>
  );
}
