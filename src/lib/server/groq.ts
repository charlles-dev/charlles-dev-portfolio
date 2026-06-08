import "server-only";

import type { GitHubRepository, ProjectEnrichment } from "@/lib/projects/types";
import {
  buildEnrichmentPrompt,
  parseGroqEnrichmentResponse,
} from "@/lib/server/project-enrichment";

type GroqFetch = (
  url: string,
  init: RequestInit,
) => Promise<{
  ok: boolean;
  status: number;
  json: () => Promise<{
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  }>;
}>;

export async function enrichRepositoriesWithGroq({
  repositories,
  apiKey,
  model,
  fetchImpl = fetch as GroqFetch,
}: {
  repositories: GitHubRepository[];
  apiKey?: string;
  model?: string;
  fetchImpl?: GroqFetch;
}): Promise<Record<string, ProjectEnrichment>> {
  if (!apiKey || repositories.length === 0) {
    return {};
  }

  const prompt = buildEnrichmentPrompt(repositories);
  const response = await fetchImpl(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: model || "llama-3.3-70b-versatile",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: prompt.messages,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Groq enrichment request failed with status ${response.status}`,
    );
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content ?? "";

  return parseGroqEnrichmentResponse(content);
}
