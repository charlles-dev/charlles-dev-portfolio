# Pendências reais da landing Charlles.dev

**Data de referência:** 22 de agosto de 2026.  
**Commit auditado:** `f932bb6` (`origin/main`).  
**Objetivo:** registrar o que ainda não foi feito, sem apresentar o backlog estratégico como se cada ideia fosse uma obrigação contratada.

> O roadmap contém mais de 150 ideias e afirma explicitamente que ele é um backlog estratégico, não uma autorização para implementar tudo simultaneamente. Este documento transforma esse backlog em um inventário de estado: **concluído**, **parcial**, **pendente** ou **dependente de decisão/conteúdo real**.

## 1. Resumo executivo

A landing está publicada e funcional, mas ainda não está no estado de “produto editorial completo”. O núcleo da experiência foi fechado: hero com fallback, idiomas PT-BR/EN/ES, dialogs acessíveis, cases verificáveis, contato direto, SEO estrutural, deep links, página de engenharia e telemetria opt-in sem provedor externo.

O que permanece aberto concentra-se em quatro frentes: **hardening de engenharia**, **evidência profissional dos cases**, **validação em ambientes reais** e **conteúdo contínuo**. As funcionalidades mais chamativas do roadmap — modo recrutador, case em 30 segundos, currículo exportável, laboratório, visualizador de arquitetura e timeline — não foram implementadas.

| Área | Estado atual | Pendência principal |
|---|---|---|
| Fundação | Quality gate existe e passa | Completar pinagem, testes de assets/rotas e matriz de compatibilidade |
| Navegação | Deep links de painéis existem | Ainda não há modo linear/recrutador, índice de cases ou progressão contextual |
| Hero | Vídeo, poster, fallback e reduced-motion do sistema existem | Faltam medições reais, otimizações mobile dedicadas e controles opcionais |
| Cases | Três cases têm problema, decisão, próximo passo e links públicos | Faltam papéis, resultados verificáveis, resumo de 30 segundos e expansão detalhada |
| Conversão | WhatsApp, e-mail, cópia e agenda existem | Faltam currículo, CTA de LinkedIn e briefing/formulário seguro |
| Acessibilidade | Base de dialogs, teclado e reduced-motion existe | Faltam testes reais de leitor de tela, zoom, forced colors e auditoria completa |
| SEO | Metadata, JSON-LD base, sitemap e alternates existem | Faltam schema de projetos, auditoria periódica de links e rota de currículo |
| Conteúdo | Página de engenharia foi publicada | Ainda não há notas autorais, RSS/feed ou processo editorial contínuo |
| Observabilidade | API opt-in privacy-first existe | Não há provedor, dashboard, monitoramento ou métricas coletadas |
| Diferenciação | Compartilhamento de `#work` e página de engenharia existem | As demais experiências diferenciais continuam no backlog |

## 2. Fundação, manutenção e qualidade

| ID | Estado | O que ainda falta |
|---|---|---|
| F-01 | **Parcial** | TypeScript e ESLint estão pinados, mas `next`, React, React DOM, Vitest, Testing Library, ESLint config, tipos, PostCSS, Autoprefixer, jsdom e outros pacotes continuam com `latest` ou sem pinagem totalmente reprodutível. |
| F-02 | **Pendente** | Não há uma matriz formal no README técnico com versões compatíveis de Node, pnpm e navegadores. |
| F-03 | **Parcial** | Há separação prática entre componentes, dados e integrações, mas ainda não existe um documento/contrato arquitetural explícito para essa fronteira. |
| F-04 | **Parcial** | `pnpm quality` executa type-check, lint, testes e build, mas ainda não executa automaticamente crawling de rotas, verificação de links, existência de assets ou budgets de mídia/bundle. |
| F-06 | **Pendente** | Não existe teste dedicado que percorra todos os assets referenciados e falhe quando um arquivo estiver ausente. |
| F-07 | **Pendente** | Não existe validador automatizado de HTML das três rotas com links quebrados, atributos essenciais e estados renderizados. |
| F-08 | **Pendente** | Não há convenção documentada para commits, mudanças editoriais, assets e refactors. |
| F-09 | **Pendente** | Não há changelog curto de alterações visíveis ao visitante. |
| F-10 | **Pendente** | O relatório de QA existe, mas não foi criada uma página técnica privada/status separada para checks operacionais. |

## 3. Navegação e arquitetura de informação

