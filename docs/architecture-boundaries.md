# Fronteiras arquiteturais do Charlles.dev

## Visão geral

O portfólio é uma aplicação Next.js App Router com renderização estática localizada. As páginas em `src/app` cuidam de rota, metadata, canonical, alternates e composição de dados; componentes em `src/components` cuidam de apresentação e interação; dados e contratos ficam em `src/lib`; checks repetíveis ficam em `scripts`.

| Camada | Responsabilidade | Regra de fronteira |
|---|---|---|
| `src/app` | Rotas, metadata, sitemap, manifest e robots | Não duplicar copy de interface nem lógica de interação. |
| `src/components` | UI, acessibilidade, dialogs e estados locais | Receber dados tipados; não inventar métricas ou conteúdo de case. |
| `src/lib/i18n.ts` | Contrato e dicionários PT-BR/EN/ES | Toda copy visível nova entra nos três locales antes do uso. |
| `src/lib/portfolio.ts` | Perfil, links sociais, projetos e agenda | URLs e fatos públicos devem permanecer verificáveis. |
| `src/lib/projects` | Tipos, fallback curado, integração pública e localização de repositórios | Falha remota mantém fallback curado visível. |
| `src/lib/telemetry.ts` | Eventos allowlisted e opt-in | Sem PII, sem provedor externo padrão e sem lógica de apresentação. |
| `scripts` | Quality gate e integridade pós-build | Scripts devem falhar com mensagem acionável e não modificar a árvore. |
| `public` | Assets publicados da landing | Não adicionar mídia experimental ou histórica sem necessidade de runtime. |

## Fluxo de dados

A página localizada obtém o locale validado, seleciona o dicionário e injeta os dados curados na composição. A integração pública de projetos pode atualizar o explorador quando disponível, mas não pode substituir a narrativa principal por conteúdo remoto não localizado ou não validado.

A telemetria é uma saída opcional, nunca uma dependência funcional. Sem consentimento explícito e sem sink configurado, `trackTelemetry` não transmite nada e não deve bloquear renderização, navegação ou contato.

## Regras para novas features

Antes de alterar a interface, classifique a mudança como rota, conteúdo, interação, asset, SEO ou operação. Se houver texto, atualize o contrato dos três idiomas; se houver link, valide destino e intenção; se houver asset, adicione referência e existência ao check; se houver interação, adicione cobertura de teclado, foco, reduced-motion e estado de erro quando aplicável.

Mudanças no Hero, vídeo ou scroll-story devem continuar isoladas em uma onda própria. Um refactor de componente não deve ser usado como pretexto para trocar mídia, poster ou comportamento de scroll.
