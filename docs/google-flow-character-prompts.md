# Pacote de prompts para o personagem do Charlles.dev

Este documento usa a imagem fornecida pelo Charlles como a única fonte de verdade da identidade do personagem. Anexe essa imagem em todas as gerações. Ignore o cenário azul com nuvens da referência, salvo quando um prompt pedir explicitamente um cenário semelhante.

Os prompts foram escritos em inglês para reduzir ambiguidades visuais. Os nomes, prioridades e instruções de uso estão em português.

## Ordem recomendada

1. Gere primeiro o kit de identidade: turnaround, expressões e pose neutra.
2. Escolha uma única versão aprovada do personagem.
3. Use a imagem original e a versão aprovada como referências nas cenas seguintes.
4. Gere as imagens das seções antes dos vídeos.
5. Faça os vídeos a partir das imagens aprovadas, sempre que o Flow permitir usar uma imagem como primeiro quadro ou referência visual.
6. Não publique uma cena se o cabelo, os óculos, o rosto ou a proporção mudarem.

## Manifesto de identidade do personagem

Cole este bloco no início de **todo prompt**.

```text
CHARACTER IDENTITY LOCK

Use the attached image only as the canonical identity reference for Charlles. Ignore the blue sky and cloud background unless the scene prompt explicitly asks for it.

Preserve exactly:
- warm medium-brown skin;
- large expressive brown eyes;
- round translucent brown eyeglass frames;
- thick dark eyebrows;
- small rounded nose and soft youthful face shape;
- black oversized hoodie with black drawstrings;
- stylized premium 3D toy proportions, slightly oversized head and compact body;
- calm, curious, intelligent and slightly playful personality.

HAIR IS CRITICAL:
The hair is smooth dark-brown-to-black hair made from a few thick, broad, softly curled wavy locks. The locks are smooth and sculpted, with loose rounded bends and curved tips falling naturally over the forehead. It is wavy hair with soft rolled ends, not tightly curled hair.

Never generate braids, cornrows, rope-like strands, woven hair, a braided crown, tight curls, coily texture, afro texture, dreadlocks, rows of repeated loops, or small spiral curls.

Keep the same face, glasses, hair silhouette, hoodie, skin tone, body proportions and material treatment in every image. Do not redesign the character.
```

## Restrições globais

Cole este bloco no final de **todo prompt**.

```text
GLOBAL CONSTRAINTS

No readable text, no letters, no numbers, no logos, no brand marks, no watermark, no signature, no extra fingers, no malformed hands, no duplicated objects, no extra characters, no random accessories, no costume changes, no facial hair, no photoreal human skin, no anime style, no flat generic mascot style.

Use restrained warm amber rim lighting and acid green only as a small technical status accent. Keep the palette compatible with a near-black editorial software portfolio.

The result must feel authored for Charlles.dev, not like a stock technology mascot.
```

## Convenção de arquivos

| Arquivo | Uso | Formato sugerido |
|---|---|---|
| `charlles-identity-turnaround.png` | Referência de consistência | 16:9 |
| `charlles-identity-expressions.png` | Referência de expressões | 16:9 |
| `charlles-identity-fullbody.png` | Base para novas cenas | 4:5 |
| `charlles-experience-debug.png` | Seção Experiência | 4:5, fundo transparente |
| `charlles-education-books.png` | Seção Educação | 4:5, fundo transparente |
| `charlles-certifications.png` | Seção Certificações | 4:5, fundo transparente |
| `charlles-tech-stack.png` | Seção Tech Stack | 4:5, fundo transparente |
| `charlles-contact-whatsapp.png` | Sprite de contato | 1:1, fundo transparente |
| `charlles-contact-call.png` | Sprite de contato | 1:1, fundo transparente |
| `charlles-contact-email.png` | Atalho de e-mail | 1:1, fundo transparente |
| `charlles-404.png` | Página não encontrada | 4:5 |
| `charlles-og-cosmic.png` | Compartilhamento social | 1200 × 630 |

---

# 1. Kit obrigatório de identidade

## Prompt 01 — Turnaround do personagem

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a professional character turnaround sheet for the canonical Charlles 3D toy character. Show the same character in four consistent views: front, three-quarter, side profile and back. Use a relaxed neutral standing pose, arms naturally beside the body, black hoodie, black relaxed pants and clean black sneakers.

The purpose is strict visual consistency for future image and video generation. The hair silhouette must remain identical in every view: a few broad smooth wavy locks with softly curled ends, including the characteristic lock falling over the forehead.

