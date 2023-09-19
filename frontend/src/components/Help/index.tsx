import Icon from '@components/Icon'
import useHelp from '@contexts/Help/useHelp'
import translate from '@languages/config'
import style from './styles.module.scss'

interface IFHelp {}
const defaultProps: IFHelp = {}

const Help: React.FC<IFHelp> = () => {
  const { setHelp } = useHelp()

  const onClose = () => {
    setHelp(false)
  }

  return (
    <>
      <div className={style.background} onClick={onClose} />
      <div className={style.container}>
        <h3 className={style.title}>
          {translate('help.title')}
          <Icon name={'close'} size={24} color={'light'} onClick={onClose} />
        </h3>
        <p>{translate('help.description')}</p>
        <a
          className={style.extension}
          href={import.meta.env.ENV_KEPLR_EXTENSION}
          target={'_blank'}
        >
          <span>{translate('help.extension.title')}</span>
          {translate('help.extension.description')}
        </a>
      </div>
    </>
  )
}

Help.displayName = 'Help'
Help.defaultProps = defaultProps
export default Help