| ID | Estado | O que ainda falta |
|---|---|---|
| N-02 | **Pendente** | Não há um indicador persistente e independente mostrando qual painel está aberto no header ou na navegação. O hash torna o estado compartilhável, mas não cria esse indicador visual. |
| N-09 | **Pendente** | As tabs de Trabalhos ainda não possuem navegação por setas como interação dedicada. |
| N-10 | **Pendente** | Painéis longos não têm ação específica de “voltar ao topo”. |
| N-11 | **Pendente** | A política de preservação/ajuste do scroll interno ao trocar de tab ainda não foi formalizada e validada como comportamento próprio. |
| N-12 | **Pendente** | Não há barra de progresso contextual para painéis extensos. |
| N-13 | **Pendente** | Não existe modo linear para recrutadores seguindo Sobre → Trabalhos → Contato. |
| N-14 | **Parcial** | Existe deep link para os painéis e cópia de `#work`, mas não há URL dedicada para cada case, idioma e contexto de apresentação. |

A marca já pode retornar ao início da rota atual, dialogs fecham por overlay/Escape, o histórico é atualizado e o conteúdo atrás do modal fica inerte. Esses pontos não devem ser reabertos como pendências nesta etapa.

## 4. Hero, vídeo e scroll

| ID | Estado | O que ainda falta |
|---|---|---|
| H-01 | **Parcial** | Há poster funcional e identidade visual aprovada, mas não foram produzidos/validados posters dedicados com enquadramento otimizado para desktop e mobile. |
| H-04 | **Parcial** | Existe intro/loading e poster, mas ainda não há uma máquina de estados de carregamento documentada com métricas de tempo útil e timeout explícito. |
| H-06 | **Pendente** | O visitante não possui controle explícito para pausar o hero. |
| H-07 | **Pendente** | O site respeita `prefers-reduced-motion`, mas não oferece um controle local opcional de reduzir movimento persistido durante a sessão. |
| H-08 | **Parcial** | O carregamento foi reduzido e há fallbacks, porém a política de carregamento sob demanda do loop secundário ainda não foi medida em dispositivos reais. |
| H-09 | **Parcial** | Foram reduzidos riscos de camadas e há fallbacks, mas ainda não existe profiling mobile demonstrando ausência de decodificações simultâneas excessivas. |
| H-10 | **Parcial** | Erros e fallbacks principais são tratados; ainda falta uma matriz completa de `stalled`, `waiting`, `loadeddata`, `visibilitychange` e retorno à aba com testes reais. |
| H-11 | **Não fechado** | O retorno à aba foi considerado no shell, mas ainda não foi validado em browsers/dispositivos reais sob suspensão e retomada prolongadas. |
| H-15 | **Parcial** | Os estados idle/awake e o scrub estão implementados, mas a aprovação de um loop final perceptualmente perfeito depende do asset final e de validação visual em movimento, não apenas de screenshots. |
| H-16 | **Pendente** | Não há transcript ou descrição textual equivalente para o movimento expressivo do hero. |
| H-17 | **Parcial** | O poster funciona como fallback, mas ainda não há uma versão/variante formal de exportação ou impressão documentada. |
| H-18 | **Pendente** | O hint de scroll ainda não possui lógica dedicada para desaparecer após a primeira interação. |
| H-19 | **Pendente** | Não foi criada uma apresentação alternativa formal sem JavaScript, além do HTML inicial e dos links convencionais existentes. |
| H-20 | **Parcial** | Houve QA em alguns viewports desktop/mobile, mas ainda falta uma matriz completa e repetível em 320, 375, 390, 768, 1024, 1440 e ultrawide. |

A produção de novo vídeo, edição do avatar ou alteração de `public/reference/charlles-toy-canonical.png` não faz parte das pendências de código. Qualquer nova troca de mídia depende de asset final aprovado e deve ser tratada como bloco único de poster, fallback, preload, enquadramento e reduced-motion.

## 5. Conteúdo e posicionamento profissional

