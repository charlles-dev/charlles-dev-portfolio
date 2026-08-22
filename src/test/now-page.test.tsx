import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { NowPage } from "@/components/now-page";
import { getDictionary, locales } from "@/lib/i18n";

afterEach(() => cleanup());

describe("now page", () => {
  it.each(locales)("renders localized current focuses and contextual navigation for %s", (locale) => {
    const dictionary = getDictionary(locale);
    render(<NowPage locale={locale} dictionary={dictionary} />);

    expect(screen.getByRole("heading", { level: 1, name: dictionary.now.title })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: dictionary.now.breadcrumbLabel })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: dictionary.engineering.linkLabel })).toHaveAttribute("href", `/${locale}/engineering`);
    expect(screen.getAllByRole("article")).toHaveLength(dictionary.now.items.length);
    expect(screen.getByRole("link", { name: dictionary.now.openProject })).toHaveAttribute("href", "https://github.com/charlles-dev/Astrolink");
    expect(screen.getByText(dictionary.now.items[1].proof)).toBeInTheDocument();
  });
});
