# Projects Environment

The GitHub + Groq projects pipeline runs only on the server.

Local development uses `.env.local`, which is ignored by git.

```env
GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.3-70b-versatile
GITHUB_OWNER=charlles-dev
GITHUB_TOKEN=github_public_repo_rate_limit_token
PROJECTS_CACHE_TTL_SECONDS=21600
```

Never use `NEXT_PUBLIC_GROQ_API_KEY` or `NEXT_PUBLIC_GITHUB_TOKEN`.

The browser calls `/api/projects` and receives only safe portfolio JSON.
