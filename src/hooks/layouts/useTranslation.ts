import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type useTranslationReturns = {
    appI18n: string
    changeLanguage: (ln: string) => void
}
export default function useAppTranslation (): useTranslationReturns {
    const { i18n } = useTranslation();
     const [ appI18n, setAppI18n ] = useState<string>(() => {
        const stored = localStorage.getItem('i18n');
        return stored || 'es';
    });

     useEffect(() => {
        if (i18n.language !== appI18n) {
            i18n.changeLanguage(appI18n);
        }
    }, [appI18n, i18n]);

    const changeLanguage = (ln: string) => {
        localStorage.setItem('i18n', ln); 
        setAppI18n(ln);                   
        i18n.changeLanguage(ln);          
    }

    return {
        appI18n,
        changeLanguage
    }
} 
