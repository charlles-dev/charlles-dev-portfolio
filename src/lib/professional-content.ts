import type { Locale } from "@/lib/i18n";

export const caseSlugs = ["charlles-dev-portfolio", "astrolink", "trakr"] as const;
export type CaseSlug = (typeof caseSlugs)[number];

export type ProjectCase = {
  slug: CaseSlug;
  repositoryName: string;
  title: string;
  kicker: string;
  summary: string;
  role: string;
  period: string;
  status: string;
  repository: string;
  demo?: string;
  problem: string;
  context: string;
  built: string[];
  architecture: Array<{ label: string; detail: string }>;
  decisions: Array<{ title: string; body: string }>;
  limitations: string[];
  results: string[];
  stack: string[];
};

type ProfessionalContent = {
  cases: Record<CaseSlug, ProjectCase>;
  caseUi: {
    back: string;
    role: string;
    period: string;
    status: string;
    problem: string;
    context: string;
    built: string;
    architecture: string;
    decisions: string;
    limitations: string;
    results: string;
    repository: string;
    demo: string;
    nextCase: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    entries: Array<{ period: string; role: string; context: string; result: string; caseSlug: CaseSlug }>;
  };
  stackEvidence: {
    eyebrow: string;
    title: string;
    description: string;
    evidenceLabel: string;
    items: Array<{ name: string; use: string; cases: CaseSlug[] }>;
  };
  cv: {
    title: string;
    description: string;
    print: string;
    back: string;
    sections: { profile: string; experience: string; projects: string; education: string; certifications: string; stack: string; contact: string };
  };
  contactIntents: {
    label: string;
    options: Array<{ id: "project" | "opportunity" | "technical"; label: string; whatsapp: string; emailSubject: string; emailBody: string }>;
  };
  contextMenu: { label: string; home: string; projects: string; cv: string; game: string; email: string; copied: string };
  game: {
    eyebrow: string;
    title: string;
    description: string;
    start: string;
    continue: string;
    reset: string;
    back: string;
    objective: string;
    controls: string;
    interact: string;
    inventory: string;
    complete: string;
  };
};

const commonRepositories = {
  "charlles-dev-portfolio": "https://github.com/charlles-dev/charlles-dev-portfolio",
  astrolink: "https://github.com/charlles-dev/Astrolink",
  trakr: "https://github.com/charlles-dev/trakr",
};

