# Validação de SEO e mobile

## Produção

A publicação respondeu HTTP 200 nas rotas `https://www.charlles.dev/pt-BR`, `/en` e `/es`, além de `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/reference/charlles-og-image.png`, `/assets/icon-192.png`, `/assets/icon-512.png` e `/assets/apple-touch-icon.png`.

O HTML renderizado de `/pt-BR` contém title `Charlles Augusto | Desenvolvedor web e software`, canonical `https://www.charlles.dev/pt-BR`, `og:title`, `og:url`, `og:locale=pt_BR`, `og:image=https://www.charlles.dev/reference/charlles-og-image.png`, `og:type=website`, Twitter `summary_large_image` e JSON-LD.

A raiz sem `www` redireciona permanentemente para `https://www.charlles.dev/`; a raiz com `www` redireciona para `/pt-BR`. Por isso o sitemap e os canonicals usam diretamente `/pt-BR`, `/en` e `/es`.

## Mobile

A captura headless em 390×844 confirmou menu aberto em dropdown ancorado ao botão, três ações (`Trabalhos`, `Sobre`, `Contato`), três links de idioma (`Português`, `English`, `Español`), `aria-current="page"` no locale ativo, `overflow: hidden` durante a abertura e restauração para `overflow: visible` após clique externo. O botão mediu 41,59×41,59 px.

A mesma validação em 320×740 confirmou `documentScrollWidth=320` e `bodyScrollWidth=320`, sem overflow horizontal. O dropdown permaneceu dentro do viewport, com largura de 192 px e todos os links de idioma visíveis.

## Qualidade

A suíte automatizada passou com 59 testes. Lint e build Next.js passaram sem warnings. O commit publicado é `5664132`.
