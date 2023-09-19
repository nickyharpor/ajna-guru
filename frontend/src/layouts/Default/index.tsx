import akashImage from '@assets/images/akash.svg'
import Help from '@components/Help'
import useHelp from '@contexts/Help/useHelp'
import LoadingLayout from '@layouts/Loading'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import style from './styles.module.scss'

interface IFDefault {}
const defaultProps: IFDefault = {}

const DefaultLayout: React.FC<IFDefault> = () => {
  const { help } = useHelp()
  return (
    <div className={style.container}>
      <Suspense fallback={<LoadingLayout />}>
        {help && <Help />}
        <Outlet />
      </Suspense>
      <footer className={style.footer}>
        <img src={akashImage} className={style.akash} />
        <ul className={style.links}>
          <li>
            <a
              href={'https://github.com/nickyharpor/ajna_guru'}
              target={'_blank'}
            >
              Github
            </a>
          </li>
          <li>
            <a href={'https://t.me/ajna_guru_bot'} target={'_blank'}>
              Telegram Bot
            </a>
          </li>
          <li>
            <a
              href={
                'https://github.com/nickyharpor/ajna_guru/blob/master/backend/README.md'
              }
              target={'_blank'}
            >
              API Docs
            </a>
          </li>
          <li>
            <a href={'https://akash.network'} target={'_blank'}>
              Akash Network
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}

DefaultLayout.displayName = 'DefaultLayout'
DefaultLayout.defaultProps = defaultProps
export default DefaultLayout
