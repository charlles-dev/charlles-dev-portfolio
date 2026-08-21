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
