import WalletContainer from '@containers/Wallet'
import { useParams } from 'react-router-dom'
import style from './styles.module.scss'

interface IFWallet {}
const defaultProps: IFWallet = {}

const WalletPage: React.FC<IFWallet> = () => {
  const { id } = useParams<'id'>()

  return (
    <div className={style.test}>
      <WalletContainer id={id || ''} />
    </div>
  )
}

WalletPage.displayName = 'WalletPage'
WalletPage.defaultProps = defaultProps
export default WalletPage
