"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ReferenceHero } from "@/components/reference-hero";
import { ReferencePanels } from "@/components/reference-panels";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import type { ProjectsPayload } from "@/lib/projects/types";

type Panel = "work" | "about" | "contact" | null;

export function PortfolioHome({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary; initialPayload?: ProjectsPayload }) {
  const [panel, setPanel] = useState<Panel>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const panelFromHash = useCallback((): Panel => {
    if (typeof window === "undefined") return null;
    const value = window.location.hash.slice(1);
    return value === "work" || value === "about" || value === "contact" ? value : null;
  }, []);

  const openPanel = useCallback((nextPanel: Exclude<Panel, null>) => {
    setPanel(nextPanel);
    if (typeof window !== "undefined" && window.location.hash !== `#${nextPanel}`) {
      window.history.pushState({ panel: nextPanel }, "", `${window.location.pathname}${window.location.search}#${nextPanel}`);
    }
  }, []);

  const closePanel = useCallback(() => {
    setPanel(null);
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState({}, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  useEffect(() => {
    setPanel(panelFromHash());
    const handleHistory = () => setPanel(panelFromHash());
    window.addEventListener("hashchange", handleHistory);
    window.addEventListener("popstate", handleHistory);
    return () => {
      window.removeEventListener("hashchange", handleHistory);
      window.removeEventListener("popstate", handleHistory);
    };
  }, [panelFromHash]);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;
    background.inert = panel !== null;
    if (panel !== null) background.setAttribute("aria-hidden", "true");
    else background.removeAttribute("aria-hidden");
    return () => {
      background.inert = false;
      background.removeAttribute("aria-hidden");
    };
  }, [panel]);

  return (
    <div className="reference-app" id="conteudo">
      <div ref={backgroundRef}>
        <SiteHeader locale={locale} dictionary={dictionary} onOpenWork={() => openPanel("work")} onOpenAbout={() => openPanel("about")} onOpenContact={() => openPanel("contact")} />
        <main>
          <ReferenceHero dictionary={dictionary} onOpenWork={() => openPanel("work")} />
        </main>
      </div>
      <ReferencePanels panel={panel} dictionary={dictionary} onClose={closePanel} />
    </div>
  );
}
