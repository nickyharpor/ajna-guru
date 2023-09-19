import HelpContext from '@contexts/Help/context'
import { useState } from 'react'

interface IFHelpProvider {
  children?: React.ReactNode
}
const defaultProps: IFHelpProvider = {
  children: undefined
}

const HelpProvider: React.FC<IFHelpProvider> = ({ children }) => {
  const [help, setHelp] = useState(false)

  return (
    <HelpContext.Provider value={{ help, setHelp }}>
      {children}
    </HelpContext.Provider>
  )
}

HelpProvider.displayName = 'HelpProvider'
HelpProvider.defaultProps = defaultProps
export default HelpProvider
