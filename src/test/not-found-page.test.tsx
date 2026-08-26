import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import GlobalNotFound, { metadata as globalMetadata } from "@/app/not-found";
import { generateMetadata as generateLocalizedMetadata } from "@/app/[locale]/not-found";
import { NotFoundPage } from "@/components/not-found-page";
import { getDictionary, locales } from "@/lib/i18n";

afterEach(() => cleanup());

describe("not found page", () => {
  it.each(locales)("renders the avatar route search scene in %s", (locale) => {
    const dictionary = getDictionary(locale);
    render(<NotFoundPage locale={locale} dictionary={dictionary} />);

    expect(screen.getByRole("heading", { level: 1, name: dictionary.notFound.title })).toBeInTheDocument();
    expect(screen.getByAltText(dictionary.notFound.avatarAlt)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: dictionary.notFound.work })).toHaveAttribute("href", `/${locale}#work`);
    expect(screen.getByRole("link", { name: dictionary.notFound.about })).toHaveAttribute("href", `/${locale}#about`);
    expect(screen.getByRole("link", { name: dictionary.notFound.contact })).toHaveAttribute("href", `/${locale}#contact`);
    expect(screen.queryByRole("link", { name: dictionary.notFound.processCta })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: dictionary.notFound.engineeringCta })).not.toBeInTheDocument();
    expect(screen.getByText(dictionary.notFound.routeStatus)).toBeInTheDocument();
  });

  it("marks localized and global error metadata as non-indexable", async () => {
    expect(globalMetadata.robots).toEqual({ index: false, follow: true });
    for (const locale of locales) {
      const metadata = await generateLocalizedMetadata({ params: Promise.resolve({ locale }) });
      expect(metadata.robots).toEqual({ index: false, follow: true });
    }
  });

  it("uses the same localized scene for the global fallback", () => {
    render(<GlobalNotFound />);
    const dictionary = getDictionary("pt-BR");
    expect(screen.getByRole("heading", { level: 1, name: dictionary.notFound.title })).toBeInTheDocument();
  });
});
