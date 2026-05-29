# Premium Controlado Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the one-page portfolio into the approved premium-controlled direction: typographic brand first, editorial portrait second, subtle cinematic motion as detail.

**Architecture:** Keep the app as a single Next.js landing page with local typed content. Split the hero and controlled `Agora` surface into focused components while keeping `ProjectBento` as the only client component for filters. Avoid new routes, APIs, CMS, or external data.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Iconify, Vitest, Testing Library.

---

## File Structure

- Modify `src/lib/portfolio.ts`: add a typed `NowSignal` model, add `nowSignals`, and tighten hero copy for the premium direction.
- Create `src/components/hero-signature.tsx`: new server component for the hero signature, editorial portrait, CTAs, and compact professional proof.
- Create `src/components/now-signals.tsx`: new server component for the controlled three-item `Agora` section.
- Modify `src/components/project-bento.tsx`: preserve filtering but refine card language and structure toward mini cases.
- Modify `src/app/page.tsx`: wire the new components, remove the current hero/portrait functions, reduce repeated decorative section chrome, and keep the page sequence coherent.
- Modify `src/app/globals.css`: add restrained editorial motion utilities and remove CSS that becomes unused after the hero refactor.
- Modify `src/test/page.test.tsx`: test the premium direction, `Agora`, project case labels, and anti-template guardrails.
- Modify `src/test/portfolio.test.ts`: test local typed `nowSignals` and tightened profile copy.
- Keep `src/test/metadata.test.ts` unchanged unless metadata copy changes during implementation.

## Task 1: Premium Content Contract

**Files:**
- Modify: `src/lib/portfolio.ts`
- Modify: `src/test/portfolio.test.ts`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Write the failing portfolio data tests**

Add `nowSignals` to the import list in `src/test/portfolio.test.ts`:

```ts
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
```

Add this test inside the existing `describe("portfolio content", () => {` block:

```ts
it("defines controlled now signals for a maintained portfolio surface", () => {
  expect(profile.headline).toBe("Produtos web, automação e segurança aplicada.");
  expect(profile.coverLine).toContain("interfaces, automações e integrações");
  expect(profile.coverLine).not.toMatch(/ciberseguran.a e IA|produto de IA|AI product/i);
  expect(nowSignals).toHaveLength(3);
  expect(nowSignals.map((item) => item.label)).toEqual([
    "Projeto em foco",
    "Melhoria recente",
    "Prática técnica"
  ]);
  expect(nowSignals.every((item) => item.title && item.description && item.proof && item.icon)).toBe(true);
});
```

Add these expectations to `src/test/page.test.tsx` in the `"renders richer professional surfaces beyond the hero and projects"` test:

```ts
expect(screen.getByRole("heading", { name: /Agora/i })).toBeInTheDocument();
expect(screen.getByText(/Projeto em foco/i)).toBeInTheDocument();
expect(screen.getByText(/Melhoria recente/i)).toBeInTheDocument();
expect(screen.getByText(/Prática técnica/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/test/portfolio.test.ts src/test/page.test.tsx
```

Expected: FAIL because `nowSignals` is not exported and the page does not render `Agora`.

- [ ] **Step 3: Add the typed data contract**

In `src/lib/portfolio.ts`, add this type after `NowItem`:

```ts
export type NowSignal = {
  label: string;
  title: string;
  description: string;
  proof: string;
  icon: IconName;
  href?: string;
};
```

Change `profile.headline` to:

```ts
headline: "Produtos web, automação e segurança aplicada.",
```

Add this export after `nowItems`:

```ts
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
```

- [ ] **Step 4: Run tests to verify the data test passes and page test still fails**

Run:

```bash
npm test -- src/test/portfolio.test.ts src/test/page.test.tsx
```

Expected: `portfolio.test.ts` passes the new `nowSignals` test. `page.test.tsx` still fails because the `Agora` section is not rendered yet.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/lib/portfolio.ts src/test/portfolio.test.ts src/test/page.test.tsx
git commit -m "test: add premium portfolio content contract"
```

Expected: commit succeeds.

## Task 2: Hero Signature Component

**Files:**
- Create: `src/components/hero-signature.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Write the failing hero direction test**

Update the first test in `src/test/page.test.tsx` so the hero expects the approved signature direction:

```ts
it("renders the premium hero signature and primary contact path", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Charlles Augusto/i
    })
  ).toBeInTheDocument();
  expect(screen.getByText(/Produtos web, automação e segurança aplicada/i)).toBeInTheDocument();
  expect(screen.getByText(/marca tipográfica/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Retrato editorial de Charlles Augusto/i)).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /Conectar no LinkedIn/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/charlles-augusto/"
  );
  expect(screen.getByRole("link", { name: /Ver GitHub/i })).toHaveAttribute(
    "href",
    "https://github.com/charlles-dev"
  );
});
```

- [ ] **Step 2: Run the hero test to verify it fails**

Run:

```bash
npm test -- src/test/page.test.tsx
```

Expected: FAIL because the current hero does not include `marca tipográfica` and the image alt text is still `Retrato de Charlles Augusto`.

- [ ] **Step 3: Create `HeroSignature`**

Create `src/components/hero-signature.tsx`:

```tsx
import Image from "next/image";

import { IconGlyph, type IconName } from "@/components/icon-glyph";
import { profile, profileHighlights, socialLinks } from "@/lib/portfolio";

const primaryLink = socialLinks.find((link) => link.primary) ?? socialLinks[0];
const githubLink = socialLinks.find((link) => link.kind === "github");

const socialIconMap = {
  linkedin: "linkedin",
  github: "github",
  email: "mail"
} satisfies Record<(typeof socialLinks)[number]["kind"], IconName>;

function HeroAction({
  href,
  label,
  primary = false,
  iconName
}: {
  href: string;
  label: string;
  primary?: boolean;
  iconName: IconName;
}) {
  return (
    <a
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-[0.92rem] font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        primary
          ? "bg-accent text-[#041714] shadow-[0_16px_48px_rgba(34,186,157,0.24)] hover:brightness-110"
          : "border border-white/14 bg-white/[0.04] text-white hover:border-accent/70 hover:bg-accent/10"
      }`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <IconGlyph name={iconName} className="size-4" />
      <span>{label}</span>
      {primary ? <IconGlyph name="arrow-right" className="size-5" /> : null}
    </a>
  );
}

export function HeroSignature() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:min-h-screen lg:pb-16 lg:pt-32"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(34,186,157,0.16),transparent_30%),linear-gradient(135deg,#050807_0%,#0d1512_44%,#101412_100%)]" />
      <div className="cinematic-grid absolute inset-0 -z-10 opacity-38" />
      <div className="aura-field absolute inset-x-0 top-0 -z-10 mx-auto h-[620px] max-w-[1180px]" />

      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1.1fr_0.78fr] lg:items-end">
        <div className="scene-in">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
            Marca tipográfica / presença editorial
          </p>
          <h1
            id="hero-title"
            className="mt-6 max-w-[980px] text-[4.35rem] font-semibold uppercase leading-[0.82] tracking-normal text-white sm:text-[7rem] lg:text-[9.5rem] xl:text-[11rem]"
          >
            Charlles
            <br />
            Augusto
          </h1>
          <p className="mt-8 max-w-[720px] text-[1.38rem] leading-[1.14] text-white/84 sm:text-[2rem] lg:text-[2.55rem]">
            {profile.headline}
          </p>
          <p className="mt-6 max-w-[680px] text-[1.02rem] leading-[1.8] text-white/58 sm:text-[1.16rem]">
            {profile.coverLine}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HeroAction
              href={primaryLink.href}
              label="Conectar no LinkedIn"
              primary
              iconName={socialIconMap.linkedin}
            />
            {githubLink ? (
              <HeroAction href={githubLink.href} label="Ver GitHub" iconName={socialIconMap.github} />
            ) : null}
          </div>
        </div>

        <div className="scene-in scene-delay relative mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
          <div className="absolute -inset-5 rounded-[2rem] border border-accent/14 opacity-70" />
          <div className="absolute inset-x-8 bottom-10 h-44 rounded-full bg-accent/14 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/14 bg-[#dce7e1] shadow-[0_42px_130px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-[0.86]">
              <Image
                src="/assets/charlles-portrait.png"
                alt="Retrato editorial de Charlles Augusto"
                fill
                priority
                sizes="(max-width: 768px) 88vw, 520px"
                className="object-cover object-center saturate-[0.94]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0)_52%,rgba(5,8,7,0.46)_100%)]" />
            </div>
            <div className="absolute inset-x-5 bottom-5 border-t border-white/18 pt-4">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/64">
                {profile.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1320px] gap-4 border-y border-white/10 py-5 sm:grid-cols-4">
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
    </section>
  );
}
```

- [ ] **Step 4: Wire the new hero in `page.tsx`**

In `src/app/page.tsx`, add:

```tsx
import { HeroSignature } from "@/components/hero-signature";
```

Remove these local functions from `src/app/page.tsx`:

- `PortraitFrame`
- `HeroHighlights`
- `Hero`

Replace this render call:

```tsx
<Hero />
```

with:

```tsx
<HeroSignature />
```

- [ ] **Step 5: Run the page tests**

Run:

```bash
npm test -- src/test/page.test.tsx
```

Expected: PASS for the new hero test. If another test fails because the old headline text changed, update that test to the exact new text `Produtos web, automação e segurança aplicada.`.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/components/hero-signature.tsx src/app/page.tsx src/test/page.test.tsx
git commit -m "feat: add premium hero signature"
```