const pt: ProfessionalContent = {
  cases: {
    "charlles-dev-portfolio": {
      slug: "charlles-dev-portfolio", repositoryName: "charlles-dev-portfolio", title: "Charlles.dev", kicker: "Portfólio como sistema editorial", period: "2026 — atual", status: "Em evolução", role: "Engenharia full stack, direção visual e conteúdo", repository: commonRepositories["charlles-dev-portfolio"], demo: "https://www.charlles.dev",
      summary: "Um portfólio multilíngue que conecta identidade cinematográfica, projetos públicos e decisões técnicas sem esconder o trabalho atrás do espetáculo.",
      problem: "Portfólios de desenvolvimento costumam cair em dois extremos: inventário de tecnologias sem contexto ou uma landing visual que não prova engenharia.",
      context: "A página precisava apresentar uma identidade memorável e, ao mesmo tempo, continuar rápida, rastreável, acessível e fácil de manter em três idiomas.",
      built: ["Arquitetura em Next.js App Router com rotas localizadas.", "Integração server-side com dados públicos do GitHub e fallback curado.", "Sistema de mídia com posters, vídeo sob demanda e movimento reduzido.", "SEO técnico, dados estruturados, Open Graph e quality gate automatizado."],
      architecture: [{ label: "Interface", detail: "React e componentes editoriais localizados" }, { label: "Aplicação", detail: "Next.js App Router, metadata e rotas estáticas" }, { label: "Dados", detail: "GitHub público com overrides e snapshot de fallback" }, { label: "Qualidade", detail: "TypeScript, ESLint, Vitest e verificações de build" }],
      decisions: [{ title: "Evidência antes de decoração", body: "Projetos selecionados apresentam problema e decisão; assets do personagem entram apenas quando ajudam orientação, estado ou narrativa." }, { title: "Fallback é parte do produto", body: "A indisponibilidade do GitHub não transforma a página em uma tela vazia: um snapshot público preserva a experiência e informa a origem." }, { title: "Movimento com função", body: "GSAP e vídeo são usados para continuidade e presença, com caminhos equivalentes para touch e movimento reduzido." }],
      limitations: ["As métricas profissionais dependem de dados reais aprovados; nenhuma foi inventada.", "A qualidade final de vídeo ainda varia conforme codec, GPU, economia de dados e navegador.", "O conteúdo em inglês e espanhol precisa de revisão humana nativa periódica."],
      results: ["Base pública e rastreável para apresentar projetos e decisões.", "Experiência localizada em português, inglês e espanhol.", "Pipeline de qualidade que valida código, testes, assets, rotas e HTML antes de publicar."],
      stack: ["Next.js", "React", "TypeScript", "GSAP", "Vitest", "GitHub API", "CSS"],
    },
    astrolink: {
      slug: "astrolink", repositoryName: "Astrolink", title: "Astrolink", kicker: "Conectividade em territórios difíceis", period: "2026 — atual", status: "Protótipo público", role: "Arquitetura inicial, software e documentação", repository: commonRepositories.astrolink,
      summary: "Uma base técnica em Go para investigar infraestrutura e software de baixo custo voltados ao acesso à internet em áreas remotas.",
      problem: "Custo, disponibilidade de infraestrutura e condições territoriais tornam conectividade remota um problema maior do que simplesmente instalar software.",
      context: "O repositório funciona como uma proposta técnica em evolução. Ele organiza hipóteses e a base de software sem apresentar como validado aquilo que ainda precisa de simulação e teste de campo.",
      built: ["Base de software em Go.", "Organização pública da proposta e do histórico técnico.", "Estrutura para evoluir simulações, premissas de rede e validações."],
      architecture: [{ label: "Território", detail: "Restrições de alcance, energia, custo e manutenção" }, { label: "Rede", detail: "Hipóteses de conectividade e comunicação" }, { label: "Software", detail: "Serviços e experimentos organizados em Go" }, { label: "Validação", detail: "Simulações e testes ainda necessários" }],
      decisions: [{ title: "Começar pelas restrições", body: "A arquitetura parte do território e do custo antes de escolher tecnologia." }, { title: "Protótipo não é produção", body: "O status e as limitações ficam explícitos para não transformar intenção em resultado." }, { title: "Código e documentação juntos", body: "A proposta técnica permanece rastreável no mesmo repositório em que o software evolui." }],
      limitations: ["Ainda não há validação de campo publicada.", "Premissas de alcance, custo e operação precisam ser documentadas e simuladas.", "O projeto não afirma oferecer conectividade pronta para produção."],
      results: ["Uma base pública para evoluir a investigação técnica.", "Separação explícita entre proposta, protótipo e validação futura.", "Histórico de implementação verificável no GitHub."],
      stack: ["Go", "Networking", "Infraestrutura", "Documentação técnica"],
    },
    trakr: {
      slug: "trakr", repositoryName: "trakr", title: "Trakr", kicker: "Ferramentas que avisam quando algo ficou para trás", period: "2026 — atual", status: "Experimento público", role: "Conceito, integração e prototipação", repository: commonRepositories.trakr,
      summary: "Uma maleta de ferramentas inteligente que combina identificação RFID/NFC, ESP32 e uma aplicação Kotlin para acompanhar itens físicos.",
      problem: "Em rotinas de campo, perceber uma ferramenta ausente apenas depois de sair do local custa tempo e gera retrabalho.",
      context: "O projeto explora como hardware acessível e uma interface móvel podem manter um inventário simples de itens sem fingir que o protótipo já cobre todas as condições de uso real.",
      built: ["Conceito de inventário físico associado a tags RFID/NFC.", "Base de integração com ESP32.", "Aplicação em Kotlin para representar e acompanhar o estado dos itens."],
      architecture: [{ label: "Objeto", detail: "Ferramenta identificada por tag" }, { label: "Leitura", detail: "RFID/NFC conectado ao ESP32" }, { label: "Estado", detail: "Inventário e eventos do conjunto" }, { label: "Interface", detail: "Aplicação Kotlin para consulta e alerta" }],
      decisions: [{ title: "Hardware simples, hipótese clara", body: "A escolha do ESP32 mantém o experimento acessível e fácil de reproduzir." }, { title: "Estado antes de dashboard", body: "A interface prioriza saber o que está presente ou ausente, em vez de métricas decorativas." }, { title: "Integração por camadas", body: "Leitura física, estado e apresentação permanecem separados para facilitar testes." }],
      limitations: ["Confiabilidade de leitura e interferência precisam de testes físicos.", "O protótipo não representa um produto industrial pronto.", "Autonomia, resistência e operação offline ainda precisam de validação."],
      results: ["Hipótese de produto transformada em implementação pública.", "Integração entre hardware, identificação e interface documentada no código.", "Base disponível para testes físicos e evolução do fluxo."],
      stack: ["Kotlin", "ESP32", "RFID/NFC", "Sistemas embarcados"],
    },
  },
  caseUi: { back: "Voltar ao portfólio", role: "Papel", period: "Período", status: "Estado", problem: "O problema", context: "Contexto", built: "O que foi construído", architecture: "Arquitetura em 60 segundos", decisions: "Decisões e trade-offs", limitations: "Limitações conhecidas", results: "Resultado verificável", repository: "Abrir repositório", demo: "Ver projeto", nextCase: "Próximo case" },
  experience: { eyebrow: "Prática profissional", title: "Experiência que deixa rastros.", description: "Uma timeline de projetos e responsabilidades verificáveis. Vínculos formais, clientes e métricas só entram quando puderem ser publicados com precisão.", entries: [
    { period: "2026 — atual", role: "Engenharia full stack e direção do Charlles.dev", context: "Arquitetura, interfaces, integrações públicas, localização, SEO e motion.", result: "Portfólio público com código, decisões e quality gate verificáveis.", caseSlug: "charlles-dev-portfolio" },
    { period: "2026 — atual", role: "Arquitetura inicial e software no Astrolink", context: "Investigação de conectividade de baixo custo para áreas remotas.", result: "Proposta e base em Go publicadas sem esconder as validações ainda pendentes.", caseSlug: "astrolink" },
    { period: "2026 — atual", role: "Prototipação de hardware e aplicativo no Trakr", context: "Inventário físico com RFID/NFC, ESP32 e Kotlin.", result: "Hipótese transformada em experimento integrado e publicamente rastreável.", caseSlug: "trakr" },
  ] },
  stackEvidence: { eyebrow: "Stack com prova", title: "Ferramenta só entra quando resolve algo.", description: "Selecione uma tecnologia para ver onde ela aparece e qual responsabilidade assumiu.", evidenceLabel: "Evidência em", items: [
    { name: "Next.js", use: "Rotas localizadas, renderização, metadata e composição server/client do portfólio.", cases: ["charlles-dev-portfolio"] },
    { name: "TypeScript", use: "Contratos de dados, componentes, integrações e testes do Charlles.dev.", cases: ["charlles-dev-portfolio"] },
    { name: "React", use: "Estados interativos, painéis, mídia responsiva e acessibilidade da interface.", cases: ["charlles-dev-portfolio"] },
    { name: "Go", use: "Base de software e experimentação técnica do Astrolink.", cases: ["astrolink"] },
    { name: "Kotlin", use: "Aplicação que representa o inventário de ferramentas do Trakr.", cases: ["trakr"] },
    { name: "ESP32 + RFID/NFC", use: "Camada física de identificação e leitura dos itens no Trakr.", cases: ["trakr"] },
    { name: "GSAP", use: "Continuidade cinematográfica e motion orientado pelo scroll, com reduced motion.", cases: ["charlles-dev-portfolio"] },
  ] },
  cv: { title: "Charlles Augusto — Engenheiro de Software Full Stack", description: "Interfaces, sistemas, automação e experimentos conectados a problemas reais.", print: "Salvar ou imprimir PDF", back: "Voltar ao portfólio", sections: { profile: "Perfil", experience: "Experiência", projects: "Projetos", education: "Educação", certifications: "Certificações", stack: "Stack", contact: "Contato" } },
  contactIntents: { label: "Sobre o que vamos conversar?", options: [
    { id: "project", label: "Um projeto", whatsapp: "Olá, Charlles! Vi seu portfólio e queria conversar sobre um projeto.", emailSubject: "Projeto — contato pelo Charlles.dev", emailBody: "Olá, Charlles!\n\nVi seu portfólio e queria conversar sobre um projeto.\n\nContexto:\nPrazo, se houver:\nReferência:" },
    { id: "opportunity", label: "Uma oportunidade", whatsapp: "Olá, Charlles! Vi seu portfólio e queria conversar sobre uma oportunidade profissional.", emailSubject: "Oportunidade — contato pelo Charlles.dev", emailBody: "Olá, Charlles!\n\nVi seu portfólio e queria conversar sobre uma oportunidade profissional.\n\nEmpresa/time:\nPapel:\nContexto:" },
    { id: "technical", label: "Uma ideia técnica", whatsapp: "Olá, Charlles! Vi seu portfólio e queria trocar uma ideia técnica com você.", emailSubject: "Conversa técnica — Charlles.dev", emailBody: "Olá, Charlles!\n\nVi seu portfólio e queria trocar uma ideia técnica sobre:\n\nContexto:\nLink ou referência:" },
  ] },
  contextMenu: { label: "Atalhos do Charlles.dev", home: "Voltar ao início", projects: "Explorar trabalhos", cv: "Abrir currículo", game: "Jogar Entre Camadas", email: "Copiar e-mail", copied: "E-mail copiado" },
  game: { eyebrow: "Experimento jogável", title: "Bytebound: o bug no circuito", description: "Um micro-RPG do Charlles.dev. Explore o laboratório, recupere três módulos e restaure o sistema antes do deploy.", start: "Começar jogo", continue: "Continuar", reset: "Reiniciar progresso", back: "Voltar ao portfólio", objective: "Objetivo", controls: "Use WASD, setas ou o direcional. Pressione E ou Espaço para interagir.", interact: "Interagir", inventory: "Módulos", complete: "Circuito restaurado. O deploy sobreviveu à madrugada." },
};

