import { getLocales } from "expo-localization";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/es";

import en from "@/assets/locales/en.json";
import es from "@/assets/locales/es.json";

const language = getLocales()[0].languageCode as string;

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.locale(language);

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: { en, es },
  fallbackLng: "en",
  lng: getLocales()[0].languageCode as string,
  interpolation: {
    escapeValue: false,
  },
});
