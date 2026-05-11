/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_NUMBER?: string
  readonly VITE_PHONE_DIAL_NUMBER?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_FACEBOOK_URL?: string
  readonly VITE_LINKEDIN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
