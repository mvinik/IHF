// // utils/translate.js
// export const initializeGoogleTranslate = (containerId) => {
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'en',
//           includedLanguages: 'en,hi,ta,fr', // Add your supported languages here
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         containerId
//       );
//     };
  
//     const script = document.createElement('script');
//     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);
//   };
  
//   export const removeGoogleTranslate = () => {
//     // Remove the translate container and cleanup
//     const container = document.getElementById('google_translate_element');
//     if (container) {
//       container.remove();
//     }
  
//     // Remove the script to avoid conflicts
//     const scripts = document.querySelectorAll('script[src^="https://translate.google.com"]');
//     scripts.forEach((script) => script.remove());
//   };
  