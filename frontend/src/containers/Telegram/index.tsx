import Icon from '@components/Icon'
import useHttp from '@hooks/useHttp'
import { useCallback, useEffect, useRef, useState } from 'react'
import style from './styles.module.scss'

interface IFTelegram {
  id: string
}
const defaultProps: IFTelegram = {
  id: ''
}

const TelegramContainer: React.FC<IFTelegram> = ({ id }) => {
  const [uid, setUid] = useState(
    parseInt(window.localStorage.getItem('uid') || '0')
  )
  const telegramRef = useRef<HTMLDivElement | null>(null)
  const [onRequest, response] = useHttp()
  const [onNotification] = useHttp()
  const [onTelegram] = useHttp()

  const onRenderTelegram = () => {
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.async = true
    script.setAttribute('data-telegram-login', 'ajna_guru_bot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-radius', '5')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-lang', 'en')
    // script.setAttribute('data-auth-url', 'https://ajna.guru/')
    script.setAttribute('data-onauth', 'onAuthTelegram(user)')
    script.setAttribute('data-request-access', 'write')
    telegramRef.current?.appendChild(script)
    window!.onAuthTelegram = user => {
      window.localStorage.setItem('uid', user.id.toString())
      setUid(user.id)
      onTelegram('addTelegram', undefined, undefined, user.id.toString())
    }
  }

  onRenderTelegram()

  const onGetNotification = useCallback(
    (signal: AbortSignal) => {
      onRequest('fetchNotifications', undefined, signal, `${id}/${uid}`)
    },
    [id, onRequest, uid]
  )

  useEffect(() => {
    const controller = new AbortController()
    if (uid) {
      onGetNotification(controller.signal)
    }

    return () => {
      controller.abort()
    }
  }, [onGetNotification, uid])

  const onHandleNotification = () => {
    const isNotification = (
      response as {
        akashAddress: string
        enabled: boolean
        telegramId: number
      }
    )?.enabled
    onNotification(
      isNotification ? 'removeNotifications' : 'addNotifications',
      undefined,
      undefined,
      `${uid}/${id}`
    )
  }

  return (
    <div className={style.container}>
      <div className={style.telegram} ref={telegramRef} />
      {(response as {
        akashAddress: string
        enabled: boolean
        telegramId: number
      }) && (
        <Icon
          name={'notification'}
          size={40}
          onClick={onHandleNotification}
          color={
            (
              response as {
                akashAddress: string
                enabled: boolean
                telegramId: number
              }
            )?.enabled
              ? 'success'
              : 'error'
          }
        />
      )}
    </div>
  )
}

TelegramContainer.displayName = 'TelegramContainer'
TelegramContainer.defaultProps = defaultProps
export default TelegramContainer
