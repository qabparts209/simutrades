/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly GITHUB_TOKEN: string
  readonly CLOUDFLARE_API_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 