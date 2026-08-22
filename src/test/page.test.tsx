import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

afterEach(() => cleanup());

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

    expect(screen.getByRole("heading", { level: 1, name: /Construo experiências digitais que fazem sentido/i })).toBeInTheDocument();
    expect(screen.queryByText("Construindo com intenção")).not.toBeInTheDocument();
    expect(screen.getByText(/desenvolvedor de software de Campina Grande/i)).toBeInTheDocument();
    expect(screen.getByText(/Role para explorar/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trabalhos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sobre" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contato" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /charlles\.dev/i })).toHaveAttribute("href", "/pt-BR");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/charlles-dev");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/charlles-augusto/");
    expect(screen.getByRole("link", { name: "Discord" })).toHaveAttribute("href", "https://discord.com/users/472347892728987658");
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/5583991141561");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
    expect(document.querySelector(".reference-video-scrub")).toHaveAttribute("poster", "/reference/charlles-hero-two-state-poster.webp");
    expect(document.querySelector(".reference-video-idle")).toHaveAttribute("src", "/reference/charlles-hero-idle-loop.webm");
    expect(document.querySelector(".reference-video-awake")).not.toHaveAttribute("src");
    expect(document.querySelector(".reference-video-awake")).toHaveAttribute("preload", "none");
    expect(document.querySelector(".reference-video-loop")).not.toBeInTheDocument();
    expect(document.querySelectorAll(".language-flag-icon")).toHaveLength(3);
    expect(document.querySelector(".reference-after-scene")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Alternar tema" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /English/i })).toHaveAttribute("href", "/en");
  });

  it("scrubs the hero video to the scene progress after metadata loads", async () => {
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

  it("switches between idle, transition and awake loop states", () => {
    renderHome();
    const story = document.querySelector(".reference-scroll-story") as HTMLElement;
    Object.defineProperty(story, "offsetHeight", { configurable: true, value: 3000 });
    const setProgress = (progress: number) => {
      Object.defineProperty(story, "getBoundingClientRect", { configurable: true, value: () => ({ top: -progress * (3000 - window.innerHeight) }) });
      fireEvent.scroll(window);
      return document.querySelector(".reference-sticky-scene");
    };

    expect(setProgress(0)?.getAttribute("data-loop-state")).toBe("idle");
    expect(setProgress(0.5)?.getAttribute("data-loop-state")).toBe("transition");
    expect(setProgress(0.9)?.getAttribute("data-loop-state")).toBe("awake");
  });

  it("lazy-loads and activates the awake loop at the end of the scene", async () => {
    renderHome();
    const story = document.querySelector(".reference-scroll-story") as HTMLElement;
    const awake = document.querySelector(".reference-video-awake") as HTMLVideoElement;
    const idle = document.querySelector(".reference-video-idle") as HTMLVideoElement;
    Object.defineProperty(story, "offsetHeight", { configurable: true, value: 3000 });
    Object.defineProperty(story, "getBoundingClientRect", { configurable: true, value: () => ({ top: -0.9 * (3000 - window.innerHeight) }) });
    fireEvent.scroll(window);

    await waitFor(() => expect(awake).toHaveAttribute("src", "/reference/charlles-hero-awake-loop.webm"));
    expect(awake.style.opacity).toBe("1");
    expect(idle.style.opacity).toBe("0");
  });

  it("pauses and resumes the hero loop when tab visibility changes", () => {
    renderHome();
    const video = document.querySelector(".reference-video-scrub") as HTMLVideoElement;
    const idleVideo = document.querySelector(".reference-video-idle") as HTMLVideoElement;
    Object.defineProperty(video, "duration", { configurable: true, value: 4 });
    const pauseSpy = vi.spyOn(idleVideo, "pause").mockImplementation(() => undefined);
    const originalVisibility = document.visibilityState;

    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    fireEvent(document, new Event("visibilitychange"));
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    fireEvent(document, new Event("visibilitychange"));

    expect(pauseSpy).toHaveBeenCalled();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: originalVisibility });
  });

  it("opens the work panel with tabs and project cards", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Trabalhos" }));

    const dialog = screen.getByRole("dialog", { name: "Trabalhos" });
    expect(within(dialog).getByRole("tab", { name: /UI\/UX & Front-end/ })).toHaveAttribute("aria-selected", "true");
    expect(within(dialog).getByRole("heading", { name: "Astrolink" })).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Laudos Proxxima" })).toBeInTheDocument();
    expect(within(dialog).getAllByRole("link", { name: /Abrir projeto/i })[0]).toHaveAttribute("href", "https://github.com/charlles-dev/Astrolink");

    fireEvent.click(within(dialog).getByRole("tab", { name: "Visual design" }));
    expect(within(dialog).getByRole("heading", { name: /Uma mistura de detalhe visual/i })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog", { name: "Trabalhos" })).not.toBeInTheDocument();
  });

  it("opens About and Contact as modal dialogs and closes with Escape", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Sobre" }));
    expect(screen.getByRole("dialog", { name: "Charlles Augusto" })).toBeInTheDocument();
    const aboutDialog = screen.getByRole("dialog", { name: "Charlles Augusto" });
    expect(within(aboutDialog).getByRole("link", { name: "Email" })).toBeInTheDocument();
    expect(within(aboutDialog).getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(within(aboutDialog).queryByRole("link", { name: "WhatsApp" })).not.toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Charlles Augusto" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Contato" }));
    const dialog = screen.getByRole("dialog", { name: "Vamos tirar sua ideia do papel?" });
    expect(within(dialog).getByText("Vamos tirar sua ideia do papel?")).toBeInTheDocument();
    expect(within(dialog).getByText("UI/UX Designer & Front-end")).toBeInTheDocument();
    expect(within(dialog).getByText("Disponível")).toBeInTheDocument();
    expect(within(dialog).getByText("+20")).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/5583991141561");
    expect(within(dialog).getByRole("link", { name: "Discord" })).toHaveAttribute("href", "https://discord.com/users/472347892728987658");
    expect(within(dialog).getByRole("link", { name: /Agendar uma call/ })).toHaveAttribute("href", "https://call.com/charles-dev");
    expect(dialog.querySelector('img[src*="charlles-contact-avatar.webp"]')).toBeInTheDocument();
    expect(dialog.querySelector('img[src*="charlles-contact-whatsapp.webp"]')).toBeInTheDocument();
    expect(dialog.querySelector('img[src*="charlles-contact-whatsapp-hover.webp"]')).toBeInTheDocument();
    expect(dialog.querySelector('img[src*="charlles-contact-call.webp"]')).toBeInTheDocument();
    expect(dialog.querySelector('img[src*="charlles-contact-call-hover.webp"]')).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog", { name: "Vamos tirar sua ideia do papel?" })).not.toBeInTheDocument();
  });

  it("renders localized English copy and keeps the same interaction model", () => {
    renderHome("en");

    expect(screen.getByRole("heading", { level: 1, name: /I build digital experiences/i })).toBeInTheDocument();
    expect(document.body.textContent).toContain("Software developer");
    expect(screen.getByRole("button", { name: "Work" })).toBeInTheDocument();
    expect(screen.queryByText("interface / código / automação")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /charlles\.dev/i })).toHaveAttribute("href", "/en");
  });

  it("opens and dismisses the compact mobile menu accessibly", () => {
    renderHome();

    const trigger = screen.getByRole("button", { name: /Abrir menu/i });
    fireEvent.click(trigger);
    const menu = document.getElementById("reference-mobile-menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveAttribute("role", "menu");
    expect(within(menu as HTMLElement).getAllByRole("menuitem")).toHaveLength(3);
    expect(within(menu as HTMLElement).getByRole("link", { name: "Português" })).toHaveAttribute("href", "/pt-BR");
    expect(document.body.dataset.mobileMenuOpen).toBe("true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.getElementById("reference-mobile-menu")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);
    expect(document.getElementById("reference-mobile-menu")).not.toBeInTheDocument();
  });

  it("does not expose the old generic dashboard language", () => {
    renderHome();

    const visibleText = document.body.textContent ?? "";
    expect(visibleText).not.toMatch(/Delivery signal|Core system|Terminal signature|HUD|painel artificial/i);
    expect(visibleText).not.toMatch(/software, cyber e IA|cibersegurança e IA/i);
  });
});