Composition: four full-body views aligned at the same scale, generous spacing, straight orthographic presentation, no perspective distortion.
Background: plain neutral light gray studio background.
Lighting: soft neutral studio light that clearly reveals the face, glasses, hair silhouette, hoodie and proportions.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 02 — Folha de expressões

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a consistent facial expression sheet of the canonical Charlles character. Show eight head-and-shoulders expressions in a clean grid: calm neutral, focused, subtle smile, curious surprise, quietly amused, concentrated with eyes slightly narrowed, relieved after fixing a bug, and friendly confident eye contact.

Every face must be unmistakably the same character. The glasses, eyebrows, face proportions and broad smooth wavy hair locks must not change between expressions. Keep humor subtle and believable, never exaggerated slapstick.

Background: plain neutral light gray.
Lighting: even studio lighting.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 03 — Corpo inteiro canônico recortável

```text
[PASTE CHARACTER IDENTITY LOCK]

Create the canonical full-body Charlles character standing in a relaxed three-quarter pose. One hand rests inside the hoodie pocket and the other holds a small closed dark notebook. His expression is calm, attentive and slightly amused, as if he already noticed the bug but is waiting for everyone else to see it.

Composition: complete body and shoes visible, centered vertical silhouette, generous empty margin around the character, no crop.
Background: genuinely transparent background with clean alpha edges. If transparency is unavailable, use a perfectly flat solid #0B0B0C background with no texture and no shadow beyond the character's contact shadow.

[PASTE GLOBAL CONSTRAINTS]
```

---

# 2. Imagens principais das novas seções

## Prompt 04 — Experiência: o cabo que finalmente colaborou

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a full-body 3D scene for the Experience section of a software engineering portfolio. Charlles is seated at a compact dark workstation after debugging a real system. He holds the end of one small cable that has finally connected correctly. A restrained green status light confirms the fix. His expression is focused with a tiny satisfied smile.

Include only purposeful objects: a dark laptop, one simple monitor with abstract code lines, a compact network node, a coffee mug and the fixed cable. The humor comes from the cable behaving like the last tiny problem in an otherwise organized system.

Composition: three-quarter view, complete desk and character silhouette, readable at 500 pixels, no crop, balanced negative space around the scene.
Background: genuinely transparent with clean alpha edges. If unavailable, use flat #0B0B0C.
Lighting: warm amber rim light, soft dark fill, one acid-green status light.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 05 — Experiência: conectando front, back e infraestrutura

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a full-body 3D scene where Charlles connects three physical modules into one working software system. One module represents interface, one represents server logic and one represents network infrastructure through abstract shapes only. He calmly plugs the final connector between them while checking that all three green status lights agree.

The scene should communicate full-stack engineering, integration and practical problem solving. It must not look like a futuristic hologram or a generic cybersecurity advertisement.

Composition: horizontal editorial scene, Charlles slightly off-center, modules arranged as one readable flow, complete character visible.
Background: transparent if supported, otherwise flat #0B0B0C.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 06 — Educação: o livro grande demais

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a full-body 3D scene for the Education section. Charlles studies beside a small stack of dark technical books and draws a system diagram in a notebook. One book is comically oversized, so he uses it as a small desk. The visual joke is quiet and intelligent, not childish.

Include abstract diagrams, tabs and geometric markers without readable text. His expression is curious and concentrated. Keep the scene warm, tactile and grounded in real learning rather than graduation clichés.

Composition: compact vertical silhouette, three-quarter view, full body and all props visible, no crop.
Background: transparent if supported, otherwise flat #0B0B0C.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 07 — Educação: mapa de aprendizado

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a 3D scene where Charlles pins a final node onto a physical learning map made from dark cards and thin connecting lines. The map contains abstract symbols for software, networks, security and computer vision. He is not at the end of the path; a few empty connection points remain visible, communicating continuous learning without using text.

His pose is calm and intentional. The scene should feel like engineering knowledge being organized, not like a classroom stock illustration.

Composition: full-body character at the right, learning map at the left, editorial 16:10 framing, clear negative space.
Background: near-black matte surface with subtle depth, no gradient fog.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 08 — Certificações: credenciais organizadas, quase todas

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a full-body 3D scene for the Certifications section. Charlles holds a small organized stack of certificate sheets with abstract lines and pins one restrained green badge onto a dark board. One harmless sheet curls away at the edge, adding personality without making him look clumsy.

Avoid graduation caps, trophies, gold medals, corporate award stages and exaggerated celebration. The scene communicates evidence of study and discipline, not status theater.