| ID | Estado | O que ainda falta |
|---|---|---|
| C-02 | **Pendente** | Não foi criado experimento A/B ou comparação editorial entre headline orientada a produto e headline orientada a engenharia. |
| C-04 | **Parcial** | Existem CTAs específicos nos dialogs, mas não há uma política completa para contextualizar o CTA conforme o painel e a etapa de leitura. |
| C-05 | **Parcial** | Existem textos separados para hero, Sobre e SEO, mas não há um pacote editorial documentado de microbio curta, média e longa por locale. |
| C-08 | **Parcial** | Expertise, interesse e “agora” cobrem parte da proposta, mas não há uma seção claramente estruturada em construir, melhorar e automatizar. |
| C-09 | **Pendente** | Não foi informado nem publicado o perfil preferido de projeto, tamanho de parceria ou modelo de colaboração. |
| C-10 | **Pendente** | Não há microfrase de método organizada como entender → estruturar → construir → validar. |
| C-11 | **Parcial** | As categorias dos projetos existem, mas a distinção editorial entre autoral, profissional, experimento e repositório ainda não está explícita em cada case. |
| C-14 | **Pendente** | Não há glossário editorial para decidir quais termos técnicos devem ser traduzidos ou permanecer em inglês. |
| C-15 | **Parcial** | A política privacy-first está documentada, mas não há mensagem de privacidade exibida na interface porque nenhum analytics externo está ativo. |
| C-16 | **Pendente** | Não foi criada uma peça editorial específica sobre “construir com intenção”, além da copy geral da marca. |
| C-18 | **Pendente** | Não há processo editorial de atualização periódica com datas mantidas apenas quando houver manutenção real. |

A revisão de disponibilidade, localização, promessa de resposta e tipo de parceria continua dependente de confirmação do proprietário do portfólio. Não devem ser inventados horários, métricas ou compromissos para preencher essas lacunas.

## 6. Trabalhos, cases e prova técnica

| ID | Estado | O que ainda falta |
|---|---|---|
| W-03 | **Não auditado como política** | Os três cases atuais são sustentáveis como narrativa básica, mas não foi concluída uma curadoria formal que remova ou substitua cards insuficientemente comprovados. |
| W-04 | **Pendente** | A ordenação ainda não foi validada com uma matriz de relevância profissional, contribuição e evidência. |
| W-05 | **Parcial** | Stack aparece nos projetos, mas ainda falta associar cada tecnologia à decisão que ela sustentou, sem virar lista de buzzwords. |
| W-06 | **Pendente** | O papel exercido por Charlles — solo, front-end, integração, automação ou arquitetura — não está explícito por projeto. |
| W-07 | **Pendente** | Não há status formal lançado, em evolução, experimento ou arquivado em cada case. |
| W-08 | **Pendente** | Não há métricas quantitativas de resultado publicadas, porque ainda não foram fornecidas evidências verificáveis. |
| W-09 | **Pendente** | Não há visualização antes → decisão → depois. |
| W-10 | **Pendente** | Não há diagrama visual de fluxo para automações e integrações. |
| W-11 | **Parcial** | Há exploração/categorização de projetos, mas não existe filtro combinado e persistente por categoria, stack e tipo de contribuição no formato completo do roadmap. |
| W-12 | **Pendente** | Não existe página ou expansão de case completo que preserve o contexto do painel principal. |
| W-13 | **Pendente** | Não existe “case em 30 segundos” com resumo visual, papel, stack e resultado. |
| W-14 | **Pendente** | Não há modo expandido com decisões técnicas, trade-offs e limitações assumidas por case. |
| W-16 | **Parcial** | A API/explorador trabalha com atualização localizada quando há dado remoto, mas ainda não há política completa de data/status por projeto com fallback editorial consistente. |
| W-19 | **Pendente** | Não há imagem social específica por case. |
| W-20 | **Parcial** | Existe “próximo passo” nos cases, mas não uma política editorial para distinguir projetos incompletos e suas limitações. |
| W-22 | **Pendente** | Cases longos não têm índice interno. |
| W-23 | **Pendente** | Não há skeleton dedicado para a atualização remota de repositórios; o sistema usa dados curados e fallback silencioso. |
| W-24 | **Pendente** | Não há dados estruturados específicos para os projetos individuais. |

Os links públicos dos três repositórios estão presentes. Ainda faltam dados aprovados sobre contribuição, resultado, status e métricas; esta é uma dependência de conteúdo, não uma lacuna que deva ser preenchida por suposição técnica.

## 7. Sobre, contato e conversão

