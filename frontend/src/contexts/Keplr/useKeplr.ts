import KeplrContext from '@contexts/Keplr/context'
import { useContext } from 'react'

const useKeplr = () => {
  const context = useContext(KeplrContext)
  if (!context) throw new Error('useKeplr has to be used within KeplrProvider')
  return context
}

export default useKeplr
