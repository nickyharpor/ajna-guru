/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV_SERVER: string
  readonly ENV_PORT: string
  readonly ENV_TITLE: string
  readonly ENV_BASE_URL: string
  readonly ENV_BOT: string
  readonly ENV_TIMEOUT: string
  readonly ENV_STORAGE_KEY: string
  readonly ENV_RPC_NODE: string
  readonly ENV_CHAIN_ID: string
  readonly ENV_PAYMENT_FEE: string
  readonly ENV_PAYMENT_GAS: string
  readonly ENV_NETWORK_VERSION: string
  readonly ENV_KEPLR_EXTENSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
