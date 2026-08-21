import type { IconName } from "@/components/icon-glyph";

export const locales = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, { name: string; short: string }> = {
  "pt-BR": { name: "Português", short: "PT" },
  en: { name: "English", short: "EN" },
  es: { name: "Español", short: "ES" },
};

export type LocalizedProjectCopy = {
  summary: string;
  problem: string;
  decision: string;
  next: string;
  category: string;
  reason: string;
};

export type PortfolioDictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogAlt: string;
  };
  nav: {
    work: string;
    about: string;
    now: string;
    contact: string;
    menu: string;
    theme: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    scrollLabel: string;
    tagline: string;
    role: string;
    status: string;
    facts: Array<{ label: string; value: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    link: string;
    values: Array<{ title: string; description: string; icon: IconName }>;
  };
  work: {
    eyebrow: string;
    title: string;
    description: string;
    panelTitle: string;
    panelClose: string;
    tabs: { product: string; visual: string; motion: string };
    featuredLabel: string;
    openProject: string;
    problem: string;
    decision: string;
    next: string;
    explorerLabel: string;
    explorerTitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    filtersLabel: string;
    filters: Record<"all" | "web" | "automation" | "infra" | "technical-base" | "experiment", string>;
    repository: string;
    updated: string;
    noResults: string;
    noResultsDescription: string;
  };
  expertise: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string; tools: string[]; icon: IconName }>;
  };
  now: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      label: string;
      title: string;
      description: string;
      proof: string;
      icon: IconName;
      href?: string;
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    direct: string;
  };
  footer: {
    availability: string;
    rights: string;
    built: string;
  };
  projects: Record<string, LocalizedProjectCopy>;
};

