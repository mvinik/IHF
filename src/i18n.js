// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbarEN from './locales/en/navbar.json';
import navbarHI from './locales/hi/navbar.json';
import homeEN from './locales/en/home.json';
import homeHI from './locales/hi/home.json';
import sliderEN from './locales/en/slider.json';
import sliderHI from './locales/hi/slider.json';
import onlineCourseEN from './locales/en/onlineCourse.json';
import onlineCourseHI from './locales/hi/onlineCourse.json';
import contactEN from './locales/en/contact.json';
import contactHI from './locales/hi/contact.json';
import detailsEN from './locales/en/details.json';
import detailsHI from './locales/hi/details.json';




i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        navbar: navbarEN ,
        home:homeEN,
        slider:sliderEN,
        onlineCourse: onlineCourseEN ,
        contact:contactEN,
        details:detailsEN

    },
      hi: {
         navbar: navbarHI,
         home:homeHI,
         slider:sliderHI,
         onlineCourse: onlineCourseHI,
         contact:contactHI,
         details:detailsHI
        }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    ns: ['navbar', 'home', 'slider', 'onlineCourse', 'contact','details'],
    defaultNS: 'home',
    interpolation: { escapeValue: false }
  });

export default i18n;