function translate(base: ProfessionalContent, locale: "en" | "es"): ProfessionalContent {
  if (locale === "en") return {
    ...base,
    cases: {
      "charlles-dev-portfolio": { ...base.cases["charlles-dev-portfolio"], kicker: "Portfolio as an editorial system", period: "2026 — present", status: "Evolving", role: "Full-stack engineering, visual direction and content", summary: "A multilingual portfolio connecting a cinematic identity, public projects and technical decisions without hiding the work behind the spectacle.", problem: "Developer portfolios often become either context-free technology inventories or visual landings that prove little engineering.", context: "The site needed a memorable identity while remaining fast, crawlable, accessible and maintainable across three languages.", built: ["Next.js App Router architecture with localized routes.", "Server-side public GitHub data with a curated fallback.", "Media system with posters, on-demand video and reduced-motion paths.", "Technical SEO, structured data, Open Graph and an automated quality gate."], architecture: [{ label: "Interface", detail: "React and localized editorial components" }, { label: "Application", detail: "Next.js App Router, metadata and static routes" }, { label: "Data", detail: "Public GitHub data with overrides and fallback snapshot" }, { label: "Quality", detail: "TypeScript, ESLint, Vitest and build checks" }], decisions: [{ title: "Evidence before decoration", body: "Selected projects expose the problem and decision; character assets appear only when they support orientation, state or narrative." }, { title: "Fallback is product work", body: "A GitHub outage does not turn the page blank: a public snapshot preserves the experience and identifies its source." }, { title: "Motion with a job", body: "GSAP and video support continuity and presence, with equivalent touch and reduced-motion paths." }], limitations: ["Professional metrics depend on approved real data; none were invented.", "Video quality still varies with codec, GPU, data-saving mode and browser.", "English and Spanish require periodic native human review."], results: ["A public, traceable base for presenting projects and decisions.", "A localized experience in Portuguese, English and Spanish.", "A quality pipeline validating code, tests, assets, routes and HTML before release."] },
      astrolink: { ...base.cases.astrolink, kicker: "Connectivity in difficult territories", period: "2026 — present", status: "Public prototype", role: "Initial architecture, software and documentation", summary: "A Go technical base for investigating low-cost infrastructure and software for internet access in remote areas.", problem: "Cost, infrastructure availability and territorial constraints make remote connectivity larger than a software installation problem.", context: "The repository is an evolving technical proposal. It organizes hypotheses and software without presenting pending simulation and field validation as finished results.", built: ["A software base in Go.", "A public structure for the proposal and its technical history.", "A foundation for simulations, network assumptions and validation."], architecture: [{ label: "Territory", detail: "Range, energy, cost and maintenance constraints" }, { label: "Network", detail: "Connectivity and communication hypotheses" }, { label: "Software", detail: "Services and experiments organized in Go" }, { label: "Validation", detail: "Simulations and field tests still required" }], decisions: [{ title: "Start from constraints", body: "Architecture begins with territory and cost before choosing technology." }, { title: "Prototype is not production", body: "Status and limitations remain explicit so intent is not presented as a result." }, { title: "Code and documentation together", body: "The technical proposal remains traceable alongside the evolving software." }], limitations: ["No published field validation yet.", "Range, cost and operation assumptions still need documentation and simulation.", "The project does not claim production-ready connectivity."], results: ["A public base for evolving the technical investigation.", "A clear separation between proposal, prototype and future validation.", "Implementation history verifiable on GitHub."] },
      trakr: { ...base.cases.trakr, kicker: "Tools that notice what was left behind", period: "2026 — present", status: "Public experiment", role: "Concept, integration and prototyping", summary: "A smart toolbox combining RFID/NFC identification, ESP32 and a Kotlin application to track physical items.", problem: "In field work, noticing a missing tool only after leaving the site costs time and creates rework.", context: "The project explores how accessible hardware and a mobile interface can maintain a simple inventory without pretending the prototype already covers every real-world condition.", built: ["A physical inventory concept tied to RFID/NFC tags.", "An ESP32 integration base.", "A Kotlin app representing and tracking item state."], architecture: [{ label: "Object", detail: "Tool identified by a tag" }, { label: "Reading", detail: "RFID/NFC connected to ESP32" }, { label: "State", detail: "Inventory and set events" }, { label: "Interface", detail: "Kotlin app for lookup and alerts" }], decisions: [{ title: "Simple hardware, clear hypothesis", body: "ESP32 keeps the experiment accessible and reproducible." }, { title: "State before dashboard", body: "The interface prioritizes knowing what is present or missing over decorative metrics." }, { title: "Layered integration", body: "Physical reading, state and presentation stay separate to make testing easier." }], limitations: ["Reading reliability and interference need physical testing.", "The prototype is not an industrial product.", "Battery life, durability and offline use still require validation."], results: ["A product hypothesis turned into public implementation.", "Hardware, identification and interface integration represented in code.", "A base ready for physical tests and flow iteration."] },
    },
    caseUi: { back: "Back to portfolio", role: "Role", period: "Period", status: "Status", problem: "The problem", context: "Context", built: "What was built", architecture: "Architecture in 60 seconds", decisions: "Decisions and trade-offs", limitations: "Known limitations", results: "Verifiable result", repository: "Open repository", demo: "View project", nextCase: "Next case" },
    experience: { ...base.experience, eyebrow: "Professional practice", title: "Experience that leaves a trail.", description: "A timeline of verifiable projects and responsibilities. Formal roles, clients and metrics only appear when they can be published accurately.", entries: [
      { period: "2026 — present", role: "Full-stack engineering and direction for Charlles.dev", context: "Architecture, interfaces, public integrations, localization, SEO and motion.", result: "A public portfolio with verifiable code, decisions and a quality gate.", caseSlug: "charlles-dev-portfolio" },
      { period: "2026 — present", role: "Initial architecture and software for Astrolink", context: "An investigation into low-cost connectivity for remote areas.", result: "A public proposal and Go base that keeps pending validation visible.", caseSlug: "astrolink" },
      { period: "2026 — present", role: "Hardware and app prototyping for Trakr", context: "Physical inventory using RFID/NFC, ESP32 and Kotlin.", result: "A product hypothesis turned into a traceable integrated experiment.", caseSlug: "trakr" },
    ] },
    stackEvidence: { ...base.stackEvidence, eyebrow: "Stack with proof", title: "A tool earns its place by solving something.", description: "Select a technology to see where it appears and what responsibility it carried.", evidenceLabel: "Evidence in", items: [
      { name: "Next.js", use: "Localized routes, rendering, metadata and server/client composition for the portfolio.", cases: ["charlles-dev-portfolio"] }, { name: "TypeScript", use: "Data contracts, components, integrations and Charlles.dev tests.", cases: ["charlles-dev-portfolio"] }, { name: "React", use: "Interactive state, panels, responsive media and interface accessibility.", cases: ["charlles-dev-portfolio"] }, { name: "Go", use: "Software base and technical experimentation for Astrolink.", cases: ["astrolink"] }, { name: "Kotlin", use: "Application representing the Trakr tool inventory.", cases: ["trakr"] }, { name: "ESP32 + RFID/NFC", use: "Physical item identification and reading layer in Trakr.", cases: ["trakr"] }, { name: "GSAP", use: "Cinematic continuity and scroll motion with reduced-motion support.", cases: ["charlles-dev-portfolio"] },
    ] },
    cv: { title: "Charlles Augusto — Full-stack Software Engineer", description: "Interfaces, systems, automation and experiments tied to real problems.", print: "Save or print PDF", back: "Back to portfolio", sections: { profile: "Profile", experience: "Experience", projects: "Projects", education: "Education", certifications: "Certifications", stack: "Stack", contact: "Contact" } },
    contactIntents: { label: "What should we talk about?", options: [
      { id: "project", label: "A project", whatsapp: "Hi Charlles! I saw your portfolio and would like to discuss a project.", emailSubject: "Project — Charlles.dev contact", emailBody: "Hi Charlles!\n\nI saw your portfolio and would like to discuss a project.\n\nContext:\nTimeline, if any:\nReference:" },
      { id: "opportunity", label: "An opportunity", whatsapp: "Hi Charlles! I saw your portfolio and would like to discuss a professional opportunity.", emailSubject: "Opportunity — Charlles.dev contact", emailBody: "Hi Charlles!\n\nI saw your portfolio and would like to discuss a professional opportunity.\n\nCompany/team:\nRole:\nContext:" },
      { id: "technical", label: "A technical idea", whatsapp: "Hi Charlles! I saw your portfolio and would like to talk about a technical idea.", emailSubject: "Technical conversation — Charlles.dev", emailBody: "Hi Charlles!\n\nI saw your portfolio and would like to discuss:\n\nContext:\nLink or reference:" },
    ] },
    contextMenu: { label: "Charlles.dev shortcuts", home: "Back to top", projects: "Explore work", cv: "Open résumé", game: "Play Between Layers", email: "Copy email", copied: "Email copied" },
    game: { eyebrow: "Playable experiment", title: "Bytebound: the circuit bug", description: "A Charlles.dev micro-RPG. Explore the lab, recover three modules and restore the system before deploy.", start: "Start game", continue: "Continue", reset: "Reset progress", back: "Back to portfolio", objective: "Objective", controls: "Use WASD, arrow keys or the directional pad. Press E or Space to interact.", interact: "Interact", inventory: "Modules", complete: "Circuit restored. The deploy survived the night." },
  };
  return {
    ...base,
    cases: {
      "charlles-dev-portfolio": { ...base.cases["charlles-dev-portfolio"], kicker: "El portafolio como sistema editorial", period: "2026 — presente", status: "En evolución", role: "Ingeniería full stack, dirección visual y contenido", summary: "Un portafolio multilingüe que conecta identidad cinematográfica, proyectos públicos y decisiones técnicas sin ocultar el trabajo detrás del espectáculo.", problem: "Los portafolios de desarrollo suelen convertirse en inventarios de tecnologías sin contexto o en landings visuales que prueban poca ingeniería.", context: "La página necesitaba una identidad memorable y, al mismo tiempo, seguir siendo rápida, rastreable, accesible y mantenible en tres idiomas.", built: ["Arquitectura Next.js App Router con rutas localizadas.", "Datos públicos de GitHub en el servidor con fallback curado.", "Sistema de medios con pósteres, vídeo bajo demanda y movimiento reducido.", "SEO técnico, datos estructurados, Open Graph y quality gate automatizado."], architecture: [{ label: "Interfaz", detail: "React y componentes editoriales localizados" }, { label: "Aplicación", detail: "Next.js App Router, metadata y rutas estáticas" }, { label: "Datos", detail: "GitHub público con overrides y snapshot de fallback" }, { label: "Calidad", detail: "TypeScript, ESLint, Vitest y verificaciones de build" }], decisions: [{ title: "Evidencia antes que decoración", body: "Los proyectos muestran problema y decisión; los assets del personaje solo aparecen cuando aportan orientación, estado o narrativa." }, { title: "El fallback es parte del producto", body: "Una caída de GitHub no deja la página vacía: un snapshot público preserva la experiencia e identifica su origen." }, { title: "Movimiento con función", body: "GSAP y vídeo aportan continuidad y presencia, con alternativas para touch y movimiento reducido." }], limitations: ["Las métricas profesionales dependen de datos reales aprobados; ninguna fue inventada.", "La calidad de vídeo varía según codec, GPU, ahorro de datos y navegador.", "El inglés y el español necesitan revisión humana nativa periódica."], results: ["Una base pública y rastreable para presentar proyectos y decisiones.", "Una experiencia localizada en portugués, inglés y español.", "Un pipeline que valida código, tests, assets, rutas y HTML antes de publicar."] },
      astrolink: { ...base.cases.astrolink, kicker: "Conectividad en territorios difíciles", period: "2026 — presente", status: "Prototipo público", role: "Arquitectura inicial, software y documentación", summary: "Una base técnica en Go para investigar infraestructura y software de bajo costo para internet en áreas remotas.", problem: "Costo, infraestructura disponible y restricciones territoriales hacen que la conectividad remota sea más que instalar software.", context: "El repositorio es una propuesta técnica en evolución. Organiza hipótesis y software sin presentar como resultado lo que aún requiere simulación y campo.", built: ["Base de software en Go.", "Organización pública de la propuesta y su historial técnico.", "Estructura para simulaciones, premisas de red y validaciones."], architecture: [{ label: "Territorio", detail: "Restricciones de alcance, energía, costo y mantenimiento" }, { label: "Red", detail: "Hipótesis de conectividad y comunicación" }, { label: "Software", detail: "Servicios y experimentos organizados en Go" }, { label: "Validación", detail: "Simulaciones y pruebas aún necesarias" }], decisions: [{ title: "Empezar por las restricciones", body: "La arquitectura parte del territorio y del costo antes de elegir tecnología." }, { title: "Prototipo no es producción", body: "Estado y limitaciones quedan explícitos para no convertir intención en resultado." }, { title: "Código y documentación juntos", body: "La propuesta técnica sigue el mismo historial que el software." }], limitations: ["Todavía no hay validación de campo publicada.", "Alcance, costo y operación necesitan documentación y simulación.", "El proyecto no afirma ofrecer conectividad lista para producción."], results: ["Una base pública para evolucionar la investigación técnica.", "Separación clara entre propuesta, prototipo y validación futura.", "Historial verificable en GitHub."] },
      trakr: { ...base.cases.trakr, kicker: "Herramientas que avisan cuando algo quedó atrás", period: "2026 — presente", status: "Experimento público", role: "Concepto, integración y prototipado", summary: "Una caja de herramientas inteligente que combina RFID/NFC, ESP32 y una aplicación Kotlin para seguir objetos físicos.", problem: "En el trabajo de campo, notar una herramienta ausente después de salir cuesta tiempo y genera retrabajo.", context: "El proyecto explora hardware accesible y una interfaz móvil sin fingir que el prototipo cubre todas las condiciones reales.", built: ["Concepto de inventario físico asociado a tags RFID/NFC.", "Base de integración con ESP32.", "Aplicación Kotlin para representar y seguir el estado de los objetos."], architecture: [{ label: "Objeto", detail: "Herramienta identificada por tag" }, { label: "Lectura", detail: "RFID/NFC conectado al ESP32" }, { label: "Estado", detail: "Inventario y eventos del conjunto" }, { label: "Interfaz", detail: "Aplicación Kotlin para consulta y alerta" }], decisions: [{ title: "Hardware simple, hipótesis clara", body: "ESP32 mantiene el experimento accesible y reproducible." }, { title: "Estado antes que dashboard", body: "La interfaz prioriza saber qué está presente o ausente, no métricas decorativas." }, { title: "Integración por capas", body: "Lectura física, estado y presentación quedan separados para facilitar pruebas." }], limitations: ["La fiabilidad de lectura y la interferencia requieren pruebas físicas.", "El prototipo no es un producto industrial.", "Autonomía, resistencia y uso offline aún necesitan validación."], results: ["Una hipótesis de producto convertida en implementación pública.", "Integración entre hardware, identificación e interfaz representada en código.", "Base disponible para pruebas físicas y evolución."] },
    },
    caseUi: { back: "Volver al portafolio", role: "Rol", period: "Período", status: "Estado", problem: "El problema", context: "Contexto", built: "Qué se construyó", architecture: "Arquitectura en 60 segundos", decisions: "Decisiones y trade-offs", limitations: "Limitaciones conocidas", results: "Resultado verificable", repository: "Abrir repositorio", demo: "Ver proyecto", nextCase: "Siguiente caso" },
    experience: { ...base.experience, eyebrow: "Práctica profesional", title: "Experiencia que deja huellas.", description: "Una cronología de proyectos y responsabilidades verificables. Los puestos formales, clientes y métricas solo aparecen cuando pueden publicarse con precisión.", entries: [
      { period: "2026 — presente", role: "Ingeniería full stack y dirección de Charlles.dev", context: "Arquitectura, interfaces, integraciones públicas, localización, SEO y motion.", result: "Portafolio público con código, decisiones y quality gate verificables.", caseSlug: "charlles-dev-portfolio" }, { period: "2026 — presente", role: "Arquitectura inicial y software en Astrolink", context: "Investigación de conectividad de bajo costo para áreas remotas.", result: "Propuesta y base en Go publicadas con las validaciones pendientes visibles.", caseSlug: "astrolink" }, { period: "2026 — presente", role: "Prototipado de hardware y aplicación en Trakr", context: "Inventario físico con RFID/NFC, ESP32 y Kotlin.", result: "Hipótesis convertida en experimento integrado y rastreable.", caseSlug: "trakr" },
    ] },
    stackEvidence: { ...base.stackEvidence, eyebrow: "Stack con pruebas", title: "Una herramienta entra cuando resuelve algo.", description: "Selecciona una tecnología para ver dónde aparece y qué responsabilidad asumió.", evidenceLabel: "Evidencia en", items: [
      { name: "Next.js", use: "Rutas localizadas, renderizado, metadata y composición server/client del portafolio.", cases: ["charlles-dev-portfolio"] }, { name: "TypeScript", use: "Contratos de datos, componentes, integraciones y tests de Charlles.dev.", cases: ["charlles-dev-portfolio"] }, { name: "React", use: "Estados interactivos, paneles, medios responsivos y accesibilidad.", cases: ["charlles-dev-portfolio"] }, { name: "Go", use: "Base de software y experimentación técnica de Astrolink.", cases: ["astrolink"] }, { name: "Kotlin", use: "Aplicación que representa el inventario de Trakr.", cases: ["trakr"] }, { name: "ESP32 + RFID/NFC", use: "Capa física de identificación y lectura en Trakr.", cases: ["trakr"] }, { name: "GSAP", use: "Continuidad cinematográfica y motion por scroll con reduced motion.", cases: ["charlles-dev-portfolio"] },
    ] },
    cv: { title: "Charlles Augusto — Ingeniero de Software Full Stack", description: "Interfaces, sistemas, automatización y experimentos conectados a problemas reales.", print: "Guardar o imprimir PDF", back: "Volver al portafolio", sections: { profile: "Perfil", experience: "Experiencia", projects: "Proyectos", education: "Educación", certifications: "Certificaciones", stack: "Stack", contact: "Contacto" } },
    contactIntents: { label: "¿De qué vamos a hablar?", options: [
      { id: "project", label: "Un proyecto", whatsapp: "¡Hola, Charlles! Vi tu portafolio y me gustaría hablar de un proyecto.", emailSubject: "Proyecto — contacto por Charlles.dev", emailBody: "¡Hola, Charlles!\n\nVi tu portafolio y me gustaría hablar de un proyecto.\n\nContexto:\nPlazo, si existe:\nReferencia:" },
      { id: "opportunity", label: "Una oportunidad", whatsapp: "¡Hola, Charlles! Vi tu portafolio y me gustaría hablar de una oportunidad profesional.", emailSubject: "Oportunidad — contacto por Charlles.dev", emailBody: "¡Hola, Charlles!\n\nVi tu portafolio y me gustaría hablar de una oportunidad profesional.\n\nEmpresa/equipo:\nRol:\nContexto:" },
      { id: "technical", label: "Una idea técnica", whatsapp: "¡Hola, Charlles! Vi tu portafolio y me gustaría conversar sobre una idea técnica.", emailSubject: "Conversación técnica — Charlles.dev", emailBody: "¡Hola, Charlles!\n\nVi tu portafolio y me gustaría conversar sobre:\n\nContexto:\nEnlace o referencia:" },
    ] },
    contextMenu: { label: "Atajos de Charlles.dev", home: "Volver al inicio", projects: "Explorar trabajos", cv: "Abrir currículum", game: "Jugar Entre Capas", email: "Copiar correo", copied: "Correo copiado" },
    game: { eyebrow: "Experimento jugable", title: "Bytebound: el bug del circuito", description: "Un micro-RPG de Charlles.dev. Explora el laboratorio, recupera tres módulos y restaura el sistema antes del deploy.", start: "Empezar juego", continue: "Continuar", reset: "Reiniciar progreso", back: "Volver al portafolio", objective: "Objetivo", controls: "Usa WASD, las flechas o el control direccional. Pulsa E o Espacio para interactuar.", interact: "Interactuar", inventory: "Módulos", complete: "Circuito restaurado. El deploy sobrevivió a la madrugada." },
  };
}

const content: Record<Locale, ProfessionalContent> = { "pt-BR": pt, en: translate(pt, "en"), es: translate(pt, "es") };

export function getProfessionalContent(locale: Locale) { return content[locale]; }
export function getProjectCase(locale: Locale, slug: string) { return caseSlugs.includes(slug as CaseSlug) ? content[locale].cases[slug as CaseSlug] : undefined; }
export function getNextCaseSlug(slug: CaseSlug) { return caseSlugs[(caseSlugs.indexOf(slug) + 1) % caseSlugs.length]; }
