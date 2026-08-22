# Estratégia de SEO, mobile e projeto de jogo

## SEO e descoberta

A prioridade será alinhar todas as URLs ao domínio final `https://www.charlles.dev`, mantendo `/pt-BR`, `/en` e `/es` como páginas canônicas distintas. O HTML deve continuar entregando conteúdo real no servidor: um único `h1` por locale, headings semânticos, links internos rastreáveis, descrições de projeto e alt text para imagens relevantes.

Os metadados por idioma devem usar títulos específicos e descrições naturais com termos que já aparecem no conteúdo: “desenvolvedor de software”, “desenvolvedor web”, “Next.js”, “TypeScript”, “automação”, “interfaces”, “sistemas” e “Campina Grande” em português; equivalentes em inglês e espanhol nos respectivos locales. Não será usado keyword stuffing. O objetivo é deixar claro quem é Charlles, o que ele constrói e em que região/mercado atua.

A camada de compartilhamento deve usar uma imagem Open Graph dedicada em 1200×630, além do poster do hero e do avatar no JSON-LD. O layout deve expor `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:locale`, `og:image`, dimensões, tipo e alt. Twitter/X usará `summary_large_image`. O favicon continuará sendo o símbolo verde isolado, com variantes para browser e Apple touch icon. Essas tags controlam previews de compartilhamento; a imagem exibida em um resultado de busca específico continua sendo uma decisão do mecanismo de busca.

O JSON-LD será mantido preciso e visível como `ProfilePage` com `mainEntity` `Person`, `sameAs`, `image`, `jobTitle` e `knowsAbout`, complementado por `WebSite` quando a entidade estiver correta. A implementação será validada com o [Rich Results Test](https://search.google.com/test/rich-results) e a inspeção de URL do Search Console depois da publicação. O Google recomenda JSON-LD e exige que dados estruturados representem conteúdo real da página [1] [2]. Open Graph exige, no mínimo, título, tipo, imagem e URL canônica, recomendando descrição e metadados adicionais de imagem [3]. Bing recomenda sitemap com URLs canônicas, links internos rastreáveis, HTML semântico, alt text e structured data fiel [4].

## Usabilidade mobile

A revisão deverá ampliar targets de toque para pelo menos uma área confortável, evitar overflow horizontal, preservar foco visível, fechar o menu por Escape e clique externo, manter a navegação de idioma acessível e transformar o menu mobile em uma superfície claramente identificável. Dialogs de Trabalhos, Sobre e Contato devem respeitar a altura útil da viewport, permitir scroll interno sem prender o documento e manter um caminho de saída sempre visível.

O hero será revisado em larguras estreitas para controlar a quebra do `h1`, reduzir a densidade da descrição e garantir que o rail social não concorra com o CTA. Animações não essenciais respeitarão `prefers-reduced-motion`; o comportamento do vídeo deve continuar funcional, mas sem obrigar o usuário a acompanhar uma animação para entender o conteúdo.

## Projeto de jogo recomendado

### Núcleo em Órbita — jogo 2D de ação-puzzle

A melhor primeira versão é um jogo 2D curto, jogável no navegador e diretamente conectado ao universo visual do portfólio. O jogador controla uma versão toy/biscuit do personagem de Charlles em um cenário que começa escuro e evolui para um céu cósmico. Cada fase representa um problema de sistema: coletar fragmentos de sinal, conectar nós na ordem correta e escapar de zonas de ruído antes que o circuito seja corrompido.

A escolha por 2D é intencional: permite gerar um conjunto pequeno e consistente de sprites, entregar uma experiência completa com baixo risco e demonstrar competências valiosas para um portfólio de software — máquina de estados, colisões, partículas, parallax, áudio opcional, performance, acessibilidade e arquitetura de componentes. Um 3D completo pode ser uma segunda etapa, depois que a versão 2D provar o conceito.

| Elemento | Escopo recomendado para o MVP |
|---|---|
| Loop principal | Mover, coletar fragmentos, ativar três nós e alcançar a saída |
| Duração | Três fases de 60–120 segundos |
| Identidade | Personagem toy de Charlles, óculos redondos, cabelo cacheado e moletom escuro |
| Sprites essenciais | Idle, corrida em quatro quadros, salto/queda, interação, dano e conclusão |
| Cenário | Fundo escuro, partículas, nuvens/parallax e transição gradual para luz azul |
| Diferencial técnico | Níveis declarativos, replay rápido, teclado e controles touch, `prefers-reduced-motion` |
| Evidência no portfólio | Link “Jogar”, estudo de caso, decisões de arquitetura e medição de performance |

O projeto não deve ser adicionado à página como um mockup estático. A próxima etapa, após aprovação do conceito, será criar um pequeno documento de escopo, produzir uma referência visual, gerar os sprites com transparência e consistência de poses, implementar o slice de movimento/colisão e só então integrar o link ao painel Trabalhos.

## Referências

[1]: https://developers.google.com/search/docs/appearance/structured-data/profile-page "Google Search Central — ProfilePage structured data"
[2]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Google Search Central — Introduction to structured data"
[3]: https://ogp.me/ "The Open Graph protocol"
[4]: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a "Bing Webmaster Guidelines"
