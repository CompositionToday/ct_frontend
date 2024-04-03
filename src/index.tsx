
import reportWebVitals from "./reportWebVitals";
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root')!;

// If the app is being served by a server and has been rendered on the server-side
if (container.hasChildNodes()) {
  hydrateRoot(container, 
  <HelmetProvider>
    <App />
  </HelmetProvider>);
} else {
  // If the app is being served directly by the browser (i.e., client-side only)
  createRoot(container).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();