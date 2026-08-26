import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import { localePath, type Locale, type PortfolioDictionary } from "@/lib/i18n";

export function SiteHeader({
  locale,
  dictionary,
  contextHash,
}: {
  locale: Locale;
  dictionary: PortfolioDictionary;
  contextHash?: string;
}) {
  return (
    <header className="reference-header">
      <div className="reference-header-inner">
        <a className="reference-brand" href={localePath(locale)} aria-label="Charlles.dev">
          <Image className="reference-brand-mark" src="/assets/charlles-dev.svg" alt="" width={34} height={34} priority />
        </a>
        <nav className="reference-language-nav" aria-label={dictionary.nav.language}>
          <LanguageSwitcher currentLocale={locale} label={dictionary.nav.language} contextHash={contextHash} />
        </nav>
      </div>
    </header>
  );
}
