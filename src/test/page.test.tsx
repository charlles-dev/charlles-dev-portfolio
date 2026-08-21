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

    expect(screen.getByRole("heading", { level: 1, name: /Pense grande/i })).toBeInTheDocument();
    expect(screen.getByText(/desenvolvedor web de Campina Grande/i)).toBeInTheDocument();
    expect(screen.getByText(/Role para explorar/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trabalhos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sobre" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contato" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/charlles-dev");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/charlles-augusto/");
    expect(screen.getByRole("link", { name: /English/i })).toHaveAttribute("href", "/en");
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
    expect(within(dialog).getByRole("heading", { name: /Tecnologia precisa reduzir atrito/i })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog", { name: "Trabalhos" })).not.toBeInTheDocument();
  });

  it("opens About and Contact as modal dialogs and closes with Escape", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Sobre" }));
    expect(screen.getByRole("dialog", { name: /Tecnologia precisa/i })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /Tecnologia precisa/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Contato" }));
    const dialog = screen.getByRole("dialog", { name: /Tem um problema/i });
    expect(within(dialog).getByText(/Falar pelo LinkedIn/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /charllesgst@gmail.com/i })).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
    fireEvent.click(within(dialog).getByRole("button", { name: "Contato" }));
    expect(screen.queryByRole("dialog", { name: /Tem um problema/i })).not.toBeInTheDocument();
  });

  it("renders localized English copy and keeps the same interaction model", () => {
    renderHome("en");

    expect(screen.getByRole("heading", { level: 1, name: /Dream big/i })).toBeInTheDocument();
    expect(document.body.textContent).toContain("Web developer and automation builder");
    expect(screen.getByRole("button", { name: "Work" })).toBeInTheDocument();
    expect(screen.queryByText("web, APIs e automação operacional")).not.toBeInTheDocument();
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
