import { dictionaries, locales } from "@/lib/i18n";

const topLevelKeys = ["meta", "nav", "hero", "about", "work", "expertise", "journey", "now", "contact", "notFound", "footer", "process", "engineering", "projects"];
const projectKeys = ["astrolink", "3035-teach", "charlles-dev-portfolio", "trakr"];

function sortedKeys(value: object) {
  return Object.keys(value).sort();
}

describe("landing localization contract", () => {
  it("keeps the same top-level and project shape in every locale", () => {
    for (const locale of locales) {
      const dictionary = dictionaries[locale];
      expect(sortedKeys(dictionary)).toEqual([...topLevelKeys].sort());
      expect(sortedKeys(dictionary.projects)).toEqual([...projectKeys].sort());
    }
  });

  it("keeps navigation and accessibility labels localized", () => {
    expect(dictionaries["pt-BR"].nav).toMatchObject({ main: "Navegação principal", language: "Idioma" });
    expect(dictionaries.en.nav).toMatchObject({ main: "Main navigation", language: "Language" });
    expect(dictionaries.es.nav).toMatchObject({ main: "Navegación principal", language: "Idioma" });
    expect(dictionaries["pt-BR"].about.socialLabel).toBe("Links sociais");
    expect(dictionaries.en.about.socialLabel).toBe("Social links");
    expect(dictionaries.es.about.socialLabel).toBe("Enlaces sociales");
    expect(dictionaries["pt-BR"].engineering.linkLabel).toBe("Notas de engenharia");
    expect(dictionaries.en.engineering.linkLabel).toBe("Engineering notes");
    expect(dictionaries.es.engineering.linkLabel).toBe("Notas de ingeniería");
  });

  it("does not use the removed theme control in the navigation contract", () => {
    for (const locale of locales) {
      expect(dictionaries[locale].nav).not.toHaveProperty("theme");
    }
  });
});
