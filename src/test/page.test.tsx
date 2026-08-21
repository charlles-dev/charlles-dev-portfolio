import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PortfolioHome } from "@/components/portfolio-home";
import { getDictionary } from "@/lib/i18n";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
import type { ProjectsPayload } from "@/lib/projects/types";

const dictionary = getDictionary("pt-BR");

function renderHome(locale: "pt-BR" | "en" | "es" = "pt-BR") {
  return render(<PortfolioHome locale={locale} dictionary={getDictionary(locale)} initialPayload={fallbackProjectsPayload} />);
}

describe("localized home page", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders the editorial hero and direct contact paths", () => {
    renderHome();

    expect(screen.getByRole("heading", { level: 1, name: /Eu transformo problemas reais/i })).toBeInTheDocument();
    expect(screen.getByText(/desenvolvedor web de Campina Grande/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Retrato de Charlles Augusto/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Conectar no LinkedIn/i })).toHaveAttribute("href", "https://www.linkedin.com/in/charlles-augusto/");
    expect(screen.getByRole("link", { name: /charlles\.dev/i })).toHaveAttribute("href", "/#top");
    expect(screen.getByRole("link", { name: /English/i })).toHaveAttribute("href", "/en");
  });

  it("renders selected projects and the public repository explorer", () => {
    renderHome();

    const projects = screen.getByRole("region", { name: /Trabalho público, contexto real/i });
    expect(within(projects).getByRole("heading", { name: /Projetos que mostram/i })).toBeInTheDocument();
    expect(within(projects).getByRole("heading", { name: /Repositórios públicos/i })).toBeInTheDocument();
    expect(within(projects).getAllByRole("link", { name: /Astrolink/i }).length).toBeGreaterThanOrEqual(1);
    expect(within(projects).getByPlaceholderText(/Buscar por nome/i)).toBeInTheDocument();
    expect(within(projects).getByRole("group", { name: /Filtrar repositórios/i })).toBeInTheDocument();
    expect(within(projects).getAllByText("Problema").length).toBeGreaterThan(0);
    expect(within(projects).getAllByText("Decisão técnica").length).toBeGreaterThan(0);
    expect(within(projects).getAllByText("Próximo passo").length).toBeGreaterThan(0);
  });

  it("replaces the fallback projects with a successful live response", async () => {
    const livePayload: ProjectsPayload = {
      ...fallbackProjectsPayload,
      cache: "hit",
      featured: [{ ...fallbackProjectsPayload.featured[0], id: 404, name: "live-repo", displayName: "Live Repo Distinto", fullName: "charlles-dev/live-repo", htmlUrl: "https://github.com/charlles-dev/live-repo", summary: "Projeto carregado pela API ao vivo." }],
      projects: [{ ...fallbackProjectsPayload.projects[0], id: 404, name: "live-repo", displayName: "Live Repo Distinto", fullName: "charlles-dev/live-repo", htmlUrl: "https://github.com/charlles-dev/live-repo", summary: "Projeto carregado pela API ao vivo." }],
    };
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => livePayload } as Response);

    renderHome();
    const projects = screen.getByRole("region", { name: /Trabalho público/i });
    expect(await within(projects).findAllByRole("link", { name: /Live Repo Distinto/i })).toHaveLength(2);
    await waitFor(() => expect(within(projects).queryByRole("link", { name: /Astrolink/i })).not.toBeInTheDocument());
  });

  it("supports repository search and empty states", () => {
    renderHome();
    const projects = screen.getByRole("region", { name: /Trabalho público/i });
    const explorer = within(projects).getByRole("region", { name: /Repositórios públicos/i });
    const search = within(explorer).getByPlaceholderText(/Buscar por nome/i);

    fireEvent.change(search, { target: { value: "Laudos" } });
    expect(within(explorer).getByRole("link", { name: /Laudos Proxxima/i })).toBeInTheDocument();
    expect(within(explorer).queryByRole("link", { name: /Astrolink/i })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "sem resultado real" } });
    expect(within(explorer).getByText(/Nenhum repositório encontrado/i)).toBeInTheDocument();
  });

  it("renders the three controlled Now signals and the contact footer", () => {
    renderHome();

    expect(screen.getByRole("heading", { name: /O que estou desenvolvendo/i })).toBeInTheDocument();
    expect(screen.getByText("Astrolink em evolução")).toBeInTheDocument();
    expect(screen.getByText("Portfólio como produto")).toBeInTheDocument();
    expect(screen.getByText("Segurança aplicada no fluxo")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo", { name: /Tem um problema para resolver/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Enviar um e-mail/i })).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
  });

  it("translates visible content and links for English", () => {
    renderHome("en");

    expect(screen.getByRole("heading", { level: 1, name: /I turn real problems/i })).toBeInTheDocument();
    expect(screen.getAllByText("Selected case").length).toBeGreaterThan(0);
    expect(screen.getByText("web, APIs and operational automation")).toBeInTheDocument();
    expect(document.body.textContent).toContain("Web developer and automation builder");
    expect(screen.queryByText("web, APIs e automação operacional")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /charlles\.dev/i })).toHaveAttribute("href", "/en#top");
  });

  it("does not expose generic AI-product chrome", () => {
    renderHome();

    const visibleText = document.body.textContent ?? "";
    expect(visibleText).not.toMatch(/Delivery signal|Core system|Terminal signature|GROQ_API_KEY|GITHUB_TOKEN|HUD|painel artificial/i);
    expect(visibleText).not.toMatch(/software, cyber e IA|cibersegurança e IA/i);
    expect(dictionary.meta.title).toMatch(/Desenvolvedor web/i);
  });
});
