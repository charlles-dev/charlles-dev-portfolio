# Política de URLs e localização

## URLs permanentes

As páginas públicas usam o locale explícito como primeiro segmento. A home segue `/pt-BR`, `/en` e `/es`; as páginas editoriais seguem o mesmo prefixo com `/engineering`, `/now` ou `/process`. O `x-default` aponta para PT-BR. Hashes de painéis pertencem à home localizada e são limitados a `#work`, `#about` e `#contact`.

| Intenção | Formato | Observação |
|---|---|---|
| Home em português | `/pt-BR` | Canonical principal. |
| Home em inglês | `/en` | Alternate localizada. |
| Home em espanhol | `/es` | Alternate localizada. |
| Notas de engenharia | `/{locale}/engineering` | Página editorial, sem feed. |
| Focos atuais | `/{locale}/now` | Conteúdo curado, não feed automático. |
| Processo | `/{locale}/process` | Método geral de trabalho. |
| Painel da home | `/{locale}#work`, `#about` ou `#contact` | Hash curto e compartilhável. |

Não criar aliases silenciosos, URLs dependentes de texto traduzido ou parâmetros que possam expor dados pessoais. Uma nova página deve receber canonical, alternates, sitemap, metadata e teste de rota antes de ser publicada.

## Locale e copy

O contrato de dicionário é a fonte de todas as strings visíveis. PT-BR, EN e ES devem preservar a mesma intenção, não necessariamente a mesma quantidade de palavras. Nomes próprios, marcas, linguagens e URLs permanecem em sua forma oficial; títulos, instruções, estados e mensagens de erro são traduzidos.

Datas, números e status de projeto só devem aparecer quando houver um dado real para formatar. Quando não houver evidência suficiente, preferir uma descrição qualitativa localizada a inventar precisão. Revisões humanas regionais continuam recomendadas para inglês e espanhol antes de prometer tom nativo ou disponibilidade local.

## Links externos

Links de contato e repositórios devem permanecer estáveis e verificáveis. O check manual em `pnpm links:check` ajuda a identificar mudanças, mas não substitui a confirmação do proprietário quando um destino exige login, bloqueia bots ou retorna 404 público para um recurso privado.
