import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import "../globals.css";
import { Intro } from "@/components/intro";
import { isLocale, locales } from "@/lib/i18n";

const spaceGrotesk = localFont({
  src: "../../assets/fonts/space-grotesk-latin-variable.woff2",
  variable: "--font-sans",
  weight: "300 700",
  style: "normal",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: "../../assets/fonts/jetbrains-mono-latin-variable.woff2",
  variable: "--font-mono",
  weight: "100 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.charlles.dev"),
  applicationName: "Charlles.dev",
  authors: [{ name: "Charlles Augusto", url: "https://github.com/charlles-dev" }],
  creator: "Charlles Augusto",
  publisher: "Charlles Augusto",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico?v=4", sizes: "32x32", type: "image/x-icon" },
      { url: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
    shortcut: "/assets/favicon.ico?v=4",
  },
};

export const viewport: Viewport = {
  themeColor: "#080c10",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return (
    <html lang={rawLocale} className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Intro />
        <a className="skip-link" href="#conteudo">{rawLocale === "pt-BR" ? "Pular para o conteúdo" : rawLocale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
        {children}
      </body>
    </html>
  );
}
