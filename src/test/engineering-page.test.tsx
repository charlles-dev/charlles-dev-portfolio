import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { EngineeringPage } from "@/components/engineering-page";
import { getDictionary, locales } from "@/lib/i18n";

afterEach(() => cleanup());

describe("engineering notes page", () => {
  it.each(locales)("renders the localized content and contextual links for %s", (locale) => {
    const dictionary = getDictionary(locale);
    render(<EngineeringPage locale={locale} dictionary={dictionary} />);

    expect(screen.getByRole("heading", { level: 1, name: dictionary.engineering.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: dictionary.engineering.openWork })).toHaveAttribute("href", `/${locale}#work`);
    expect(screen.getAllByRole("link", { name: dictionary.engineering.backHome }).every((link) => link.getAttribute("href") === `/${locale}`)).toBe(true);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(dictionary.engineering.sections.length + 1);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(dictionary.engineering.sections.reduce((total, section) => total + section.items.length, 0));
    expect(screen.getByText(dictionary.engineering.note)).toBeInTheDocument();
  });
});
