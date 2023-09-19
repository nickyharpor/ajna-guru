import '@assets/styles/global.scss'
import HelpProvider from '@contexts/Help/provider'
import KeplrProvider from '@contexts/Keplr/provider'
import Router from '@routers'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const rootNode = document.getElementById('root') as HTMLElement
const root = createRoot(rootNode)

root.render(
  <StrictMode>
    <KeplrProvider>
      <HelpProvider>
        <ToastContainer />
        <Router />
      </HelpProvider>
    </KeplrProvider>
  </StrictMode>
)
