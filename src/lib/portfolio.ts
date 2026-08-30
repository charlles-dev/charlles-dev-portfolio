import type { IconName } from "@/components/icon-glyph";

export type Profile = {
  name: string;
  handle: string;
  role: string;
  headline: string;
  coverLine: string;
  intro: string;
  manifestoTitle: string;
  manifestoBody: string;
  tagline: string;
  location: string;
  email: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  kind: "linkedin" | "github" | "email" | "discord" | "whatsapp";
  primary?: boolean;
};

export type ProjectCategory = "infra" | "automation" | "learning";

export type Project = {
  name: string;
  language: string;
  description: string;
  href: string;
  scene: string;
  category: ProjectCategory;
  categoryLabel: string;
  focus: string;
  icon: IconName;
  signal: string;
  metric: string;
  problem: string;
  built: string;
  next: string;
};

export type ProfileHighlight = {
  label: string;
  value: string;
  icon: IconName;
};

export type HeroSignal = {
  scene: string;
  title: string;
  note: string;
  icon: IconName;
};

export type NowItem = {
  label: string;
  title: string;
  description: string;
  icon: IconName;
};

export type NowSignal = {
  label: string;
  title: string;
  description: string;
  proof: string;
  icon: IconName;
  href?: string;
};

export type InterestArea = {
  title: string;
  description: string;
  icon: IconName;
  tools: string[];
};

export type LearningStep = {
  period: string;
  title: string;
  source: string;
  description: string;
  icon: IconName;
};

export type WorkPrinciple = {
  title: string;
  description: string;
  icon: IconName;
};

export const profile: Profile = {
  name: "Charlles Augusto",
  handle: "Charlles.dev",
  role: "Desenvolvedor de software",
  headline: "Interfaces, sistemas e automação.",
  coverLine:
    "Construo interfaces, sistemas e automações com foco em clareza, ritmo e utilidade real. Gosto de transformar complexidade em experiências que fazem sentido.",
  intro:
    "Sou Charlles Augusto, desenvolvedor de software. Trabalho entre interfaces, lógica e automação para transformar problemas práticos em experiências bem apresentadas e fáceis de evoluir.",
  manifestoTitle: "Construo software com clareza, contexto e utilidade.",
  manifestoBody:
    "Meu foco é entregar produtos digitais simples de entender, bem documentados e úteis para fluxos reais. A página mostra projetos, decisões técnicas, ferramentas e credenciais que sustentam meu trabalho como desenvolvedor.",
  tagline: "interface / código / automação",
  location: "Campina Grande-PB, Brazil",
  email: "hello@charlles.dev"
};

export const navItems: NavItem[] = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" }
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/charlles-augusto/",
    kind: "linkedin",
    primary: true
  },
  {
    label: "GitHub",
    href: "https://github.com/charlles-dev",
    kind: "github"
  },
  {
    label: "Discord",
    href: "https://discord.com/users/472347892728987658",
    kind: "discord"
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5583991141561",
    kind: "whatsapp"
  },
  {
    label: "Email",
    href: "mailto:hello@charlles.dev",
    kind: "email"
  }
];

export const bookingUrl = "https://cal.com/charlles-dev/call";

export const projects: Project[] = [
  {
    name: "Astrolink",
    language: "Go",
    description:
      "Infraestrutura e software de baixo custo para acesso à internet em áreas remotas.",
    href: "https://github.com/charlles-dev/Astrolink",
    scene: "01",
    category: "infra",
    categoryLabel: "Infra",
    focus: "Conectividade em territórios difíceis",
    icon: "network",
    signal: "Rede remota",
    metric: "Go / conectividade",
    problem: "Como pensar infraestrutura de baixo custo para acesso à internet em regiões remotas.",
    built: "Organização de proposta técnica, lógica de conectividade e base de software em Go.",
    next: "Evoluir documentação, simulações e etapas de validação técnica."
  },
  {
    name: "Trakr",
    language: "Kotlin",
    description:
      "Maleta inteligente com detecção RFID/NFC, ESP32 e uma interface em Kotlin.",
    href: "https://github.com/charlles-dev/trakr",
    scene: "02",
    category: "automation",
    categoryLabel: "Sistema conectado",
    focus: "Software ligado ao mundo físico",
    icon: "device-laptop",
    signal: "Inventário físico",
    metric: "Kotlin / ESP32",
    problem: "Como perceber uma ferramenta ausente antes de fechar a maleta e deixar o local de trabalho.",
    built: "Leitura por RFID/NFC no ESP32 e interface em Kotlin para organizar inventário, estados e alertas.",
    next: "Validar leituras simultâneas, falsos positivos e o fluxo offline com o protótipo físico."
  },
  {
    name: "3035 Teach",
    language: "Java",
    description:
      "Repositório técnico com exercícios, estruturas e prática organizada em Java.",
    href: "https://github.com/charlles-dev/3035-TEACH",
    scene: "03",
    category: "learning",
    categoryLabel: "Base técnica",
    focus: "Prática técnica e documentação",
    icon: "books",
    signal: "Base técnica",
    metric: "Java / trilha",
    problem: "Bases técnicas precisam ficar organizadas para consulta, evolução e reutilização.",
    built: "Repositório em Java para registrar exercícios, padrões e decisões de implementação.",
    next: "Transformar exemplos em documentação mais objetiva e reaproveitável."
  }
];

