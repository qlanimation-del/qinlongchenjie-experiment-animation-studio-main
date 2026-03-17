import { createContext, useContext, useState, ReactNode } from "react";
import { Locale, translations } from "./translations";

type TranslationValue = string | { [key: string]: string };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale;
    return saved && ["en", "zh", "fr"].includes(saved) ? saved : "en";
  });

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (section: string, key: string): string => {
    const sectionData = (translations as any)[section];
    if (!sectionData) return key;
    const entry = sectionData[key];
    if (!entry) return key;
    return entry[locale] || entry["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
