# Check manual de links externos

O comando `pnpm links:check` verifica as URLs públicas declaradas em `src/lib/portfolio.ts` com timeout curto, redirecionamento permitido e fallback de `HEAD` para `GET` quando o servidor não aceita `HEAD`. Ele não entra no `pnpm quality`, porque serviços de terceiros podem bloquear bots, exigir login ou mudar de disponibilidade sem uma alteração no código.

## Última execução registrada

| Destino | Resultado | Interpretação |
|---|---:|---|
| GitHub do perfil | HTTP 200 | Acessível. |
| Discord | HTTP 200 | Acessível. |
| WhatsApp | HTTP 200 | Acessível. |
| Astrolink | HTTP 200 | Repositório público acessível. |
| 3035 Teach | HTTP 200 | Repositório público acessível. |
| LinkedIn | HTTP 999 | Indeterminado; o servidor respondeu com proteção anti-bot. |
| `call.com/charles-dev` | HTTP 404 | Requer confirmação do proprietário antes de substituir a agenda. |
| `Laudos-Proxxima` | HTTP 404 público | O repositório existe como privado na conta do GitHub; requer decisão sobre publicar, trocar o destino ou manter o link. |

Um resultado 404 em um canal de contato ou repositório não deve ser “corrigido” por inferência. O agente deve preservar o destino até que o proprietário confirme a URL pública ou autorize a mudança. O check pode ser repetido manualmente após qualquer alteração de link.
