---
name: portfolio-experience-director
description: >-
  Directs UI, UX, typography, motion, copy, accessibility, and responsive quality
  for the Charlles.dev portfolio. Use for any change to pages, panels, navigation,
  visual hierarchy, animation, portfolio copy, project presentation, or shared
  design tokens so the result preserves the site's identity and avoids generic
  AI-generated styling.
---

# Portfolio Experience Director

Preserve the portfolio's authored character while making every route feel like one product.

## Required context

Before changing a visual or reader-facing surface:

1. Read `references/identity.md`.
2. Read `references/page-quality-bar.md`.
3. Read `references/motion-and-accessibility.md` when motion, interaction, or navigation changes.
4. Read all localized copy for the affected surface before rewriting any string.

## Working method

1. Capture the current desktop and mobile state before editing.
2. Identify the page's single job and the strongest piece of evidence it provides.
3. Remove unsupported or repeated furniture before adding decoration.
4. Reuse the shared type, color, spacing, border, and motion tokens in `globals.css`.
5. Keep one visual signature per surface. Do not make every section compete with the hero.
6. Make the same capability reachable by keyboard and touch; never rely on hover alone.
7. Preserve PT-BR, English, and Spanish dictionary parity.
8. Validate all routes at desktop and mobile widths, reduced motion, keyboard focus, console, and failed requests.

## Anti-slop test

Reject a change when any answer is no:

- Does the structure communicate something specific about Charlles or his work?
- Is the copy backed by a public project, an observable decision, or an honest current focus?
- Does motion explain state, orientation, feedback, or continuity?
- Can the same idea be expressed with fewer cards, badges, gradients, or labels?
- Does the page still read clearly with effects removed?
- Does the change strengthen the existing editorial/cinematic identity instead of importing a fashionable template?

## Handoffs

- Use `ui-design` for the broad audit and implementation.
- Use `typography-audit` for font loading, measure, hierarchy, and punctuation.
- Use `ui-animation` for motion purpose, timing, easing, interruption, and reduced motion.
- Use `copywriting` for reader-facing copy and AI-ism cleanup.
- Use `product-design` only when changing capabilities, state reachability, or reversibility.
- Use `ax-audit` only if the portfolio gains an agentic interface; it does not apply to the current static portfolio.

## Delivery

Report the pages changed, the identity rule each material change served, validation evidence, and high-value ideas intentionally deferred.
