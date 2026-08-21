import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "../globals.css";
import { isLocale, locales } from "@/lib/i18n";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://charlles.dev"),
  authors: [{ name: "Charlles Augusto", url: "https://github.com/charlles-dev" }],
  creator: "Charlles Augusto",
  icons: { icon: "/assets/favicon.ico?v=3", shortcut: "/assets/favicon.ico?v=3" },
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
        <a className="skip-link" href="#conteudo">{rawLocale === "pt-BR" ? "Pular para o conteúdo" : rawLocale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.theme=localStorage.getItem("charlles-theme")||"dark";`,
          }}
        />
      </body>
    </html>
  );
}