export const profileHighlights: ProfileHighlight[] = [
  { label: "Local", value: "Campina Grande-PB", icon: "map-pin" },
  { label: "Foco", value: "Web & APIs", icon: "api" },
  { label: "Diferencial", value: "Segurança + automação", icon: "shield" },
  { label: "Oportunidades", value: "Projetos & vagas", icon: "target" }
];

export const heroSignals: HeroSignal[] = [
  {
    scene: "Entrega",
    title: "Entrega visível",
    note: "Projetos públicos apresentados como evidência de decisão técnica, execução e contexto.",
    icon: "github"
  },
  {
    scene: "Base",
    title: "Segurança aplicada",
    note: "Fundamentos de redes, endpoint e defesa usados para pensar software com mais critério.",
    icon: "shield"
  },
  {
    scene: "Produto",
    title: "Produto útil",
    note: "Interfaces e automações pequenas, bem executadas, conectadas a problemas reais.",
    icon: "target"
  }
];

export const nowItems: NowItem[] = [
  {
    label: "Produto",
    title: "Interfaces e produtos web",
    description: "Landing pages, fluxos internos e experiências digitais com hierarquia clara e boa manutenção.",
    icon: "shield"
  },
  {
    label: "Operação",
    title: "Automação de processos",
    description: "Ferramentas em TypeScript, Python e Go para reduzir retrabalho e padronizar rotinas.",
    icon: "code"
  },
  {
    label: "Confiabilidade",
    title: "Segurança aplicada",
    description: "Uso de fundamentos de defesa e automação com critério para criar produtos mais confiáveis.",
    icon: "brain"
  }
];

export const nowSignals: NowSignal[] = [
  {
    label: "Projeto em foco",
    title: "Astrolink em evolução",
    description:
      "Organizando o projeto como um case técnico de conectividade, documentação e próximos passos verificáveis.",
    proof: "Go / conectividade / documentação",
    icon: "network",
    href: "https://github.com/charlles-dev/Astrolink"
  },
  {
    label: "Melhoria recente",
    title: "Portfólio como produto",
    description:
      "Refinando a página para comunicar presença profissional, decisões técnicas e uma identidade visual própria.",
    proof: "Next.js / Tailwind / identidade",
    icon: "sparkles"
  },
  {
    label: "Prática técnica",
    title: "Segurança aplicada no fluxo",
    description:
      "Usando fundamentos de defesa, redes e automação para avaliar decisões de produto com mais critério.",
    proof: "Cybersecurity / automação / revisão",
    icon: "shield"
  }
];

export const interestAreas: InterestArea[] = [
  {
    title: "Desenvolvimento web",
    description: "Interfaces, landing pages e produtos com boa usabilidade.",
    icon: "device-laptop",
    tools: ["React", "Next.js", "TypeScript"]
  },
  {
    title: "APIs e automação",
    description: "Backends, scripts e integrações para reduzir trabalho repetitivo.",
    icon: "api",
    tools: ["Python", "Go", "Node"]
  },
  {
    title: "Cibersegurança",
    description: "Estudo de redes, endpoint, hardening e mentalidade de defesa.",
    icon: "shield",
    tools: ["Networking", "Cisco", "Labs"]
  },
  {
    title: "Automação inteligente",
    description: "Uso prático de automações e modelos quando ajudam análise, produtividade e produto.",
    icon: "robot",
    tools: ["Automation", "Computer Vision", "Workflows"]
  }
];

export const learningTimeline: LearningStep[] = [
  {
    period: "Atual",
    title: "Hackers do Bem",
    source: "Cibersegurança",
    description: "Formação focada em fundamentos e prática de segurança.",
    icon: "shield"
  },
  {
    period: "Atual",
    title: "Endpoint Security",
    source: "Cisco Networking Academy",
    description: "Base para entender proteção de dispositivos, riscos e operação.",
    icon: "certificate"
  },
  {
    period: "Atual",
    title: "AI Fundamentals",
    source: "IBM SkillsBuild",
    description: "Fundamentos de IA com foco em aplicação e vocabulário técnico.",
    icon: "brain"
  },
  {
    period: "Atual",
    title: "Visão Computacional",
    source: "Geração Caldeira",
    description: "Contato prático com análise de imagens e modelos computacionais.",
    icon: "school"
  }
];

export const workPrinciples: WorkPrinciple[] = [
  {
    title: "Entrega com contexto",
    description: "Mostrar problema, decisão e resultado para cada projeto ter valor profissional.",
    icon: "route"
  },
  {
    title: "Documentação operacional",
    description: "Registrar decisões, fluxos e próximos passos para facilitar manutenção e colaboração.",
    icon: "terminal"
  },
  {
    title: "Clareza antes de complexidade",
    description: "Priorizar utilidade, leitura e manutenção antes de adicionar camadas de efeito.",
    icon: "bolt"
  }
];

export const stack: string[] = [
  "Python",
  "React",
  "Next.js",
  "TypeScript",
  "Go",
  "Java",
  "Cybersecurity",
  "Automação",
  "Computer Vision",
  "Networking"
];

export const credentials: string[] = [
  "Visão Computacional / Geração Caldeira",
  "AI Fundamentals / IBM SkillsBuild",
  "Endpoint Security / Cisco Networking Academy",
  "Hackers do Bem / Cibersegurança"
];
