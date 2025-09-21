import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { RouterProvider } from "react-router/dom";
import router from './Router/router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

// Initialize AOS here, after the imports
AOS.init({
  duration: 2000,
  once: false,
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='poppins max-w-7xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>

  </StrictMode>,
)
