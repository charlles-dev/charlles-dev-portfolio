"use client";

import { useMemo, useState } from "react";

import { IconGlyph, type IconName } from "@/components/icon-glyph";
import type { Project, ProjectCategory } from "@/lib/portfolio";

type ProjectFilter = "all" | ProjectCategory;

const filters: Array<{ label: string; value: ProjectFilter; icon: IconName }> = [
  { label: "Todos", value: "all", icon: "solar-layers" },
  { label: "Infra", value: "infra", icon: "solar-server" },
  { label: "Automação", value: "automation", icon: "solar-bolt" },
  { label: "Base técnica", value: "learning", icon: "solar-star" }
];

const categoryTone: Record<ProjectCategory, string> = {
  infra: "from-accent/24 via-cyan-400/10 to-transparent",
  automation: "from-emerald-300/20 via-accent/10 to-transparent",
  learning: "from-white/16 via-accent/8 to-transparent"
};

function ProjectLink({
  project,
  featured = false
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <a
      className={`project-shimmer group relative isolate overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#08110e]/82 shadow-[0_30px_100px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-accent/50 hover:bg-[#0b1713] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        featured ? "min-h-[560px] p-6 sm:p-8 lg:col-span-7" : "min-h-[268px] p-5 sm:p-6 lg:col-span-5"
      }`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
    >
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${categoryTone[project.category]} opacity-70`} />
      <div className="absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-accent/10 blur-3xl transition duration-700 group-hover:bg-accent/18" />
      <span className="absolute right-5 top-4 font-mono text-[5.5rem] font-bold leading-none text-white/[0.035] sm:right-7 sm:top-6 sm:text-[7rem]">
        {project.scene}
      </span>

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(34,186,157,0.8)]" />
              {project.categoryLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/46">
              {project.language}
            </span>
          </div>

          <div className="mt-10 flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-accent transition duration-500 group-hover:scale-110 group-hover:border-accent/30 group-hover:bg-accent/12">
              <IconGlyph name={project.icon} className="size-7" />
            </span>
            <div>
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/38">
                {project.signal}
              </p>
              <h3
                className={`mt-3 font-semibold leading-[0.95] text-white ${
                  featured ? "text-[3.2rem] sm:text-[4.8rem]" : "text-[2rem] sm:text-[2.45rem]"
                }`}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <p
            className={`mt-7 max-w-[690px] leading-7 text-white/58 ${
              featured ? "text-[1.05rem] sm:text-[1.16rem]" : "text-[0.96rem]"
            }`}
          >
            {project.description}
          </p>
        </div>

        <div>
          <div className={featured ? "grid gap-4 md:grid-cols-3" : "grid gap-4"}>
            {[
              ["Problema", project.problem],
              ["O que fiz", project.built],
              ["Próximo passo", project.next]
            ].map(([label, value]) => (
              <div className="border-t border-white/10 pt-4" key={label}>
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/34">
                  {label}
                </p>
                <p className="mt-2 text-[0.9rem] leading-6 text-white/56">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/42">
              {project.metric}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[0.82rem] font-semibold text-accent transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[#041714]">
              Ver repo
              <IconGlyph name="external-link" className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function ProjectBento({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects]
  );
  const [featuredProject, ...secondaryProjects] = filteredProjects;
  const countLabel = `${filteredProjects.length} ${
    filteredProjects.length === 1 ? "projeto em foco" : "projetos em foco"
  }`;

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex w-full max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-[#07100d]/88 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:w-auto">
          {filters.map((filter) => {
            const selected = activeFilter === filter.value;

            return (
              <button
                aria-pressed={selected}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  selected
                    ? "bg-white text-[#06100d] shadow-[0_12px_34px_rgba(255,255,255,0.08)]"
                    : "text-white/52 hover:bg-white/[0.06] hover:text-white"
                }`}
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                <IconGlyph name={filter.icon} className="size-4" />
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/44">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_20px_rgba(34,186,157,0.72)]" />
          <span>{countLabel}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-12">
        {featuredProject ? <ProjectLink featured project={featuredProject} /> : null}

        {secondaryProjects.length > 0 ? (
          <div className="grid gap-5 lg:col-span-5">
            {secondaryProjects.map((project) => (
              <ProjectLink project={project} key={project.href} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
