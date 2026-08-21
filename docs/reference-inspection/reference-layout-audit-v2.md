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
