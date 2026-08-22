import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ProcessPage } from "@/components/process-page";
import { getDictionary, locales } from "@/lib/i18n";

afterEach(() => cleanup());

describe("process page", () => {
  it.each(locales)("renders the localized method and contextual links for %s", (locale) => {
    const dictionary = getDictionary(locale);
    render(<ProcessPage locale={locale} dictionary={dictionary} />);

    expect(screen.getByRole("heading", { level: 1, name: dictionary.process.title })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: dictionary.process.breadcrumbLabel })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: dictionary.now.routeLabel })).toHaveAttribute("href", `/${locale}/now`);
    expect(screen.getByRole("link", { name: dictionary.engineering.linkLabel })).toHaveAttribute("href", `/${locale}/engineering`);
    expect(screen.getAllByRole("listitem")).toHaveLength(dictionary.process.steps.length);
    expect(screen.getByRole("heading", { name: dictionary.process.steps[3].title })).toBeInTheDocument();
  });
});
