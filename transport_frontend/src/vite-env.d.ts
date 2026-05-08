/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_NUMBER?: string
  readonly VITE_PHONE_DIAL_NUMBER?: string
  readonly VITE_WHATSAPP_NUMBER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
