import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://charlles.dev"),
  title: "Charlles Augusto | Desenvolvimento web e automações",
  description:
    "Portfólio de Charlles Augusto, desenvolvedor focado em produtos web, automações e segurança aplicada.",
  authors: [{ name: "Charlles Augusto" }],
  icons: {
    icon: "/assets/favicon.ico?v=2",
    shortcut: "/assets/favicon.ico?v=2"
  },
  openGraph: {
    title: "Charlles Augusto | Desenvolvimento web e automações",
    description:
      "Uma landing pessoal sobre software, automação, cibersegurança e projetos públicos.",
    type: "website",
    images: [
      {
        url: "/assets/charlles-portrait.png",
        width: 1200,
        height: 1200,
        alt: "Retrato de Charlles Augusto"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
