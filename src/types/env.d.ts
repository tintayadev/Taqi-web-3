/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string
  readonly VITE_NEYNAR_API_KEY?: string
  readonly VITE_NEYNAR_SIGNER_UUID?: string
  readonly VITE_TAQI_CREDITS_ADDRESS?: string
  readonly VITE_TAQI_NFT_ADDRESS?: string
  readonly VITE_TAQI_TOURISM_ADDRESS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global types for polyfills
declare global {
  const process: {
    env: Record<string, string | undefined>
  }
}
