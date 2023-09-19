import { createContext } from 'react'

interface IFHelpContext {
  help: boolean
  setHelp: React.Dispatch<React.SetStateAction<boolean>>
}

const HelpContext = createContext<IFHelpContext>({
  help: false,
  setHelp: () => {}
})

export default HelpContext
