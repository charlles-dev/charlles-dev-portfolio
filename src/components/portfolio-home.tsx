"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import { PortfolioAbout } from "@/components/portfolio-about";
import { PortfolioContact } from "@/components/portfolio-contact";
import { PortfolioJourney } from "@/components/portfolio-journey";
import { PortfolioMotion } from "@/components/portfolio-motion";
import { PortfolioShortcuts } from "@/components/portfolio-shortcuts";
import { PortfolioWork } from "@/components/portfolio-work";
import { ReferenceHero } from "@/components/reference-hero";
import { ReferencePanels } from "@/components/reference-panels";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import type { ProjectsPayload } from "@/lib/projects/types";
import { trackTelemetry } from "@/lib/telemetry";

type Panel = "work" | null;

function getPanelFromHash(): Panel {
  if (typeof window === "undefined") return null;
  const value = window.location.hash.slice(1);
  return value === "repositories" ? "work" : null;
}

function subscribeToPanel(listener: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("hashchange", listener);
  window.addEventListener("popstate", listener);
  return () => {
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("popstate", listener);
  };
}

export function PortfolioHome({ locale, dictionary, initialPayload }: { locale: Locale; dictionary: PortfolioDictionary; initialPayload?: ProjectsPayload }) {
  const panel = useSyncExternalStore(subscribeToPanel, getPanelFromHash, () => null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const notifyPanelChange = () => window.dispatchEvent(new PopStateEvent("popstate"));
  const openPanel = useCallback(() => {
    if (typeof window !== "undefined" && window.location.hash !== "#repositories") {
      const nextPanel = "work" as const;
      trackTelemetry({ name: "panel_open", panel: nextPanel });
      window.history.pushState({ panel: nextPanel }, "", `${window.location.pathname}${window.location.search}#repositories`);
      notifyPanelChange();
    }
  }, []);

  const closePanel = useCallback(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState({}, "", `${window.location.pathname}${window.location.search}`);
      notifyPanelChange();
    }
  }, []);

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
        <SiteHeader locale={locale} dictionary={dictionary} contextHash={panel ? "repositories" : undefined} />
        <main>
          <ReferenceHero dictionary={dictionary} onOpenWork={openPanel} />
          {initialPayload && <PortfolioWork locale={locale} dictionary={dictionary} payload={initialPayload} onOpenExplorer={openPanel} />}
          <PortfolioAbout dictionary={dictionary} />
          <PortfolioJourney locale={locale} dictionary={dictionary} />
          <PortfolioContact locale={locale} dictionary={dictionary} />
        </main>
      </div>
      <ReferencePanels panel={panel} locale={locale} dictionary={dictionary} initialPayload={initialPayload} onClose={closePanel} />
      <PortfolioMotion />
      <PortfolioShortcuts locale={locale} onOpenWork={openPanel} />
    </div>
  );
}
