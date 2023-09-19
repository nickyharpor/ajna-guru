import { TDeployment } from '@@types'
import Deployments from '@components/Deployments'
import Icon from '@components/Icon'
import Pagination from '@components/Pagination'
import TelegramContainer from '@containers/Telegram'
import useHttp from '@hooks/useHttp'
import useWallet from '@hooks/useWallet'
import translate from '@languages/config'
import { useCallback, useEffect, useState } from 'react'
import style from './styles.module.scss'

interface IFWallet {
  id: string
}
const defaultProps: IFWallet = {
  id: ''
}

const WalletContainer: React.FC<IFWallet> = ({ id }) => {
  const [form, setForm] = useState({
    offset: 0,
    limit: 10
  })
  const [onRequest, response, isLoading, error] = useHttp()

  const wallet = useWallet()

  const onGetDeployments = useCallback(
    (params: { offset: number; limit: number }, signal: AbortSignal) => {
      onRequest('fetchDeployments', params, signal, id)
    },
    [id, onRequest]
  )

  useEffect(() => {
    const controller = new AbortController()
    onGetDeployments(form, controller.signal)

    return () => {
      controller.abort()
    }
  }, [form, onGetDeployments])

  const onHandleNotification = () => {
    window.open(`${import.meta.env.ENV_BOT}${id}`, '_blank')
  }

  const onHandlePagination = (page: number) => {
    setForm(prev => ({ ...prev, offset: page - 1 }))
  }

  const onHandleWallet = () => {
    if (wallet.isConnected) {
      wallet.disconnect()
    } else {
      wallet.connect()
    }
  }

  const onHandlePayment = (amount: number, dseq: string) => {
    wallet.pay(Math.floor(amount * 1000000), 'uakt', id, dseq)
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>{translate('wallet.title')}</h2>
      <h3 className={style.subtitle}>{id}</h3>
      <div className={style.header}>
        <div className={style.action}>
          <button
            className={`${style.button} ${
              wallet.isConnected ? style.active : ''
            }`}
            onClick={onHandleWallet}
          >
            <Icon name={'wallet'} size={32} />
            {wallet.isConnected ? 'Disconnect' : 'Connect'}
          </button>

          <TelegramContainer id={id} />
        </div>
      </div>

      <Deployments
        count={form.limit}
        data={(response as TDeployment)?.data || []}
        isLoading={isLoading}
        isError={!!error}
        isWallet={wallet.isConnected}
        onNotification={onHandleNotification}
        onPayment={onHandlePayment}
      />
      <Pagination
        current={form.offset + 1}
        total={Math.ceil(((response as TDeployment)?.total || 0) / form.limit)}
        onChange={onHandlePagination}
        isLoading={isLoading}
        isError={!!error}
      />
    </div>
  )
}

WalletContainer.displayName = 'WalletContainer'
WalletContainer.defaultProps = defaultProps
export default WalletContainer
