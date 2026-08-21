# Auditoria de fidelidade visual v2

A captura direta de `daviaxs.com.br` confirma estes pontos que precisam ser tratados como fonte de verdade:

| Elemento | Referência observada | Correção necessária |
|---|---|---|
| Logo | Marca isolada no canto superior esquerdo, aproximadamente alinhada ao padding de 3rem da viewport, sem centralização por max-width estreito. | Remover o deslocamento lateral causado pelo container centralizado e manter somente o símbolo do usuário nesse ponto. |
| Header | Navegação, idiomas, tema e controles ocupam o canto superior direito em uma única linha compacta. | Usar header full-bleed com padding lateral fixo/clamp e nav alinhada ao extremo direito. |
| Hero copy | Eyebrow pequeno; headline em duas linhas, menor e com largura controlada; descrição curta em poucas linhas; CTA outline verde/preto. | Reduzir a escala atual, controlar largura e trocar o CTA preenchido por outline. |
| Personagem | Busto toy pequeno/centralizado, com bastante espaço negativo ao redor, olhos fechados e boca neutra, sem sorriso. | Gerar novo asset 3D de massinha neutro e refazer o vídeo com enquadramento menor, aproximando o plano médio original. |
| Fundo | Vídeo muda gradualmente de preto/halo para cosmos, nuvens e céu azul conforme o progresso. | Manter um clipe real como fonte do `currentTime`; o scrub não pode ser apenas classe/opacity. |
| Rail | Seis ícones verticais à direita: GitHub, Dribbble, X, Discord, WhatsApp e Email, com SVGs preenchidos e espaçamento uniforme. | Reproduzir a família de SVGs inline da referência; usar apenas links que tenham destino real no perfil do usuário ou pedir os destinos faltantes. |
| Painel/estados | A home inicial não mostra cards nem texto adicional abaixo da primeira dobra; Trabalhos, Sobre e Contato são estados acionados pelo header/CTA. | Preservar o hero como cena principal e conferir que os painéis não alterem o alinhamento da primeira dobra. |

## Literal panel audit — Trabalhos

The reference opens `Trabalhos` as a full-width bottom sheet: fixed overlay, top corners rounded, inset top at roughly 24–30 px on desktop and 12 px on mobile, with a thin bottom border line. The header has the label at left, pill-like tabs for `UI/UX & Front-end`, `Visual design`, and `Motion`, then the light/dark controls and a close icon at the far right. The content is a scrollable two-column project case layout on desktop: a large visual/media area on the left and a detailed case column on the right. The first case begins immediately below the header with a horizontal separator and generous padding; it is not a generic card grid.

## Literal panel audit — Sobre

The reference `Sobre` state is not a bottom sheet. It dims the existing hero with a strong black veil and centers a narrow profile card in the viewport. The card has a colorful gradient banner at the top, a circular avatar overlapping the banner/content boundary, centered name, a three-column stat row, compact multi-paragraph biography, then a full-width primary WhatsApp CTA followed by a bordered Google Meet call row. A compact social-icon row sits at the bottom, and the close button is placed in the top-right corner of the card/banner area. The underlying header and hero remain visible but subdued.

## Literal panel audit — Contato

The reference `Contato` state follows the same centered-card treatment as `Sobre`: the hero remains visible behind a dark veil, while a narrow card is centered in the viewport with a branded gradient header, a close control at the upper-right, a concise contact introduction, and direct action rows. The main action is a prominent WhatsApp button; the secondary action is an outlined scheduling row with supporting service text. Social/contact links are grouped in a compact row beneath the actions. For Charlles, the same geometry and hierarchy will be preserved while replacing Davi's content and destinations with the user's real WhatsApp, Discord, email and professional links.

## Production preview review

The production build was opened locally after compilation. The hero renders the approved new video/poster with the round glasses, dark curls and neutral closed-eye opening state. The `Trabalhos` interaction works in the production artifact and opens a rounded top sheet with the reference-like header, three pill tabs, close control, separated two-column case entries, media blocks, detail copy, tech pills and project actions. The top sheet remains independently scrollable and does not replace the hero underneath.

The production `Sobre` state also works: the hero is dimmed by a full-screen veil and a narrow centered card is shown with a gradient banner, overlapping circular canonical avatar, centered name/role, three-column stats, biography paragraphs and stacked contact actions. The card has its own scroll container for the lower social row on smaller viewports, matching the reference's compact profile-card behavior rather than a bottom drawer.

The production `Contato` state works with the same centered geometry and dark veil. It presents the localized contact headline and description, a primary LinkedIn action, an email row with the real address, and a compact social row containing LinkedIn, GitHub, Discord, WhatsApp and Email destinations. The visual hierarchy remains consistent with the reference while using Charlles's actual contact channels.

## Loop and post-hero correction review

