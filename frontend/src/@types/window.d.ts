import { Window as KeplrWindow } from '@keplr-wallet/types'

declare global {
  interface Window extends KeplrWindow {
    onAuthTelegram: (
      user: Readonly<{
        auth_date: number
        first_name: string
        last_name?: string
        hash: string
        id: number
        photo_url?: string
        username?: string
      }>
    ) => void
  }
}
