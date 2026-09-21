import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';            // structure et composants de base
import './styles/theme-mr.css';   // habillage mauritanien (jetons, motifs, coach)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
