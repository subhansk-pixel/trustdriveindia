/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_NUMBER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