Composition: three-quarter view, complete body, certificate stack and board visible, compact vertical silhouette.
Background: transparent if supported, otherwise flat #0B0B0C.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 09 — Tech Stack: sistema modular

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a full-body 3D scene for the Tech Stack section. Charlles calmly assembles a working system from modular dark blocks: a browser-like interface tile, an API connector, a terminal tile, a small database cylinder, a gear and a network node. The pieces are physical objects, not floating holograms.

One tiny block is slightly out of alignment and Charlles nudges it into place with one finger. A few restrained green status lights activate only after the pieces connect. The scene communicates choosing and integrating tools, not collecting logos.

Composition: clean circular arrangement around the complete character, readable silhouette, no crop, balanced at 4:5.
Background: transparent if supported, otherwise flat #0B0B0C.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 10 — Tech Stack: bancada de ferramentas

```text
[PASTE CHARACTER IDENTITY LOCK]

Create an editorial 3D scene where Charlles stands at a dark workbench choosing one tool from a small, precise set of software-shaped objects. Show abstract modules for interface, backend, automation, security and networking. Most tools remain quietly on the bench; only the selected ones are connected into a functioning path.

The message is that a software engineer chooses tools for the problem instead of showing every technology at once. Use no logos and no readable labels.

Composition: wide 16:10 section image, character on the left, workbench and connected modules on the right, clear negative space.
Background: deep matte black environment with restrained amber edge light.

[PASTE GLOBAL CONSTRAINTS]
```

---

# 3. Contato corrigido

## Prompt 11 — WhatsApp

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a compact full-body 3D contact sprite. Charlles leans slightly from behind a large simple green speech bubble, holding a small phone and giving a friendly subtle wave. His expression is open and approachable, not sales-like.

Composition: square, centered, clean silhouette, complete hands, bubble and upper body readable at small size. Leave safe margin around all edges.
Background: genuinely transparent with clean alpha edges.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 12 — WhatsApp hover

```text
[PASTE CHARACTER IDENTITY LOCK]

Create the hover-state companion to a contact sprite. Charlles is in the same position and camera angle as the WhatsApp base image, but now the phone shows one tiny restrained green notification dot and his eyebrow lifts slightly as if a useful message arrived.

Match the base sprite's framing, scale, lighting and silhouette exactly so the images can crossfade without jumping.
Background: genuinely transparent with clean alpha edges.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 13 — Agendar uma call

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a compact full-body 3D contact sprite for scheduling a video call. Charlles sits beside a small dark laptop with a simple camera tile and adjusts one round desk light. He looks prepared and relaxed, with a small confident smile. Add one restrained yellow light and one green readiness dot.

Composition: square, centered, clean silhouette, readable at small size, safe margins, no crop.
Background: genuinely transparent with clean alpha edges.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 14 — Call hover

```text
[PASTE CHARACTER IDENTITY LOCK]

Create the hover-state companion to the scheduling-call sprite. Keep the exact same camera, pose, scale and lighting. Change only the action: Charlles raises one hand in a small greeting while the laptop camera dot turns green.

The base and hover images must align perfectly for a sprite crossfade with no positional jump.
Background: genuinely transparent with clean alpha edges.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 15 — E-mail

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a compact 3D icon scene for direct email contact. Charlles peeks from behind a large off-white envelope and slides a small dark project note into it. Use one tiny green seal as the only accent. His expression is attentive and professional with a hint of humor.

Composition: square, centered, strong silhouette, readable at icon size, safe margins.
Background: genuinely transparent with clean alpha edges.

[PASTE GLOBAL CONSTRAINTS]
```

---

# 4. Imagens extras de identidade e humor

## Prompt 19 — Sobre: o bug observando de volta

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a quiet humorous 3D scene for the About section. Charlles inspects a tiny dark software bug-shaped object through a magnifying glass. The bug is also holding a comically tiny magnifying glass and looking back at him. Keep the humor subtle, clever and friendly.

Composition: complete character kneeling beside the tiny object, clean 4:5 silhouette, readable at medium size.
Background: transparent if supported, otherwise flat #0B0B0C.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 20 — 404: procurando a rota

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a full-body 3D illustration for a 404 page. Charlles holds a small flashlight and follows a broken physical route line that ends in mid-air. He looks curious rather than frustrated. A tiny signpost has three blank directional panels with no text.

Composition: vertical 4:5, complete character and broken route visible, generous negative space for the 404 headline.
Background: deep black night environment with sparse stars and a restrained green route line.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 21 — Open Graph cósmico

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a cinematic social sharing image for Charlles.dev. Charlles appears from the waist up in the center-right, looking toward a small constellation made from connected software nodes. Preserve the airy blue cosmic atmosphere from the original reference image, but shift the lower half into the portfolio's near-black visual language. Keep a large quiet area on the left for HTML-rendered title text added later.

Composition: exactly 1200 by 630, subject safely inside central crop zones, no text inside the image.
Lighting: soft celestial blue fill, warm amber rim around the character, minimal green node accent.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 22 — Pacote de stickers 2D

```text
[PASTE CHARACTER IDENTITY LOCK]

