# Charlles Dev Portfolio

Portfólio profissional de Charlles Augusto, desenvolvido em Next.js, Tailwind CSS e TypeScript. A landing apresenta identidade pessoal, projetos públicos sincronizados do GitHub e enriquecimento server-side via Groq para transformar metadados de repositórios em descrições mais claras.

Live: [charlles-dev.vercel.app](https://charlles-dev.vercel.app)

## Sobre

Este projeto foi construído para funcionar como uma presença profissional enxuta: uma página rápida, visualmente polida e focada em trabalhos públicos, stack, credenciais e contato direto.

O portfólio evita conteúdo fictício no front. Os projetos vêm da API pública do GitHub e passam por uma rota server-side que pode usar Groq para gerar resumos, categorias e próximos passos sem expor prompts, tokens ou chaves no navegador.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Iconify
- GitHub API
- Groq API em rota server-side
- Vercel

## Funcionalidades

- Landing page responsiva e cinematográfica
- Hero com identidade visual própria
- Projetos públicos sincronizados do GitHub
- Enriquecimento de projetos com IA no backend
- Fallback seguro quando GitHub ou Groq falham
- Filtros e busca no explorer de repositórios
- Favicon e assets próprios
- Testes com Vitest e Testing Library

## Variáveis de ambiente

Crie um `.env.local` a partir de `.env.example`:

```env
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
GITHUB_OWNER=charlles-dev
GITHUB_TOKEN=
PROJECTS_CACHE_TTL_SECONDS=21600
```

`GROQ_API_KEY` e `GITHUB_TOKEN` são opcionais para rodar a página, mas melhoram o enriquecimento e limites de API. Eles devem ficar apenas em `.env.local` ou nas environment variables da Vercel.

Nunca use `NEXT_PUBLIC_GROQ_API_KEY` ou `NEXT_PUBLIC_GITHUB_TOKEN`.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Verificação

```bash
npm test
npm run lint
npm run build
```

## Segurança

- A chave Groq é lida somente no servidor.
- A rota pública `/api/projects` retorna apenas JSON seguro para o portfólio.
- `.env.local`, `.vercel/`, `.next/`, `node_modules/` e outputs locais são ignorados pelo Git.
- O front não recebe variáveis `GROQ_*` nem `GITHUB_TOKEN`.

## Deploy

O projeto está publicado na Vercel e conectado ao GitHub:

- GitHub: [charlles-dev/charlles-dev-portfolio](https://github.com/charlles-dev/charlles-dev-portfolio)
- Produção: [charlles-dev.vercel.app](https://charlles-dev.vercel.app)
