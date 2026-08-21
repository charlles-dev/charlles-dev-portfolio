# Prompts de sprites do popup de contato — Charlles

## Direção visual comum

Use a imagem de referência do personagem de Charlles apenas para preservar identidade: pele morena, rosto arredondado de toy/biscuit 3D, óculos redondos marrom-escuros obrigatórios, cabelo cacheado escuro volumoso, expressão simpática e acabamento de personagem colecionável renderizado em 3D. O resultado deve ser um **sprite isolado com alpha real**, enquadrado como busto, no mesmo canvas de 320×314 px usado pela referência, sem cenário, sem moldura, sem texto e sem marca d’água.

A composição deve reproduzir a lógica visual dos sprites públicos observados: personagem grande ocupando a metade inferior do canvas, cabeça e cabelo chegando perto do topo, um braço apoiado na base, o outro criando um gesto expressivo, pequenos confetes coloridos discretos ao redor e recorte limpo para sobreposição sobre um botão escuro ou claro. Não copiar o rosto, cabelo, roupa ou identidade do personagem da referência; manter exclusivamente a pose/composição e aplicar a identidade de Charlles.

## Sprite 1 — WhatsApp, estado repouso

> Use a imagem do boneco de Charlles como referência de identidade. Gere um sprite 3D toy/biscuit isolado, com alpha real e canvas 320×314. O personagem é Charlles: pele morena, óculos redondos marrom-escuros bem visíveis, cabelo cacheado escuro volumoso, rosto arredondado e acabamento de massinha premium. Mostre-o em um enquadramento de busto, ocupando a parte inferior do canvas, vestindo uma camiseta clara sob uma jaqueta casual escura, com um braço apoiado na borda inferior e o outro braço levantado em um gesto alegre de comemoração, punho fechado. O rosto deve estar sorridente e receptivo, sem dentes excessivamente detalhados, mantendo os óculos e a identidade do boneco. Adicione poucos confetes pequenos em amarelo, azul e laranja ao redor do gesto, sem poluir o recorte. Vista frontal levemente virada para a direita, iluminação suave de estúdio, bordas bem definidas, nenhum fundo, nenhum texto, nenhum logotipo, nenhuma sombra retangular, nenhuma moldura.

## Sprite 1 — WhatsApp, estado hover

> Gere o estado hover do mesmo sprite de Charlles, usando exatamente a mesma identidade, cabelo, óculos, roupa, escala, enquadramento, iluminação e distribuição dos confetes do sprite WhatsApp repouso. O personagem permanece apoiado na base e faz um gesto mais convidativo em direção ao botão: a mão levantada se abre levemente e se projeta para a frente como um aceno amigável, sem alterar a posição da cabeça ou criar um segundo personagem. Canvas 320×314, alpha real, recorte limpo, nenhum cenário, nenhum texto, nenhum logotipo, nenhuma borda retangular.

## Sprite 2 — call, estado repouso

> Use a imagem do boneco de Charlles como referência de identidade. Gere um sprite 3D toy/biscuit isolado, com alpha real e canvas 320×314. É o mesmo Charlles: pele morena, óculos redondos marrom-escuros obrigatórios, cabelo cacheado escuro volumoso, rosto arredondado e acabamento de massinha premium. Mostre-o em busto, grande no canvas, usando uma versão profissional do mesmo visual: blazer grafite, camisa clara e gravata discreta, sem perder os óculos, o cabelo e a identidade. Um braço fica apoiado na borda inferior; o outro braço sobe para a direita com a mão aberta, como se estivesse apresentando ou convidando o visitante para uma videochamada. Expressão alegre e segura, olhar direcionado para a mão, confetes pequenos amarelos e azuis próximos do gesto, recorte transparente perfeito, iluminação de estúdio, sem cenário, sem texto, sem logotipo, sem moldura.

## Sprite 2 — call, estado hover

> Gere o estado hover do mesmo sprite de Charlles para a ação de call. Preserve exatamente identidade, óculos redondos marrom-escuros, cabelo cacheado, blazer, camisa, gravata, escala, posição do busto, iluminação e confetes do sprite de call repouso. O gesto muda suavemente para uma mão aberta mais avançada em direção ao cartão de reunião, como um aceno/apresentação acolhedora; não mude o rosto, não altere o enquadramento e não adicione pessoas ou objetos. Canvas 320×314, alpha real, recorte limpo, nenhum cenário, nenhum texto, nenhum logotipo, nenhuma borda retangular.

## Prompt de consistência para uma segunda passagem

> Edit the provided sprite set. Preserve exactly the Charlles character identity, medium-brown skin, dark round glasses, dark curly hair, toy/biscuit 3D material, transparent alpha, canvas size, framing, lighting, confetti placement, and all non-target details. Change only the hand gesture required by the specified hover state. Do not introduce a new face, new hairstyle, missing glasses, extra fingers, background, text, logo, watermark, rectangular shadow, or opaque halo.

## Implementação esperada no popup

A estrutura deve manter quatro arquivos independentes: `charlles-contact-whatsapp.webp`, `charlles-contact-whatsapp-hover.webp`, `charlles-contact-call.webp` e `charlles-contact-call-hover.webp`. Cada ação é um contêiner `group relative isolate`; o sprite repouso fica absolutamente posicionado acima do botão com `translate-y-2 scale-0`, e o sprite hover ocupa exatamente a mesma posição, inicia com `opacity: 0` e entra com `group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100`. O segundo CTA deve apontar para `https://call.com/charles-dev` e exibir `30 min · Google Meet`.

## Referências públicas observadas

- [Página de referência](https://daviaxs.com.br/)
- [Sprite WhatsApp repouso](https://daviaxs.com.br/mascote.webp)
- [Sprite WhatsApp hover](https://daviaxs.com.br/mascote-mao.webp)
- [Sprite call repouso](https://daviaxs.com.br/mascote-reuniao.webp)
- [Sprite call hover](https://daviaxs.com.br/mascote-reuniao-mao.webp)
