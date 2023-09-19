import DefaultLayout from '@layouts/Default'
import NotFound from '@layouts/NotFound'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('@pages/Home'))
const WalletPage = lazy(() => import('@pages/Wallet'))

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route caseSensitive index element={<HomePage />} />
          <Route caseSensitive path="wallet/:id" element={<WalletPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

Router.displayName = 'Router'
export default Router