describe("landing dialog focus behavior", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("moves focus into the dialog, wraps Tab, and restores the trigger focus", async () => {
    renderHome();
    const trigger = screen.getByRole("button", { name: "Sobre" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Charlles Augusto" });
    const close = within(dialog).getByRole("button", { name: "Fechar" });
    await waitFor(() => expect(document.activeElement).toBe(close));

    const links = within(dialog).getAllByRole("link");
    links[links.length - 1].focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(close);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Charlles Augusto" })).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });
});


describe("landing mobile menu focus behavior", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("moves focus into the menu and restores the trigger on Escape", async () => {
    renderHome();
    const trigger = screen.getByRole("button", { name: /Abrir menu/i });
    trigger.focus();
    fireEvent.click(trigger);
    const firstItem = screen.getByRole("menuitem", { name: "Trabalhos" });
    await waitFor(() => expect(document.activeElement).toBe(firstItem));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });
});


describe("hero media resilience", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("declares MP4 fallbacks and switches once after a media error", () => {
    renderHome();
    const primary = document.querySelector(".reference-video-scrub") as HTMLVideoElement;
    const idle = document.querySelector(".reference-video-idle") as HTMLVideoElement;
    const awake = document.querySelector(".reference-video-awake") as HTMLVideoElement;

    expect(primary.dataset.fallbackSrc).toBe("/reference/charlles-hero-two-state.mp4");
    expect(idle.dataset.fallbackSrc).toBe("/reference/charlles-hero-idle-loop.mp4");
    expect(awake.dataset.fallbackSrc).toBe("/reference/charlles-hero-awake-loop.mp4");

    fireEvent.error(primary);
    expect(primary.src).toContain("/reference/charlles-hero-two-state.mp4");
    expect(primary.dataset.fallbackUsed).toBe("true");

    const fallbackSrc = primary.src;
    fireEvent.error(primary);
    expect(primary.src).toBe(fallbackSrc);
  });
});


describe("hero reduced motion", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("keeps the poster path active and avoids video preloading", async () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true, addEventListener, removeEventListener }));
    renderHome("es");

    await waitFor(() => expect(document.querySelector(".reference-sticky-scene")).toHaveAttribute("data-motion", "reduced"));
    expect(document.querySelector(".reference-video-scrub")).toHaveAttribute("preload", "none");
    expect(document.querySelector(".reference-video-idle")).toHaveAttribute("preload", "none");
    expect(document.querySelector(".reference-video-awake")).toHaveAttribute("poster", "/reference/charlles-hero-two-state-poster.webp");
    expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});


