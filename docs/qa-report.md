# Relatório de QA técnico

A suíte de testes, o lint e o build de produção passaram após a implementação.

| Verificação | Resultado |
|---|---|
| Rotas localizadas `/pt-BR`, `/en`, `/es` | OK — HTML 200 e idioma correto |
| Entrada `/` | OK — redireciona para `/pt-BR` e salva `NEXT_LOCALE` |
| Canonical e hreflang | OK — PT-BR, EN, ES e x-default presentes |
| JSON-LD | OK — ProfilePage/Person presentes |
| `robots.txt` | OK — permite rastreamento e aponta para sitemap |
| `sitemap.xml` | OK — três URLs localizadas com alternates |
| `manifest.webmanifest` | OK — identidade, tema e ícone presentes |
| Fallback de projetos | OK — integração GitHub continua com fallback curado |
| Acessibilidade estrutural | OK — headings, skip link, alt text, focus-visible e reduced motion |
| Assets principais | OK — retrato e marca presentes |

As ocorrências de `GROQ_API_KEY` e `GITHUB_TOKEN` permanecem somente no código server-side da integração existente; não são renderizadas na interface nem expostas pelo payload público.
