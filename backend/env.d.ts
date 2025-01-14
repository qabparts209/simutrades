/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string
  readonly CLOUDFLARE_API_TOKEN: string
  readonly CLOUDFLARE_ZONE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 