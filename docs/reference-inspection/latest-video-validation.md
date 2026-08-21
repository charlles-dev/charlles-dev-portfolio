# Validação do vídeo enviado em 21 de agosto, 14:34

Arquivo: `Toy_video_character_awakening_an…_202608211434.mp4`

Parâmetros técnicos observados: H.264, 1280×720, 24 fps, 10,00 segundos e 240 quadros.

A linha do tempo completa mostra um bloco inicial prolongado em vazio escuro, com o personagem centralizado, olhos fechados, óculos redondos, cabelo cacheado e moletom escuro. A amostragem dos dois primeiros segundos mostra variações sutis de inclinação da cabeça e uma repetição visual plausível do estado de olhos fechados. O fundo inicial é predominantemente preto com rim light quente, portanto o Loop A está presente em alguma forma.

A verificação dos quadros finais mostrou que existe um estado de olhos abertos com olhares laterais e diagonais, além de partículas e nuvens em um céu claro. Porém, nos últimos aproximadamente 0,5–0,7 segundo o personagem fecha os olhos novamente. Isso impede que o arquivo seja integrado como Loop B: o final não fecha em olhos abertos e haveria um corte perceptível ao repetir o estado desperto. O Loop A inicial parece plausível. Na transição detalhada entre 6 e 10 segundos, os olhos começam a abrir aproximadamente entre 6,6 e 7,0 segundos; o Loop B visualmente mais útil ocorre entre cerca de 7,0 e 9,4 segundos, com olhares laterais/diagonais, partículas e nuvens claras. A partir de aproximadamente 9,5 segundos, o personagem inicia o fechamento dos olhos e termina fechado. O vídeo ainda precisa de corte/edição ou nova geração para terminar no mesmo estado aberto em que o Loop B começa.


## Production preview review

The production build at the temporary preview route `/pt-BR` loaded successfully. The first visible state uses the new two-state poster with the correct biscuit character, round dark-brown glasses, compact curls, dark hoodie and closed eyes. The hero remains a single sticky scene with no post-video section in the rendered page. The transparent header exposes the three panel triggers, language flags, and the five social links; the updated hero asset is visible without a fallback to the old avatar.


## Integration decision

Because the source file closed its eyes again after approximately 9.5 seconds, the hero integration uses a conservative 9.35-second trim. This preserves the closed-eye idle region, the continuous awakening and the useful open-eye region while removing the incompatible closing tail. The trimmed source was converted to `public/reference/charlles-hero-two-state.webm` as VP9, 1280×720, 24 fps, video-only, with poster `public/reference/charlles-hero-two-state-poster.webp`.

The hero controller now holds Loop A from approximately 0.2–2.1 seconds at the top, scrubs the one-way transition through the middle, and holds Loop B from approximately 6.95–9.25 seconds at the bottom using a ping-pong cycle. The original approved asset and canonical toy image remain untouched.