Translate the canonical Charlles 3D character into a cohesive set of six clean 2D editorial stickers while preserving his identity. Show: typing quickly, holding a cable, reading a large book, pinning a certificate, aligning modular stack blocks, and waving from behind an envelope.

Style: refined flat 2D illustration with subtle grain, bold dark outlines only where needed, warm skin tones, black hoodie, brown glasses and the exact broad smooth wavy hair silhouette. Avoid chibi exaggeration and generic emoji styling.

Composition: six separated stickers on one transparent sheet, generous spacing, no overlap, no text.

[PASTE GLOBAL CONSTRAINTS]
```

---

# 6. Vídeos essenciais

Use câmera travada, movimento pequeno e duração curta. Para loops, o último quadro deve reencontrar exatamente o primeiro. Gere sem áudio.

## Prompt 23 — Hero idle loop

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a seamless 6-second cinematic idle loop from the canonical Charlles portrait. Camera completely locked. The character breathes subtly, the hoodie fabric shifts by only a few millimeters, he blinks once naturally and one broad front hair lock moves almost imperceptibly. Sparse background stars twinkle very softly.

Start and end on the exact same pose, face, eye direction, lighting and hair silhouette. No camera movement, no zoom, no morphing, no new objects, no lip movement.
Framing: 16:9, waist-up centered composition matching the supplied reference.
Background: near-black star field with warm amber rim light.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 24 — Hero acordando com o scroll

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a 4-second non-looping cinematic transition for scroll interaction. Begin with Charlles calm and eyes closed in the exact canonical hero pose. He takes one subtle breath, the ambient light increases slightly, then opens his eyes and focuses directly toward the viewer. End in a stable awake pose suitable for transitioning into a separate awake loop.

Camera completely locked. Preserve face, hair, glasses and body geometry throughout. No sudden smile, no head turn, no dramatic lens effect, no zoom, no morphing.
Framing: 16:9, waist-up centered.
Background: near-black star field, warm amber rim light, very restrained green catchlight only at the final state.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 25 — Hero awake loop

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a seamless 6-second awake idle loop that starts from the exact final pose of the eyes-opening transition. Charlles maintains calm eye contact, breathes subtly, blinks once and makes a nearly invisible curious eyebrow movement. The expression remains confident and quiet.

Camera completely locked. Start and end on the same pose and lighting. No head turn, no speaking, no smile change, no camera movement, no morphing.
Framing: 16:9, waist-up centered.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 26 — Experiência: cabo conectado

```text
[PASTE CHARACTER IDENTITY LOCK]

Animate the approved Experience workstation image into a seamless 4-second loop. Camera locked. Charlles connects the small cable, the status light changes from dim to restrained green, his eyebrow relaxes and he gives a tiny satisfied smile. The cable and light then return naturally to the initial state for a perfect loop.

Only animate the hand, cable, status light, eyebrows and subtle breathing. Keep every other object completely stable. No screen text changes, no camera movement, no morphing, no extra effects.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 27 — Educação: virando a página

```text
[PASTE CHARACTER IDENTITY LOCK]

Animate the approved Education scene into a seamless 5-second loop. Camera locked. Charlles turns one page of the oversized book, follows a diagram with his eyes, makes one small thoughtful nod and returns to the starting pose. One notebook tab moves slightly as the page passes.

Keep the motion quiet and tactile. No floating books, no magical particles, no readable text, no camera movement, no identity drift.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 28 — Certificações: prendendo o badge

```text
[PASTE CHARACTER IDENTITY LOCK]

Animate the approved Certifications scene into a seamless 4-second loop. Camera locked. Charlles pins one green badge onto the dark board, the curled paper edge tries to lift, and he calmly presses it back into place with one finger. He returns to the starting pose.

The humor is subtle. Animate only hands, badge, paper edge, eyes and breathing. No confetti, no trophy animation, no camera movement, no morphing.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 29 — Tech Stack: módulos se conectando

