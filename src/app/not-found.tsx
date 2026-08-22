import type { Metadata } from "next";

import { LocalizedNotFoundPage } from "@/components/localized-not-found-page";

export const metadata: Metadata = {
  title: "404 / rota ausente | Charlles.dev",
  description: "A rota não foi encontrada, mas os próximos caminhos do portfólio continuam disponíveis.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return <LocalizedNotFoundPage fallbackLocale="pt-BR" />;
}
