import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Configuration pour désactiver les warnings React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter {...router}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);