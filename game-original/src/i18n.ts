import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const supportedLanguages = new Set(['en', 'pt-BR', 'es']);
const languageFromRoute = new URLSearchParams(window.location.search).get('lang');
const initialLanguage = languageFromRoute && supportedLanguages.has(languageFromRoute)
    ? languageFromRoute
    : localStorage.getItem('APP_LANGUAGE') || 'en';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: [...supportedLanguages],
        load: 'currentOnly',
        lng: initialLanguage,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.json`,
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;
