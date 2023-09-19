import { TDeployment } from '@@types'
import telegramImage from '@assets/images/telegram.png'
import Icon from '@components/Icon'
import Payment from '@components/Payment'
import Progress from '@components/Progress'
import translate from '@languages/config'
import style from './styles.module.scss'

interface IFDeployments {
  onPayment: (amount: number, dseq: string) => void
  onNotification: () => void
  count: number
  data: TDeployment['data']
  isError: boolean
  isLoading: boolean
  isWallet: boolean
}
const defaultProps: IFDeployments = {
  onPayment: () => {},
  onNotification: () => {},
  count: 5,
  data: [],
  isError: false,
  isLoading: true,
  isWallet: false
}

const Deployments: React.FC<IFDeployments> = ({
  onPayment,
  onNotification,
  count,
  data,
  isError,
  isLoading,
  isWallet
}) => {
  const onHandleCapacity = (capacity: string) => {
    const value = parseInt(capacity)

    if (value > 1_000_000_000_000) {
      return (
        <>
          {(Math.round((value * 100) / 1_000_000_000_000) / 100).toFixed(2)}
          <sup>TB</sup>
        </>
      )
    } else if (value > 1_000_000_000) {
      return (
        <>
          {(Math.round((value * 100) / 1_000_000_000) / 100).toFixed(2)}
          <sup>GB</sup>
        </>
      )
    } else if (value > 1_000_000) {
      return (
        <>
          {(Math.round((value * 100) / 1_000_000) / 100).toFixed(2)}
          <sup>MB</sup>
        </>
      )
    } else if (value > 1_000) {
      return (
        <>
          {(Math.round((value * 100) / 1_000) / 100).toFixed(2)}
          <sup>KB</sup>
        </>
      )
    }
  }

  return isError ? (
    <div className={style.notfound}>{translate('data.notfound')}</div>
  ) : (
    <div className={`${style.container} ${isLoading ? style.loading : ''}`}>
      {(isLoading ? [...Array(count)] : data).map(item => (
        <div key={self.crypto.randomUUID()} className={style.item}>
          <div className={style.property}>
            <div className={style.title}>{translate('data.dseq')}</div>
            <div className={style.value}>{item?.dseq}</div>
          </div>
          {/* <div className={style.property}>
            <div className={style.title}>{translate('data.settledAt')}</div>
            <div className={style.value}>{item?.settledAt}</div>
          </div> */}
          <div className={style.property}>
            <div className={style.title}>{translate('data.providerName')}</div>
            <div className={style.value}>{item?.providerName}</div>
          </div>

          <div className={style.property}>
            <div className={style.title}>{translate('data.count')}</div>
            <div className={style.value}>{item?.resources?.count}</div>
          </div>

          <div className={style.property}>
            <div className={style.title}>{translate('data.balance')}</div>
            <div className={style.value}>
              {(parseInt(item?.balance.amount) || '')
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              <sup className={style.denom}>{item?.balance.denom}</sup>
            </div>
          </div>
          <div className={style.property}>
            <div className={style.title}>{translate('data.transferred')}</div>
            <div className={style.value}>
              {(parseInt(item?.transferred.amount) || '')
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''}
              <sup className={style.denom}>{item?.transferred.denom}</sup>
            </div>
          </div>
          <div className={style.property}>
            <div className={style.title}>{translate('data.price')}</div>
            <div className={style.value}>
              {(parseInt(item?.price.amount) || '')
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''}
              <sup className={style.denom}>{item?.price.denom}</sup>
            </div>
          </div>

          {/* <div className={`${style.property} ${style.progress}`}>
            <div className={style.title}>{translate('data.usage')}</div>
            <div className={style.value}>
              <Progress
                total={
                  parseInt(item?.balance.amount) +
                    parseInt(item?.transferred.amount) || 100
                }
                current={parseInt(item?.balance.amount) || 0}
              />
            </div>
          </div> */}
          {false && (
            <div className={`${style.property} ${style.actions}`}>
              <img src={telegramImage} onClick={onNotification} />

              {/* <button type={'button'} onClick={onHandlePayment}>
                <Icon name={'wallet'} size={36} color={'light'} />
                {translate('wallet.button')}
              </button> */}
            </div>
          )}

          <div className={`${style.property} ${style.resources}`}>
            <div className={style.value}>
              <Icon name={'cpu'} size={36} color={'tertiary'} />
              <span>
                {isLoading ? (
                  ''
                ) : (
                  <>
                    {parseInt(item?.resources?.cpu) / 1_000}
                    <sup>Core</sup>
                  </>
                )}
              </span>
            </div>
            <div className={style.value}>
              <Icon name={'ram'} size={36} color={'tertiary'} />
              <span>
                {isLoading ? '' : onHandleCapacity(item?.resources?.memory)}
              </span>
            </div>
            <div className={style.value}>
              <Icon name={'hdd'} size={36} color={'tertiary'} />
              <span>
                {isLoading ? '' : onHandleCapacity(item?.resources?.storage)}
              </span>
            </div>

            <div className={style.value}>
              <Icon name={'network'} size={36} color={'tertiary'} />
              <span>
                {isLoading ? (
                  ''
                ) : (
                  <>
                    {item?.resources?.network}
                    <sup>Port</sup>
                  </>
                )}
              </span>
            </div>
          </div>
          {!isLoading && (
            <div className={style.progress}>
              <Progress
                total={
                  parseInt(item?.balance.amount) +
                    parseInt(item?.transferred.amount) || 100
                }
                current={parseInt(item?.transferred.amount) || 0}
                caption={false}
              />
            </div>
          )}

          {isWallet && (
            <div className={`${style.property} ${style.payment}`}>
              <Payment dseq={item?.dseq} onSubmit={onPayment} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

Deployments.displayName = 'Deployments'
Deployments.defaultProps = defaultProps
export default Deployments
