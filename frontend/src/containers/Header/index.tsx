import Icon from '@components/Icon'
import Typewriter from '@components/Typewriter'
import { isAkash } from '@helpers'
import translate from '@languages/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './styles.module.scss'

interface IFHeader {
  targetRef?: React.MutableRefObject<HTMLDivElement | null>
}
const defaultProps: IFHeader = {}

const HeaderContainer: React.FC<IFHeader> = ({ targetRef }) => {
  const [error, setError] = useState<string>('')
  const [wallet, setWallet] = useState('')
  const navigate = useNavigate()

  const onHandleScroll = () => {
    targetRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setWallet(value)
    if (error) setError('')
  }

  const onHandleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      onHandleSubmit()
    }
  }

  const onHandleSubmit = () => {
    if (isAkash(wallet)) {
      navigate(`/wallet/${wallet}`)
    } else if (wallet.length === 0) {
      setError(translate('wallet.empty'))
    } else {
      setError(translate('wallet.error'))
    }
  }

  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <div className={style.box}>
          <img
            className={style.logo}
            src={'/logo.svg'}
            alt={translate('logo')}
            loading={'lazy'}
            width={200}
          />
          <Typewriter
            title={translate('title')}
            subtitle={translate('subtitle')}
            content={[
              translate('features1'),
              translate('features2'),
              translate('features3')
            ]}
          />
        </div>

        <form className={style.form}>
          <input
            name={'wallet'}
            placeholder={translate('wallet.placeholder')}
            maxLength={44}
            value={wallet}
            onChange={onHandleChange}
            onKeyDown={onHandleKeyUp}
          />
          <button type={'button'} onClick={onHandleSubmit}>
            {translate('wallet.submit')}
          </button>
          <span className={style.error}>{error}</span>
        </form>
      </div>
      <Icon
        classAppend={style.icon}
        name={'arrow-bottom'}
        onClick={onHandleScroll}
      />
    </section>
  )
}

HeaderContainer.displayName = 'HeaderContainer'
HeaderContainer.defaultProps = defaultProps
export default HeaderContainer
