import KeplrContext, {
  KeplrWallet,
  initialState
} from '@contexts/Keplr/context'
import { useState } from 'react'

interface IFKeplrProvider {
  children?: React.ReactNode
}
const defaultProps: IFKeplrProvider = {
  children: undefined
}

const KeplrProvider: React.FC<IFKeplrProvider> = ({ children }) => {
  const storage = window.localStorage.getItem(import.meta.env.ENV_STORAGE_KEY)
  const [keplr, setKeplr] = useState<KeplrWallet>(
    storage && JSON.parse(storage) ? JSON.parse(storage) : initialState
  )

  return (
    <KeplrContext.Provider value={{ keplr, setKeplr }}>
      {children}
    </KeplrContext.Provider>
  )
}

KeplrProvider.displayName = 'KeplrProvider'
KeplrProvider.defaultProps = defaultProps
export default KeplrProvider
