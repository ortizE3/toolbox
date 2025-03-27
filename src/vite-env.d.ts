/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_AUTH_DOMAIN: string
    readonly VITE_REACT_AUTH_CLIENT_ID: string
    readonly VITE_REACT_LOGIN_REDIRECT: string
    readonly VITE_REACT_LOGOUT_REDIRECT: string
    readonly VITE_REACT_GOOGLE_MAPS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}