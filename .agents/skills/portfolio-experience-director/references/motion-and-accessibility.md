# Motion and accessibility

## Purpose ladder

Animate only for feedback, orientation, continuity, or rare delight. If none applies, keep the state change immediate.

## Motion vocabulary

- Press: 120ms, `cubic-bezier(.22, 1, .36, 1)`, scale no lower than .97.
- Hover/focus emphasis: 160–200ms for color, opacity, border, or transform.
- Panel enter: 280–360ms, `cubic-bezier(.32, .72, 0, 1)`.
- Panel exit: 180–240ms using the same spatial origin.
- Small stagger: 30–45ms and under 240ms total.
- Prefer transitions that retarget over keyframes that restart.

Use transforms and opacity for spatial motion. Never use `transition: all`. Avoid animating width, height, top, or left unless a measured container morph requires it.

## Reduced motion

- Under `prefers-reduced-motion: reduce`, stop scroll scrubbing and decorative loops.
- Preserve instant state changes and optional short opacity fades.
- Do not hide content because its reveal animation was disabled.

## Input parity

- Gate hover motion behind `(hover: hover) and (pointer: fine)`.
- Give pressed feedback to touch controls with `:active` and `touch-action: manipulation`.
- Never animate keyboard navigation or focus movement.
- Maintain stable focus through panel and mobile-menu transitions.
