# Pesquisa de melhorias da landing

## Critérios aplicados

A implementação de dialogs segue o padrão [WAI-ARIA Dialog Modal][1]: ao abrir, o foco entra no dialog; `Tab` e `Shift+Tab` permanecem dentro dele; `Escape` fecha; e o foco retorna ao elemento que acionou a abertura. O dialog deve ter `aria-modal="true"`, nome acessível e um botão de fechamento visível.

Para o hero em vídeo, o elemento `<video>` deve manter `muted` e `playsinline` para uma experiência silenciosa e inline. O atributo `preload` é apenas uma dica ao navegador: `auto` pode baixar o arquivo inteiro, `metadata` baixa apenas metadados e `none` evita preloading. A landing pode carregar o loop inicial com intenção, manter o estado final sob demanda e sempre preservar o poster como fallback; a estratégia não deve bloquear leitura nem depender exclusivamente de reprodução automática.

Para as três versões linguísticas, cada página deve listar a si própria e todas as alternativas com URLs absolutas e recíprocas. O sitemap já reúne os três locales; os metadados HTML também devem manter canonical, `hreflang` e `x-default` consistentes.

## Estado observado

A remoção do protótipo deixou a landing sem referências ativas ao runtime ou à rota experimental anterior. A captura fresh desktop/mobile confirma que o hero real, a logo, a navegação, o rail social e o loading continuam presentes. O próximo passe deve priorizar foco/escape dos dialogs, foco do menu mobile, redução do controle de tema obsoleto, labels localizados e refinamento de escala/enquadramento do hero em telas estreitas.

## Referências

[1]: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ "WAI-ARIA Authoring Practices — Dialog (Modal) Pattern"
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video "MDN — <video> HTML video embed element"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/preload "MDN — HTMLMediaElement preload"
[4]: https://developers.google.com/search/docs/specialty/international/localized-versions "Google Search Central — Localized versions of your pages"
