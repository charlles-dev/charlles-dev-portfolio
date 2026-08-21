import { localeLabels, locales, localePath, type Locale } from "@/lib/i18n";

const localeFlags: Record<Locale, string> = { "pt-BR": "🇧🇷", en: "🇺🇸", es: "🇪🇸" };

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  return (
    <div className="language-switcher" aria-label="Idioma">
      {locales.map((locale) => {
        const current = locale === currentLocale;

        return (
          <a
            aria-current={current ? "page" : undefined}
            className={current ? "language-link is-current" : "language-link"}
            href={localePath(locale)}
            hrefLang={locale}
            lang={locale}
            key={locale}
          >
            <span aria-hidden="true" className="language-flag">{localeFlags[locale]}</span>
            <span className="sr-only">{localeLabels[locale].name}</span>
          </a>
        );
      })}
    </div>
  );
}
