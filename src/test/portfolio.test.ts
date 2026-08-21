import {
  credentials,
  heroSignals,
  interestAreas,
  learningTimeline,
  navItems,
  nowItems,
  nowSignals,
  profile,
  profileHighlights,
  projects,
  socialLinks,
  stack,
  workPrinciples
} from "@/lib/portfolio";

describe("portfolio content", () => {
  it("keeps the landing focused on Charlles' professional positioning", () => {
    expect(profile.name).toBe("Charlles Augusto");
    expect(profile.headline).toContain("Produtos web");
    expect(profile.role).toBe("Desenvolvedor web e automações");
    expect(profile.coverLine).toContain("interfaces, automações e integrações");
    expect(profile.coverLine).not.toMatch(/ciberseguran.a e IA/i);
    expect(profile.tagline).not.toMatch(/cyber e IA/i);
    expect(profile.tagline).not.toMatch(/Campina Grande/i);
    expect(profile.location).toBe("Campina Grande-PB, Brazil");
    expect(profile.email).toBe("charllesgst@gmail.com");
  });

  it("defines the premium-controlled now signals contract", () => {
    expect(profile.headline).toBe("Produtos web, automação e segurança aplicada.");
    expect(profile.coverLine).toContain("interfaces, automações e integrações");
    expect(profile.coverLine).not.toMatch(/ciberseguran.a e IA|produto de IA|AI product/i);
    expect(nowSignals).toHaveLength(3);
    expect(nowSignals.map((item) => item.label)).toEqual([
      "Projeto em foco",
      "Melhoria recente",
      "Prática técnica"
    ]);
    expect(
      nowSignals.every((signal) => signal.title && signal.description && signal.proof && signal.icon)
    ).toBe(true);
  });

  it("defines the exact navigation surface for the one-page V1", () => {
    expect(navItems.map((item) => item.label)).toEqual([
      "Sobre",
      "Projetos",
      "Stack",
      "Contato"
    ]);
  });

  it("uses LinkedIn as the primary contact and keeps GitHub/email secondary", () => {
    expect(socialLinks[0]).toMatchObject({
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/charlles-augusto/",
      primary: true
    });
    expect(socialLinks.map((link) => link.label)).toEqual([
      "LinkedIn",
      "GitHub",
      "Discord",
      "WhatsApp",
      "Email"
    ]);
  });

  it("showcases the selected public projects with their source links", () => {
    expect(projects.map((project) => project.name)).toEqual([
      "Astrolink",
      "Laudos Proxxima",
      "3035 Teach"
    ]);
    expect(projects.every((project) => project.href.startsWith("https://github.com/charlles-dev/"))).toBe(true);
    expect(projects.every((project) => project.problem && project.built && project.next && project.icon)).toBe(true);
    expect(projects.map((project) => project.category)).toEqual([
      "infra",
      "automation",
      "learning"
    ]);
    expect(projects.every((project) => project.categoryLabel && project.signal && project.metric)).toBe(true);
  });

  it("covers the approved stack and credential highlights", () => {
    expect(stack).toEqual(
      expect.arrayContaining(["Python", "React", "Next.js", "TypeScript", "Go", "Java", "Cybersecurity", "Automação"])
    );
    expect(credentials).toEqual(
      expect.arrayContaining([
        "Visão Computacional / Geração Caldeira",
        "AI Fundamentals / IBM SkillsBuild",
        "Endpoint Security / Cisco Networking Academy",
        "Hackers do Bem / Cibersegurança"
      ])
    );
  });

  it("uses professional proof signals instead of student-first labels", () => {
    expect(profileHighlights.map((item) => item.value)).toEqual([
      "Campina Grande-PB",
      "Web & APIs",
      "Segurança + automação",
      "Projetos & vagas"
    ]);
    expect(heroSignals.map((signal) => signal.title)).toEqual([
      "Entrega visível",
      "Segurança aplicada",
      "Produto útil"
    ]);
  });

  it("keeps the professional sections concrete and typed", () => {
    expect(nowItems.map((item) => item.label)).toEqual([
      "Produto",
      "Operação",
      "Confiabilidade"
    ]);
    expect(interestAreas).toHaveLength(4);
    expect(learningTimeline.map((step) => step.title)).toEqual(
      expect.arrayContaining(["Hackers do Bem", "Endpoint Security", "AI Fundamentals", "Visão Computacional"])
    );
    expect(workPrinciples.map((principle) => principle.title)).toEqual([
      "Entrega com contexto",
      "Documentação operacional",
      "Clareza antes de complexidade"
    ]);
  });
});
