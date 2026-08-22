# Changelog

## 22 de agosto de 2026

### Adicionado

- Landing localizada em PT-BR, EN e ES com metadata, canonical, hreflang, Open Graph, Twitter, sitemap, robots e manifest.
- Hero de avatar toy com poster, fallback de mídia e respeito a `prefers-reduced-motion`.
- Dialogs acessíveis de Trabalhos, Sobre e Contato, com foco inicial, trap de Tab, Escape, restauração de foco e deep links por hash.
- Cases com problema, decisão, próximo passo, resumo em 30 segundos e links públicos verificáveis.
- Cópia de link de Trabalhos, cópia de e-mail, cópia de WhatsApp, mailto contextualizado, agenda, LinkedIn e bloco “para começar”.
- Página editorial de engenharia e página “Agora” nos três idiomas, com breadcrumbs e JSON-LD específico.
- Fallback 404 multilíngue na direção “avatar procurando a rota”, com avatar toy existente, placa de direções, CTAs de recuperação, noindex e JSON-LD WebPage.
- Navegação por setas nas tabs e no menu mobile, preservação do contexto ao trocar idioma e estado ativo dos dialogs.
- Quality gate com type-check, lint, Vitest, build, integridade de assets, rotas, HTML e schemas estruturados.
- Telemetria opt-in privacy-first, sem provedor externo padrão e sem dados pessoais.

### Removido ou mantido fora do escopo

- O protótipo de jogo foi removido integralmente e não faz parte da aplicação publicada.
- Hero, vídeo e scroll-story não foram reabertos nesta onda, conforme escopo do proprietário.
- Não foram adicionados analytics externos, chatbot, formulário sem endpoint seguro, métricas fictícias, currículo não aprovado, mídia nova ou material histórico não utilizado.

### Qualidade

O release foi validado com `pnpm quality`, incluindo **17 arquivos de teste e 97 testes**, build das 12 páginas localizadas de conteúdo, verificação de 20 assets, rotas e integridade HTML. A 404 foi exercitada em produção com HTTP 404 para PT-BR, EN e ES e screenshots desktop/mobile; warnings conhecidos do jsdom sobre métodos de mídia não implementados não bloquearam o gate.
