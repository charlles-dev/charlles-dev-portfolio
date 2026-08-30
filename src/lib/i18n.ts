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
  metric: string;
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
    main: string;
    language: string;
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
    mediaAlt: string;
    mediaCaption: string;
    socialLabel: string;
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
    mediaLabel: string;
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
    publicOnly: string;
    loadingProjects: string;
    liveSource: string;
    fallbackSource: string;
    copyWorkLink: string;
    workLinkCopied: string;
    copyCaseLink: string;
    caseLinkCopied: string;
    quickLabel: string;
  };
  expertise: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string; tools: string[]; icon: IconName }>;
  };
  journey: {
    eyebrow: string;
    title: string;
    description: string;
    sections: Array<{
      id: "education" | "certifications" | "stack";
      eyebrow: string;
      title: string;
      description: string;
      mediaLabel: string;
      mediaCaption: string;
      items: Array<{ label: string; title: string; description: string; tags: string[] }>;
    }>;
  };
  now: {
    eyebrow: string;
    title: string;
    description: string;
    routeLabel: string;
    breadcrumbLabel: string;
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    openProject: string;
    updatedLabel: string;
    updatedDate: string;
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
    specialty: string;
    availability: string;
    cardTitle: string;
    cardBody: string;
    callCta: string;
    callMeta: string;
    emailSubject: string;
    emailBody: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    routeLabel: string;
    routeStatus: string;
    avatarAlt: string;
    signTitle: string;
    work: string;
    about: string;
    contact: string;
    homeCta: string;
    processCta: string;
    engineeringCta: string;
  };
  footer: {
    availability: string;
    rights: string;
    built: string;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    routeLabel: string;
    breadcrumbLabel: string;
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    steps: Array<{ title: string; description: string; icon: IconName }>;
  };
  engineering: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
    backHome: string;
    openWork: string;
    breadcrumbLabel: string;
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    sections: Array<{
      title: string;
      description: string;
      items: Array<{ title: string; body: string; tags: string[] }>;
    }>;
    quality: {
      eyebrow: string;
      title: string;
      description: string;
      steps: string[];
    };
    note: string;
  };
  projects: Record<string, LocalizedProjectCopy>;
};

