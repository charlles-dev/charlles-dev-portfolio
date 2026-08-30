"use client";

import { IconGlyph } from "@/components/icon-glyph";

export function CvPrintButton({ label }: { label: string }) {
  return <button type="button" className="cv-print-button" onClick={() => window.print()}><IconGlyph name="solar-document" className="size-5" />{label}</button>;
}
