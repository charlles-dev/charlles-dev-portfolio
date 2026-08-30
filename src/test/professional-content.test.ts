import { describe, expect, it } from "vitest";

import { locales } from "@/lib/i18n";
import { caseSlugs, getProfessionalContent, getProjectCase } from "@/lib/professional-content";

describe("professional content", () => {
  it.each(locales)("keeps cases, contact intents and stack evidence complete for %s", (locale) => {
    const content = getProfessionalContent(locale);
    expect(Object.keys(content.cases)).toEqual(caseSlugs);
    expect(content.contactIntents.options).toHaveLength(3);
    expect(content.stackEvidence.items.length).toBeGreaterThanOrEqual(6);
    expect(content.experience.entries).toHaveLength(3);
    for (const slug of caseSlugs) {
      const project = getProjectCase(locale, slug);
      expect(project?.problem.length).toBeGreaterThan(40);
      expect(project?.decisions).toHaveLength(3);
      expect(project?.limitations.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("never exposes an unknown case", () => {
    expect(getProjectCase("pt-BR", "private-client-project")).toBeUndefined();
  });
});
