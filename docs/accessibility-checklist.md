# Checklist de acessibilidade da landing

Este checklist acompanha cada mudança visual ou interativa da landing. O objetivo é verificar comportamento, não apenas atributos isolados.

## Semântica e leitura

- [ ] Existe uma hierarquia de headings sem saltos injustificados em cada rota e estado de painel.
- [ ] Todo dialog tem nome acessível, `role="dialog"`, `aria-modal="true"`, título associado quando aplicável e fechamento visível.
- [ ] Ícones decorativos têm `aria-hidden="true"`; controles com ícone têm nome textual ou `aria-label`.
- [ ] Imagens de conteúdo têm alternativa localizada; imagens puramente decorativas têm `alt=""`.
- [ ] Estados de cópia, erro, carregamento e sucesso usam feedback perceptível e, quando necessário, `aria-live`.

## Teclado e foco

- [ ] A ordem de Tab acompanha a ordem visual e não entra em conteúdo inerte atrás de dialog.
- [ ] O foco entra no dialog, permanece dentro dele, fecha com Escape e retorna ao acionador.
- [ ] Tabs têm seleção exposta e suportam setas, Home e End sem criar foco invisível.
- [ ] Menu mobile tem abertura, fechamento, foco inicial, Escape e navegação entre itens.
- [ ] O foco visível mantém contraste suficiente em todos os estados de tema e mídia.

## Movimento e preferências do sistema

- [ ] `prefers-reduced-motion` elimina loops e transições não essenciais sem esconder conteúdo.
- [ ] Alterações não dependem de autoplay para comunicar título, proposta ou CTA.
- [ ] Forced colors/high contrast não deixa controles sem borda, texto ou indicador de estado.
- [ ] Blur, filtros e animações não são a única forma de distinguir estados.

## Layout e interação

- [ ] A interface foi conferida em 320, 375, 390, 768, 1024 e 1440 pixels ou em uma justificativa equivalente.
- [ ] Zoom de 200% e 400% não esconde CTA, título, conteúdo de case ou fechamento.
- [ ] Não há overflow horizontal causado por texto localizado, tabs, tags ou dialogs.
- [ ] Alvos de toque têm área confortável e não ficam colados a controles adjacentes.
- [ ] Links externos informam seu destino pelo texto ou rótulo e usam `rel` apropriado.

## Validação

- [ ] Existe teste automatizado ou evidência manual anexada para o comportamento novo.
- [ ] O teste foi repetido em pelo menos um locale não-PT-BR quando a feature contém texto.
- [ ] `pnpm quality` passou.
- [ ] A build de produção fresh foi aberta e comparada visualmente.
- [ ] Uma pessoa revisou a cópia localizada quando a mudança altera promessa, disponibilidade, currículo, resultado ou tom profissional.