| ID | Estado | O que ainda falta |
|---|---|---|
| K-01 | **Parcial** | O contato possui CTA primário de WhatsApp e CTA secundário de agenda, mas não existe CTA secundário dedicado ao LinkedIn dentro do dialog. |
| K-02 | **Pendente** | O `mailto:` está disponível, mas não possui assunto e corpo pré-preenchidos com fallback para webmail. |
| K-04 | **Pendente** | Não há ação explícita de copiar WhatsApp. |
| K-08 | **Não fechado** | Há status de disponibilidade visual, mas horário/expectativa de resposta só poderá ser publicado após confirmação sustentável. |
| K-09 | **Pendente** | Não há bloco “o que enviar para começar” com escopo, prazo e referência. |
| K-10 | **Parcial** | Há múltiplos canais, mas não existe seleção editorial clara entre conversa profissional, técnica e rápida. |
| K-11 | **Pendente por segurança** | Não há formulário. Ele continua corretamente adiado até existir endpoint seguro, anti-spam, política de dados e mensagens localizadas. |
| K-12 | **Pendente por dependência** | Não há validação cliente/servidor porque não existe formulário nem endpoint. |
| K-16 | **Pendente por dependência** | Não existe currículo PDF/HTML atualizado e aprovado para disponibilizar. |
| K-17 | **Pendente** | Não existe versão “recrutador” do Sobre. |
| K-18 | **Pendente** | Não existe versão “cliente” do Sobre. |

A cópia de e-mail, fallback de Clipboard API, feedback localizado, WhatsApp e agenda já estão implementados. O que falta não deve ser confundido com uma falha do fluxo atual: são canais/formatos adicionais que exigem conteúdo e, no caso de formulário, infraestrutura e política de tratamento de dados.

## 8. Acessibilidade ainda não validada

| ID | Estado | O que ainda falta |
|---|---|---|
| A-01 | **Parcial** | A hierarquia básica foi revisada, mas não existe uma auditoria documentada de headings em todos os estados e locales. |
| A-06 | **Parcial** | Há contraste adaptado por estado visual e tema escuro, mas não há medição formal em todos os frames claros do vídeo. |
| A-07 | **Parcial** | Assets principais têm textos alternativos, mas ainda falta auditoria sistemática de cada imagem de projeto e variante de sprite. |
| A-08 | **Pendente** | Não há transcript/descrição equivalente do movimento do hero. |
| A-11 | **Pendente** | Zoom de 200% e 400% não foi validado em ambiente real. |
| A-12 | **Pendente** | Forced colors/high contrast não foi validado. |
| A-13 | **Parcial** | `prefers-reduced-motion` está coberto; `prefers-contrast` e preferência de transparência ainda não foram tratados como matriz própria. |
| A-17 | **Pendente** | Não foi realizado teste com leitor de tela em ambiente real. |
| A-18 | **Pendente** | Não há checklist versionado obrigatório para cada nova feature visual. |

A suíte automatizada cobre foco inicial, trap, Escape, restauração, `aria-modal`, `inert`, menu mobile, labels e estados de cópia. Isso reduz risco, mas não substitui teste manual com teclado, zoom, leitor de tela e forced colors.

## 9. SEO, compartilhamento e descoberta

| ID | Estado | O que ainda falta |
|---|---|---|
| S-11 | **Pendente** | Não há schema específico dos projetos individuais. |
| S-14 | **Pendente** | Não há rota rastreável de currículo/perfil resumido. |
| S-16 | **Parcial** | Metadata foi validada por testes e HTML; ainda falta validação de compartilhamento real em clientes sociais por locale. |
| S-17 | **Pendente** | Não existe auditoria periódica automatizada de links externos quebrados. |
| S-18 | **Pendente** | Não existe política formal de URLs permanentes além das convenções atuais de locale, engineering e hashes de painel. |

Canonical, alternates, `x-default`, sitemap, robots, manifest, OG/Twitter e JSON-LD base já existem. A lacuna restante é aprofundar dados de projetos, currículo e operação de links, não refazer a fundação já validada.

## 10. Performance, mídia e operação

