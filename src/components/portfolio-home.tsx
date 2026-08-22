"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import { ReferenceHero } from "@/components/reference-hero";
import { ReferencePanels } from "@/components/reference-panels";
import { SiteHeader } from "@/components/site-header";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import type { ProjectsPayload } from "@/lib/projects/types";
import { trackTelemetry } from "@/lib/telemetry";

type Panel = "work" | "about" | "contact" | null;

function getPanelFromHash(): Panel {
  if (typeof window === "undefined") return null;
  const value = window.location.hash.slice(1);
  return value === "work" || value === "about" || value === "contact" ? value : null;
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

export function PortfolioHome({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary; initialPayload?: ProjectsPayload }) {
  const panel = useSyncExternalStore(subscribeToPanel, getPanelFromHash, () => null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const notifyPanelChange = () => window.dispatchEvent(new PopStateEvent("popstate"));
  const openPanel = useCallback((nextPanel: Exclude<Panel, null>) => {
    if (typeof window !== "undefined" && window.location.hash !== `#${nextPanel}`) {
      trackTelemetry({ name: "panel_open", panel: nextPanel });
      window.history.pushState({ panel: nextPanel }, "", `${window.location.pathname}${window.location.search}#${nextPanel}`);
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
        <SiteHeader locale={locale} dictionary={dictionary} activePanel={panel} onOpenWork={() => openPanel("work")} onOpenAbout={() => openPanel("about")} onOpenContact={() => openPanel("contact")} />
        <main>
          <ReferenceHero dictionary={dictionary} onOpenWork={() => openPanel("work")} />
        </main>
      </div>
      <ReferencePanels panel={panel} locale={locale} dictionary={dictionary} onClose={closePanel} />
    </div>
  );
}
