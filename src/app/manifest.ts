import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/pt-BR",
    name: "Charlles.dev — Portfólio de desenvolvimento web",
    short_name: "Charlles.dev",
    description: "Portfólio de Charlles Augusto — desenvolvimento web, sistemas, automação e interfaces digitais.",
    start_url: "/pt-BR",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#080c10",
    theme_color: "#080c10",
    lang: "pt-BR",
    categories: ["portfolio", "productivity", "technology"],
    icons: [
      { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