The corrected production route now exposes only the hero content after hydration: the previous `reference-after-scene` contact section is absent from the rendered page. The final-loop controller was changed from event-driven resets tied to scroll effect dependencies to a dedicated `requestAnimationFrame` controller that keeps the video playing and resets the last 1.4 seconds continuously whenever the scroll progress reaches the final state. A final scroll-to-end screenshot attempt timed out in the connected browser, so no additional interaction was performed after the successful route inspection.

## Seamless-loop audit

The supplied Davi reference clip is approximately 4.02 seconds at 48 fps (or 4.03 seconds at 30 fps) and shows a four-state progression from closed eyes to open-eyed wonder. The current Charlles clip is approximately 10 seconds and has a distinct final open-eyed reaction followed by a return to the closed-eye pose. Replaying only the final 1.4 seconds therefore creates an obvious jump. The correct approach is a ping-pong loop: play the final reaction forward, then play that reaction backward to return smoothly to its first frame, and repeat without a hard seek. This mirrors the reference's continuous-feeling final state much more closely than cutting from the endpoint back to a previous frame. A local FFmpeg simulation of the 6.4–8.85 second reaction segment played forward and then backward; the contact sheet showed a stable surprised face and a matching return frame, confirming the chosen ping-pong interval is visually suitable before browser integration. The rebuilt production route also loaded with the hero-only composition and no post-video section; a connected-browser screenshot attempt timed out during this validation.

## Full Davi video reverse-engineering review

The complete 30 fps reference was inspected with a dense 0.2-second contact sheet and a dedicated 0.5-second end-section sheet. It is a single continuous 4.03-second shot, not a pre-made loop. The camera stays locked in a centered medium bust shot; the perceived motion comes from the illumination and environment transformation. The character remains present from the first frame, with compact glossy dark curls, a light shirt, closed eyes and a neutral closed mouth. The first visual state is a black void with a strong warm rim light. A blue atmospheric field, white particles, clouds, crescent moon and thin orbital arcs then emerge progressively. The scene becomes a bright sky while the character stays still and centered. The eyes open only during the final transition into the bright state, and the last half-second holds an open-eyed direct gaze with a neutral mouth and no visible lateral glance or mouth animation.

The final frame is not equal to the first frame: the clip intentionally resolves from darkness/closed eyes to brightness/open eyes. Therefore the reference itself does not contain a looping endpoint. Its clean appearance comes from a deliberately authored one-way transformation with stable final hold frames, not from a hard-cut loop. A prompt that claims the original video has an embedded loop would be inaccurate; the faithful reconstruction should instead reproduce this one-way 4-second transformation and, if a website loop is required, extend or regenerate a separate bright final hold designed for seamless repetition.


## Additional literal details confirmed from saved HTML snapshots

The saved Davi `Trabalhos` dialog confirms that the header is not just a title plus tabs. It contains a hidden-on-small-screen `Trabalhos` label, a rounded tablist with a sliding active-background indicator, three tab buttons with inline SVG icons, a separate `Claro`/`Escuro` segmented control on desktop, and a bordered circular close button. The content container uses `thin-scroll flex-1 overflow-x-hidden overflow-y-auto overscroll-contain` with responsive padding. Project entries are richer than the current simplified cards: each uses a grid article with a visual/media block, a long explanatory bullet list, tags, a `Ver projeto` action, a like button, and in the reference implementation screenshot/media carousel controls. The current implementation has the correct sheet geometry but still simplifies these header controls and project-entry details.

The saved `Contato` HTML snapshot still serializes the same `Trabalhos` dialog because the page snapshot was captured before the contact dialog state was hydrated; the reliable contact-specific geometry comes from the interactive browser audit: a centered narrow card over a full-screen black veil, a branded gradient cover, close button in the cover, overlapping avatar, centered profile identity, compact copy, stacked direct actions and social row. The `Sobre` and `Contato` cards share the centered-card treatment but differ in title, copy and primary contact content.

Source snapshots: `/home/ubuntu/upload/www.daviaxs.com.br__trabalhos_1787322423529.html` and `/home/ubuntu/upload/www.daviaxs.com.br__contato_1787326627645.html`.


## Production preview after panel refinements

The compiled preview confirms that `Trabalhos` now opens as the reference sheet with the rounded top geometry, dark veil, title, icon-bearing tabs, active tab treatment, internal `Claro`/`Escuro` segmented control, circular SVG close button, scrollable content and two-column project entry. The first project media block now includes a visible `VIEW` control and carousel-style dots. Switching to `Visual design` preserves the sheet and replaces the project list with the localized visual-focus content, matching the reference interaction model.


## Final preview validation of profile cards

The final production preview confirms that `Sobre` and `Contato` now use the centered narrow reference card over a dark veil, with the cover image, overlapping circular avatar, centered name and role, three compact stats, section-specific eyebrow, copy, stacked WhatsApp/e-mail actions and the five real SVG social links. The close button is exposed as `Fechar`, matching the reference dialog convention and the accessibility test. `Contato` keeps the direct WhatsApp CTA as the primary action and e-mail as the secondary action.
