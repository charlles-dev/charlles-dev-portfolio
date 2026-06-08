import Image from "next/image";

import { IconGlyph, type IconName } from "@/components/icon-glyph";
import { profile, profileHighlights, socialLinks } from "@/lib/portfolio";

const linkedInLink = socialLinks.find((link) => link.kind === "linkedin") ?? socialLinks[0];
const githubLink = socialLinks.find((link) => link.kind === "github");

function HeroActionLink({
  href,
  label,
  iconName,
  variant
}: {
  href: string;
  label: string;
  iconName: IconName;
  variant: "primary" | "secondary";
}) {
  const base =
    "inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-[0.92rem] font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
  const variants = {
    primary: "bg-accent text-[#041714] shadow-[0_16px_48px_rgba(34,186,157,0.24)] hover:brightness-110",
    secondary:
      "border border-white/14 bg-white/[0.04] text-white hover:border-accent/70 hover:bg-accent/10"
  };

  return (
    <a className={`${base} ${variants[variant]}`} href={href} target="_blank" rel="noreferrer">
      <IconGlyph name={iconName} className="size-4" />
      <span>{label}</span>
      {variant === "primary" ? <IconGlyph name="arrow-right" className="size-5" /> : null}
    </a>
  );
}

function EditorialPortrait() {
  return (
    <div className="scene-in scene-delay relative mx-auto w-full max-w-[360px] justify-self-center lg:mx-0 lg:max-w-[510px] lg:justify-self-end">
      <div className="absolute -inset-4 rounded-lg border border-accent/15 opacity-70" />
      <div className="absolute inset-x-8 bottom-12 h-32 rounded-full bg-accent/12 blur-3xl" />
      <div className="relative overflow-hidden rounded-lg border border-white/14 bg-[#dce7e1] shadow-[0_38px_120px_rgba(0,0,0,0.48)]">
        <div className="relative aspect-[0.82]">
          <Image
            src="/assets/charlles-portrait.png"
            alt="Retrato editorial de Charlles Augusto"
            fill
            priority
            sizes="(max-width: 768px) 88vw, 510px"
            className="object-cover object-center saturate-[0.94]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.00)_58%,rgba(5,8,7,0.34)_100%)]" />
        </div>
        <div className="absolute inset-x-5 bottom-5 rounded-full border border-white/14 bg-[#050807]/86 px-5 py-4 text-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_46px_rgba(0,0,0,0.36)] sm:text-[0.74rem]">
          {profile.tagline}
        </div>
      </div>
    </div>
  );
}

function ProfileProofRow() {
  return (
    <div className="mx-auto mt-12 grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-5 border-y border-white/10 py-5 sm:grid-cols-4 lg:mt-14">
      {profileHighlights.map((item) => (
        <div className="min-w-0" key={item.label}>
          <div className="flex items-center gap-2">
            <IconGlyph name={item.icon} className="size-4 shrink-0 text-accent" />
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">
              {item.label}
            </p>
          </div>
          <p className="mt-2 text-[1rem] font-semibold leading-tight text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export function HeroSignature() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:pb-12 lg:pt-32"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_28%,rgba(34,186,157,0.12),transparent_30%),linear-gradient(135deg,#050807_0%,#0d1512_42%,#111614_100%)]" />
      <div className="cinematic-grid absolute inset-0 -z-10 opacity-45" />
      <div className="aura-field absolute inset-x-0 top-10 -z-10 mx-auto h-[520px] max-w-[1180px]" />
      <div className="film-grain pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.95fr_0.85fr]">
        <div className="scene-in max-w-[820px] pb-2">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-accent">
            Portfólio profissional / software aplicado
          </p>
          <h1
            id="hero-title"
            aria-label={profile.name}
            className="signature-word mt-7 max-w-[840px] text-[4.8rem] font-semibold leading-[0.8] tracking-normal text-white sm:text-[7rem] lg:text-[9rem] xl:text-[10rem]"
          >
            <span className="block">Charlles</span>{" "}
            <span className="block">Augusto</span>
          </h1>
          <p className="mt-8 max-w-[720px] text-[1.35rem] leading-[1.18] text-white/82 sm:text-[1.9rem] lg:text-[2.35rem]">
            {profile.headline}
          </p>
          <p className="mt-6 max-w-[660px] text-[1.05rem] leading-[1.8] text-white/58 sm:text-[1.18rem]">
            {profile.coverLine}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HeroActionLink
              href={linkedInLink.href}
              label="Conectar no LinkedIn"
              iconName="linkedin"
              variant="primary"
            />
            {githubLink ? (
              <HeroActionLink
                href={githubLink.href}
                label="Ver GitHub"
                iconName="github"
                variant="secondary"
              />
            ) : null}
          </div>
        </div>

        <EditorialPortrait />
      </div>

      <ProfileProofRow />
    </section>
  );
}
