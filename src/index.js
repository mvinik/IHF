import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n'; 
import { LanguageProvider } from './context/LanguageContext';

// Catch the NotFoundError globally
window.addEventListener('error', function (e) {
  if (
    e.message &&
    e.message.includes("Failed to execute 'removeChild' on 'Node'")
  ) {
    console.warn('Google Translate broke the DOM. Reloading...');
    // Avoid infinite reload loop
    if (!window.__alreadyReloaded) {
      window.__alreadyReloaded = true;
      window.location.reload();
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
  <LanguageProvider >
   <App />
  </LanguageProvider>
 
  // {/* </React.StrictMode> */}
);


