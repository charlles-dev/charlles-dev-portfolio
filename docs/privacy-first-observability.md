# Observabilidade privacy-first

A landing não envia analytics por padrão. A abstração em `src/lib/telemetry.ts` existe para permitir diagnóstico de produto sem acoplar o portfólio a um provedor, sem inserir scripts externos no bundle e sem transformar a navegação em rastreamento invisível.

## Contrato de operação

O sink de telemetria começa vazio e só recebe eventos quando a aplicação que hospeda o portfólio o configura explicitamente. Mesmo com um sink configurado, os eventos só são encaminhados após o visitante conceder consentimento por meio de `setTelemetryConsent(true)`. O estado de consentimento é local ao navegador e pode ser removido com `setTelemetryConsent(false)`.

A abstração não cria requisições HTTP. A responsabilidade por escolher, configurar e revisar um provedor continua fora da landing. Isso evita enviar dados para um serviço que não tenha sido aprovado e permite que a página permaneça totalmente funcional quando nenhuma integração estiver disponível.

## Eventos permitidos

| Evento | Contexto registrado | O que não é registrado |
|---|---|---|
| `panel_open` | `work`, `about` ou `contact` | URL completa, hash arbitrário, referrer, identificador ou conteúdo do painel |
| `contact_cta_click` | `whatsapp`, `email` ou `calendar` | endereço de e-mail, número, nome, query string ou conteúdo da conversa |
| `video_fallback` | `hero-scrub`, `hero-idle` ou `hero-awake` | codec detalhado, IP, user agent, resolução ou identificador do visitante |
| `projects_refresh_error` | falha genérica da atualização da API pública | URL, resposta, projeto, usuário, IP ou identificador do visitante |

Não há cookies próprios, fingerprinting, gravação de sessão, mapa de calor ou coleta de campos de formulário. A telemetria também não usa timestamps ou IDs gerados no cliente; o sink pode adicionar contexto operacional somente se isso for revisado e permitido pela política do ambiente de hospedagem.

## Regras para futuras integrações

Antes de configurar um sink real, deve existir uma política de privacidade compatível, uma justificativa para cada evento e uma decisão explícita sobre retenção. O provedor deve aceitar eventos mínimos, não exigir PII para funcionar e permitir desativação sem rebuild da interface. Nenhuma chave secreta deve ser colocada em componentes client-side ou em variáveis expostas ao navegador.

A telemetria é deliberadamente tolerante a falhas: se o armazenamento local estiver bloqueado ou se o sink lançar uma exceção, a experiência continua funcionando. O quality gate deve permanecer verde mesmo com a telemetria desativada, que é o estado padrão.
