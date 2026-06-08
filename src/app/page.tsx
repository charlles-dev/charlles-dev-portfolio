import Image from "next/image";

import { HeroSignature } from "@/components/hero-signature";
import { IconGlyph, type IconName } from "@/components/icon-glyph";
import { NowSignals } from "@/components/now-signals";
import { ProjectBento } from "@/components/project-bento";
import {
  heroSignals,
  interestAreas,
  learningTimeline,
  navItems,
  profile,
  projects,
  socialLinks,
  stack
} from "@/lib/portfolio";

const primaryLink = socialLinks.find((link) => link.primary) ?? socialLinks[0];
const githubLink = socialLinks.find((link) => link.kind === "github");
const emailLink = socialLinks.find((link) => link.kind === "email");

const socialIconMap = {
  linkedin: "linkedin",
  github: "github",
  email: "mail"
} satisfies Record<(typeof socialLinks)[number]["kind"], IconName>;

const identitySignals: Array<{ label: string; value: string; detail: string; icon: IconName }> = [
  {
    label: "Base",
    value: "Atuação remota",
    detail: "Atuação remota, entrega pública e documentação clara.",
    icon: "solar-map"
  },
  {
    label: "Vetor",
    value: "Dev + Cyber",
    detail: "Web, automação e segurança como linguagem de produto.",
    icon: "solar-shield"
  },
  {
    label: "Modo",
    value: "Entrega pública",
    detail: "Projeto, contexto e próximo passo sempre visíveis.",
    icon: "solar-route"
  }
];

const fieldLogs: Array<{ title: string; meta: string; body: string; icon: IconName }> = [
  {
    title: "Entrega visível",
    meta: "GitHub / projetos públicos",
    body: "Cada repositório precisa mostrar decisão técnica, problema real e uma próxima iteração clara.",
    icon: "github"
  },
  {
    title: "Critério de segurança",
    meta: "Cybersecurity / defesa",
    body: "Redes, endpoint e boas práticas entram como base para criar software com mais responsabilidade.",
    icon: "solar-shield"
  },
  {
    title: "Automação com critério",
    meta: "Automação / análise",
    body: "Automações entram quando reduzem atrito real, melhoram revisão e deixam o fluxo mais confiável.",
    icon: "brain"
  },
  {
    title: "Documentação profissional",
    meta: "Método de entrega",
    body: "Registrar contexto reduz retrabalho e deixa manutenção, colaboração e evolução mais claras.",
    icon: "solar-document"
  }
];

const deliveryFocusItems: Array<{ label: string; value: string }> = [
  { label: "Produto", value: "Interfaces claras" },
  { label: "Operação", value: "Fluxos automatizados" },
  { label: "Confiança", value: "Segurança aplicada" }
];

const toolkitSignals = ["web", "api", "segurança"];

function ArrowIcon() {
  return <IconGlyph name="arrow-right" className="size-5" />;
}

function Brand() {
  return (
    <a
      className="group inline-flex items-center gap-3.5 text-white"
      href="#top"
      aria-label="Voltar ao topo"
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center">
        <Image
          src="/assets/charlles-dev.svg"
          alt=""
          width={18}
          height={20}
          priority
          className="drop-shadow-[0_0_18px_rgba(34,186,157,0.22)] transition-transform duration-500 group-hover:scale-110"
        />
      </span>
      <span className="brand-wordmark text-[1.02rem] font-semibold lowercase text-white">
        charlles<span className="text-accent">.</span>dev
      </span>
    </a>
  );
}

function SocialButton({
  href,
  label,
  variant = "secondary",
  iconName
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "dark";
  iconName?: IconName;
}) {
  const base =
    "inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-[0.92rem] font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
  const variants = {
    primary: "bg-accent text-[#041714] shadow-[0_16px_48px_rgba(34,186,157,0.24)] hover:brightness-110",
    secondary:
      "border border-white/14 bg-white/[0.04] text-white hover:border-accent/70 hover:bg-accent/10",
    dark: "border border-white/10 bg-white text-[#06100d] hover:bg-accent"
  };

  return (
    <a className={`${base} ${variants[variant]}`} href={href} target="_blank" rel="noreferrer">
      {iconName ? <IconGlyph name={iconName} className="size-4" /> : null}
      <span>{label}</span>
      {variant === "primary" ? <ArrowIcon /> : null}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  headingId,
  className = ""
}: {
  eyebrow: string;
  title: string;
  description: string;
  headingId?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="mt-5 max-w-[820px] text-[2.35rem] font-semibold leading-[1] text-white sm:text-[3.45rem] lg:text-[4.35rem]"
      >
        {title}
      </h2>
      <p className="mt-6 max-w-[560px] text-[1.02rem] leading-8 text-white/56">
        {description}
      </p>
    </div>
  );
}

