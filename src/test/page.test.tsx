import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PortfolioHome } from "@/components/portfolio-home";
import { getDictionary } from "@/lib/i18n";

function renderHome(locale: "pt-BR" | "en" | "es" = "pt-BR") {
  return render(<PortfolioHome locale={locale} dictionary={getDictionary(locale)} />);
}

describe("reference-inspired localized home", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders the pinned hero, social rail and transparent navigation", () => {
    renderHome();

    expect(screen.getByRole("heading", { level: 1, name: /Construo experiências digitais/i })).toBeInTheDocument();
    expect(screen.getByText(/desenvolvedor de software de Campina Grande/i)).toBeInTheDocument();
    expect(screen.getByText(/Role para explorar/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trabalhos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sobre" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contato" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/charlles-dev");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/charlles-augusto/");
    expect(screen.getByRole("link", { name: "Discord" })).toHaveAttribute("href", "https://discord.com/users/472347892728987658");
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/5583991141561");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
    expect(document.querySelector(".reference-video-scrub")).toHaveAttribute("poster", "/reference/charlles-hero-poster.webp");
    expect(document.querySelector(".reference-video-loop")).not.toBeInTheDocument();
    expect(document.querySelectorAll(".language-flag-icon")).toHaveLength(3);
    expect(screen.queryByRole("button", { name: "Alternar tema" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /English/i })).toHaveAttribute("href", "/en");
  });

  it("scrubs the hero video to the scene progress after metadata loads", () => {
    renderHome();

    const video = document.querySelector(".reference-video-scrub") as HTMLVideoElement;
    const story = document.querySelector(".reference-scroll-story") as HTMLElement;
    Object.defineProperty(video, "duration", { configurable: true, value: 4 });
    Object.defineProperty(story, "offsetHeight", { configurable: true, value: 3000 });
    Object.defineProperty(story, "getBoundingClientRect", { configurable: true, value: () => ({ top: -(3000 - window.innerHeight) / 2 }) });

    fireEvent(video, new Event("loadedmetadata"));
    fireEvent.scroll(window);

    expect(video.currentTime).toBeCloseTo(((0.5 - 0.08) / 0.77) * 4, 1);
  });

  it("opens the work panel with tabs and project cards", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Trabalhos" }));

    const dialog = screen.getByRole("dialog", { name: "Trabalhos" });
    expect(within(dialog).getByRole("tab", { name: "Web e produto" })).toHaveAttribute("aria-selected", "true");
    expect(within(dialog).getByRole("heading", { name: "Astrolink" })).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Laudos Proxxima" })).toBeInTheDocument();
    expect(within(dialog).getAllByRole("link", { name: /Abrir projeto/i })[0]).toHaveAttribute("href", "https://github.com/charlles-dev/Astrolink");

    fireEvent.click(within(dialog).getByRole("tab", { name: "Visual e interface" }));
    expect(within(dialog).getByRole("heading", { name: /Eu gosto de transformar complexidade/i })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog", { name: "Trabalhos" })).not.toBeInTheDocument();
  });

  it("opens About and Contact as modal dialogs and closes with Escape", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Sobre" }));
    expect(screen.getByRole("dialog", { name: /Eu gosto de transformar complexidade/i })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /Eu gosto de transformar complexidade/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Contato" }));
    const dialog = screen.getByRole("dialog", { name: /Se existe algo interessante/i });
    expect(within(dialog).getByText(/Falar pelo LinkedIn/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /charllesgst@gmail.com/i })).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
    fireEvent.click(within(dialog).getByRole("button", { name: "Contato" }));
    expect(screen.queryByRole("dialog", { name: /Se existe algo interessante/i })).not.toBeInTheDocument();
  });

  it("renders localized English copy and keeps the same interaction model", () => {
    renderHome("en");

    expect(screen.getByRole("heading", { level: 1, name: /I build digital experiences/i })).toBeInTheDocument();
    expect(document.body.textContent).toContain("Software developer");
    expect(screen.getByRole("button", { name: "Work" })).toBeInTheDocument();
    expect(screen.queryByText("interface / código / automação")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /charlles\.dev/i })).toHaveAttribute("href", "/en");
  });

  it("opens the compact mobile menu without changing the scene", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: /Abrir menu/i }));
    expect(document.getElementById("reference-mobile-menu")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Trabalhos" }).length).toBeGreaterThan(1);
  });

  it("does not expose the old generic dashboard language", () => {
    renderHome();

    const visibleText = document.body.textContent ?? "";
    expect(visibleText).not.toMatch(/Delivery signal|Core system|Terminal signature|HUD|painel artificial/i);
    expect(visibleText).not.toMatch(/software, cyber e IA|cibersegurança e IA/i);
  });
});
