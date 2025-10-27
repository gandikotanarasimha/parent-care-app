// File: client/src/main.jsx

import axios from 'axios';

axios.defaults.baseURL = import.meta.env.PROD 
  ? 'https://parent-care-server.onrender.com'
  : '';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- WRAP YOUR APP WITH THIS --> */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);