import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router'
import AllReducers from './Reducers/AllReducers.ts'
import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { Provider, useDispatch } from 'react-redux'
import App from './App.tsx'
import { thunk } from 'redux-thunk';
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
  applyMiddleware(thunk));



export type RootState = ReturnType<typeof appState.getState>;
export type AppDispatch = typeof appState.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

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
