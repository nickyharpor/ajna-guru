import { SigningStargateClient } from '@cosmjs/stargate'
import { AccountData, OfflineAminoSigner } from '@keplr-wallet/types'
import { createContext } from 'react'

export interface KeplrWallet {
  accounts: AccountData[]
  offlineSigner?: OfflineAminoSigner
  client?: SigningStargateClient
  isConnected: boolean
}

export const initialState: KeplrWallet = {
  accounts: [] as AccountData[],
  offlineSigner: undefined,
  client: undefined,
  isConnected: false
}

interface IFKeplrContext {
  keplr: KeplrWallet
  setKeplr: React.Dispatch<React.SetStateAction<KeplrWallet>>
}

const KeplrContext = createContext<IFKeplrContext>({
  keplr: initialState,
  setKeplr: () => {}
})

export default KeplrContext
