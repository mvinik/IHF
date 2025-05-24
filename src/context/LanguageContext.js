import React, { createContext, useState, useEffect } from "react";
import i18n from '../i18n';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize locale from localStorage or fallback to i18n.language or 'en'
  const [locale, setLocale] = useState(
    localStorage.getItem('language') || i18n.language || 'en'
  );

  // Sync i18n with locale and store it in localStorage
  useEffect(() => {
    i18n.changeLanguage(locale);
    localStorage.setItem('language', locale);
  }, [locale]);

  const changeLanguage = (lng) => {
    setLocale(lng); // This will trigger useEffect
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