const portuguese: PortfolioDictionary = {
  meta: {
    title: "Charlles Augusto — Desenvolvedor web e automações",
    description:
      "Portfólio de Charlles Augusto, desenvolvedor web que transforma problemas reais em software claro, automações úteis e experiências confiáveis.",
    keywords: ["desenvolvedor web", "Next.js", "TypeScript", "automação", "cibersegurança", "Campina Grande"],
    ogAlt: "Charlles Augusto — desenvolvedor web, automação e segurança aplicada",
  },
  nav: {
    work: "Trabalhos",
    about: "Sobre",
    now: "Agora",
    contact: "Contato",
    menu: "Abrir menu",
    theme: "Alternar tema",
  },
  hero: {
    eyebrow: "Desenvolvimento web · automação · segurança aplicada",
    headline: "Pense grande. Eu construo o caminho.",
    description:
      "Sou Charlles Augusto, desenvolvedor web de Campina Grande. Construo interfaces, APIs e automações com foco em clareza, manutenção e utilidade — com fundamentos de segurança guiando as decisões.",
    primaryCta: "Conheça meu trabalho",
    secondaryCta: "Conectar no LinkedIn",
    scrollLabel: "Role para explorar",
    tagline: "web, APIs e automação operacional",
    role: "Desenvolvedor web e automações",
    status: "Disponível para projetos e oportunidades",
    facts: [
      { label: "Base", value: "Campina Grande, Brasil" },
      { label: "Foco", value: "Web, APIs e automação" },
      { label: "Trabalho", value: "Público e documentado" },
    ],
  },
  about: {
    eyebrow: "Sobre o meu trabalho",
    title: "Tecnologia precisa reduzir atrito, não adicionar complexidade.",
    body:
      "Gosto de entender o problema antes de escolher a ferramenta. Meu trabalho combina desenvolvimento de interfaces, integrações e automações com uma base crescente em redes e segurança. O resultado que busco é software que faça sentido para quem usa e continue legível para quem precisar evoluí-lo.",
    link: "Ver perfil no LinkedIn",
    values: [
      {
        title: "Clareza na interface",
        description: "Hierarquia visual, fluxo simples e decisões que ajudam a pessoa a concluir a tarefa.",
        icon: "device-laptop",
      },
      {
        title: "Automação útil",
        description: "Integrações e scripts entram quando eliminam retrabalho e tornam a operação mais confiável.",
        icon: "api",
      },
      {
        title: "Confiabilidade desde cedo",
        description: "Redes, autenticação e boas práticas de segurança fazem parte da conversa desde o início.",
        icon: "shield",
      },
    ],
  },
  work: {
    eyebrow: "Trabalho público, contexto real",
    title: "Projetos que mostram como eu penso e construo.",
    description:
      "Uma seleção de projetos públicos com problema, decisão técnica e próximo passo. Menos vitrine genérica; mais evidência do processo.",
    panelTitle: "Trabalhos",
    panelClose: "Fechar",
    tabs: { product: "Web e produto", visual: "Visual e interface", motion: "Motion e interação" },
    featuredLabel: "Case selecionado",
    openProject: "Abrir projeto",
    problem: "Problema",
    decision: "Decisão técnica",
    next: "Próximo passo",
    explorerLabel: "Explorar mais",
    explorerTitle: "Repositórios públicos",
    searchLabel: "Buscar repositórios públicos",
    searchPlaceholder: "Buscar por nome, stack ou resumo",
    filtersLabel: "Filtrar repositórios por categoria",
    filters: {
      all: "Todos",
      web: "Web",
      automation: "Automação",
      infra: "Infraestrutura",
      "technical-base": "Base técnica",
      experiment: "Experimentos",
    },
    repository: "Repositório",
    updated: "Atualizado em",
    noResults: "Nenhum repositório encontrado",
    noResultsDescription: "Ajuste a busca ou escolha outra categoria para continuar explorando.",
  },
  expertise: {
    eyebrow: "Como eu trabalho",
    title: "Uma base técnica em construção, aplicada a problemas concretos.",
    description:
      "A stack é um meio. O que importa é conectar boas ferramentas a uma entrega que seja compreensível, útil e possível de manter.",
    items: [
      {
        title: "Produtos web",
        description: "Interfaces e experiências responsivas com React, Next.js e TypeScript.",
        tools: ["React", "Next.js", "TypeScript"],
        icon: "device-laptop",
      },
      {
        title: "APIs e automação",
        description: "Backends, scripts e integrações para organizar fluxos e reduzir trabalho repetitivo.",
        tools: ["Python", "Go", "Node.js"],
        icon: "api",
      },
      {
        title: "Segurança aplicada",
        description: "Fundamentos de redes, endpoint e defesa usados para tomar decisões mais responsáveis.",
        tools: ["Networking", "Cisco", "Labs"],
        icon: "shield",
      },
    ],
  },
  now: {
    eyebrow: "Agora",
    title: "O que estou desenvolvendo e aprofundando.",
    description: "Três focos atuais, mantidos como sinais de direção — não como um feed de atualizações.",
    items: [
      {
        label: "Projeto em foco",
        title: "Astrolink em evolução",
        description: "Estruturando uma solução de baixo custo para vender e gerenciar acesso Wi-Fi em redes locais com Starlink, OpenWrt, PIX e vouchers.",
        proof: "Go · SvelteKit · OpenWrt",
        icon: "network",
        href: "https://github.com/charlles-dev/Astrolink",
      },
      {
        label: "Melhoria recente",
        title: "Portfólio como produto",
        description: "Refinando narrativa, performance e apresentação para que o portfólio comunique trabalho real em diferentes idiomas.",
        proof: "Next.js · TypeScript · i18n",
        icon: "sparkles",
      },
      {
        label: "Prática técnica",
        title: "Segurança aplicada no fluxo",
        description: "Aprofundando fundamentos de redes, endpoint e automação para avaliar sistemas com mais critério.",
        proof: "Cybersecurity · automação · revisão",
        icon: "shield",
      },
    ],
  },
  contact: {
    eyebrow: "Vamos conversar",
    title: "Tem um problema para resolver? Vamos conversar.",
    description:
      "Estou aberto a oportunidades, projetos web e colaborações técnicas em que clareza, curiosidade e responsabilidade façam diferença.",
    primaryCta: "Falar pelo LinkedIn",
    secondaryCta: "Enviar um e-mail",
    direct: "Canais diretos",
  },
  footer: {
    availability: "Disponível para conexões profissionais",
    rights: "© 2026 Charlles Augusto",
    built: "Feito com Next.js e atenção aos detalhes.",
  },
  projects: {
    astrolink: {
      summary: "Infraestrutura e software para vender e gerenciar acesso Wi-Fi em redes locais com Starlink.",
      problem: "Como levar uma operação de conectividade de baixo custo a comunidades e áreas remotas.",
      decision: "Separar backend em Go, portal cativo em SvelteKit e integrações de pagamento, vouchers e OpenWrt.",
      next: "Validar a operação em hardware real e ampliar a documentação de implantação.",
      category: "Infraestrutura",
      reason: "Conectividade em áreas remotas",
    },
    "laudos-proxxima": {
      summary: "Sistema web corporativo para padronizar, gerenciar e agilizar laudos técnicos de manutenção.",
      problem: "Transformar anotações de campo em laudos consistentes sem perder velocidade na operação.",
      decision: "Combinar dashboard, autenticação, geração assistida, histórico e exportação em um fluxo único.",
      next: "Aprofundar métricas de uso e continuar refinando o fluxo de revisão e compartilhamento.",
      category: "Automação",
      reason: "Operação interna com menos fricção",
    },
    "3035-teach": {
      summary: "Portfólio fullstack que organiza uma formação prática em Java, Spring Boot, React e TypeScript.",
      problem: "Registrar uma evolução técnica extensa de forma consultável, prática e reutilizável.",
      decision: "Organizar módulos, exercícios, documentação e exemplos em torno de fundamentos fullstack.",
      next: "Concluir os módulos avançados e transformar a documentação em uma referência ainda mais navegável.",
      category: "Base técnica",
      reason: "Formação prática em fullstack",
    },
  },
};