```text
[PASTE CHARACTER IDENTITY LOCK]

Animate the approved Tech Stack scene into a seamless 5-second loop. Camera locked. Two dark modular blocks slide a short distance into alignment, Charlles nudges the final small block with one finger, then three restrained green status lights activate in sequence. The system gently returns to its initial disconnected state for the loop.

Use precise mechanical motion with short ease-out timing. No floating holograms, no spinning camera, no exploding pieces, no text, no logos, no identity drift.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 30 — WhatsApp microinteração

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a 3-second seamless contact microinteraction based on the approved WhatsApp sprite. Camera locked. Charlles raises his hand in one small friendly wave, the phone receives one restrained green notification dot and the speech bubble moves upward by only a few pixels before settling. Return exactly to the first frame.

Keep the movement readable at small size. No speaking, no bouncing loop, no exaggerated squash and stretch, no camera motion.
Background: perfectly flat #0B0B0C for clean blending with the portfolio.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 31 — Call microinteração

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a 3-second seamless scheduling-call microinteraction based on the approved call sprite. Camera locked. The laptop camera indicator turns green, Charlles gives one small greeting gesture and the desk light warms slightly. Return exactly to the starting pose.

Keep movement restrained and professional. No speaking, no UI text, no notification explosion, no camera movement.
Background: perfectly flat #0B0B0C.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 35 — 404: procurando a rota

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a seamless 5-second loop from the approved 404 image. Camera locked. Charlles moves the flashlight slowly along the broken route line, notices where it ends, raises one eyebrow and points the light toward the correct return direction. The route line gives one restrained green pulse, then the scene resets.

Keep the moment calm and useful, not sad or slapstick. No camera movement, no text, no new signs, no morphing.

[PASTE GLOBAL CONSTRAINTS]
```

---

# 7. Vídeos opcionais para uma versão mais ambiciosa

## Prompt 36 — Transição do céu para a bancada

```text
[PASTE CHARACTER IDENTITY LOCK]

Create an 8-second cinematic transition connecting the cosmic hero atmosphere to the Experience section. Begin with Charlles in the airy blue cloud-and-orbit environment from the canonical reference. The orbit lines gradually become thin network cables, the clouds darken into soft workstation shadows and the character arrives seated at the approved debugging desk.

The transition must preserve the character continuously with no cut, no clothing change and no hair change. Use a slow controlled camera push of less than five percent. End on a stable frame matching the Experience still image.

No text, no logos, no portal effect, no particle explosion, no identity morphing.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 37 — Transição Educação para Certificações

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a 6-second editorial transition between the approved Education and Certifications scenes. A page from the oversized book turns toward camera and briefly fills the frame as a natural wipe. When it clears, the same page is now part of the certificate stack in the approved Certifications scene.

Preserve the character identity, scale and lighting across the transition. The page wipe must feel physical and tactile, not magical. End on the exact Certifications still composition.

No text, no logos, no camera spin, no morphing.

[PASTE GLOBAL CONSTRAINTS]
```

## Prompt 38 — Transição Certificações para Stack

```text
[PASTE CHARACTER IDENTITY LOCK]

Create a 6-second editorial transition from the approved Certifications scene to the Tech Stack scene. Charlles pins the green badge onto the board. The badge rotates only ninety degrees and becomes the first small status module in the stack assembly. The surrounding certificate board recedes into the dark workbench while the character remains continuous.

Keep the transformation mechanical, restrained and understandable. End on the exact approved Tech Stack still composition.

No text, no logo, no liquid morph, no particle burst, no camera spin, no identity drift.

[PASTE GLOBAL CONSTRAINTS]
```

---

# 8. Checklist para aprovar cada geração

Antes de gastar créditos em variações, confira:

- O cabelo tem poucas mechas largas, lisas e onduladas?
- Existe uma mecha curva característica caindo sobre a testa?
- Não há tranças, cordas, padrão tecido ou cachos pequenos?
- O rosto, os óculos e a cor de pele continuam iguais à referência?
- O moletom continua preto e sem marca?
- A cena comunica uma ideia profissional mesmo sem efeitos?
- O humor está na situação, não em deformar o personagem?
- A imagem funciona pequena e tem uma silhueta clara?
- Não existe texto falso, logo inventado ou objeto duplicado?
- Nos loops, o primeiro e o último quadro realmente coincidem?
- Nos vídeos, a câmera está estável e o personagem não muda de identidade?

## Prioridade se os créditos começarem a acabar

Gere nesta ordem:

1. Prompts 01, 02 e 03 para estabilizar a identidade.
2. Prompts 04, 06, 08 e 09 para as quatro novas seções.
3. Prompts 11 a 15 para corrigir o contato.
4. Prompts 23, 24 e 25 para o hero.
5. Prompts 26 a 31 para as microinterações mais visíveis.
6. Prompts 19 a 22 e 35 a 38 como expansão de personalidade.

Os repositórios não precisam de stickers, ilustrações ou vídeos individuais. A seção Trabalhos usa capas tipográficas geradas pelos próprios metadados públicos do GitHub.
