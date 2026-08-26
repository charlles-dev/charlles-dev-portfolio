import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PortfolioHome } from "@/components/portfolio-home";
import { getDictionary } from "@/lib/i18n";
import { fallbackProjectsPayload } from "@/lib/projects/fallback";

function renderHome(locale: "pt-BR" | "en" | "es" = "pt-BR") {
  return render(<PortfolioHome locale={locale} dictionary={getDictionary(locale)} initialPayload={fallbackProjectsPayload} />);
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
});

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/pt-BR");
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("localized portfolio narrative", () => {
  it("uses links for page navigation and keeps the cinematic hero", () => {
    renderHome();

    expect(screen.getByRole("heading", { level: 1, name: /Engenharia por baixo\. Experiência por inteiro/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Trabalhos" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "#contact");
    expect(screen.queryByRole("link", { name: "Agora" })).not.toBeInTheDocument();
    expect(document.querySelector(".reference-video-scrub")).toHaveAttribute("poster", "/reference/charlles-hero-two-state-poster.webp");
    expect(screen.getAllByRole("link", { name: "Email" })[0]).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
  });

  it("renders selected public work, inline about and the full journey", () => {
    renderHome();

    const work = screen.getByRole("region", { name: /Código aberto\. Decisões à vista/i });
    expect(within(work).getByRole("heading", { name: "charlles-dev-portfolio" })).toBeInTheDocument();
    expect(within(work).getByRole("heading", { name: "Astrolink" })).toBeInTheDocument();
    expect(within(work).getByRole("heading", { name: "trakr" })).toBeInTheDocument();
    expect(within(work).queryByRole("heading", { name: "Laudos Proxxima" })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: /Eu começo pelo que precisa funcionar/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "O código mostra o que construí. Aqui entra o que fui estudar." })).toBeInTheDocument();
    expect(document.querySelector(".portfolio-work-scene img")).toHaveAttribute("src", expect.stringContaining("charlles-blocks.jpeg"));
    expect(document.querySelector(".portfolio-about-media img")).toHaveAttribute("src", expect.stringContaining("charlles-flashlight.jpeg"));
    expect(screen.queryByRole("heading", { name: /Algumas horas de debug/i })).not.toBeInTheDocument();
    expect(document.querySelector(".journey-index")).not.toBeInTheDocument();
  });

  it("keeps contact inline with WhatsApp, Cal, email and Discord", () => {
    renderHome();
    const contact = screen.getByRole("region", { name: "Onde o sistema está travando?" });

    expect(within(contact).getByRole("link", { name: /Chamar no WhatsApp/i })).toHaveAttribute("href", "https://wa.me/5583991141561");
    expect(within(contact).getByRole("link", { name: /Agendar uma call/i })).toHaveAttribute("href", "https://cal.com/charlles-dev/call");
    expect(within(contact).getByRole("link", { name: "Email" })).toHaveAttribute("href", expect.stringMatching(/^mailto:charllesgst@gmail\.com\?subject=.+&body=.+/));
    expect(within(contact).getByRole("link", { name: "Discord" })).toHaveAttribute("href", "https://discord.com/users/472347892728987658");
    expect(contact.querySelector('video[src="/reference/contact/charlles-whatsapp.mp4"]')).toBeInTheDocument();
    expect(contact.querySelector('video[src="/reference/contact/charlles-call.mp4"]')).toBeInTheDocument();
    expect(contact).not.toHaveTextContent(/Campina Grande|PT · EN · ES|Casos públicos/i);
  });

  it("opens the repository explorer from its explicit action", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Repositórios públicos" }));

    const dialog = screen.getByRole("dialog", { name: "Trabalhos" });
    expect(window.location.hash).toBe("#repositories");
    expect(within(dialog).getByRole("tab", { name: /Todos/ })).toHaveAttribute("aria-selected", "true");
    expect(within(dialog).getByText("Somente repositórios públicos")).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "charlles-dev-portfolio" })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("tab", { name: /Web/ }));
    expect(within(dialog).queryByRole("heading", { name: "Astrolink" })).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog", { name: "Trabalhos" })).not.toBeInTheDocument();
  });

  it("moves through repository filters with arrow keys", async () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Repositórios públicos" }));
    const dialog = screen.getByRole("dialog", { name: "Trabalhos" });
    const allTab = within(dialog).getByRole("tab", { name: /Todos/ });
    const webTab = within(dialog).getByRole("tab", { name: /Web/ });

    allTab.focus();
    fireEvent.keyDown(allTab, { key: "ArrowRight" });
    await waitFor(() => expect(document.activeElement).toBe(webTab));
    expect(webTab).toHaveAttribute("aria-selected", "true");
  });

  it("opens the repository explorer from its deep link and makes the background inert", async () => {
    window.history.replaceState({}, "", "/pt-BR#repositories");
    renderHome();

    const dialog = await screen.findByRole("dialog");
    const background = document.querySelector(".reference-app > div") as HTMLElement;
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(background.inert).toBe(true);
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(window.location.hash).toBe("");
  });

  it("copies the repository explorer deep link", async () => {
    Object.defineProperty(document, "execCommand", { configurable: true, value: vi.fn().mockReturnValue(true) });
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Repositórios públicos" }));
    fireEvent.click(screen.getByRole("button", { name: "Copiar link dos trabalhos" }));

    await waitFor(() => expect(screen.getByText("Link copiado")).toBeInTheDocument());
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });

  it("renders localized English copy with the same structure", () => {
    renderHome("en");
    expect(screen.getByRole("heading", { level: 1, name: /Engineering underneath/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /charlles\.dev/i })).toHaveAttribute("href", "/en");
  });
});

describe("navigation and hero behavior", () => {
  it("opens the compact menu, supports arrows and restores focus", async () => {
    renderHome();
    const trigger = screen.getByRole("button", { name: /Abrir menu/i });
    trigger.focus();
    fireEvent.click(trigger);
    const first = screen.getByRole("menuitem", { name: "Trabalhos" });
    await waitFor(() => expect(document.activeElement).toBe(first));
    fireEvent.keyDown(first, { key: "ArrowDown" });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Sobre" })));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("scrubs the hero video after metadata loads", async () => {
    renderHome();
    const video = document.querySelector(".reference-video-scrub") as HTMLVideoElement;
    const story = document.querySelector(".reference-scroll-story") as HTMLElement;
    Object.defineProperty(video, "duration", { configurable: true, value: 4 });
    Object.defineProperty(story, "offsetHeight", { configurable: true, value: 3000 });
    Object.defineProperty(story, "getBoundingClientRect", { configurable: true, value: () => ({ top: -(3000 - window.innerHeight) / 2 }) });
    fireEvent(video, new Event("loadedmetadata"));
    fireEvent.scroll(window);
    await waitFor(() => expect(video.currentTime).toBeCloseTo((0.29 + 0.5 * (0.73 - 0.29)) * 4, 1));
  });

  it("keeps one skip-link target in the composition", () => {
    renderHome("en");
    expect(document.querySelectorAll("#conteudo")).toHaveLength(1);
  });
});
