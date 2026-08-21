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
    title: "Charlles Augusto — Desenvolvedor de software",
    description:
      "Portfólio de Charlles Augusto, desenvolvedor de software que cria interfaces, sistemas e automações com clareza e intenção.",
    keywords: ["desenvolvedor web", "Next.js", "TypeScript", "automação", "cibersegurança", "Campina Grande"],
    ogAlt: "Charlles Augusto — software, interfaces e sistemas",
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
    eyebrow: "Software · interfaces · sistemas",
    headline: "Construo experiências digitais que fazem sentido.",
    description:
      "Sou Charlles Augusto, desenvolvedor de software de Campina Grande. Trabalho entre interface, lógica e automação para transformar ideias em experiências claras, funcionais e bem acabadas.",
    primaryCta: "Conheça meu trabalho",
    secondaryCta: "Conectar no LinkedIn",
    scrollLabel: "Role para explorar",
    tagline: "interface / código / automação",
    role: "Desenvolvedor de software",
    status: "Construindo com intenção",
    facts: [
      { label: "Base", value: "Campina Grande, Brasil" },
      { label: "Foco", value: "Interfaces, sistemas e automação" },
      { label: "Trabalho", value: "Público e documentado" },
    ],
  },
  about: {
    eyebrow: "Sobre o meu trabalho",
    title: "Eu gosto de transformar complexidade em clareza.",
    body:
      "Meu trabalho nasce da curiosidade de entender como as coisas funcionam — e da vontade de torná-las melhores. Misturo front-end, back-end e automação para criar experiências claras, rápidas e fáceis de continuar. Gosto do detalhe visual, mas também do código que sustenta cada decisão.",
    link: "Ver perfil no LinkedIn",
    values: [
      {
        title: "Interfaces que orientam",
        description: "Detalhe visual, ritmo e hierarquia para transformar interação em entendimento.",
        icon: "device-laptop",
      },
      {
        title: "Código que conecta",
        description: "APIs, dados e automações que fazem diferentes partes de um sistema trabalharem juntas.",
        icon: "api",
      },
      {
        title: "Base que sustenta",
        description: "Performance, acessibilidade e segurança presentes desde as primeiras decisões.",
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
    eyebrow: "Áreas de atuação",
    title: "Uma mistura de detalhe visual, código sólido e curiosidade técnica.",
    description:
      "Gosto de atravessar as camadas do produto: pensar a interface, construir a lógica e automatizar o que precisa acontecer nos bastidores.",
    items: [
      {
        title: "Interfaces e experiências", description: "Interfaces responsivas, acessíveis e com personalidade, do primeiro rascunho ao detalhe final.",
        tools: ["React", "Next.js", "TypeScript"],
        icon: "device-laptop",
      },
      {
        title: "Sistemas e integrações", description: "APIs, backends e automações que transformam processos dispersos em fluxos mais claros.",
        tools: ["Python", "Go", "Node.js"],
        icon: "api",
      },
      {
        title: "Infraestrutura confiável", description: "Performance, observabilidade e segurança pensadas como parte do produto, não como remendo.",
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
    title: "Se existe algo interessante para construir, vamos conversar.",
    description:
      "Gosto de conhecer pessoas, trocar ideias e colaborar em projetos que valorizem clareza, curiosidade e trabalho bem feito.",
    primaryCta: "Falar pelo LinkedIn",
    secondaryCta: "Enviar um e-mail",
    direct: "Canais diretos",
  },
  footer: {
    availability: "Em contato com a comunidade",
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
    title: "Charlles Augusto — Software developer",
    description:
      "Portfolio of Charlles Augusto, a software developer creating clear interfaces, systems and automation with intention.",
    keywords: ["web developer", "Next.js", "TypeScript", "automation", "cybersecurity", "Brazil"],
    ogAlt: "Charlles Augusto — software, interfaces and systems",
  },
  nav: { work: "Work", about: "About", now: "Now", contact: "Contact", menu: "Open menu", theme: "Toggle theme" },
  hero: {
    ...portuguese.hero,
    eyebrow: "Software · interfaces · systems",
    headline: "I build digital experiences that make sense.",
    description:
      "I’m Charlles Augusto, a software developer based in Campina Grande, Brazil. I work across interfaces, logic and automation to turn ideas into clear, useful and well-crafted experiences.",
    primaryCta: "See my work",
    secondaryCta: "Connect on LinkedIn",
    scrollLabel: "Scroll to explore",
    tagline: "interface / code / automation",
    role: "Software developer",
    status: "Building with intention",
    facts: [
      { label: "Based in", value: "Campina Grande, Brazil" },
      { label: "Focus", value: "Interfaces, systems & automation" },
      { label: "Approach", value: "Public and documented" },
    ],
  },
  about: {
    ...portuguese.about,
    eyebrow: "About my work",
    title: "I like turning complexity into clarity.",
    body:
      "My work starts with curiosity about how things work — and the desire to make them better. I move between front-end, back-end and automation to create experiences that feel clear, fast and easy to evolve. I care about visual detail, but also about the code behind every decision.",
    link: "View my LinkedIn profile",
    values: [
      { title: "Interfaces that guide", description: "Visual detail, rhythm and hierarchy that turn interaction into understanding.", icon: "device-laptop" },
      { title: "Connected code", description: "APIs, data and automation that help different parts of a system work together.", icon: "api" },
      { title: "A solid foundation", description: "Performance, accessibility and security considered from the first decision.", icon: "shield" },
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
    eyebrow: "Areas of focus",
    title: "A mix of visual detail, solid code and technical curiosity.",
    description: "I like moving across product layers: shaping the interface, building the logic and automating what needs to happen behind the scenes.",
    items: [
      { title: "Interfaces and experiences", description: "Responsive, accessible interfaces with personality, from the first sketch to the final detail.", tools: ["React", "Next.js", "TypeScript"], icon: "device-laptop" },
      { title: "Systems and integrations", description: "APIs, backends and automation that turn scattered processes into clearer flows.", tools: ["Python", "Go", "Node.js"], icon: "api" },
      { title: "A dependable foundation", description: "Performance, observability and security treated as part of the product, not a patch.", tools: ["Networking", "Cisco", "Labs"], icon: "shield" },
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
    title: "If there is something interesting to build, let’s talk.",
    description: "I like meeting people, exchanging ideas and collaborating on work that values clarity, curiosity and care.",
    primaryCta: "Talk on LinkedIn",
    secondaryCta: "Send an email",
    direct: "Direct channels",
  },
  footer: { availability: "In touch with the community", rights: "© 2026 Charlles Augusto", built: "Built with Next.js and attention to detail." },
  projects: {
    astrolink: { summary: "Infrastructure and software to sell and manage Wi-Fi access on local networks with Starlink.", problem: "How to bring a low-cost connectivity operation to remote areas and communities.", decision: "Separate a Go backend, a SvelteKit captive portal and integrations for payments, vouchers and OpenWrt.", next: "Validate the operation on real hardware and expand deployment documentation.", category: "Infrastructure", reason: "Connectivity in remote areas" },
    "laudos-proxxima": { summary: "A corporate web system to standardize, manage and speed up technical maintenance reports.", problem: "Turn field notes into consistent reports without slowing down the operation.", decision: "Combine dashboard, authentication, assisted generation, history and export in one flow.", next: "Deepen usage metrics and keep refining review and sharing workflows.", category: "Automation", reason: "Less friction in internal operations" },
    "3035-teach": { summary: "A fullstack portfolio organizing practical training in Java, Spring Boot, React and TypeScript.", problem: "Document an extensive technical journey in a way that stays searchable, practical and reusable.", decision: "Organize modules, exercises, documentation and examples around fullstack fundamentals.", next: "Complete the advanced modules and make the documentation an even more navigable reference.", category: "Technical base", reason: "Practical fullstack training" },
  },
};

const spanish: PortfolioDictionary = {
  ...english,
  meta: {
    title: "Charlles Augusto — Desarrollador de software",
    description: "Portafolio de Charlles Augusto, desarrollador de software que crea interfaces, sistemas y automatizaciones con claridad e intención.",
    keywords: ["desarrollador web", "Next.js", "TypeScript", "automatización", "ciberseguridad", "Brasil"],
    ogAlt: "Charlles Augusto — software, interfaces y sistemas",
  },
  nav: { work: "Trabajos", about: "Sobre mí", now: "Ahora", contact: "Contacto", menu: "Abrir menú", theme: "Cambiar tema" },
  hero: {
    ...english.hero,
    eyebrow: "Software · interfaces · sistemas",
    headline: "Construyo experiencias digitales que tienen sentido.",
    description: "Soy Charlles Augusto, desarrollador de software en Campina Grande, Brasil. Trabajo entre interfaz, lógica y automatización para convertir ideas en experiencias claras, útiles y bien terminadas.",
    primaryCta: "Conoce mi trabajo",
    secondaryCta: "Conectar en LinkedIn",
    scrollLabel: "Desplázate para explorar",
    tagline: "interfaz / código / automatización",
    role: "Desarrollador de software",
    status: "Construyendo con intención",
    facts: [{ label: "Ubicación", value: "Campina Grande, Brasil" }, { label: "Enfoque", value: "Interfaces, sistemas y automatización" }, { label: "Método", value: "Público y documentado" }],
  },
  about: {
    ...english.about,
    eyebrow: "Sobre mi trabajo",
    title: "Me gusta transformar la complejidad en claridad.",
    body: "Mi trabajo nace de la curiosidad por entender cómo funcionan las cosas y del deseo de mejorarlas. Me muevo entre front-end, back-end y automatización para crear experiencias claras, rápidas y fáciles de evolucionar. Me importa el detalle visual, pero también el código que sostiene cada decisión.",
    link: "Ver mi perfil en LinkedIn",
    values: [
      { title: "Interfaces que guían", description: "Detalle visual, ritmo y jerarquía para convertir la interacción en comprensión.", icon: "device-laptop" },
      { title: "Código conectado", description: "APIs, datos y automatización para que las distintas partes de un sistema trabajen juntas.", icon: "api" },
      { title: "Una base sólida", description: "Rendimiento, accesibilidad y seguridad considerados desde la primera decisión.", icon: "shield" },
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
    eyebrow: "Áreas de enfoque",
    title: "Una mezcla de detalle visual, código sólido y curiosidad técnica.",
    description: "Me gusta recorrer las capas del producto: dar forma a la interfaz, construir la lógica y automatizar lo que debe ocurrir detrás de escena.",
    items: [
      { title: "Interfaces y experiencias", description: "Interfaces responsivas, accesibles y con personalidad, desde el primer boceto hasta el detalle final.", tools: ["React", "Next.js", "TypeScript"], icon: "device-laptop" },
      { title: "Sistemas e integraciones", description: "APIs, backends y automatización para convertir procesos dispersos en flujos más claros.", tools: ["Python", "Go", "Node.js"], icon: "api" },
      { title: "Una base confiable", description: "Rendimiento, observabilidad y seguridad tratados como parte del producto, no como un parche.", tools: ["Networking", "Cisco", "Labs"], icon: "shield" },
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
    title: "Si hay algo interesante que construir, hablemos.",
    description: "Me gusta conocer personas, intercambiar ideas y colaborar en trabajos que valoren la claridad, la curiosidad y el cuidado.",
    primaryCta: "Hablar por LinkedIn",
    secondaryCta: "Enviar un email",
    direct: "Canales directos",
  },
  footer: { availability: "En contacto con la comunidad", rights: "© 2026 Charlles Augusto", built: "Hecho con Next.js y atención al detalle." },
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
