import { fireEvent, render, screen, within } from "@testing-library/react";

import Home from "@/app/page";

describe("home page", () => {
  it("renders the premium hero signature and primary contact path", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Charlles Augusto/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Produtos web, automação e segurança aplicada/i)).toBeInTheDocument();
    expect(screen.getByText(/marca tipográfica/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Retrato editorial de Charlles Augusto/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Conectar no LinkedIn/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/charlles-augusto/"
    );
    expect(screen.getByRole("link", { name: /Ver GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/charlles-dev"
    );
  });

  it("renders the selected projects as public mini cases", () => {
    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

    expect(within(projects).getByRole("link", { name: /Astrolink/i })).toHaveAttribute(
      "href",
      "https://github.com/charlles-dev/Astrolink"
    );
    expect(within(projects).getAllByText("Problema")).toHaveLength(3);
    expect(within(projects).getAllByText("Decisão técnica")).toHaveLength(3);
    expect(within(projects).getAllByText("Próximo passo")).toHaveLength(3);
    expect(within(projects).getAllByText(/Mini case/i).length).toBeGreaterThanOrEqual(1);
    expect(within(projects).getByRole("link", { name: /Laudos Proxxima/i })).toBeInTheDocument();
    expect(within(projects).getByRole("link", { name: /3035 Teach/i })).toBeInTheDocument();
  });

  it("filters the project bento with real client-side state", () => {
    render(<Home />);

    const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });
    const automationFilter = within(projects).getByRole("button", { name: /Automa..o/i });

    fireEvent.click(automationFilter);

    expect(automationFilter).toHaveAttribute("aria-pressed", "true");
    expect(within(projects).getByRole("link", { name: /Laudos Proxxima/i })).toBeInTheDocument();
    expect(within(projects).queryByRole("link", { name: /Astrolink/i })).not.toBeInTheDocument();
    expect(within(projects).getByText(/1 projeto em foco/i)).toBeInTheDocument();
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
  });
});
