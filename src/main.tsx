import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router'
import AllReducers from './Reducers/AllReducers.ts'
import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App.tsx'

import './Classes/button.css';
import './Classes/input.css';
import './Classes/textarea.css';
import './Classes/hr.css';

import './index.css'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}

const appState = createStore(AllReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_REACT_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_REACT_AUTH_CLIENT_ID}
      authorizationParams={{ redirect_uri: import.meta.env.VITE_REACT_LOGIN_REDIRECT }}
    >
      <Provider store={appState}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>

    </Auth0Provider>
  </StrictMode>,
)
