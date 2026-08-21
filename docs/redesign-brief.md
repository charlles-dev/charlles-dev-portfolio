# Redesign do portfólio Charlles.dev

## Direção de posicionamento

O portfólio deve apresentar Charlles Augusto como um **desenvolvedor web que transforma problemas reais em software claro, automações úteis e experiências confiáveis**. Cibersegurança e inteligência artificial entram como competências aplicadas, não como rótulos que dominam a narrativa. O texto precisa ser seguro e profissional, sem se apresentar como especialista sênior nem prometer resultados que os projetos públicos ainda não comprovam.

A headline escolhida para a primeira dobra será curta e específica: **“Eu transformo problemas reais em software que funciona.”** O texto de apoio explicará a interseção entre desenvolvimento web, automação e fundamentos de segurança. A assinatura secundária ficará em torno de “web · automação · segurança aplicada”, reforçando o posicionamento sem recorrer a expressões vagas como “sinais”, “campo”, “modo de entrega” ou “IA no core”.

## Direção visual

A referência de Daviaxs será usada como inspiração de experiência, não como cópia. A nova interface será uma composição **editorial, imersiva e dark-first**, com um hero de altura ampla, retrato recortado em escala grande, iluminação em gradientes verde/azul e uma camada sutil de grid. O nome Charlles Augusto terá presença tipográfica forte, enquanto o retrato funcionará como ponto humano e memorável da cena.

A navegação ficará fixa e discreta, com marca, links de trabalhos/sobre/contato, seletor de idiomas e alternância claro/escuro. Em telas grandes, os canais sociais podem aparecer em uma rail lateral; em telas pequenas, serão agrupados junto do CTA. O design deve manter bastante espaço negativo, bordas finas e animações lentas, mas não deve parecer dashboard, terminal ou produto de IA.

## Estrutura de conteúdo

A home será reduzida a uma narrativa com cinco movimentos. O hero fará o posicionamento e apresentará os CTAs. A seção de trabalhos mostrará três projetos curados como cases curtos, com contexto verificável e links. A seção “Como eu trabalho” explicará as competências em três eixos: interfaces e produtos web, automação e integrações, confiabilidade e segurança aplicada. A seção “Agora” apresentará apenas três focos mantidos, evitando parecer feed ou blog. O rodapé encerrará a narrativa com convite direto para conversar.

A antiga faixa de ticker, os divisores cinematográficos repetidos, a linguagem de “notas de campo” e os painéis que simulam interfaces técnicas serão removidos ou incorporados apenas quando agregarem informação. A meta é que cada bloco responda a uma pergunta real de quem contrata: quem é, o que constrói, como pensa, quais evidências possui e como entrar em contato.

## Copy-base em português

**Hero:** “Eu transformo problemas reais em software que funciona.” O apoio será: “Sou Charlles Augusto, desenvolvedor web de Campina Grande. Construo interfaces, APIs e automações com foco em clareza, manutenção e utilidade — com fundamentos de segurança guiando as decisões.”

**Projetos:** “Trabalho público, contexto real.” A descrição será: “Uma seleção de projetos que mostra como penso, construo e evoluo software.”

**Como eu trabalho:** “Tecnologia precisa reduzir atrito, não adicionar complexidade.” Os três eixos serão descritos com exemplos dos repositórios existentes, sem transformar estudo em experiência profissional fictícia.

**Agora:** “O que estou desenvolvendo e aprofundando.” Os sinais atuais serão Astrolink, a evolução do próprio portfólio e a prática de segurança aplicada.

**Contato:** “Tem um problema para resolver? Vamos conversar.” A chamada será orientada a oportunidades, projetos e colaboração técnica.

## Arquitetura multilíngue

A aplicação terá rotas por subcaminho: `/` para português do Brasil, `/en` para inglês e `/es` para espanhol. A implementação seguirá o padrão de segmento dinâmico documentado pelo Next.js para o App Router, com dicionários server-side, `generateStaticParams`, `hreflang`, canonical por idioma e detecção opcional do idioma do navegador na entrada inicial. O usuário sempre poderá trocar de idioma manualmente, e o idioma selecionado será persistido em cookie.

Os textos de interface, metadata, navegação, hero, seções, CTAs e cases curados serão traduzidos. Repositórios públicos adicionais continuarão exibindo nome e dados que vêm do GitHub, mas os rótulos da interface e os três projetos selecionados terão copy localizada para não deixar a experiência internacional parcialmente traduzida.

## Critérios de qualidade

A reformulação precisa manter foco visível para teclado, contraste adequado, alt text informativo, suporte a `prefers-reduced-motion`, ausência de overflow horizontal, leitura confortável em telas pequenas, metadata por idioma, Open Graph e JSON-LD de perfil. O build, lint, testes e inspeção visual deverão passar antes do commit.

## Referência usada

- [Daviaxs](https://daviaxs.com.br/): hero de tela cheia com cena visual dominante, navegação fixa, idiomas, tema claro/escuro, contatos laterais e trabalhos apresentados como experiência imersiva.
- [Next.js Internationalization](https://nextjs.org/docs/app/guides/internationalization): rotas por subcaminho, segmento dinâmico `[lang]`, dicionários server-side e geração estática por locale.
