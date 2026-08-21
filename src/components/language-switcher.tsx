import { localeLabels, locales, localePath, type Locale } from "@/lib/i18n";

function LocaleGlyph({ locale }: { locale: Locale }) {
  if (locale === "pt-BR") {
    return (
      <svg aria-hidden="true" className="language-flag-icon" viewBox="0 0 24 16">
        <rect width="24" height="16" rx="2" fill="#229e45" />
        <path d="m12 2.2 8.2 5.8-8.2 5.8L3.8 8z" fill="#f6d44a" />
        <circle cx="12" cy="8" r="3.2" fill="#2450a4" />
        <path d="M9.2 7.2c1.9-.7 3.8-.5 5.6.4" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth=".55" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg aria-hidden="true" className="language-flag-icon" viewBox="0 0 24 16">
        <rect width="24" height="16" rx="2" fill="#fff" />
        <path d="M0 0h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z" fill="#c93b4b" />
        <path d="M0 0h10.5v8H0z" fill="#264c96" />
        <path d="m1.2 1.1 1 .7 1-.7-.4 1.2 1 .7H2.6l-.4 1.2-.4-1.2H.5l1-.7zM5.5 1.1l1 .7 1-.7-.4 1.2 1 .7H6.9l-.4 1.2-.4-1.2H4.4l1-.7zM2.9 4.1l1 .7 1-.7-.4 1.2 1 .7H4.3l-.4 1.2-.4-1.2H1.8l1-.7zM7.2 4.1l1 .7 1-.7-.4 1.2 1 .7H8.6l-.4 1.2-.4-1.2H6.1l1-.7z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="language-flag-icon" viewBox="0 0 24 16">
      <rect width="24" height="16" rx="2" fill="#e84a4a" />
      <path d="M0 4h24v8H0z" fill="#f4cb3d" />
      <path d="M11.1 6.5h1.8v3h-1.8z" fill="#c53d3d" />
    </svg>
  );
}

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  return (
    <div className="language-switcher" aria-label="Idioma">
      {locales.map((locale) => {
        const current = locale === currentLocale;

        return (
          <a
            aria-current={current ? "page" : undefined}
            aria-label={localeLabels[locale].name}
            className={current ? "language-link is-current" : "language-link"}
            href={localePath(locale)}
            hrefLang={locale}
            lang={locale}
            key={locale}
          >
            <LocaleGlyph locale={locale} />
            <span className="sr-only">{localeLabels[locale].name}</span>
          </a>
        );
      })}
    </div>
  );
}