| ID | Estado | O que ainda falta |
|---|---|---|
| P-01 | **Parcial** | Tamanhos de alguns vídeos foram levantados, mas não há inventário formal de bundle, fontes, posters e imagens com orçamento por release. |
| P-02 | **Pendente** | Não há pacote dedicado de versões dimensionadas/comprimidas para desktop e mobile. |
| P-03 | **Parcial** | WebM e MP4 existem; AV1 e uma política medida de seleção por suporte real ainda não foram implementados. |
| P-06 | **Não fechado** | Não existe evidência de que todos os vídeos, observers e efeitos sejam pausados quando a aba está oculta ou distante da seção. |
| P-07 | **Pendente** | `content-visibility` ou estratégia equivalente não foi aplicada/medida. |
| P-08 | **Parcial** | A página usa fontes definidas no layout, mas não há auditoria formal de fontes críticas e impacto no first paint. |
| P-09 | **Pendente** | Não foi feita redução dedicada do JavaScript enviado para a primeira dobra. |
| P-11 | **Não fechado** | A API pública possui fallback, mas cache com revalidação e política operacional de dados remotos não foram formalizados como objetivo de performance. |
| P-13 | **Pendente** | Não há medição de Core Web Vitals em celular real. |
| P-14 | **Pendente** | Não foram testadas redes 3G/4G limitadas, economia de dados ou dispositivos de baixo desempenho. |
| P-15 | **Pendente** | Não há budget de bundle/mídia que falhe no CI. |
| P-16 | **Pendente** | Não há auditoria completa de dimensões, alpha e metadata das imagens. |
| P-17 | **Pendente** | Blur, filtros e efeitos contínuos não foram perfilados em mobile real. |
| P-19 | **Parcial** | Houve build fresh e screenshots; ainda faltam primeira visita, cache quente, reload e retorno por histórico em matriz de browsers/dispositivos. |
| P-20 | **Pendente** | O QA final não contém um relatório quantitativo de performance com medições antes/depois. |

O quality gate passa, mas isso não equivale a uma auditoria de performance real. As maiores lacunas desta seção exigem dispositivo/cenário de rede e, para budgets, uma decisão de limite aceitável.

## 11. Internacionalização e localização

| ID | Estado | O que ainda falta |
|---|---|---|
| I-02 | **Pendente** | Não há teste dedicado que detecte resíduos de PT-BR em EN ou ES. |
| I-03 | **Dependente de revisão humana** | O espanhol está estruturado e coberto pelo contrato, mas ainda não houve revisão nativa/regional documentada. |
| I-04 | **Dependente de revisão humana** | O inglês está estruturado e coberto pelo contrato, mas ainda não houve revisão editorial humana documentada. |
| I-08 | **Parcial** | Foram revisados alguns viewports/locales, mas não há matriz completa de quebra mobile para todas as headlines, tabs e CTAs em PT-BR/EN/ES. |
| I-09 | **Parcial** | O contrato evita várias concatenações, mas ainda não há auditoria completa de ordem sintática específica por idioma. |
| I-12 | **Pendente** | Não há política formal para datas, números e status de projeto por locale. |
| I-13 | **Pendente** | Não há teste de comprimento máximo dos labels de tabs e botões. |
| I-14 | **Pendente** | Trocar idioma não preserva automaticamente a intenção do painel aberto em uma URL equivalente. |
| I-15 | **Pendente** | Não há checklist cultural de ícones, metáforas e sinais visuais. |

A completude top-level do dicionário e labels críticos estão cobertas. O que falta é revisão linguística humana, detecção de resíduos, política de formatação e QA visual sistemático por idioma.

## 12. Visual design, motion e microinterações

| ID | Estado | O que ainda falta |
|---|---|---|
| V-02 | **Parcial** | Existem regras e tokens CSS práticos, mas não uma escala tipográfica formal documentada por componente. |
| V-05 | **Pendente** | A transição dos painéis não possui origem espacial vinculada ao botão acionador. |
| V-06 | **Parcial** | Há feedback de cópia e estados de foco/hover, mas não um inventário completo de microfeedback para abertura, fechamento, clique e pressed. |
| V-10 | **Parcial** | O rail social se adapta ao mobile, mas ainda não há fallback formal para todos os espaços horizontais insuficientes. |
| V-11 | **Pendente** | Não foi adicionada textura visual de baixa frequência; a decisão atual é mantê-la fora até haver benefício claro. |
| V-13 | **Pendente** | Não existe estado específico para imagem quebrada manter composição e mensagem em todos os assets. |
| V-14 | **Parcial** | Borders, shadows e radii são coerentes na prática, mas não há guia visual formal desses tokens. |
| V-16 | **Pendente** | Não há modo opcional de contraste elevado. |

Não foi implementado tema claro novo, cursor customizado pesado, partículas em excesso, música automática ou gamificação; essas omissões são intencionais segundo o próprio roadmap.

## 13. Observabilidade e operação