describe("landing panel deep links", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/pt-BR");
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("opens a panel from the hash and makes the background inert", async () => {
    window.history.replaceState({}, "", "/pt-BR#about");
    renderHome();

    const dialog = await screen.findByRole("dialog");
    const background = document.querySelector(".reference-app > div") as HTMLElement;
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(background).toHaveAttribute("aria-hidden", "true");
    expect(background.inert).toBe(true);

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(window.location.hash).toBe("");
    expect(background.inert).toBe(false);
  });
});


describe("contact conversion", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
    Object.defineProperty(document, "execCommand", { configurable: true, value: vi.fn().mockReturnValue(true) });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("offers a direct email link and confirms copy", async () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Contato" }));

    expect(screen.getByRole("link", { name: /charllesgst@gmail\.com/i })).toHaveAttribute("href", "mailto:charllesgst@gmail.com");
    fireEvent.click(screen.getByRole("button", { name: "Copiar e-mail" }));

    await waitFor(() => expect(screen.getByText("E-mail copiado")).toBeInTheDocument());
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});


describe("landing structural SEO", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("keeps one skip-link target in the client composition", () => {
    renderHome("en");
    expect(document.querySelectorAll("#conteudo")).toHaveLength(1);
  });
});


describe("work sharing", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("fetch disabled in tests")));
    Object.defineProperty(document, "execCommand", { configurable: true, value: vi.fn().mockReturnValue(true) });
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/pt-BR");
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("copies the work panel deep link and confirms it", async () => {
    window.history.replaceState({}, "", "/pt-BR");
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Trabalhos" }));
    fireEvent.click(screen.getByRole("button", { name: "Copiar link dos trabalhos" }));

    await waitFor(() => expect(screen.getByText("Link copiado")).toBeInTheDocument());
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
