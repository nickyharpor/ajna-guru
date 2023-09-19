import Icon from '@components/Icon'
import translate from '@languages/config'
import { useState } from 'react'
import style from './styles.module.scss'

interface IFPayment {
  onSubmit: (amount: number, dseq: string) => void
  dseq: string
}
const defaultProps: IFPayment = {
  onSubmit: () => {},
  dseq: ''
}

const Payment: React.FC<IFPayment> = ({ onSubmit, dseq }) => {
  const [amount, setAmount] = useState('')

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
    setAmount(value)
  }

  const onHandleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      onHandleSubmit()
    }
  }

  const onHandleSubmit = () => {
    onSubmit(parseFloat(amount) || 0, dseq)
  }

  return (
    <div className={style.container}>
      <input
        name={'amount'}
        placeholder={translate('payment.placeholder')}
        maxLength={12}
        value={amount}
        onChange={onHandleChange}
        onKeyDown={onHandleKeyUp}
        autoComplete={'off'}
        inputMode={'numeric'}
      />
      <button
        type={'button'}
        onClick={onHandleSubmit}
        disabled={amount.length === 0}
      >
        <Icon name={'add-fund'} size={24} color={'success'} />
        {translate('payment.button')}
      </button>
    </div>
  )
}

Payment.displayName = 'Payment'
Payment.defaultProps = defaultProps
export default Payment
