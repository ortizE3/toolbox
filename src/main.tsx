import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router'
import { AllReducers } from './Reducers/AllReducers.ts'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch } from 'react-redux'
import App from './App.tsx'

import './Classes/button.css';
import './Classes/input.css';
import './Classes/textarea.css';
import './Classes/hr.css';

import './index.css'

const appState = configureStore({

  reducer: {
    ...AllReducers,
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
} as any);

export type AppDispatch = typeof appState.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


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