function CinematicDivider({ label }: { label: string }) {
  return (
    <div className="cinematic-divider relative z-20 flex items-center justify-center overflow-hidden bg-[#050807] px-5 py-9 sm:px-8">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/8" />
      <div className="absolute inset-x-0 top-1/2 mx-auto h-px w-3/4 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="relative flex items-center gap-4 rounded-full border border-white/10 bg-[#050807] px-5 py-2.5 shadow-[0_16px_54px_rgba(0,0,0,0.35)]">
        <span className="flex gap-1">
          <span className="h-3 w-0.5 rounded-full bg-white/18" />
          <span className="h-3 w-0.5 rounded-full bg-white/18" />
        </span>
        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/38">
          {label}
        </span>
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(34,186,157,0.72)]" />
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-8">
      <div className="pointer-events-auto mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-white/10 bg-[#050807]/76 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-5">
        <Brand />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/58 transition hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
          <SocialButton
            href={primaryLink.href}
            label="LinkedIn"
            variant="dark"
            iconName={socialIconMap.linkedin}
          />
        </nav>
      </div>
    </header>
  );
}

function SignalTicker() {
  const tickerItems = [
    "Produto web",
    "Next.js",
    "Projetos públicos",
    "Automação",
    "Go",
    "TypeScript",
    "Documentação",
    "Segurança aplicada"
  ];
  const loop = [...tickerItems, ...tickerItems];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#050807] py-6">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050807] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050807] to-transparent" />
      <div className="signal-ticker flex w-max items-center gap-5">
        {loop.map((item, index) => (
          <span
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/48"
            key={`${item}-${index}`}
          >
            <IconGlyph name={index % 2 === 0 ? "solar-transmission" : "solar-graph"} className="size-4 text-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="radial-dot-field relative isolate scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="absolute right-0 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-accent/8 blur-[120px]" />

      <div className="mx-auto grid max-w-[1320px] gap-10 border-y border-white/10 py-12 lg:grid-cols-[0.88fr_0.72fr] lg:items-start lg:py-16">
        <div className="relative">
          <div className="absolute -left-5 top-1 hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-accent via-accent/24 to-transparent lg:block" />
          <p className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-accent">
            Sobre
          </p>
          <p className="mt-8 max-w-[360px] text-[1.05rem] leading-8 text-white/48">
            Um recorte direto de como atuo, construo e apresento valor técnico.
          </p>
        </div>
        <div>
          <h2
            id="about-heading"
            className="max-w-[860px] text-[2.55rem] font-semibold leading-[1] tracking-normal text-white sm:text-[3.8rem] lg:text-[5rem]"
          >
            {profile.manifestoTitle}
          </h2>
          <p className="mt-10 max-w-[760px] text-[1.18rem] leading-[1.8] text-white/62 sm:text-[1.35rem]">
            {profile.manifestoBody}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroSignals.map((signal) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:border-accent/30 hover:bg-accent/8"
                key={signal.title}
              >
                <IconGlyph name={signal.icon} className="size-5 text-accent" />
                <p className="mt-4 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/36">
                  {signal.scene}
                </p>
                <h3 className="mt-2 text-[1rem] font-semibold text-white">{signal.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <aside className="glass-panel relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07100d]/82 p-5 shadow-[0_34px_110px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6 lg:col-span-2">
          <div className="absolute -right-24 -top-24 size-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-accent">
                Resumo profissional
              </p>
              <h3 className="mt-3 text-[1.6rem] font-semibold text-white">Charlles.dev</h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/42">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
              </span>
              Disponível para conexões
            </div>
          </div>

          <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
            {identitySignals.map((signal) => (
              <div className="grid grid-cols-[2.75rem_1fr] gap-4 rounded-2xl border border-white/8 bg-white/[0.026] p-4" key={signal.label}>
                <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                  <IconGlyph name={signal.icon} className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/34">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-[1rem] font-semibold text-white">{signal.value}</p>
                  <p className="mt-2 text-[0.86rem] leading-6 text-white/46">{signal.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 p-4">
            <div className="flex flex-col gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/36 sm:flex-row sm:items-center sm:justify-between">
              <span>Como me apresento</span>
              <span className="text-accent">projetos + contexto</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {deliveryFocusItems.map((item) => (
                <div className="border-l border-accent/35 pl-4" key={item.label}>
                  <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/32">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[0.94rem] font-semibold text-white/74">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projects-heading"
      className="scroll-mt-28 px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="Projetos selecionados"
            title="Trabalhos públicos que mostram raciocínio técnico."
            description="Cada repositório agora aparece como mini case: problema, entrega e próximo passo."
            headingId="projects-heading"
          />
          <p className="max-w-[430px] text-[1.05rem] leading-8 text-white/54">
            A intenção é mostrar processo, não apenas uma lista de nomes bonitos.
          </p>
        </div>

        <ProjectBento projects={projects} />

      </div>
    </section>
  );
}

function InterestAreas() {
  return (
    <section aria-labelledby="interests-heading" className="relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:py-24">
      <div className="absolute left-0 top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-cyan-400/5 blur-[120px]" />
      <div className="mx-auto max-w-[1320px]">
        <SectionIntro
          eyebrow="Áreas de interesse"
          title="Áreas onde atuo e aprofundo."
          description="Quatro frentes que conectam minha atuação técnica com o tipo de produto que quero entregar."
          headingId="interests-heading"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {interestAreas.map((area, index) => (
            <article
              className="system-card group relative min-h-[430px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07100d]/78 p-6 shadow-[0_26px_90px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:border-accent/35 hover:bg-[#0b1713]"
              key={area.title}
            >
              <div className="absolute inset-x-6 top-24 h-px bg-gradient-to-r from-transparent via-accent/28 to-transparent opacity-60" />
              <span className="absolute right-5 top-5 font-mono text-[4.8rem] font-bold leading-none text-white/[0.035]">
                0{index + 1}
              </span>
              <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-accent transition duration-500 group-hover:scale-110 group-hover:border-accent/30 group-hover:bg-accent/12">
                    <IconGlyph name={area.icon} className="size-7" />
                  </span>
                  <p className="mt-8 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent">
                    Área / 0{index + 1}
                  </p>
                  <h3 className="mt-3 text-[1.65rem] font-semibold leading-tight text-white">{area.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-white/54">
                    {area.description}
                  </p>
                </div>
                <div>
                  <div className="mb-5 h-px overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-full -translate-x-full rounded-full bg-accent transition duration-700 group-hover:translate-x-0" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.tools.map((tool) => (
                      <span
                        className="rounded-full border border-white/10 bg-[#050807]/55 px-3 py-2 text-[0.75rem] font-semibold text-white/70"
                        key={tool}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningTimeline() {
  return (
    <section
      id="stack"
      aria-labelledby="learning-heading"
      className="radial-dot-field relative isolate scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="absolute right-0 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-accent/7 blur-[130px]" />
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionIntro
            eyebrow="Stack e credenciais"
            title="Stack, credenciais e prática."
            description="A stack mostra ferramentas em uso; as credenciais entram como evidência de base técnica e disciplina profissional."
            headingId="learning-heading"
          />
          <div className="glass-panel mt-10 rounded-[1.35rem] border border-white/10 bg-[#07100d]/80 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-accent">
                Ferramentas de trabalho
              </p>
              <IconGlyph name="solar-cpu" className="size-5 text-accent" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  className="rounded-full border border-white/10 bg-[#050807]/55 px-5 py-3 text-[0.92rem] font-semibold text-white/82 transition hover:border-accent/35 hover:bg-accent/10"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {toolkitSignals.map((item, index) => (
                <div key={item}>
                  <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/32">
                    {item}
                  </p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${68 + index * 11}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ol className="relative space-y-4">
          {learningTimeline.map((step, index) => (
            <li
              className="project-shimmer group relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.032] p-5 transition duration-300 hover:border-accent/35 hover:bg-accent/8 sm:p-6"
              key={`${step.title}-${step.source}`}
            >
              <span className="absolute right-5 top-4 font-mono text-[4rem] font-bold leading-none text-white/[0.035]">
                0{index + 1}
              </span>
              <div className="relative z-10 grid gap-5 sm:grid-cols-[auto_1fr]">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent transition duration-300 group-hover:scale-110">
                  <IconGlyph name={step.icon} className="size-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {step.period} / 0{index + 1}
                    </span>
                    <span className="h-px w-8 bg-white/14" />
                    <span className="text-[0.84rem] font-semibold text-white/42">{step.source}</span>
                  </div>
                  <h3 className="mt-3 text-[1.35rem] font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/56">{step.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.82rem] font-semibold text-white/42">
                    <span className="h-px w-10 bg-accent/45" />
                    <span>Base aplicada em projetos públicos</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FieldLogs() {
  return (
    <section aria-labelledby="logs-heading" className="relative overflow-hidden border-y border-white/10 bg-[#050807] px-5 py-16 sm:px-8 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Notas de campo"
            title="Notas de campo"
            description="Sinais de rotina profissional: entrega, critério técnico, documentação e melhoria contínua."
            headingId="logs-heading"
          />
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/42">
            <span className="size-2 rounded-full bg-accent shadow-[0_0_18px_rgba(34,186,157,0.72)]" />
            Registro profissional
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {fieldLogs.map((log, index) => (
            <article
              className="project-shimmer group relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-accent/8"
              key={log.title}
            >
              <span className="absolute right-4 top-4 font-mono text-[3.6rem] font-bold leading-none text-white/[0.035]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <IconGlyph name={log.icon} className="size-6 text-accent" />
              <p className="mt-8 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/34">
                {log.meta}
              </p>
              <h3 className="mt-3 text-[1.25rem] font-semibold text-white">{log.title}</h3>
              <p className="mt-4 text-[0.94rem] leading-7 text-white/52">{log.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignatureFooter() {
  const commandLinks = [
    {
      command: "open linkedin",
      label: "LinkedIn",
      href: primaryLink.href,
      icon: socialIconMap.linkedin
    },
    {
      command: "git remote github",
      label: "GitHub",
      href: githubLink?.href ?? "https://github.com/charlles-dev",
      icon: socialIconMap.github
    },
    {
      command: "mailto charllesgst",
      label: profile.email,
      href: emailLink?.href ?? `mailto:${profile.email}`,
      icon: socialIconMap.email
    }
  ];

  return (
    <footer
      id="contato"
      aria-labelledby="contact-heading"
      className="relative isolate scroll-mt-28 overflow-hidden px-5 pb-6 pt-14 sm:px-8 lg:pt-20"
    >
      <div className="absolute inset-x-0 bottom-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_100%,rgba(34,186,157,0.16),transparent_56%)]" />

      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-lg border border-white/10 bg-[#07100d]/92 shadow-[0_40px_140px_rgba(0,0,0,0.45)]">
        <div className="grid gap-8 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-between gap-10">
            <p className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-accent">
              Contato direto
            </p>
            <h2
              id="contact-heading"
              className="mt-6 max-w-[760px] text-[2.35rem] font-semibold leading-[1] text-white sm:text-[3.6rem] lg:text-[4.45rem]"
            >
              Construindo produto, automação e presença técnica com clareza.
            </h2>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/42">
              <span>Projetos web e automação</span>
              <span className="hidden text-white/18 sm:inline">/</span>
              <span>{profile.role}</span>
              <span className="hidden text-white/18 sm:inline">/</span>
              <span>Produto + segurança</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="size-3 rounded-full bg-[#ff5f56]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-accent" />
              <span className="ml-auto font-mono text-[0.72rem] text-white/36">charlles.dev</span>
            </div>
            <div className="space-y-3 pt-5 font-mono">
              {commandLinks.map((link) => (
                <a
                  className="group flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.035] px-4 py-4 text-[0.86rem] text-white/70 transition hover:border-accent/40 hover:bg-accent/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  href={link.href}
                  key={link.command}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconGlyph name={link.icon} className="size-5 text-accent" />
                  <span className="text-accent">$</span>
                  <span>{link.command}</span>
                  <span className="ml-auto hidden text-white/34 transition group-hover:text-white/60 sm:inline">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-6 border-t border-white/10 pt-5 text-[0.98rem] leading-7 text-white/52">
              Para conversar sobre projetos, oportunidades ou colaboração técnica, esses são os caminhos
              mais diretos.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <p className="signature-word font-mono text-[clamp(3.4rem,12vw,11rem)] font-bold uppercase leading-[0.82] tracking-normal text-white">
            Charlles
            <br />
            Augusto
          </p>
          <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 text-[0.78rem] uppercase tracking-[0.18em] text-white/36 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono font-semibold">© 2026 / charlles-dev</p>
            <div className="flex items-center gap-3 font-mono">
              <Image src="/assets/charlles-dev.svg" alt="" width={20} height={20} />
              <span>{profile.handle}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <HeroSignature />
      <CinematicDivider label="Contexto" />
      <About />
      <SignalTicker />
      <NowSignals />
      <CinematicDivider label="Entrega" />
      <Projects />
      <InterestAreas />
      <CinematicDivider label="Base" />
      <LearningTimeline />
      <FieldLogs />
      <SignatureFooter />
    </main>
  );
}