const english: PortfolioDictionary = {
  ...portuguese,
  meta: {
    title: "Charlles Augusto — Web developer and automation",
    description:
      "Portfolio of Charlles Augusto, a web developer turning real problems into clear software, useful automation and dependable experiences.",
    keywords: ["web developer", "Next.js", "TypeScript", "automation", "cybersecurity", "Brazil"],
    ogAlt: "Charlles Augusto — web development, automation and applied security",
  },
  nav: { work: "Work", about: "About", now: "Now", contact: "Contact", menu: "Open menu", theme: "Toggle theme" },
  hero: {
    ...portuguese.hero,
    eyebrow: "Web development · automation · applied security",
    headline: "Dream big. I’ll build the way.",
    description:
      "I’m Charlles Augusto, a web developer based in Brazil. I build interfaces, APIs and automations with a focus on clarity, maintainability and usefulness — guided by security fundamentals.",
    primaryCta: "See my work",
    secondaryCta: "Connect on LinkedIn",
    scrollLabel: "Scroll to explore",
    tagline: "web, APIs and operational automation",
    role: "Web developer and automation builder",
    status: "Available for projects and opportunities",
    facts: [
      { label: "Based in", value: "Campina Grande, Brazil" },
      { label: "Focus", value: "Web, APIs and automation" },
      { label: "Approach", value: "Public and documented" },
    ],
  },
  about: {
    ...portuguese.about,
    eyebrow: "About my work",
    title: "Technology should remove friction, not add complexity.",
    body:
      "I like to understand the problem before choosing the tool. My work combines interface development, integrations and automation with a growing foundation in networking and security. I aim for software that makes sense to the people using it and stays legible for the people evolving it.",
    link: "View my LinkedIn profile",
    values: [
      { title: "Clear interfaces", description: "Visual hierarchy, simple flows and decisions that help people complete the task.", icon: "device-laptop" },
      { title: "Useful automation", description: "Integrations and scripts that remove repetitive work and make operations more reliable.", icon: "api" },
      { title: "Reliability early", description: "Networking, authentication and security practices are part of the conversation from day one.", icon: "shield" },
    ],
  },
  work: {
    ...portuguese.work,
    eyebrow: "Public work, real context",
    title: "Projects that show how I think and build.",
    description: "A selection of public work with the problem, technical decision and next step made visible. Less generic showcase; more evidence of process.",
    panelTitle: "Work",
    panelClose: "Close",
    tabs: { product: "Web & product", visual: "Visual & interface", motion: "Motion & interaction" },
    featuredLabel: "Selected case",
    openProject: "Open project",
    problem: "Problem",
    decision: "Technical decision",
    next: "Next step",
    explorerLabel: "Explore more",
    explorerTitle: "Public repositories",
    searchLabel: "Search public repositories",
    searchPlaceholder: "Search by name, stack or summary",
    filtersLabel: "Filter repositories by category",
    filters: { all: "All", web: "Web", automation: "Automation", infra: "Infrastructure", "technical-base": "Technical base", experiment: "Experiments" },
    repository: "Repository",
    updated: "Updated",
    noResults: "No repository found",
    noResultsDescription: "Adjust your search or choose another category to keep exploring.",
  },
  expertise: {
    ...portuguese.expertise,
    eyebrow: "How I work",
    title: "A growing technical foundation applied to concrete problems.",
    description: "The stack is a means. What matters is connecting good tools to an outcome that is understandable, useful and maintainable.",
    items: [
      { title: "Web products", description: "Responsive interfaces and experiences with React, Next.js and TypeScript.", tools: ["React", "Next.js", "TypeScript"], icon: "device-laptop" },
      { title: "APIs and automation", description: "Backends, scripts and integrations that organize flows and reduce repetitive work.", tools: ["Python", "Go", "Node.js"], icon: "api" },
      { title: "Applied security", description: "Networking, endpoint and defense fundamentals used to make more responsible decisions.", tools: ["Networking", "Cisco", "Labs"], icon: "shield" },
    ],
  },
  now: {
    ...portuguese.now,
    eyebrow: "Now",
    title: "What I’m building and deepening.",
    description: "Three current focuses, maintained as signals of direction — not as an update feed.",
    items: [
      { label: "Project in focus", title: "Astrolink in progress", description: "Structuring a low-cost solution to sell and manage Wi-Fi access on local networks using Starlink, OpenWrt, PIX and vouchers.", proof: "Go · SvelteKit · OpenWrt", icon: "network", href: "https://github.com/charlles-dev/Astrolink" },
      { label: "Recent improvement", title: "Portfolio as a product", description: "Refining the narrative, performance and presentation so the portfolio communicates real work across languages.", proof: "Next.js · TypeScript · i18n", icon: "sparkles" },
      { label: "Technical practice", title: "Security in the workflow", description: "Deepening networking, endpoint and automation fundamentals to review systems with more care.", proof: "Cybersecurity · automation · review", icon: "shield" },
    ],
  },
  contact: {
    ...portuguese.contact,
    eyebrow: "Let’s talk",
    title: "Have a problem to solve? Let’s talk.",
    description: "I’m open to opportunities, web projects and technical collaborations where clarity, curiosity and responsibility matter.",
    primaryCta: "Talk on LinkedIn",
    secondaryCta: "Send an email",
    direct: "Direct channels",
  },
  footer: { availability: "Available for professional connections", rights: "© 2026 Charlles Augusto", built: "Built with Next.js and attention to detail." },
  projects: {
    astrolink: { summary: "Infrastructure and software to sell and manage Wi-Fi access on local networks with Starlink.", problem: "How to bring a low-cost connectivity operation to remote areas and communities.", decision: "Separate a Go backend, a SvelteKit captive portal and integrations for payments, vouchers and OpenWrt.", next: "Validate the operation on real hardware and expand deployment documentation.", category: "Infrastructure", reason: "Connectivity in remote areas" },
    "laudos-proxxima": { summary: "A corporate web system to standardize, manage and speed up technical maintenance reports.", problem: "Turn field notes into consistent reports without slowing down the operation.", decision: "Combine dashboard, authentication, assisted generation, history and export in one flow.", next: "Deepen usage metrics and keep refining review and sharing workflows.", category: "Automation", reason: "Less friction in internal operations" },
    "3035-teach": { summary: "A fullstack portfolio organizing practical training in Java, Spring Boot, React and TypeScript.", problem: "Document an extensive technical journey in a way that stays searchable, practical and reusable.", decision: "Organize modules, exercises, documentation and examples around fullstack fundamentals.", next: "Complete the advanced modules and make the documentation an even more navigable reference.", category: "Technical base", reason: "Practical fullstack training" },
  },
};

