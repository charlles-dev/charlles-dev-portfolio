import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import Home from "@/app/page";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";
import type { ProjectsPayload } from "@/lib/projects/types";

describe("home page", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const livePayload: ProjectsPayload = {
    ...fallbackProjectsPayload,
    cache: "hit",
    featured: [
      {
        ...fallbackProjectsPayload.featured[0],
        id: 404,
        name: "live-repo",
        displayName: "Live Repo Distinto",
        fullName: "charlles-dev/live-repo",
        htmlUrl: "https://github.com/charlles-dev/live-repo",
        summary: "Projeto carregado pela API ao vivo.",
      },
    ],
    projects: [
      {
        ...fallbackProjectsPayload.projects[0],
        id: 404,
        name: "live-repo",
        displayName: "Live Repo Distinto",
        fullName: "charlles-dev/live-repo",
        htmlUrl: "https://github.com/charlles-dev/live-repo",
        summary: "Projeto carregado pela API ao vivo.",
      },
    ],
  };

  it("renders the premium hero signature and primary contact path", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Charlles Augusto/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Produtos web, automação e segurança aplicada/i)).toBeInTheDocument();
    expect(screen.getByText(/Portf.lio profissional/i)).toBeInTheDocument();
    expect(screen.queryByText(/marca tipogr.fica/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/Retrato editorial de Charlles Augusto/i)).toBeInTheDocument();
    expect(within(screen.getByRole("link", { name: /Voltar ao topo/i })).getByText(/charlles/i)).toHaveClass(
      "brand-wordmark"
    );

    expect(screen.getByRole("link", { name: /Conectar no LinkedIn/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/charlles-augusto/"
    );
    expect(screen.getByRole("link", { name: /Ver GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/charlles-dev"
    );
  });

  it("renders the professional projects showcase", () => {
    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    expect(within(projects).getByRole("heading", { name: /Projetos em destaque/i })).toBeInTheDocument();
    expect(
      within(projects).getByRole("heading", { name: /Todos os reposit[oó]rios p[úu]blicos/i })
    ).toBeInTheDocument();
    expect(within(projects).getAllByRole("link", { name: /Astrolink/i })[0]).toHaveAttribute(
      "href",
      "https://github.com/charlles-dev/Astrolink"
    );
    expect(within(projects).getByPlaceholderText(/Buscar por nome/i)).toBeInTheDocument();
    expect(
      within(projects).getByRole("group", { name: /Filtrar repositorios por categoria/i })
    ).toBeInTheDocument();
    expect(
      within(projects).getAllByRole("heading", { name: /Astrolink/i }).every((heading) =>
        heading.classList.contains("break-words") && heading.classList.contains("[overflow-wrap:anywhere]")
      )
    ).toBe(true);
    expect(within(projects).getAllByText(/Atualizado em 01 de jan. de 2026/i).length).toBeGreaterThanOrEqual(1);
    expect(within(projects).getAllByText("Problema").length).toBeGreaterThanOrEqual(1);
    expect(within(projects).getAllByText(/Decis[aã]o t[eé]cnica/i).length).toBeGreaterThanOrEqual(1);
    expect(within(projects).getAllByText(/Pr[oó]ximo passo/i).length).toBeGreaterThanOrEqual(1);
  });

  it("replaces the fallback projects with a successful live projects response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => livePayload,
    } as Response);

    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    const liveLinks = await within(projects).findAllByRole("link", { name: /Live Repo Distinto/i });

    expect(liveLinks).toHaveLength(2);
    expect(liveLinks.every((link) => link.getAttribute("href") === "https://github.com/charlles-dev/live-repo")).toBe(
      true
    );
    await waitFor(() => {
      expect(within(projects).queryByRole("link", { name: /Astrolink/i })).not.toBeInTheDocument();
    });
  });

  it("preserves fallback projects when the live projects response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: vi.fn(),
    } as unknown as Response);

    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith("/api/projects"));
    expect(within(projects).getAllByRole("link", { name: /Astrolink/i }).length).toBeGreaterThan(0);
  });

  it("preserves fallback projects when the live projects response is empty", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ ...livePayload, featured: [], projects: [] }),
    } as Response);

    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith("/api/projects"));
    expect(within(projects).getAllByRole("link", { name: /Astrolink/i }).length).toBeGreaterThan(0);
  });

  it("preserves fallback projects when the live projects request throws", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network unavailable"));

    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith("/api/projects"));
    expect(within(projects).getAllByRole("link", { name: /Astrolink/i }).length).toBeGreaterThan(0);
  });

  it("searches public repositories with real client-side state", () => {
    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });
    const explorer = within(projects).getByRole("region", {
      name: /Todos os reposit[oó]rios p[úu]blicos/i
    });
    const search = within(projects).getByPlaceholderText(/Buscar por nome/i);

    fireEvent.change(search, { target: { value: "Laudos" } });

    expect(within(explorer).getByRole("link", { name: /Laudos Proxxima/i })).toBeInTheDocument();
    expect(within(explorer).queryByRole("link", { name: /Astrolink/i })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "sem resultado real" } });

    expect(within(explorer).getByText(/Nenhum reposit[oó]rio encontrado/i)).toBeInTheDocument();
  });

  it("renders the living portfolio sections", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /reas onde atuo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Stack, credenciais e pr.tica/i })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo", { name: /Construindo produto/i })).toBeInTheDocument();
    expect(screen.getByText(/Contato direto/i)).toBeInTheDocument();
    expect(screen.getByText(/git remote github/i)).toBeInTheDocument();
  });

  it("keeps the footer as a typographic signature with direct contact", () => {
    render(<Home />);

    const footer = screen.getByRole("contentinfo", { name: /Construindo produto/i });

    expect(within(footer).getByText(/Contato direto/i)).toBeInTheDocument();
    expect(within(footer).getAllByText(/Charlles/i).length).toBeGreaterThan(0);
    expect(within(footer).getAllByText(/Augusto/i).length).toBeGreaterThan(0);
    expect(within(footer).getByText("© 2026 / charlles-dev")).toBeInTheDocument();
    expect(within(footer).queryByText(/Portf.lio pessoal em Next.js/i)).not.toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /open linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/charlles-augusto/"
    );
    expect(within(footer).getByRole("link", { name: /mailto charllesgst/i })).toHaveAttribute(
      "href",
      "mailto:charllesgst@gmail.com"
    );
  });

  it("renders richer professional surfaces beyond the hero and projects", () => {
    render(<Home />);

    expect(screen.getByText(/Resumo profissional/i)).toBeInTheDocument();
    expect(screen.getByText(/Ferramentas de trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/^Agora$/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /O que está em construção/i })).toBeInTheDocument();
    expect(screen.getByText("Projeto em foco")).toBeInTheDocument();
    expect(screen.getByText("Melhoria recente")).toBeInTheDocument();
    expect(screen.getByText("Prática técnica")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Notas de campo/i })).toBeInTheDocument();
  });

  it("renders a controlled Agora section without feed or blog promises", () => {
    render(<Home />);

    const agora = screen.getByRole("region", { name: /O que está em construção/i });

    expect(within(agora).getByText("Projeto em foco")).toBeInTheDocument();
    expect(within(agora).getByText("Astrolink em evolução")).toBeInTheDocument();
    expect(within(agora).getByText("Melhoria recente")).toBeInTheDocument();
    expect(within(agora).getByText("Portfólio como produto")).toBeInTheDocument();
    expect(within(agora).getByText("Prática técnica")).toBeInTheDocument();
    expect(within(agora).getByText("Segurança aplicada no fluxo")).toBeInTheDocument();
    expect(within(agora).getByText(/promessa editorial, lista infinita ou interface encenada/i)).toBeInTheDocument();
    expect(within(agora).queryByText(/blog/i)).not.toBeInTheDocument();
    expect(within(agora).queryByText(/feed/i)).not.toBeInTheDocument();
  });

  it("avoids generic ai-product chrome in visible section labels", () => {
    render(<Home />);

    expect(screen.queryByText(/Professional toolkit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delivery signal/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delivery mode/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Core system/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Terminal signature/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/VOL\. I/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Online agora/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/IA aplicada ao produto/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/software, cyber e IA/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ciberseguran.a e IA/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/HUD/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/painel artificial/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Marca tipogr.fica/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Aberto a/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Conex.es$/i)).not.toBeInTheDocument();
  });
});
