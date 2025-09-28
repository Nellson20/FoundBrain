import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import mg from './locales/mg/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      mg: {translation : mg }
    },
    lng: "fr",
    fallbackLng: 'fr',
    debug: true,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
