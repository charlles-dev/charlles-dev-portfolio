import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Charlles.dev",
    short_name: "Charlles.dev",
    description: "Portfólio de Charlles Augusto — desenvolvimento web, automação e segurança aplicada.",
    start_url: "/",
    display: "standalone",
    background_color: "#07100d",
    theme_color: "#07100d",
    lang: "pt-BR",
    icons: [{ src: "/assets/favicon.ico", sizes: "48x48", type: "image/x-icon" }],
  };
}
