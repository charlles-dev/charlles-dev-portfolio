# charlles.dev

Presença digital de **Charlles Augusto**: um portfólio pessoal e profissional pensado para apresentar trajetória, projetos públicos, stack, interesses técnicos e canais de contato com uma experiência visual mais madura.

Este repositório não é um template nem um starter. Ele sustenta a versão publicada do meu portfólio.

**Live:** [charlles-dev.vercel.app](https://charlles-dev.vercel.app)  
**GitHub:** [github.com/charlles-dev](https://github.com/charlles-dev)  
**LinkedIn:** [linkedin.com/in/charlles-augusto](https://www.linkedin.com/in/charlles-augusto/)

## Intenção

O projeto nasce com uma direção simples: transformar o portfólio em uma presença profissional clara, visualmente forte e conectada ao que eu realmente construo.

A página combina identidade pessoal, projetos reais do GitHub, sinais de evolução técnica e uma camada discreta de IA no backend para organizar melhor as informações públicas dos repositórios.

## Experiência

- Hero com retrato, marca própria e posicionamento profissional.
- Seções editoriais sobre atuação, stack, credenciais e contato.
- Explorer de projetos públicos sincronizados com GitHub.
- Enriquecimento server-side dos projetos para gerar resumos, categorias e próximos passos.
- Interface responsiva, cinematográfica e focada em leitura.

## Construção

O portfólio foi desenvolvido com:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Iconify
- GitHub API
- Groq em rota server-side
- Vercel

## Desenvolvimento local

Use Node.js 22.13+ e pnpm 11.21.0 para reproduzir o ambiente do projeto. A configuração versionada em `pnpm-workspace.yaml` permite somente o script nativo de `unrs-resolver` durante a instalação, mantendo a proteção de supply chain do pnpm 11 sem liberar scripts de dependências indiscriminadamente.

```bash
pnpm install --frozen-lockfile
pnpm quality
```

## Projetos

Os projetos exibidos no site são sincronizados a partir dos repositórios públicos do perfil [charlles-dev](https://github.com/charlles-dev).

A camada de IA não roda no navegador. Ela atua no servidor para transformar dados públicos dos repositórios em descrições mais úteis para quem está avaliando o trabalho: problema, entrega, contexto técnico e próximo passo.

## Segurança

- A chave da Groq fica somente em ambiente privado.
- Nenhum token sensível usa prefixo `NEXT_PUBLIC_`.
- `.env.local`, `.vercel/`, `.next/`, `node_modules/` e saídas locais não entram no Git.
- O front recebe apenas os dados já tratados pela rota pública `/api/projects`.

## Status

V1 publicada e em evolução contínua.

Próximos passos previstos: refinar narrativa dos projetos, melhorar evidências de entrega, adicionar estudos de caso mais completos e evoluir a identidade visual sem perder sobriedade.
