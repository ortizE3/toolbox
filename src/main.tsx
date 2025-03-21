import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'

import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_REACT_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_REACT_AUTH_CLIENT_ID}
      authorizationParams={{ redirect_uri: import.meta.env.VITE_REACT_LOGIN_REDIRECT }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
