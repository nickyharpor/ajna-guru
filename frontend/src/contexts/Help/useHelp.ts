import HelpContext from '@contexts/Help/context'
import { useContext } from 'react'

const useHelp = () => {
  const context = useContext(HelpContext)
  if (!context) throw new Error('useHelp has to be used within KeplrProvider')
  return context
}

export default useHelp
