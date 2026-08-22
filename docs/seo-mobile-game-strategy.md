# Estratégia de SEO e usabilidade mobile

## SEO e descoberta

A prioridade será alinhar todas as URLs ao domínio final `https://www.charlles.dev`, mantendo `/pt-BR`, `/en` e `/es` como páginas canônicas distintas. O HTML deve continuar entregando conteúdo real no servidor: um único `h1` por locale, headings semânticos, links internos rastreáveis, descrições de projeto e alt text para imagens relevantes.

Os metadados por idioma devem usar títulos específicos e descrições naturais com termos que já aparecem no conteúdo: “desenvolvedor de software”, “desenvolvedor web”, “Next.js”, “TypeScript”, “automação”, “interfaces”, “sistemas” e “Campina Grande” em português; equivalentes em inglês e espanhol nos respectivos locales. Não será usado keyword stuffing. O objetivo é deixar claro quem é Charlles, o que ele constrói e em que região/mercado atua.

A camada de compartilhamento deve usar uma imagem Open Graph dedicada em 1200×630, além do poster do hero e do avatar no JSON-LD. O layout deve expor `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:locale`, `og:image`, dimensões, tipo e alt. Twitter/X usará `summary_large_image`. O favicon continuará sendo o símbolo verde isolado, com variantes para browser e Apple touch icon. Essas tags controlam previews de compartilhamento; a imagem exibida em um resultado de busca específico continua sendo uma decisão do mecanismo de busca.

O JSON-LD será mantido preciso e visível como `ProfilePage` com `mainEntity` `Person`, `sameAs`, `image`, `jobTitle` e `knowsAbout`, complementado por `WebSite` quando a entidade estiver correta. A implementação será validada com o [Rich Results Test](https://search.google.com/test/rich-results) e a inspeção de URL do Search Console depois da publicação. O Google recomenda JSON-LD e exige que dados estruturados representem conteúdo real da página [1] [2]. Open Graph exige, no mínimo, título, tipo, imagem e URL canônica, recomendando descrição e metadados adicionais de imagem [3]. Bing recomenda sitemap com URLs canônicas, links internos rastreáveis, HTML semântico, alt text e structured data fiel [4].

## Usabilidade mobile

A revisão deverá ampliar targets de toque para pelo menos uma área confortável, evitar overflow horizontal, preservar foco visível, fechar o menu por Escape e clique externo, manter a navegação de idioma acessível e transformar o menu mobile em uma superfície claramente identificável. Dialogs de Trabalhos, Sobre e Contato devem respeitar a altura útil da viewport, permitir scroll interno sem prender o documento e manter um caminho de saída sempre visível.

O hero será revisado em larguras estreitas para controlar a quebra do `h1`, reduzir a densidade da descrição e garantir que o rail social não concorra com o CTA. Animações não essenciais respeitarão `prefers-reduced-motion`; o comportamento do vídeo deve continuar funcional, mas sem obrigar o usuário a acompanhar uma animação para entender o conteúdo.

## Referências

[1]: https://developers.google.com/search/docs/appearance/structured-data/profile-page "Google Search Central — ProfilePage structured data"
[2]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Google Search Central — Introduction to structured data"
[3]: https://ogp.me/ "The Open Graph protocol"
[4]: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a "Bing Webmaster Guidelines"
