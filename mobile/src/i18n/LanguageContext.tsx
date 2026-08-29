import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getStoredItem, setStoredItem } from "../storage";
import { interpolate, LOCALES, localeNames, ui, type Locale } from "./ui";

const LANG_KEY = "herhelp.language";

type I18nValue = {
  lang: Locale;
  setLang: (lang: Locale) => Promise<void>;
  t: (key: string, vars?: Record<string, string | number>) => string;
  ready: boolean;
};

const I18nContext = createContext<I18nValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      const saved = await getStoredItem(LANG_KEY);
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        setLangState(saved as Locale);
      }
      setReady(true);
    }
    load();
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      ready,
      setLang: async (next) => {
        setLangState(next);
        await setStoredItem(LANG_KEY, next);
      },
      t: (key, vars) => {
        const raw = ui[lang][key] ?? ui.en[key] ?? key;
        return vars ? interpolate(raw, vars) : raw;
      },
    }),
    [lang, ready]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }
  return context;
}

export { LOCALES, localeNames };
export type { Locale };