Expected: commit succeeds.

## Task 3: Controlled Agora Section

**Files:**
- Create: `src/components/now-signals.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Write the focused `Agora` rendering test**

Add this test to `src/test/page.test.tsx`:

```ts
it("renders a controlled Agora section without feed or blog promises", () => {
  render(<Home />);

  const nowSection = screen.getByRole("region", { name: /O que está em construção/i });

  expect(within(nowSection).getByText(/Projeto em foco/i)).toBeInTheDocument();
  expect(within(nowSection).getByText(/Astrolink em evolução/i)).toBeInTheDocument();
  expect(within(nowSection).getByText(/Melhoria recente/i)).toBeInTheDocument();
  expect(within(nowSection).getByText(/Portfólio como produto/i)).toBeInTheDocument();
  expect(within(nowSection).getByText(/Prática técnica/i)).toBeInTheDocument();
  expect(within(nowSection).getByText(/Segurança aplicada no fluxo/i)).toBeInTheDocument();
  expect(within(nowSection).queryByText(/blog/i)).not.toBeInTheDocument();
  expect(within(nowSection).queryByText(/feed/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/test/page.test.tsx
```

Expected: FAIL because the `Agora` section does not exist yet.

- [ ] **Step 3: Create `NowSignals`**

Create `src/components/now-signals.tsx`:

```tsx
import { IconGlyph } from "@/components/icon-glyph";
import { nowSignals } from "@/lib/portfolio";

export function NowSignals() {
  return (
    <section
      aria-labelledby="now-signals-heading"
      className="relative isolate overflow-hidden px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
              Agora
            </p>
            <h2
              id="now-signals-heading"
              className="mt-4 max-w-[620px] text-[2.3rem] font-semibold leading-[1] text-white sm:text-[3.4rem]"
            >
              O que está em construção.
            </h2>
          </div>
          <p className="max-w-[610px] text-[1rem] leading-8 text-white/56">
            Três sinais curtos para mostrar foco atual sem transformar o portfólio em feed, blog vazio ou painel artificial.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {nowSignals.map((item, index) => {
            const content = (
              <article className="group relative h-full overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/[0.032] p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-accent/8">
                <span className="absolute right-4 top-4 font-mono text-[3.8rem] font-bold leading-none text-white/[0.035]">
                  0{index + 1}
                </span>
                <IconGlyph name={item.icon} className="size-6 text-accent" />
                <p className="mt-8 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.label}
                </p>
                <h3 className="mt-3 text-[1.28rem] font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-[0.94rem] leading-7 text-white/54">{item.description}</p>
                <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/36">
                  {item.proof}
                </p>
              </article>
            );

            return item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                key={item.label}
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire `NowSignals` into the landing**

In `src/app/page.tsx`, add:

```tsx
import { NowSignals } from "@/components/now-signals";
```

Replace the current `CurrentWork` render:

```tsx
<CurrentWork />
```

with:

```tsx
<NowSignals />
```

Remove the local `CurrentWork` function if no longer used. Remove `nowItems` and `workPrinciples` from the import list if they become unused.

- [ ] **Step 5: Run tests**

Run:

```bash
npm test -- src/test/page.test.tsx src/test/portfolio.test.ts
```

Expected: PASS. If `portfolio.test.ts` still asserts `nowItems` and `workPrinciples`, keep those exports in `src/lib/portfolio.ts` for now and update only page-rendering tests to use `nowSignals`.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/components/now-signals.tsx src/app/page.tsx src/test/page.test.tsx src/lib/portfolio.ts src/test/portfolio.test.ts
git commit -m "feat: add controlled agora section"
```

Expected: commit succeeds.

## Task 4: Project Cards as Mini Cases

**Files:**
- Modify: `src/components/project-bento.tsx`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Update project tests for case language**

In `src/test/page.test.tsx`, update the `"renders the selected projects as linked evidence"` test:

```ts
it("renders the selected projects as public mini cases", () => {
  render(<Home />);

  const projects = screen.getByRole("region", { name: /Trabalhos p.blicos/i });

  expect(within(projects).getByRole("link", { name: /Astrolink/i })).toHaveAttribute(
    "href",
    "https://github.com/charlles-dev/Astrolink"
  );
  expect(within(projects).getAllByText("Problema")).toHaveLength(3);
  expect(within(projects).getAllByText("Decisão técnica")).toHaveLength(3);
  expect(within(projects).getAllByText("Próximo passo")).toHaveLength(3);
  expect(within(projects).getAllByText(/Mini case/i).length).toBeGreaterThanOrEqual(1);
  expect(within(projects).getByRole("link", { name: /Laudos Proxxima/i })).toBeInTheDocument();
  expect(within(projects).getByRole("link", { name: /3035 Teach/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/test/page.test.tsx
```

Expected: FAIL because the cards still render `O que fiz` and no `Mini case` label.

- [ ] **Step 3: Refine project card labels**

In `src/components/project-bento.tsx`, change the details array:

```tsx
{[
  ["Problema", project.problem],
  ["Decisão técnica", project.built],
  ["Próximo passo", project.next]
].map(([label, value]) => (
```

Add this small label above the category pills inside `ProjectLink`:

```tsx
<p className="mb-4 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/34">
  Mini case público
</p>
```

Place it directly before:

```tsx
<div className="flex flex-wrap items-center gap-2">
```

Change the card background class from:

```tsx
bg-[#08110e]/82
```

to:

```tsx
bg-[#07100d]/78
```

Change the featured card minimum height from:

```tsx
min-h-[560px]
```

to:

```tsx
min-h-[520px]
```

- [ ] **Step 4: Run project tests**

Run:

```bash
npm test -- src/test/page.test.tsx
```

Expected: PASS, including the filter test.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/project-bento.tsx src/test/page.test.tsx
git commit -m "feat: refine projects as mini cases"
```

Expected: commit succeeds.

## Task 5: Footer And Editorial Motion Polish

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/test/page.test.tsx`

- [ ] **Step 1: Add tests for footer signature and motion guardrails**

Add this test to `src/test/page.test.tsx`:

```ts
it("keeps the footer as a typographic signature with direct contact", () => {
  render(<Home />);

  const footer = screen.getByRole("contentinfo", { name: /Construindo produto/i });

  expect(within(footer).getByText(/Contato direto/i)).toBeInTheDocument();
  expect(within(footer).getByText(/Charlles/i)).toBeInTheDocument();
  expect(within(footer).getByText(/Augusto/i)).toBeInTheDocument();
  expect(within(footer).getByRole("link", { name: /open linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/charlles-augusto/"
  );
  expect(within(footer).getByRole("link", { name: /mailto charllesgst/i })).toHaveAttribute(
    "href",
    "mailto:charllesgst@gmail.com"
  );
});
```

Extend the anti-template test with:

```ts
expect(screen.queryByText(/HUD/i)).not.toBeInTheDocument();
expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
expect(screen.queryByText(/painel artificial/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run tests**

Run:

```bash
npm test -- src/test/page.test.tsx
```

Expected: footer test may pass already. Anti-template additions should pass. Keep this as a regression guard.

- [ ] **Step 3: Add editorial motion utilities**

Append this to `src/app/globals.css` before `@media (prefers-reduced-motion: reduce)`:

```css
.editorial-rise {
  animation: editorial-rise 820ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.editorial-delay {
  animation-delay: 120ms;
}

.signature-word {
  text-wrap: balance;
}

@keyframes editorial-rise {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Inside the existing `@media (prefers-reduced-motion: reduce)` block, keep the existing global animation override. It already disables `.editorial-rise`.

- [ ] **Step 4: Apply footer typographic class**

In `src/app/page.tsx`, change the footer big-name paragraph class:

```tsx
className="signature-word font-mono text-[clamp(3.4rem,12vw,11rem)] font-bold uppercase leading-[0.82] tracking-normal text-white"
```

If `HeroSignature` uses a large name block, add `signature-word` to that `h1` as well.

- [ ] **Step 5: Run tests and lint**

Run:

```bash
npm test -- src/test/page.test.tsx
npm run lint
```

Expected: both commands pass.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/app/page.tsx src/app/globals.css src/test/page.test.tsx src/components/hero-signature.tsx
git commit -m "style: polish typographic signature and motion"
```

Expected: commit succeeds.

## Task 6: Final Verification And Browser QA

**Files:**
- No source edits expected unless QA finds issues.

- [ ] **Step 1: Run full automated verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- `npm test`: all tests pass.
- `npm run lint`: no ESLint errors.
- `npm run build`: Next.js build completes successfully.

- [ ] **Step 2: Restart the local production server**

Run:

```powershell
$existing = Get-NetTCPConnection -LocalPort 3001 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess
if ($existing) { Stop-Process -Id $existing; Start-Sleep -Milliseconds 800 }
$logDir = Join-Path $env:TEMP 'codex-portfolio-cinematic'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$out = Join-Path $logDir 'next-start-3001.out.log'
$err = Join-Path $logDir 'next-start-3001.err.log'
Start-Process -FilePath 'npm.cmd' -ArgumentList @('run','start','--','--hostname','127.0.0.1','--port','3001') -WorkingDirectory 'C:\Users\charl\OneDrive\Documentos\portifólio' -WindowStyle Hidden -RedirectStandardOutput $out -RedirectStandardError $err
Start-Sleep -Seconds 3
Get-NetTCPConnection -LocalPort 3001 -State Listen -ErrorAction SilentlyContinue | Select-Object -Property LocalAddress,LocalPort,OwningProcess
```

Expected: a listener appears on `127.0.0.1:3001`.

- [ ] **Step 3: Browser QA checklist**

Open:

```text
http://127.0.0.1:3001/
```

Check:

- page title is professional;
- hero shows `Charlles Augusto`;
- portrait image loads;
- LinkedIn and GitHub links are visible;
- `Agora` section shows exactly three signals;
- project filters still update visible projects;
- no visible old labels: `Professional toolkit`, `Delivery signal`, `Delivery mode`, `Core system`, `Terminal signature`, `VOL. I`, `Online agora`, `IA aplicada ao produto`, `software, cyber e IA`, `cibersegurança e IA`;
- no horizontal overflow on desktop or mobile;
- console has no relevant warnings or errors.

- [ ] **Step 4: Capture screenshots**

Run:

```powershell
npx playwright screenshot --full-page --viewport-size=1440,1200 http://127.0.0.1:3001/ "$env:TEMP\codex-portfolio-cinematic\charlles-premium-desktop.png"
npx playwright screenshot --full-page --viewport-size=390,1100 http://127.0.0.1:3001/ "$env:TEMP\codex-portfolio-cinematic\charlles-premium-mobile.png"
```

Expected: both screenshot files are created outside the repo.

- [ ] **Step 5: Commit final fixes if QA required edits**

If QA required source changes, run:

```bash
git add src
git commit -m "fix: address premium portfolio qa"
```

Expected: commit succeeds only if there were additional QA fixes.

## Self-Review

- Spec coverage: Tasks cover the hero signature, typographic identity, controlled `Agora`, project mini cases, restrained motion, footer polish, and browser QA.
- Placeholder scan: no placeholder markers or unspecified implementation steps remain.
- Type consistency: `NowSignal`, `nowSignals`, `HeroSignature`, and `NowSignals` are named consistently across tests, components, and data.
