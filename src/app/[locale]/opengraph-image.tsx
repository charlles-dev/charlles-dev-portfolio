import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getDictionary, isLocale } from "@/lib/i18n";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "pt-BR";
  const dictionary = getDictionary(locale);
  const heroFrame = await readFile(join(process.cwd(), "public", "reference", "charlles-og-image-v2.jpeg"));
  const heroDataUrl = `data:image/jpeg;base64,${heroFrame.toString("base64")}`;
  const headline = dictionary.hero.headline.split(". ");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#070908",
          color: "#f7f7f3",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* ImageResponse renders raw image elements instead of next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroDataUrl} alt="" width="1200" height="675" style={{ position: "absolute", inset: "-22px 0 0", width: "1200px", height: "675px", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, rgba(5,7,6,.98) 0%, rgba(5,7,6,.92) 34%, rgba(5,7,6,.2) 67%, rgba(5,7,6,.5) 100%)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 58px 46px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 19, letterSpacing: ".16em", textTransform: "uppercase" }}>
            <span style={{ display: "flex", color: "#35df78", fontWeight: 700 }}>CHARLLES.DEV</span>
            <span style={{ display: "flex", color: "rgba(247,247,243,.66)" }}>{dictionary.hero.role}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: 650 }}>
            <div style={{ display: "flex", marginBottom: 22, color: "#35df78", fontSize: 17, letterSpacing: ".17em", textTransform: "uppercase" }}>
              NEXT.JS / TYPESCRIPT / GO
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 650, letterSpacing: "-.065em", lineHeight: .92 }}>
              {headline.map((line) => <span style={{ display: "flex" }} key={line}>{line.endsWith(".") ? line : `${line}.`}</span>)}
            </div>
            <div style={{ display: "flex", width: 520, marginTop: 28, color: "rgba(247,247,243,.72)", fontSize: 22, lineHeight: 1.35 }}>
              {dictionary.meta.description}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
