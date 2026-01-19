import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./locales/es/translation";
import { en } from "./locales/en/translation";

export const defaultNS = "translation";
export const resources = {
    es: { translation: es },
    en: { translation: en }
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    defaultNS,
    interpolation: { escapeValue: false }
});

export default i18n;
