# Mapa de reconstrução da referência

Fonte observada: https://daviaxs.com.br/

## Experiência principal

A referência não é uma landing page convencional. O primeiro bloco ocupa cerca de três alturas de viewport em termos de scroll, enquanto a cena visual fica pinada na tela. O conteúdo muda por progressão de rolagem, mas o hero permanece como palco. A composição usa um vídeo principal para a entrada e uma camada idle em loop, com poster estático e uma segunda camada de vídeo para estados de movimento. Há também uma sequência de introdução com logo animado antes da página ficar pronta.

O hero é composto por um fundo de vídeo/ilustração em tela cheia, scrims para controlar contraste, gradientes de brilho, partículas pequenas e texto fixado no canto inferior esquerdo. A headline é curta, dividida em duas linhas, seguida por descrição e CTA. Na lateral direita ficam os ícones sociais, que revelam o nome por hover. O header permanece fixo e compacto, com marca à esquerda, links de trabalhos/sobre/contato, idiomas e tema.

## Estados de navegação

O link “Trabalhos” abre um painel grande sobreposto, com veil escuro, cantos arredondados no topo, foco preso ao diálogo e botão de fechamento. O painel tem tabs “UI/UX & Front-end”, “Visual design” e “Motion”, filtros em pílula e cards com capas, imagens e detalhes dos projetos. A implementação também possui lightbox para ampliar imagens.

“Sobre” e “Contato” abrem diálogos menores centralizados, com overlay, botão Fechar, avatar, título, fatos e CTAs. O painel Sobre mostra idade, cidade, quantidade de projetos, bio em mais de um parágrafo e convite. O painel Contato mostra avatar, cargo, disponibilidade, fatos de projetos/experiência/tempo de resposta e canais de contato.

## Internacionalização e tema

A referência usa rotas `/`, `/en` e `/es`, links `hreflang`, dicionários por idioma e seleção explícita de idioma no header. O tema é salvo em `localStorage`, inicializado como dark e alternado por controle no topo. O HTML usa `suppressHydrationWarning` para permitir o tema inicial antes da hidratação.

## Acessibilidade e estados de motion

Os diálogos usam `role="dialog"`, `aria-haspopup`, `aria-expanded`, `aria-label`, `aria-modal`, `inert` quando fechados, focus trap e botão de fechar. O vídeo possui `aria-hidden`, `playsinline`, `disablepictureinpicture` e preload condicionado a desktop. O código detecta `prefers-reduced-motion` e reduz/desliga a experiência de movimento.

## Assets públicos observados

A referência carrega `hero.webm`, `hero-idle.webm`, `hero-loop.webm`, `hero-still.avif`, `avatar.webp`, `background-cta.png`, uma marca SVG e capas de projetos em WebP. Os chunks públicos usam GSAP/ScrollTrigger para pinning e transições. Esses arquivos foram apenas baixados para inspeção passiva; não foram executados nem incorporados automaticamente ao portfólio.

## Direção para a reconstrução de Charlles.dev

A próxima implementação deve reproduzir a gramática da experiência: uma cena pinned de três telas, um componente de vídeo/estado com fallback poster, intro opcional, header minimalista, rail social, painéis reais para Trabalhos/Sobre/Contato, tabs de projetos, lightbox, idiomas e tema. O conteúdo deve continuar sendo o de Charlles e os projetos do seu GitHub. A diferença entre a referência e o portfólio será de conteúdo, identidade e assets do usuário, não de arquitetura de interação.

## Ferramentas adequadas

Não existe uma ferramenta confiável que “copie cada linha” de um site público como uma operação única. O fluxo correto é usar inspeção de DOM/HTML, Network/asset inventory, análise passiva de CSS e JavaScript público, captura de estados no navegador e reconstrução em componentes próprios. Para uma reprodução de alta fidelidade, a ferramenta mais importante é uma combinação de navegador com DevTools/Playwright e uma implementação local iterativa com screenshots comparativos — não um gerador automático de landing page.

## Primeira validação local da reconstrução

A rota `/pt-BR` agora retorna apenas a narrativa principal e o CTA “Vamos conversar” no HTML inicial, com a área de trabalho prevista para abrir em painel por interação. O hero já usa os assets locais em `public/reference`, vídeo idle/ativo/loop, poster AVIF e a estrutura pinned de três alturas. Lint e build passaram depois da limpeza dos chunks brutos de inspeção. A captura visual do navegador apresentou timeout intermitente, então a comparação de pixel continuará usando a URL exposta e checagens estruturais até a sessão estabilizar.

## Comparação de mídia

A captura da referência em 1440×900 mostra um personagem central ocupando a maior parte do palco, com halo quente, estrelas, rail social à direita, texto no canto inferior esquerdo e header fino no topo. O poster `hero-still.avif` e um frame de `hero.webm` confirmam que os assets locais contêm essa cena corretamente. A primeira captura da reconstrução ficou preta porque a implementação aplicava três vídeos sobrepostos com z-index negativo dentro de um contexto de isolamento; o fallback poster ainda não aparecia de forma confiável. O ajuste correto será tornar o poster uma camada explícita de background e deixar o vídeo principal como enhancement, com apenas uma camada ativa por vez.

## QA visual v4

A captura headless em 1440×900 agora apresenta a cena completa: personagem central, halo, partículas, header minimalista, status no canto superior direito, headline curta no canto inferior esquerdo, CTA, rail social vertical e assinatura inferior. O resultado está estruturalmente muito próximo da referência. O frame capturado pelo vídeo principal está com os olhos abertos, enquanto a captura da referência carregou o frame de olhos fechados; para aproximar o estado inicial, a próxima correção deve privilegiar o poster/idle no primeiro paint e deixar o vídeo ativo entrar progressivamente, em vez de torná-lo dominante imediatamente.

## QA visual final da cena

A cena inicial agora mantém o estado idle com olhos fechados, como a referência, e a camada ativa/loop só entra após rolagem. Em desktop, o layout apresenta personagem central, CTA inferior esquerdo, status no topo direito, rail social vertical e idiomas compactos. Em mobile, a captura de 390×844 mostra a marca, bandeiras e botão de menu sem a colisão anterior; a headline, descrição, CTA e rail horizontal continuam legíveis. O menu móvel expõe os três diálogos sem alterar a cena.
