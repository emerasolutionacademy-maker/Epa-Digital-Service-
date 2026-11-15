import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'fr' | 'en';

export interface BilingualText {
  fr: string;
  en: string;
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  pick: <T>(content: { fr: T; en: T }) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('epa_lang');
      if (stored === 'en' || stored === 'fr') return stored;
    }
    return 'fr';
  });

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('epa_lang', next);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const pick = <T,>(content: { fr: T; en: T }): T => content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
