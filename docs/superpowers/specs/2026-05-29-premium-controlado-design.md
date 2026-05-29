# Premium Controlado Portfolio Design

## Status

Approved direction from visual brainstorming on May 29, 2026.

The chosen direction is a controlled blend of:

- **B as the base:** typographic brand, with `Charlles Augusto` treated as a visual signature.
- **A as presence:** a more editorial portrait treatment, with the photo integrated into the hero instead of feeling like a card preview.
- **C as detail:** subtle cinematic motion that supports hierarchy without becoming a fake HUD, AI dashboard, or template effect.

## Goal

Improve the current one-page portfolio so it feels more premium, personal, and professionally authored while preserving the grounded tone already established.

The target impression is:

- a real developer with taste and technical clarity;
- a portfolio that feels maintained, not generated;
- strong first impression without adding empty sections;
- cinematic, but restrained.

## Non-Goals

This iteration will not add:

- blog routes;
- course platform;
- CMS;
- public API endpoints;
- large changelog/feed;
- fake dashboards, HUD panels, equalizers, terminal gimmicks, or AI-product language.

## User-Facing Changes

### 1. Hero as Signature

The hero should be redesigned around a stronger visual identity:

- larger typographic presence for `Charlles Augusto`;
- a shorter, more memorable supporting phrase;
- portrait used as an editorial visual layer, not as a contained card;
- CTA hierarchy remains simple: LinkedIn primary, GitHub secondary;
- existing professional positioning stays focused on web products, automation, and applied security.

### 2. Typographic Identity

Typography should become a clearer part of the brand:

- keep the mono/sans combination, but use it with more intentional hierarchy;
- use the name as a recurring signature in the hero and footer;
- reduce repeated small uppercase labels where they feel decorative rather than useful;
- keep spacing tighter and more deliberate between sections.

### 3. Controlled Living Section

Add or reshape a short `Agora` section with only three maintained signals:

- project in focus;
- recent improvement;
- technical focus in practice.

The content should live in local typed data. It should be easy to update but should not imply a daily feed or unfinished blog.

### 4. Projects With More Professional Context

Keep the current selected project area, but make cards feel less generic:

- stronger case framing;
- clearer "problem -> decision -> next step";
- better visual differentiation between featured and secondary projects;
- less repeated chrome across cards.

### 5. Motion as Detail

Use subtle motion only where it improves polish:

- entrance/reveal on scroll, respecting `prefers-reduced-motion`;
- hover/focus states with professional restraint;
- section transitions using depth, opacity, and spacing rather than flashy effects.

Motion should never distract from content or make the site feel like an AI template.

## Component And Data Plan

### Components

Likely components to introduce or refine:

- `HeroSignature`: updated hero composition and portrait treatment.
- `NowStrip` or `NowSignals`: three controlled living updates.
- `ProjectBento`: refine existing project cards, not replace the concept.
- `SignatureFooter`: improve big-name footer and contact area.
- `SectionIntro`: audit repeated label usage and spacing.

### Data

Extend local typed content only where needed:

- `NowSignal` for the three `Agora` items.
- Optional project fields for stronger case context if current fields are not enough.

No external data source is required for this iteration.

## Visual Rules

- Green `#22ba9d` stays the main accent.
- Avoid fake technical UI labels such as "signal", "core system", "delivery mode", and similar.
- Avoid generic AI/SaaS visual language.
- Avoid overusing cards inside cards.
- The portrait and name should carry the premium feeling more than decorative effects.
- Keep the dark cinematic atmosphere, but make the composition more editorial.

## Accessibility And Responsiveness

The redesign must preserve:

- keyboard-visible focus states;
- readable contrast;
- no horizontal overflow;
- responsive typography without viewport-width font scaling;
- readable mobile hero and footer;
- reduced motion support.

## Testing And QA

Run:

- `npm test`;
- `npm run lint`;
- `npm run build`.

Browser QA on `http://127.0.0.1:3001/`:

- desktop and mobile screenshots;
- hero image loads;
- no horizontal overflow;
- LinkedIn, GitHub, and email links work;
- project filters still work;
- `prefers-reduced-motion` behavior remains safe;
- old AI-template labels do not reappear.

## Implementation Order

1. Update tests for the new premium direction and guardrails.
2. Refine local typed content for `Agora` and hero copy.
3. Redesign hero into the signature/editorial composition.
4. Add or reshape the controlled `Agora` section.
5. Refine project card visual language.
6. Polish footer and repeated spacing.
7. Run full test/build/browser QA.

## Hero Priority

The first implementation should prioritize the name as the dominant visual anchor, with the portrait layered into the composition as an editorial presence.

This follows the approved hierarchy:

- typographic brand first;
- human presence second;
- cinematic motion as detail.
