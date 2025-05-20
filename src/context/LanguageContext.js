import React, { createContext, useState } from "react";
import { useEffect } from "react";

import i18n from '../i18n'

export const LanguageContext=createContext()
export function LanguageProvider({children}){
    const [locale,setLocale]=useState(i18n.language || 'en')
        // const [locale,setLocale]=useState('en')
  // Sync with i18n on mount
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

    const changeLanguage=(lng)=>{
        i18n.changeLanguage(lng)
        setLocale(lng)
    }

    return (
        <LanguageContext.Provider value={{locale,changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}