import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './custom-bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthProvider } from './components/AuthContext';
// import React, { createContext} from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const base_api_url = "  https://aid-platform-api.onrender.com"
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