| ID | Estado | O que ainda falta |
|---|---|---|
| O-01 | **Parcial** | A lista de eventos e a política de privacidade estão documentadas, mas ainda não há pergunta de negócio formal associada a cada evento. |
| O-02 | **Parcial** | Os emissores de abertura de painéis existem, mas nenhum dado é coletado sem sink e consentimento explícitos. |
| O-03 | **Parcial** | Os emissores de CTA existem, mas não há agregação nem relatório. |
| O-04 | **Parcial** | O fallback de vídeo emite evento allowlisted, mas não existe monitoramento real. |
| O-05 | **Pendente** | Não há medição de tempo até conteúdo útil. |
| O-06 | **Pendente** | Falhas da API pública ainda não são encaminhadas para observabilidade. |
| O-07 | **Pendente** | Não há dashboard por locale. |
| O-08 | **Parcial** | Existe consentimento programático, mas não há banner/UI porque nenhum provedor externo está ativo. |
| O-11 | **Pendente** | Não há monitoramento de disponibilidade da landing ou API. |
| O-12 | **Pendente** | Não há alertas operacionais. |

A decisão atual é **não configurar analytics externo**. Para ativar qualquer sink futuramente, ainda será necessário escolher provedor, revisar política de privacidade, retenção, consentimento, finalidade dos eventos e configuração segura de ambiente.

## 14. Features de diferenciação ainda não feitas

A tabela abaixo é a lista central de features que continuam no backlog. A exceção é X-13, que foi parcialmente atendida por deep links de painel e cópia de `#work`, e X-17, que foi implementada como página de engenharia.

| ID | Feature ainda não implementada |
|---|---|
| X-01 | Modo recrutador |
| X-02 | Modo cliente |
| X-03 | Case “30 segundos” |
| X-04 | Timeline de processo |
| X-05 | Laboratório técnico |
| X-06 | Playground de performance |
| X-07 | Visualizador de arquitetura |
| X-08 | Comparador antes/depois |
| X-09 | Mapa de competências |
| X-10 | Gerador de resumo por interesse |
| X-11 | Currículo interativo |
| X-12 | Exportação de currículo PDF/HTML |
| X-13 | Deep link por case/idioma/modo — apenas o nível de painel foi feito |
| X-14 | Agenda contextual com parâmetros controlados |
| X-15 | Disponibilidade dinâmica baseada em fonte confiável |
| X-16 | Notas de release |
| X-18 | Página de processo |
| X-19 | Transcrição opcional do hero |
| X-20 | CTA “Peça uma análise” com formulário/e-mail estruturado |

A recomendação continua sendo escolher no máximo duas ou três dessas features, começando por X-03, X-13 em sua versão completa e X-12 somente depois de existir currículo aprovado. Laboratório, IA, gerador de resumo e playground não devem ser adicionados apenas para aumentar a quantidade de interações.

## 15. Conteúdo contínuo e autoridade ainda não feitos

A página de engenharia não equivale a um sistema de publicação contínua. Os itens editoriais seguintes continuam abertos:

| ID | Pendência |
|---|---|
| ATO-01 | Seção “Notas” com três a cinco textos selecionados |
| ATO-02 | Estudos curtos de interface e acessibilidade |
| ATO-03 | Case de automação com diagrama e limitações |
| ATO-04 | Nota sobre performance do hero com medições antes/depois |
| ATO-05 | RSS/Atom, somente se houver frequência sustentável |
| ATO-06 | Tempo de leitura e data de atualização por texto |
| ATO-07 | Metadata e Open Graph por nota |
| ATO-08 | Compartilhamento de cada nota por URL estável |
| ATO-09 | Página de recursos recomendados |

ATO-10 — evitar tutoriais genéricos apenas para SEO — foi tratado como princípio editorial, não como feature visual. Antes de publicar notas, ainda é necessário definir fonte de conteúdo, periodicidade realista, revisão linguística e política de manutenção.

## 16. Dependências que exigem decisão ou material do proprietário

Estas pendências não devem ser resolvidas por inferência do agente:

| Dependência | Decisão/material necessário |
|---|---|
| Currículo | PDF/HTML atualizado, revisado e autorizado para publicação. |
| Cases | Papel exercido, status, resultados, limitações, métricas e links aprovados por projeto. |
| Copy | Revisão humana final de PT-BR, EN e ES, incluindo tom regional do espanhol. |
| Hero | Poster mobile/desktop e vídeo final aprovados se houver troca da mídia atual. |
| Contato | Confirmação de canais, expectativa de resposta e eventual assunto/corpo do e-mail. |
| Analytics | Provedor, finalidade, retenção, consentimento e política de privacidade, caso algum sink seja ativado. |
| Formulário | Endpoint, anti-spam, armazenamento, política de dados e fluxo de mensagens. |
| Disponibilidade | Fonte confiável e processo de manutenção para não exibir status desatualizado. |
| Conteúdo contínuo | Autorização editorial, temas, periodicidade e responsável por manutenção. |

## 17. Ordem recomendada para uma próxima onda

A próxima onda não deve começar por laboratório, chatbot, IA ou mais animações. A sequência recomendada é:

1. **Hardening:** pinagem completa de dependências, teste de assets, crawler de rotas/links, matriz Node/pnpm/browser e budgets de bundle/mídia.
2. **Validação real:** teclado, zoom 200%/400%, leitor de tela, forced colors, celular real, redes limitadas e Core Web Vitals.
3. **Evidência de cases:** receber papéis, status, resultados e limitações; implementar case em 30 segundos e modo expandido.
4. **Conversão profissional:** currículo aprovado, CTA de LinkedIn, assunto/body de e-mail e bloco “o que enviar para começar”.
5. **Conteúdo:** publicar duas ou três notas autorais, não um feed automático; adicionar metadata por nota somente quando houver textos reais.
6. **Diferenciação controlada:** escolher no máximo uma entre modo recrutador, timeline, arquitetura ou exportação de currículo, depois de validar as etapas anteriores.

## 18. Referências internas

- [Roadmap amplo de melhorias](./landing-improvement-roadmap.md)
- [Relatório de QA final](./landing-qa-final.md)
- [Observabilidade privacy-first](./privacy-first-observability.md)
- [Pesquisa técnica da landing](./landing-improvement-research.md)

## 19. Adendo após a onda de implementação sem dependências

Este adendo atualiza o inventário para a execução autorizada pelo proprietário: implementar tudo que não envolva Hero, vídeo, scroll ou decisões/material externo. As linhas anteriores preservam o histórico do diagnóstico original; quando houver conflito de status, este adendo é a referência mais recente.

| Bloco | Estado atualizado |
|---|---|
| Fundação e hardening | Concluído: dependências do manifest foram pinadas, há matriz de compatibilidade, fronteiras arquiteturais, convenções de contribuição, verificação de assets, rotas e HTML. |
| Navegação e acessibilidade independente do scroll | Concluído o que era autossuficiente: estado ativo dos dialogs, roving tabindex nas tabs e menu mobile, preservação de contexto ao trocar locale, checklist versionado e forced colors no CSS. |
| Cases e conversão independente de conteúdo proprietário | Concluído o resumo “Em 30 segundos”, mailto contextual, cópia de WhatsApp, LinkedIn, briefing inicial e eventos mínimos de contato. Papel, status, métricas e trade-offs por projeto continuam dependentes de confirmação. |
| SEO e descoberta | Concluídos schemas de projetos na home, breadcrumbs/schema nas páginas editoriais, rota localizada “Agora”, rota localizada “Processo”, sitemap e crawler HTML atualizado. |
| Diferenciação autossuficiente | Concluídas as páginas “Agora” e “Processo”, mantendo o modo recrutador, currículo, laboratório, comparadores e visualizador de arquitetura fora até haver conteúdo ou decisão suficiente. |
| Observabilidade | Concluído o evento mínimo de falha da API pública; continua deliberadamente sem sink, dashboard, alertas ou analytics externo. |
| Links externos | Check manual implementado e documentado. LinkedIn continua indeterminado por proteção anti-bot; agenda retorna 404; Laudos Proxxima existe como repositório privado. Nenhum desses destinos foi alterado por inferência. |

Continuam realmente pendentes apenas os itens que exigem validação externa ou material do proprietário: troca e profiling real do Hero/vídeo/scroll, testes em dispositivos e leitores de tela reais, revisão nativa de EN/ES, papéis/status/métricas dos cases, currículo aprovado, formulário com endpoint e política de dados, disponibilidade, analytics com provedor escolhido e sistema editorial contínuo. Features opcionais que não aumentam a evidência profissional — chatbot, IA genérica, gamificação, laboratório sem experimento real e playground sem hipótese — permanecem fora por decisão de qualidade.