const portuguese: PortfolioDictionary = {
  meta: {
    title: "Charlles Augusto | Engenheiro de Software Full Stack",
    description:
      "Projetos públicos de Charlles Augusto em Next.js, TypeScript, Go, automação e sistemas conectados, com decisões técnicas e código no GitHub.",
    keywords: ["Charlles Augusto", "engenheiro de software full stack", "desenvolvedor Next.js", "desenvolvedor TypeScript", "Go", "React", "automação de processos", "GitHub", "Campina Grande"],
    ogAlt: "Personagem 3D de Charlles Augusto na cena escura que abre o portfólio",
  },
  nav: {
    work: "Trabalhos",
    about: "Sobre",
    now: "Agora",
    contact: "Contato",
    menu: "Abrir menu",
    main: "Navegação principal",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Software · interfaces · sistemas",
    headline: "Engenharia por baixo. Experiência por inteiro.",
    description:
      "No charlles.dev, Next.js conversa com GitHub, o vídeo responde ao scroll e cada projeto expõe problema, decisão e código. Sou Charlles Augusto, engenheiro de software full stack em Campina Grande.",
    primaryCta: "Ver decisões no código",
    secondaryCta: "Conectar no LinkedIn",
    scrollLabel: "Role para explorar",
    tagline: "interface / código / automação",
    role: "Engenheiro de software full stack",
    status: "Construindo com intenção",
    facts: [
      { label: "Base", value: "Campina Grande, Brasil" },
      { label: "Foco", value: "Interfaces, sistemas e automação" },
      { label: "Trabalho", value: "Público e documentado" },
    ],
  },
  about: {
    eyebrow: "Sobre o meu trabalho",
    title: "Eu começo pelo que precisa funcionar. O visual vem junto.",
    body:
      "Transito entre interface, backend e automação. Aqui isso aparece em dados do GitHub, conteúdo em três idiomas, estados acessíveis e mídia que não bloqueia a leitura. O detalhe visual não encobre o código; ele explica o que o sistema está fazendo.",
    link: "Ver perfil no LinkedIn",
    mediaAlt: "Charlles seguindo com uma lanterna um cabo interrompido no escuro",
    mediaCaption: "Primeiro descubro onde quebrou",
    socialLabel: "Links sociais",
    values: [
      {
        title: "A interface dá pistas",
        description: "Hierarquia, estados e movimento mostram o que aconteceu e para onde seguir.",
        icon: "device-laptop",
      },
      {
        title: "As pontas precisam conversar",
        description: "APIs, dados e automações só entram quando reduzem uma passagem manual ou uma dúvida do usuário.",
        icon: "api",
      },
      {
        title: "O caso ruim também é projeto",
        description: "Carregamento, falha, teclado, conexão lenta e movimento reduzido entram antes da publicação.",
        icon: "shield",
      },
    ],
  },
  work: {
    eyebrow: "Trabalho público, contexto real",
    title: "Código aberto. Decisões à vista.",
    description:
      "Aqui nenhum projeto aparece só pela stack. Cada recorte mostra o problema, a decisão técnica, o próximo passo e o repositório onde tudo pode ser conferido.",
    panelTitle: "Trabalhos",
    panelClose: "Fechar",
    tabs: { product: "UI/UX & Front-end", visual: "Visual design", motion: "Motion" },
    featuredLabel: "Case selecionado",
    openProject: "Abrir projeto",
    mediaLabel: "Prévia visual",
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
    publicOnly: "Somente repositórios públicos",
    loadingProjects: "Buscando repositórios públicos…",
    liveSource: "Sincronizado com o GitHub",
    fallbackSource: "Cópia local segura",
    copyWorkLink: "Copiar link dos trabalhos",
    workLinkCopied: "Link copiado",
    copyCaseLink: "Copiar link do case",
    caseLinkCopied: "Link do case copiado",
    quickLabel: "Resumo técnico",
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
  journey: {
    eyebrow: "Fora do GitHub",
    title: "O código mostra o que construí. Aqui entra o que fui estudar.",
    description: "Cibersegurança no Hackers do Bem, fundamentos de IA na IBM SkillsBuild e visão computacional na Geração Caldeira. Certificados e ferramentas entram como contexto, não como substitutos da prática.",
    sections: [
      {
        id: "education",
        eyebrow: "Educação",
        title: "Estudar, testar, quebrar, entender. A ordem varia.",
        description: "Uso essas trilhas para fechar lacunas que aparecem nos projetos: redes e risco, fundamentos de IA e análise de imagens.",
        mediaLabel: "Charlles estudando um diagrama de sistemas ao lado de livros",
        mediaCaption: "aprendizado em andamento",
        items: [
          { label: "Segurança", title: "Hackers do Bem", description: "Formação voltada a fundamentos de cibersegurança e à leitura mais crítica de sistemas, redes e riscos.", tags: ["Cibersegurança", "Redes", "Fundamentos"] },
          { label: "Inteligência artificial", title: "IBM SkillsBuild", description: "Estudo dos fundamentos de IA, seus usos e os cuidados necessários para aplicar a tecnologia com contexto.", tags: ["IA", "Dados", "Aplicação"] },
          { label: "Visão computacional", title: "Geração Caldeira", description: "Trilha prática sobre imagens, modelos e formas de transformar percepção computacional em solução.", tags: ["Computer Vision", "Python", "Modelos"] },
        ],
      },
      {
        id: "certifications",
        eyebrow: "Certificações",
        title: "Certificados ajudam. Saber onde aplicar ajuda mais.",
        description: "Eles registram partes da jornada. O valor aparece quando o conteúdo melhora uma decisão técnica, uma revisão ou a próxima pergunta.",
        mediaLabel: "Charlles fixando um selo verde em um painel de credenciais",
        mediaCaption: "conhecimento validado",
        items: [
          { label: "Geração Caldeira", title: "Visão computacional", description: "Fundamentos e prática de soluções baseadas em análise de imagens.", tags: ["Computer Vision", "IA"] },
          { label: "IBM SkillsBuild", title: "AI Fundamentals", description: "Conceitos essenciais, aplicações e implicações da inteligência artificial.", tags: ["AI", "Fundamentos"] },
          { label: "Cisco", title: "Endpoint Security", description: "Proteção de dispositivos, vetores de ameaça e princípios de defesa.", tags: ["Endpoint", "Segurança"] },
          { label: "RNP / Softex", title: "Hackers do Bem", description: "Formação introdutória e nivelamento em cibersegurança.", tags: ["Cybersecurity", "Redes"] },
        ],
      },
      {
        id: "stack",
        eyebrow: "Tech Stack",
        title: "Ferramentas mudam. O critério fica.",
        description: "Escolho tecnologia pelo problema, pela manutenção e por quem vai continuar o trabalho. Ainda assim, estas são as peças que mais aparecem na bancada.",
        mediaLabel: "Charlles conectando módulos de software em um sistema",
        mediaCaption: "módulos em sintonia",
        items: [
          { label: "Interface", title: "Web que explica o que está fazendo", description: "Componentes, rotas e estados construídos com hierarquia, acessibilidade e resposta rápida.", tags: ["React", "Next.js", "TypeScript"] },
          { label: "Backend", title: "Lógica que não aparece, mas sustenta", description: "APIs, serviços e automações com limites claros e espaço para crescer sem drama.", tags: ["Python", "Go", "Node.js"] },
          { label: "Infra e prática", title: "Do pacote à rede", description: "Ferramentas para investigar, integrar e operar sistemas além da camada visual.", tags: ["Networking", "Cybersecurity", "Automação"] },
        ],
      },
    ],
  },
  now: {
    eyebrow: "Agora",
    title: "O que estou desenvolvendo e aprofundando.",
    description: "Três focos atuais, mantidos como sinais de direção, não como um feed de atualizações.",
    routeLabel: "Agora em foco",
    breadcrumbLabel: "Navegação estrutural",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Agora",
    openProject: "Abrir projeto",
    updatedLabel: "Atualizado em 25 ago 2026",
    updatedDate: "2026-08-25",
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
    title: "Um bom projeto costuma começar com um problema bem explicado.",
    description:
      "Se você já sabe o que precisa construir ou só consegue apontar onde está doendo, mande o contexto. Eu leio antes de responder.",
    primaryCta: "Chamar no WhatsApp",
    secondaryCta: "Enviar um e-mail",
    direct: "Canais diretos",
    specialty: "Engenheiro de software full stack",
    availability: "Mensagem direta",
    cardTitle: "Onde o sistema está travando?",
    cardBody: "Mande o contexto pelo WhatsApp ou reserve 15 ou 30 minutos no calendário. Sem formulário e sem discurso pronto.",
    callCta: "Agendar uma call",
    callMeta: "15 ou 30 min · chamada online",
    emailSubject: "Conversa sobre um projeto",
    emailBody: "Olá, Charlles!\n\nQuero conversar sobre um projeto.\n\nContexto:\nPróximo marco:\n",
  },
  notFound: {
    eyebrow: "Rota não encontrada",
    title: "Iluminei o caminho. A página não apareceu.",
    description: "Essa rota se perdeu no escuro. Os caminhos úteis continuam logo ao lado.",
    routeLabel: "404 / rota ausente",
    routeStatus: "status: rota não localizada",
    avatarAlt: "Charlles iluminando possíveis caminhos com uma lanterna",
    signTitle: "Escolha um caminho",
    work: "Ver trabalhos",
    about: "Conhecer o perfil",
    contact: "Falar comigo",
    homeCta: "Voltar ao início",
    processCta: "Ver processo",
    engineeringCta: "Ler engenharia",
  },
  footer: {
    availability: "Em contato com a comunidade",
    rights: "© 2026 Charlles Augusto",
    built: "Feito com Next.js e atenção aos detalhes.",
  },
  process: {
    eyebrow: "Método de trabalho",
    title: "Entender primeiro. Construir com contexto.",
    description: "Um processo simples para transformar problemas práticos em software claro, testável e útil.",
    routeLabel: "Processo",
    breadcrumbLabel: "Navegação estrutural",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Processo",
    steps: [
      { title: "Entender", description: "Mapear o problema, as pessoas envolvidas e o que precisa ser verdade no final.", icon: "brain" },
      { title: "Estruturar", description: "Organizar escopo, fluxos e decisões antes de adicionar complexidade ao produto.", icon: "route" },
      { title: "Construir", description: "Implementar interfaces, lógica e automações com uma base que possa evoluir.", icon: "code" },
      { title: "Validar", description: "Revisar acessibilidade, estados de erro, documentação e qualidade antes de publicar.", icon: "solar-check" },
    ],
  },
  engineering: {
    eyebrow: "Notas de engenharia",
    title: "Como esta landing foi construída.",
    description: "Uma página editorial sobre as decisões que sustentam esta experiência: mídia progressiva, navegação com contexto, conteúdo localizado e uma rotina de qualidade antes de publicar.",
    linkLabel: "Notas de engenharia",
    backHome: "Voltar ao início",
    openWork: "Ver trabalhos",
    breadcrumbLabel: "Navegação estrutural",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Engenharia",
    sections: [
      {
        title: "Progressive enhancement no hero",
        description: "O vídeo enriquece a apresentação sem ser a única forma de entender a página.",
        items: [
          { title: "Poster primeiro", body: "A composição começa com um poster estável e previsível. WebM é usado quando disponível, com MP4 como fallback explícito para navegadores que não carregarem o codec principal.", tags: ["poster", "WebM", "MP4"] },
          { title: "Movimento sob controle", body: "O scrub acompanha a posição do scroll, os loops só entram nos estados necessários e a preferência de movimento reduzido interrompe a mídia em runtime.", tags: ["scroll", "reduced motion", "visibilitychange"] },
        ],
      },
      {
        title: "Interface que não esconde o estado",
        description: "Trabalhos, Sobre e Contato funcionam como painéis compartilháveis, navegáveis e fecháveis.",
        items: [
          { title: "Deep links previsíveis", body: "Cada painel tem um hash próprio. Isso mantém o contexto no histórico e permite compartilhar diretamente a área de Trabalhos sem criar uma tela paralela.", tags: ["#work", "#about", "#contact"] },
          { title: "Foco e contexto", body: "Ao abrir um painel, o foco entra no conteúdo, o Tab permanece dentro do dialog, Escape fecha e o fundo fica inerte enquanto a decisão está em andamento.", tags: ["focus trap", "inert", "aria-modal"] },
        ],
      },
      {
        title: "Conteúdo localizado e verificável",
        description: "A experiência mantém a mesma estrutura em três idiomas sem transformar tradução em cópia automática.",
        items: [
          { title: "Um contrato, três vozes", body: "Os dicionários de PT-BR, EN e ES compartilham a mesma forma tipada. Assim, uma nova label não entra em produção em um idioma e desaparece nos outros.", tags: ["PT-BR", "EN", "ES"] },
          { title: "Evidência antes de adjetivo", body: "Cases e notas usam links públicos e decisões que podem ser conferidas no código. Métricas não são inventadas para preencher espaço editorial.", tags: ["public work", "evidence", "honest copy"] },
        ],
      },
    ],
    quality: {
      eyebrow: "Quality gate",
      title: "Publicar só depois de checar o essencial.",
      description: "Cada mudança passa pela mesma sequência local antes de chegar ao repositório: tipos, regras, testes e build de produção.",
      steps: ["Type-check", "Lint", "Vitest", "Next build"],
    },
    note: "Estas notas descrevem decisões já presentes no código. Elas não são métricas de performance nem uma promessa de disponibilidade.",
  },
  projects: {
    "charlles-dev-portfolio": {
      summary: "Portfólio em Next.js com dados públicos do GitHub, três idiomas e vídeo controlado pelo scroll.",
      problem: "Mostrar trabalho full stack sem reduzir cada projeto a uma imagem bonita e uma lista de tecnologias.",
      decision: "Buscar dados públicos do GitHub no servidor, localizar a narrativa em três idiomas e sincronizar vídeo, conteúdo e scroll sem bloquear a leitura.",
      next: "Publicar métricas reais de desempenho e documentar a evolução visual como um estudo de caso aberto.",
      category: "Web",
      metric: "Next.js · GitHub",
      reason: "O próprio portfólio como prova técnica",
    },
    trakr: {
      summary: "Maleta inteligente que identifica ferramentas por RFID/NFC e conecta um ESP32 a uma interface em Kotlin.",
      problem: "Perceber uma ferramenta ausente antes de a equipe fechar a maleta e deixar o local de trabalho.",
      decision: "Distribuir a leitura dos identificadores no ESP32 e concentrar inventário, estados e alertas na aplicação Kotlin.",
      next: "Validar leituras simultâneas, falso-positivos e uso offline com a maleta física montada.",
      category: "Sistema conectado",
      metric: "Kotlin · ESP32",
      reason: "Software conversando com o mundo físico",
    },
    astrolink: {
      summary: "Infraestrutura e software para vender e gerenciar acesso Wi-Fi em redes locais com Starlink.",
      problem: "Como levar uma operação de conectividade de baixo custo a comunidades e áreas remotas.",
      decision: "Separar backend em Go, portal cativo em SvelteKit e integrações de pagamento, vouchers e OpenWrt.",
      next: "Validar a operação em hardware real e ampliar a documentação de implantação.",
      category: "Infraestrutura",
      metric: "Go · conectividade",
      reason: "Conectividade em áreas remotas",
    },
    "3035-teach": {
      summary: "Portfólio fullstack que organiza uma formação prática em Java, Spring Boot, React e TypeScript.",
      problem: "Registrar uma evolução técnica extensa de forma consultável, prática e reutilizável.",
      decision: "Organizar módulos, exercícios, documentação e exemplos em torno de fundamentos fullstack.",
      next: "Concluir os módulos avançados e transformar a documentação em uma referência ainda mais navegável.",
      category: "Base técnica",
      metric: "Java · trilha",
      reason: "Formação prática em fullstack",
    },
  },
};

const english: PortfolioDictionary = {
  ...portuguese,
  meta: {
    title: "Charlles Augusto | Full-Stack Software Engineer",
    description:
      "Public projects by Charlles Augusto in Next.js, TypeScript, Go, automation and connected systems, with technical decisions and code on GitHub.",
    keywords: ["Charlles Augusto", "full-stack software engineer", "Next.js developer", "TypeScript developer", "Go", "React", "process automation", "GitHub", "Brazil"],
    ogAlt: "Charlles Augusto's 3D character in the dark scene that opens the portfolio",
  },
  nav: { work: "Work", about: "About", now: "Now", contact: "Contact", menu: "Open menu", main: "Main navigation", language: "Language" },
  hero: {
    ...portuguese.hero,
    eyebrow: "Software · interfaces · systems",
    headline: "Engineering underneath. A complete experience on top.",
    description:
      "On charlles.dev, Next.js talks to GitHub, video responds to scroll and every project exposes the problem, decision and code. I’m Charlles Augusto, a full-stack software engineer in Campina Grande, Brazil.",
    primaryCta: "See the decisions in code",
    secondaryCta: "Connect on LinkedIn",
    scrollLabel: "Scroll to explore",
    tagline: "interface / code / automation",
    role: "Full-stack software engineer",
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
    title: "I start with what must work. The visual layer comes with it.",
    body:
      "I move between interfaces, backend and automation. Here that means GitHub data, three languages, accessible states and media that never blocks the reading. Visual detail does not hide the code; it explains what the system is doing.",
    link: "View my LinkedIn profile",
    mediaAlt: "Charlles following a broken cable through the dark with a flashlight",
    mediaCaption: "First, find where it broke",
    socialLabel: "Social links",
    values: [
      { title: "The interface leaves clues", description: "Hierarchy, states and motion show what happened and where to go next.", icon: "device-laptop" },
      { title: "The ends must talk", description: "APIs, data and automation belong where they remove a manual handoff or a user doubt.", icon: "api" },
      { title: "Failure is part of the build", description: "Loading, errors, keyboard use, slow connections and reduced motion are handled before release.", icon: "shield" },
    ],
  },
  work: {
    ...portuguese.work,
    eyebrow: "Public work, real context",
    title: "Open code. Visible decisions.",
    description: "No project appears here as a stack alone. Each one names the problem, technical decision, next step and the repository where the work can be checked.",
    panelTitle: "Work",
    panelClose: "Close",
    tabs: { product: "UI/UX & Front-end", visual: "Visual design", motion: "Motion" },
    featuredLabel: "Selected case",
    openProject: "Open project",
    mediaLabel: "Visual preview",
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
    publicOnly: "Public repositories only",
    loadingProjects: "Loading public repositories…",
    liveSource: "Synced with GitHub",
    fallbackSource: "Safe local copy",
    copyWorkLink: "Copy work link",
    workLinkCopied: "Link copied",
    copyCaseLink: "Copy case link",
    caseLinkCopied: "Case link copied",
    quickLabel: "Technical brief",
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
  journey: {
    eyebrow: "Outside GitHub",
    title: "The code shows what I built. This is what I studied to get there.",
    description: "Cybersecurity with Hackers do Bem, AI foundations through IBM SkillsBuild and computer vision at Geração Caldeira. Certificates and tools provide context; they do not replace practice.",
    sections: [
      {
        id: "education",
        eyebrow: "Education",
        title: "Study, test, break, understand. The order varies.",
        description: "I use these learning paths to close gaps that surface in projects: networks and risk, AI foundations and image analysis.",
        mediaLabel: "Charlles studying a systems diagram beside books",
        mediaCaption: "learning in progress",
        items: [
          { label: "Security", title: "Hackers do Bem", description: "Training focused on cybersecurity fundamentals and a more critical reading of systems, networks and risk.", tags: ["Cybersecurity", "Networks", "Foundations"] },
          { label: "Artificial intelligence", title: "IBM SkillsBuild", description: "Study of AI fundamentals, its uses and the care required to apply the technology with context.", tags: ["AI", "Data", "Application"] },
          { label: "Computer vision", title: "Geração Caldeira", description: "A practical path through images, models and ways to turn computer perception into a solution.", tags: ["Computer Vision", "Python", "Models"] },
        ],
      },
      {
        id: "certifications",
        eyebrow: "Certifications",
        title: "Certificates help. Knowing where to apply them helps more.",
        description: "They record parts of the journey. Their value appears when the content improves a technical decision, a review or the next question.",
        mediaLabel: "Charlles pinning a green badge to a credentials board",
        mediaCaption: "validated knowledge",
        items: [
          { label: "Geração Caldeira", title: "Computer Vision", description: "Foundations and practice for image-analysis solutions.", tags: ["Computer Vision", "AI"] },
          { label: "IBM SkillsBuild", title: "AI Fundamentals", description: "Core concepts, applications and implications of artificial intelligence.", tags: ["AI", "Foundations"] },
          { label: "Cisco", title: "Endpoint Security", description: "Device protection, threat vectors and defense principles.", tags: ["Endpoint", "Security"] },
          { label: "RNP / Softex", title: "Hackers do Bem", description: "Introductory training and foundation building in cybersecurity.", tags: ["Cybersecurity", "Networks"] },
        ],
      },
      {
        id: "stack",
        eyebrow: "Tech Stack",
        title: "Tools change. Judgment stays.",
        description: "I choose technology based on the problem, maintenance and who will continue the work. Still, these are the pieces that appear most often on the bench.",
        mediaLabel: "Charlles connecting software modules into a system",
        mediaCaption: "modules in sync",
        items: [
          { label: "Interface", title: "A web that explains what it is doing", description: "Components, routes and states built with hierarchy, accessibility and fast feedback.", tags: ["React", "Next.js", "TypeScript"] },
          { label: "Backend", title: "Logic you do not see, but rely on", description: "APIs, services and automation with clear boundaries and room to grow without drama.", tags: ["Python", "Go", "Node.js"] },
          { label: "Infrastructure and practice", title: "From package to network", description: "Tools for investigating, integrating and operating systems beyond the visual layer.", tags: ["Networking", "Cybersecurity", "Automation"] },
        ],
      },
    ],
  },
  now: {
    ...portuguese.now,
    eyebrow: "Now",
    title: "What I’m building and deepening.",
    description: "Three current focuses, maintained as signals of direction, not as an update feed.",
    routeLabel: "Now in focus",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Now",
    openProject: "Open project",
    updatedLabel: "Updated Aug 25, 2026",
    updatedDate: "2026-08-25",
    items: [
      { label: "Project in focus", title: "Astrolink in progress", description: "Structuring a low-cost solution to sell and manage Wi-Fi access on local networks using Starlink, OpenWrt, PIX and vouchers.", proof: "Go · SvelteKit · OpenWrt", icon: "network", href: "https://github.com/charlles-dev/Astrolink" },
      { label: "Recent improvement", title: "Portfolio as a product", description: "Refining the narrative, performance and presentation so the portfolio communicates real work across languages.", proof: "Next.js · TypeScript · i18n", icon: "sparkles" },
      { label: "Technical practice", title: "Security in the workflow", description: "Deepening networking, endpoint and automation fundamentals to review systems with more care.", proof: "Cybersecurity · automation · review", icon: "shield" },
    ],
  },
  contact: {
    ...portuguese.contact,
    eyebrow: "Let’s talk",
    title: "A good project usually starts with a well-explained problem.",
    description: "If you know what must be built, or can only point to where it hurts, send the context. I read it before replying.",
    primaryCta: "Chat on WhatsApp",
    secondaryCta: "Send an email",
    direct: "Direct channels",
    specialty: "Full-stack software engineer",
    availability: "Direct message",
    cardTitle: "Where is the system getting stuck?",
    cardBody: "Send the context on WhatsApp or book 15 or 30 minutes on the calendar. No form and no canned pitch.",
    callCta: "Schedule a call",
    callMeta: "15 or 30 min · online call",
    emailSubject: "Project conversation",
    emailBody: "Hi, Charlles!\n\nI would like to talk about a project.\n\nContext:\nNext milestone:\n",
  },
  notFound: {
    eyebrow: "Route not found",
    title: "I lit the path. The page still did not show up.",
    description: "This route got lost in the dark. The useful paths are still right beside it.",
    routeLabel: "404 / route missing",
    routeStatus: "status: route not found",
    avatarAlt: "Charlles lighting possible paths with a flashlight",
    signTitle: "Pick a direction",
    work: "View work",
    about: "About me",
    contact: "Contact me",
    homeCta: "Back to home",
    processCta: "See the process",
    engineeringCta: "Read engineering notes",
  },
  footer: { availability: "In touch with the community", rights: "© 2026 Charlles Augusto", built: "Built with Next.js and attention to detail." },
  process: {
    eyebrow: "Working method",
    title: "Understand first. Build with context.",
    description: "A simple process for turning practical problems into clear, testable and useful software.",
    routeLabel: "Process",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Process",
    steps: [
      { title: "Understand", description: "Map the problem, the people involved and what needs to be true at the end.", icon: "brain" },
      { title: "Structure", description: "Organize scope, flows and decisions before adding complexity to the product.", icon: "route" },
      { title: "Build", description: "Implement interfaces, logic and automation on a foundation that can evolve.", icon: "code" },
      { title: "Validate", description: "Review accessibility, error states, documentation and quality before shipping.", icon: "solar-check" },
    ],
  },
  engineering: {
    eyebrow: "Engineering notes",
    title: "How this landing is built.",
    description: "An editorial page about the decisions behind this experience: progressive media, contextual navigation, localized content and a quality routine before shipping.",
    linkLabel: "Engineering notes",
    backHome: "Back to home",
    openWork: "See the work",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Engineering",
    sections: [
      {
        title: "Progressive enhancement in the hero",
        description: "Video enriches the presentation without becoming the only way to understand the page.",
        items: [
          { title: "Poster first", body: "The composition starts with a stable, predictable poster. WebM is used when available, with an explicit MP4 fallback for browsers that cannot load the primary codec.", tags: ["poster", "WebM", "MP4"] },
          { title: "Motion under control", body: "Scrubbing follows scroll position, loops enter only when needed and reduced-motion preference stops media at runtime.", tags: ["scroll", "reduced motion", "visibilitychange"] },
        ],
      },
      {
        title: "An interface that makes state visible",
        description: "Work, About and Contact behave as shareable, navigable and dismissible panels.",
        items: [
          { title: "Predictable deep links", body: "Each panel has its own hash. That keeps context in browser history and lets someone share the Work area without creating a parallel screen.", tags: ["#work", "#about", "#contact"] },
          { title: "Focus and context", body: "When a panel opens, focus enters its content, Tab stays inside the dialog, Escape closes it and the background becomes inert while the decision is in progress.", tags: ["focus trap", "inert", "aria-modal"] },
        ],
      },
      {
        title: "Localized and verifiable content",
        description: "The experience keeps the same structure across three languages without turning translation into automated copy.",
        items: [
          { title: "One contract, three voices", body: "PT-BR, EN and ES dictionaries share one typed shape. A new label therefore cannot ship in one language and silently disappear in the others.", tags: ["PT-BR", "EN", "ES"] },
          { title: "Evidence before adjectives", body: "Cases and notes use public links and decisions that can be checked in the code. Metrics are not invented to fill editorial space.", tags: ["public work", "evidence", "honest copy"] },
        ],
      },
    ],
    quality: {
      eyebrow: "Quality gate",
      title: "Ship only after checking the essentials.",
      description: "Every change follows the same local sequence before reaching the repository: types, rules, tests and a production build.",
      steps: ["Type-check", "Lint", "Vitest", "Next build"],
    },
    note: "These notes describe decisions already present in the code. They are not performance metrics or a promise of availability.",
  },
  projects: {
    "charlles-dev-portfolio": { summary: "A Next.js portfolio with public GitHub data, three languages and video controlled by scroll.", problem: "Show full-stack work without reducing every project to a polished image and a technology list.", decision: "Fetch public GitHub data on the server, localize the narrative in three languages and synchronize video, content and scroll without blocking reading.", next: "Publish real performance metrics and document the visual evolution as an open case study.", category: "Web", metric: "Next.js · GitHub", reason: "The portfolio itself as technical evidence" },
    trakr: { summary: "A smart tool case that identifies equipment through RFID/NFC and connects an ESP32 to a Kotlin interface.", problem: "Detect a missing tool before the team closes the case and leaves the worksite.", decision: "Distribute identifier reading to the ESP32 and centralize inventory, states and alerts in the Kotlin application.", next: "Validate simultaneous reads, false positives and offline use with the physical case assembled.", category: "Connected system", metric: "Kotlin · ESP32", reason: "Software meeting the physical world" },
    astrolink: { summary: "Infrastructure and software to sell and manage Wi-Fi access on local networks with Starlink.", problem: "How to bring a low-cost connectivity operation to remote areas and communities.", decision: "Separate a Go backend, a SvelteKit captive portal and integrations for payments, vouchers and OpenWrt.", next: "Validate the operation on real hardware and expand deployment documentation.", category: "Infrastructure", metric: "Go · connectivity", reason: "Connectivity in remote areas" },
    "3035-teach": { summary: "A fullstack portfolio organizing practical training in Java, Spring Boot, React and TypeScript.", problem: "Document an extensive technical journey in a way that stays searchable, practical and reusable.", decision: "Organize modules, exercises, documentation and examples around fullstack fundamentals.", next: "Complete the advanced modules and make the documentation an even more navigable reference.", category: "Technical base", metric: "Java · learning path", reason: "Practical fullstack training" },
  },
};

const spanish: PortfolioDictionary = {
  ...english,
  meta: {
    title: "Charlles Augusto | Ingeniero de Software Full Stack",
    description: "Proyectos públicos de Charlles Augusto en Next.js, TypeScript, Go, automatización y sistemas conectados, con decisiones técnicas y código en GitHub.",
    keywords: ["Charlles Augusto", "ingeniero de software full stack", "desarrollador Next.js", "desarrollador TypeScript", "Go", "React", "automatización de procesos", "GitHub", "Brasil"],
    ogAlt: "Personaje 3D de Charlles Augusto en la escena oscura que abre el portafolio",
  },
  nav: { work: "Trabajos", about: "Sobre mí", now: "Ahora", contact: "Contacto", menu: "Abrir menú", main: "Navegación principal", language: "Idioma" },
  hero: {
    ...english.hero,
    eyebrow: "Software · interfaces · sistemas",
    headline: "Ingeniería por debajo. Experiencia completa por encima.",
    description: "En charlles.dev, Next.js conversa con GitHub, el video responde al scroll y cada proyecto expone el problema, la decisión y el código. Soy Charlles Augusto, ingeniero de software full stack en Campina Grande, Brasil.",
    primaryCta: "Ver las decisiones en el código",
    secondaryCta: "Conectar en LinkedIn",
    scrollLabel: "Desplázate para explorar",
    tagline: "interfaz / código / automatización",
    role: "Ingeniero de software full stack",
    status: "Construyendo con intención",
    facts: [{ label: "Ubicación", value: "Campina Grande, Brasil" }, { label: "Enfoque", value: "Interfaces, sistemas y automatización" }, { label: "Método", value: "Público y documentado" }],
  },
  about: {
    ...english.about,
    eyebrow: "Sobre mi trabajo",
    title: "Empiezo por lo que debe funcionar. La capa visual viene con ello.",
    body: "Me muevo entre interfaz, backend y automatización. Aquí eso significa datos de GitHub, tres idiomas, estados accesibles y medios que nunca bloquean la lectura. El detalle visual no oculta el código; explica lo que está haciendo el sistema.",
    link: "Ver mi perfil en LinkedIn",
    mediaAlt: "Charlles siguiendo con una linterna un cable interrumpido en la oscuridad",
    mediaCaption: "Primero encuentro dónde se rompió",
    socialLabel: "Enlaces sociales",
    values: [
      { title: "La interfaz deja pistas", description: "Jerarquía, estados y movimiento muestran qué ocurrió y cuál es el siguiente paso.", icon: "device-laptop" },
      { title: "Los extremos deben conversar", description: "APIs, datos y automatización entran cuando eliminan un paso manual o una duda del usuario.", icon: "api" },
      { title: "El fallo también forma parte", description: "Carga, errores, teclado, conexión lenta y movimiento reducido se resuelven antes de publicar.", icon: "shield" },
    ],
  },
  work: {
    ...english.work,
    eyebrow: "Trabajo público, contexto real",
    title: "Código abierto. Decisiones a la vista.",
    description: "Aquí ningún proyecto aparece solo por su stack. Cada recorte muestra el problema, la decisión técnica, el siguiente paso y el repositorio donde puede comprobarse.",
    panelTitle: "Trabajos",
    panelClose: "Cerrar",
    tabs: { product: "UI/UX & Front-end", visual: "Visual design", motion: "Motion" },
    featuredLabel: "Caso seleccionado",
    openProject: "Abrir proyecto",
    mediaLabel: "Vista previa visual",
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
    publicOnly: "Solo repositorios públicos",
    loadingProjects: "Buscando repositorios públicos…",
    liveSource: "Sincronizado con GitHub",
    fallbackSource: "Copia local segura",
    copyWorkLink: "Copiar enlace de trabajos",
    workLinkCopied: "Enlace copiado",
    copyCaseLink: "Copiar enlace del caso",
    caseLinkCopied: "Enlace del caso copiado",
    quickLabel: "Resumen técnico",
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
  journey: {
    eyebrow: "Fuera de GitHub",
    title: "El código muestra lo que construí. Aquí está lo que estudié para llegar.",
    description: "Ciberseguridad en Hackers do Bem, fundamentos de IA con IBM SkillsBuild y visión computacional en Geração Caldeira. Certificados y herramientas aportan contexto; no sustituyen la práctica.",
    sections: [
      {
        id: "education",
        eyebrow: "Educación",
        title: "Estudiar, probar, romper, entender. El orden cambia.",
        description: "Uso estas rutas para cerrar vacíos que aparecen en los proyectos: redes y riesgo, fundamentos de IA y análisis de imágenes.",
        mediaLabel: "Charlles estudiando un diagrama de sistemas junto a libros",
        mediaCaption: "aprendizaje en marcha",
        items: [
          { label: "Seguridad", title: "Hackers do Bem", description: "Formación centrada en fundamentos de ciberseguridad y una lectura más crítica de sistemas, redes y riesgos.", tags: ["Ciberseguridad", "Redes", "Fundamentos"] },
          { label: "Inteligencia artificial", title: "IBM SkillsBuild", description: "Estudio de los fundamentos de IA, sus usos y los cuidados necesarios para aplicarla con contexto.", tags: ["IA", "Datos", "Aplicación"] },
          { label: "Visión computacional", title: "Geração Caldeira", description: "Una ruta práctica por imágenes, modelos y formas de transformar percepción computacional en solución.", tags: ["Computer Vision", "Python", "Modelos"] },
        ],
      },
      {
        id: "certifications",
        eyebrow: "Certificaciones",
        title: "Los certificados ayudan. Saber dónde aplicarlos ayuda más.",
        description: "Registran partes del camino. Su valor aparece cuando el contenido mejora una decisión técnica, una revisión o la siguiente pregunta.",
        mediaLabel: "Charlles fijando una insignia verde en un panel de credenciales",
        mediaCaption: "conocimiento validado",
        items: [
          { label: "Geração Caldeira", title: "Visión computacional", description: "Fundamentos y práctica de soluciones basadas en análisis de imágenes.", tags: ["Computer Vision", "IA"] },
          { label: "IBM SkillsBuild", title: "AI Fundamentals", description: "Conceptos esenciales, aplicaciones e implicaciones de la inteligencia artificial.", tags: ["AI", "Fundamentos"] },
          { label: "Cisco", title: "Endpoint Security", description: "Protección de dispositivos, vectores de amenaza y principios de defensa.", tags: ["Endpoint", "Seguridad"] },
          { label: "RNP / Softex", title: "Hackers do Bem", description: "Formación introductoria y nivelación en ciberseguridad.", tags: ["Cybersecurity", "Redes"] },
        ],
      },
      {
        id: "stack",
        eyebrow: "Tech Stack",
        title: "Las herramientas cambian. El criterio permanece.",
        description: "Elijo la tecnología según el problema, el mantenimiento y quien continuará el trabajo. Aun así, estas son las piezas que más aparecen en la mesa.",
        mediaLabel: "Charlles conectando módulos de software en un sistema",
        mediaCaption: "módulos en sintonía",
        items: [
          { label: "Interfaz", title: "Una web que explica lo que hace", description: "Componentes, rutas y estados construidos con jerarquía, accesibilidad y respuesta rápida.", tags: ["React", "Next.js", "TypeScript"] },
          { label: "Backend", title: "Lógica que no se ve, pero sostiene", description: "APIs, servicios y automatizaciones con límites claros y espacio para crecer sin drama.", tags: ["Python", "Go", "Node.js"] },
          { label: "Infraestructura y práctica", title: "Del paquete a la red", description: "Herramientas para investigar, integrar y operar sistemas más allá de la capa visual.", tags: ["Networking", "Cybersecurity", "Automatización"] },
        ],
      },
    ],
  },
  now: {
    ...english.now,
    eyebrow: "Ahora",
    title: "Lo que estoy construyendo y profundizando.",
    description: "Tres focos actuales, mantenidos como señales de dirección y no como un feed de actualizaciones.",
    routeLabel: "Ahora en foco",
    breadcrumbLabel: "Navegación estructural",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Ahora",
    openProject: "Abrir proyecto",
    updatedLabel: "Actualizado el 25 ago 2026",
    updatedDate: "2026-08-25",
    items: [
      { label: "Proyecto en foco", title: "Astrolink en evolución", description: "Estructurando una solución de bajo costo para vender y gestionar acceso Wi-Fi en redes locales con Starlink, OpenWrt, PIX y vouchers.", proof: "Go · SvelteKit · OpenWrt", icon: "network", href: "https://github.com/charlles-dev/Astrolink" },
      { label: "Mejora reciente", title: "Portafolio como producto", description: "Refinando narrativa, rendimiento y presentación para comunicar trabajo real en diferentes idiomas.", proof: "Next.js · TypeScript · i18n", icon: "sparkles" },
      { label: "Práctica técnica", title: "Seguridad en el flujo", description: "Profundizando redes, endpoint y automatización para revisar sistemas con más criterio.", proof: "Cybersecurity · automatización · revisión", icon: "shield" },
    ],
  },
  contact: {
    ...english.contact,
    eyebrow: "Hablemos",
    title: "Un buen proyecto suele empezar con un problema bien explicado.",
    description: "Si ya sabes qué hay que construir, o solo puedes señalar dónde duele, envía el contexto. Lo leo antes de responder.",
    primaryCta: "Hablar por WhatsApp",
    secondaryCta: "Enviar un email",
    direct: "Canales directos",
    specialty: "Ingeniero de software full stack",
    availability: "Mensaje directo",
    cardTitle: "¿Dónde se está atascando el sistema?",
    cardBody: "Envía el contexto por WhatsApp o reserva 15 o 30 minutos en el calendario. Sin formulario y sin discurso preparado.",
    callCta: "Agendar una llamada",
    callMeta: "15 o 30 min · llamada online",
    emailSubject: "Conversación sobre un proyecto",
    emailBody: "¡Hola, Charlles!\n\nQuiero conversar sobre un proyecto.\n\nContexto:\nPróximo hito:\n",
  },
  notFound: {
    eyebrow: "Ruta no encontrada",
    title: "Iluminé el camino. La página no apareció.",
    description: "Esta ruta se perdió en la oscuridad. Los caminos útiles siguen justo al lado.",
    routeLabel: "404 / ruta ausente",
    routeStatus: "estado: ruta no localizada",
    avatarAlt: "Charlles iluminando posibles caminos con una linterna",
    signTitle: "Elige un camino",
    work: "Ver trabajos",
    about: "Conocer el perfil",
    contact: "Contactarme",
    homeCta: "Volver al inicio",
    processCta: "Ver el proceso",
    engineeringCta: "Leer notas de ingeniería",
  },
  footer: { availability: "En contacto con la comunidad", rights: "© 2026 Charlles Augusto", built: "Hecho con Next.js y atención al detalle." },
  process: {
    eyebrow: "Método de trabajo",
    title: "Entender primero. Construir con contexto.",
    description: "Un proceso sencillo para transformar problemas prácticos en software claro, comprobable y útil.",
    routeLabel: "Proceso",
    breadcrumbLabel: "Navegación estructural",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Proceso",
    steps: [
      { title: "Entender", description: "Mapear el problema, las personas involucradas y lo que debe ser verdad al final.", icon: "brain" },
      { title: "Estructurar", description: "Organizar alcance, flujos y decisiones antes de añadir complejidad al producto.", icon: "route" },
      { title: "Construir", description: "Implementar interfaces, lógica y automatizaciones sobre una base que pueda evolucionar.", icon: "code" },
      { title: "Validar", description: "Revisar accesibilidad, estados de error, documentación y calidad antes de publicar.", icon: "solar-check" },
    ],
  },
  engineering: {
    eyebrow: "Notas de ingeniería",
    title: "Cómo se construye esta landing.",
    description: "Una página editorial sobre las decisiones detrás de esta experiencia: medios progresivos, navegación contextual, contenido localizado y una rutina de calidad antes de publicar.",
    linkLabel: "Notas de ingeniería",
    backHome: "Volver al inicio",
    openWork: "Ver trabajos",
    breadcrumbLabel: "Navegación estructural",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Ingeniería",
    sections: [
      {
        title: "Progressive enhancement en el hero",
        description: "El video enriquece la presentación sin ser la única forma de entender la página.",
        items: [
          { title: "Poster primero", body: "La composición comienza con un poster estable y predecible. WebM se usa cuando está disponible, con MP4 como fallback explícito para navegadores que no carguen el códec principal.", tags: ["poster", "WebM", "MP4"] },
          { title: "Movimiento bajo control", body: "El scrub sigue la posición del scroll, los loops entran solo cuando hacen falta y la preferencia de movimiento reducido detiene los medios en runtime.", tags: ["scroll", "reduced motion", "visibilitychange"] },
        ],
      },
      {
        title: "Una interfaz que hace visible el estado",
        description: "Trabajos, Sobre y Contacto funcionan como paneles compartibles, navegables y cerrables.",
        items: [
          { title: "Deep links previsibles", body: "Cada panel tiene su propio hash. Esto mantiene el contexto en el historial y permite compartir directamente la zona de Trabajos sin crear una pantalla paralela.", tags: ["#work", "#about", "#contact"] },
          { title: "Foco y contexto", body: "Al abrir un panel, el foco entra en el contenido, Tab permanece dentro del diálogo, Escape lo cierra y el fondo queda inerte mientras la decisión está en curso.", tags: ["focus trap", "inert", "aria-modal"] },
        ],
      },
      {
        title: "Contenido localizado y verificable",
        description: "La experiencia mantiene la misma estructura en tres idiomas sin convertir la traducción en copia automática.",
        items: [
          { title: "Un contrato, tres voces", body: "Los diccionarios de PT-BR, EN y ES comparten una misma forma tipada. Así, una nueva etiqueta no llega a producción en un idioma y desaparece silenciosamente en los demás.", tags: ["PT-BR", "EN", "ES"] },
          { title: "Evidencia antes que adjetivos", body: "Los casos y las notas usan enlaces públicos y decisiones que pueden comprobarse en el código. No se inventan métricas para llenar espacio editorial.", tags: ["public work", "evidence", "honest copy"] },
        ],
      },
    ],
    quality: {
      eyebrow: "Quality gate",
      title: "Publicar solo después de revisar lo esencial.",
      description: "Cada cambio sigue la misma secuencia local antes de llegar al repositorio: tipos, reglas, tests y build de producción.",
      steps: ["Type-check", "Lint", "Vitest", "Next build"],
    },
    note: "Estas notas describen decisiones ya presentes en el código. No son métricas de rendimiento ni una promesa de disponibilidad.",
  },
  projects: {
    "charlles-dev-portfolio": { summary: "Portafolio en Next.js con datos públicos de GitHub, tres idiomas y video controlado por el scroll.", problem: "Mostrar trabajo full stack sin reducir cada proyecto a una imagen bonita y una lista de tecnologías.", decision: "Consultar datos públicos de GitHub en el servidor, localizar la narrativa en tres idiomas y sincronizar video, contenido y scroll sin bloquear la lectura.", next: "Publicar métricas reales de rendimiento y documentar la evolución visual como un caso de estudio abierto.", category: "Web", metric: "Next.js · GitHub", reason: "El propio portafolio como evidencia técnica" },
    trakr: { summary: "Maleta inteligente que identifica herramientas mediante RFID/NFC y conecta un ESP32 con una interfaz en Kotlin.", problem: "Detectar una herramienta ausente antes de que el equipo cierre la maleta y abandone el lugar de trabajo.", decision: "Distribuir la lectura de identificadores en el ESP32 y concentrar inventario, estados y alertas en la aplicación Kotlin.", next: "Validar lecturas simultáneas, falsos positivos y uso sin conexión con la maleta física montada.", category: "Sistema conectado", metric: "Kotlin · ESP32", reason: "Software conectado con el mundo físico" },
    astrolink: { summary: "Infraestructura y software para vender y gestionar acceso Wi-Fi en redes locales con Starlink.", problem: "Cómo llevar una operación de conectividad de bajo costo a comunidades y áreas remotas.", decision: "Separar un backend en Go, un portal cautivo en SvelteKit e integraciones para pagos, vouchers y OpenWrt.", next: "Validar la operación en hardware real y ampliar la documentación de despliegue.", category: "Infraestructura", metric: "Go · conectividad", reason: "Conectividad en áreas remotas" },
    "3035-teach": { summary: "Portafolio fullstack que organiza una formación práctica en Java, Spring Boot, React y TypeScript.", problem: "Documentar una evolución técnica extensa de forma consultable, práctica y reutilizable.", decision: "Organizar módulos, ejercicios, documentación y ejemplos alrededor de fundamentos fullstack.", next: "Completar los módulos avanzados y hacer de la documentación una referencia más navegable.", category: "Base técnica", metric: "Java · ruta técnica", reason: "Formación práctica fullstack" },
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
  return `/${locale}${hash}`;
}

export function projectKey(value: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (normalized.includes("charlles-dev-portfolio")) return "charlles-dev-portfolio";
  if (normalized === "trakr" || normalized.endsWith("-trakr")) return "trakr";
  if (normalized.includes("astrolink")) return "astrolink";
  if (normalized.includes("3035") || normalized.includes("teach")) return "3035-teach";
  return null;
}
