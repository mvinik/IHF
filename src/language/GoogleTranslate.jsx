// import { useEffect } from 'react';

// const GoogleTranslate = () => {
//   useEffect(() => {
//     const addGoogleTranslateScript = () => {
//       if (window.google?.translate?.TranslateElement) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,hi,ta',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);

//       window.googleTranslateElementInit = () => {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,hi,ta',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//       };
//     };

//     addGoogleTranslateScript();
//   }, []);

//   return <div id="google_translate_element" style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }} />;
// };

// export default GoogleTranslate;
