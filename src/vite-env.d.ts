/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_API_KEY: string
  readonly VITE_TELEGRAM_GROUP_ID: string
  readonly VITE_DEBUG_GROUP_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