const spanish: PortfolioDictionary = {
  ...english,
  meta: {
    title: "Charlles Augusto — Desarrollador web y automatización",
    description: "Portafolio de Charlles Augusto, desarrollador web que convierte problemas reales en software claro, automatizaciones útiles y experiencias confiables.",
    keywords: ["desarrollador web", "Next.js", "TypeScript", "automatización", "ciberseguridad", "Brasil"],
    ogAlt: "Charlles Augusto — desarrollo web, automatización y seguridad aplicada",
  },
  nav: { work: "Trabajos", about: "Sobre mí", now: "Ahora", contact: "Contacto", menu: "Abrir menú", theme: "Cambiar tema" },
  hero: {
    ...english.hero,
    eyebrow: "Desarrollo web · automatización · seguridad aplicada",
    headline: "Piensa en grande. Yo construyo el camino.",
    description: "Soy Charlles Augusto, desarrollador web en Brasil. Creo interfaces, APIs y automatizaciones con foco en claridad, mantenimiento y utilidad, guiado por fundamentos de seguridad.",
    primaryCta: "Conoce mi trabajo",
    secondaryCta: "Conectar en LinkedIn",
    scrollLabel: "Desplázate para explorar",
    tagline: "web, APIs y automatización operativa",
    role: "Desarrollador web y automatización",
    status: "Disponible para proyectos y oportunidades",
    facts: [{ label: "Ubicación", value: "Campina Grande, Brasil" }, { label: "Enfoque", value: "Web, APIs y automatización" }, { label: "Método", value: "Público y documentado" }],
  },
  about: {
    ...english.about,
    eyebrow: "Sobre mi trabajo",
    title: "La tecnología debe reducir la fricción, no añadir complejidad.",
    body: "Me gusta entender el problema antes de elegir la herramienta. Mi trabajo combina desarrollo de interfaces, integraciones y automatización con una base creciente en redes y seguridad. Busco software que tenga sentido para quien lo usa y siga siendo legible para quien lo evoluciona.",
    link: "Ver mi perfil en LinkedIn",
    values: [
      { title: "Interfaces claras", description: "Jerarquía visual, flujos simples y decisiones que ayudan a completar la tarea.", icon: "device-laptop" },
      { title: "Automatización útil", description: "Integraciones y scripts que reducen el trabajo repetitivo y hacen la operación más confiable.", icon: "api" },
      { title: "Confiabilidad desde el inicio", description: "Redes, autenticación y prácticas de seguridad forman parte de la conversación desde el principio.", icon: "shield" },
    ],
  },
  work: {
    ...english.work,
    eyebrow: "Trabajo público, contexto real",
    title: "Proyectos que muestran cómo pienso y construyo.",
    description: "Una selección de trabajos públicos con problema, decisión técnica y próximo paso visibles. Menos vitrina genérica; más evidencia del proceso.",
    panelTitle: "Trabajos",
    panelClose: "Cerrar",
    tabs: { product: "Web y producto", visual: "Visual e interfaz", motion: "Motion e interacción" },
    featuredLabel: "Caso seleccionado",
    openProject: "Abrir proyecto",
    problem: "Problema",
    decision: "Decisión técnica",
    next: "Próximo paso",
    explorerLabel: "Explorar más",
    explorerTitle: "Repositorios públicos",
    searchLabel: "Buscar repositorios públicos",
    searchPlaceholder: "Buscar por nombre, stack o resumen",
    filtersLabel: "Filtrar repositorios por categoría",
    filters: { all: "Todos", web: "Web", automation: "Automatización", infra: "Infraestructura", "technical-base": "Base técnica", experiment: "Experimentos" },
    repository: "Repositorio",
    updated: "Actualizado el",
    noResults: "No se encontró ningún repositorio",
    noResultsDescription: "Ajusta la búsqueda o elige otra categoría para seguir explorando.",
  },
  expertise: {
    ...english.expertise,
    eyebrow: "Cómo trabajo",
    title: "Una base técnica en crecimiento aplicada a problemas concretos.",
    description: "La stack es un medio. Lo importante es conectar buenas herramientas con un resultado comprensible, útil y mantenible.",
    items: [
      { title: "Productos web", description: "Interfaces y experiencias responsivas con React, Next.js y TypeScript.", tools: ["React", "Next.js", "TypeScript"], icon: "device-laptop" },
      { title: "APIs y automatización", description: "Backends, scripts e integraciones para organizar flujos y reducir trabajo repetitivo.", tools: ["Python", "Go", "Node.js"], icon: "api" },
      { title: "Seguridad aplicada", description: "Fundamentos de redes, endpoint y defensa para tomar decisiones más responsables.", tools: ["Networking", "Cisco", "Labs"], icon: "shield" },
    ],
  },
  now: {
    ...english.now,
    eyebrow: "Ahora",
    title: "Lo que estoy construyendo y profundizando.",
    description: "Tres focos actuales, mantenidos como señales de dirección y no como un feed de actualizaciones.",
    items: [
      { label: "Proyecto en foco", title: "Astrolink en evolución", description: "Estructurando una solución de bajo costo para vender y gestionar acceso Wi-Fi en redes locales con Starlink, OpenWrt, PIX y vouchers.", proof: "Go · SvelteKit · OpenWrt", icon: "network", href: "https://github.com/charlles-dev/Astrolink" },
      { label: "Mejora reciente", title: "Portafolio como producto", description: "Refinando narrativa, rendimiento y presentación para comunicar trabajo real en diferentes idiomas.", proof: "Next.js · TypeScript · i18n", icon: "sparkles" },
      { label: "Práctica técnica", title: "Seguridad en el flujo", description: "Profundizando redes, endpoint y automatización para revisar sistemas con más criterio.", proof: "Cybersecurity · automatización · revisión", icon: "shield" },
    ],
  },
  contact: {
    ...english.contact,
    eyebrow: "Hablemos",
    title: "¿Tienes un problema que resolver? Hablemos.",
    description: "Estoy abierto a oportunidades, proyectos web y colaboraciones técnicas donde importen la claridad, la curiosidad y la responsabilidad.",
    primaryCta: "Hablar por LinkedIn",
    secondaryCta: "Enviar un email",
    direct: "Canales directos",
  },
  footer: { availability: "Disponible para conexiones profesionales", rights: "© 2026 Charlles Augusto", built: "Hecho con Next.js y atención al detalle." },
  projects: {
    astrolink: { summary: "Infraestructura y software para vender y gestionar acceso Wi-Fi en redes locales con Starlink.", problem: "Cómo llevar una operación de conectividad de bajo costo a comunidades y áreas remotas.", decision: "Separar un backend en Go, un portal cautivo en SvelteKit e integraciones para pagos, vouchers y OpenWrt.", next: "Validar la operación en hardware real y ampliar la documentación de despliegue.", category: "Infraestructura", reason: "Conectividad en áreas remotas" },
    "laudos-proxxima": { summary: "Sistema web corporativo para estandarizar, gestionar y agilizar informes técnicos de mantenimiento.", problem: "Convertir notas de campo en informes consistentes sin perder velocidad operativa.", decision: "Combinar dashboard, autenticación, generación asistida, historial y exportación en un solo flujo.", next: "Profundizar las métricas de uso y seguir refinando la revisión y el uso compartido.", category: "Automatización", reason: "Menos fricción en la operación interna" },
    "3035-teach": { summary: "Portafolio fullstack que organiza una formación práctica en Java, Spring Boot, React y TypeScript.", problem: "Documentar una evolución técnica extensa de forma consultable, práctica y reutilizable.", decision: "Organizar módulos, ejercicios, documentación y ejemplos alrededor de fundamentos fullstack.", next: "Completar los módulos avanzados y hacer de la documentación una referencia más navegable.", category: "Base técnica", reason: "Formación práctica fullstack" },
  },
};

export const dictionaries: Record<Locale, PortfolioDictionary> = { "pt-BR": portuguese, en: english, es: spanish };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): PortfolioDictionary {
  return dictionaries[locale];
}

export function localePath(locale: Locale, hash = "") {
  return locale === "pt-BR" ? `/${hash}` : `/${locale}${hash}`;
}

export function projectKey(value: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (normalized.includes("astrolink")) return "astrolink";
  if (normalized.includes("laudos") || normalized.includes("proxxima")) return "laudos-proxxima";
  if (normalized.includes("3035") || normalized.includes("teach")) return "3035-teach";
  return null;
}
