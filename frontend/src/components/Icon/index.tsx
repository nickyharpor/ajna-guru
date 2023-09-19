import { TIcon } from '@@types/icon'
import useDynamicSVG from '@hooks/useDynamicSVG'
import style from './styles.module.scss'

interface IFIcon extends TIcon {}

const Icon: React.FC<IFIcon> = ({
  name,
  size = 24,
  color = 'primary',
  classAppend = '',
  ...rest
}) => {
  const { error, isLoading, DynamicSvg } = useDynamicSVG(name)

  if (error) {
    return (
      <svg
        className={`${style.icon}`}
        width={size}
        height={size}
        viewBox={'0 0 100 100'}
      >
        <rect x={'0'} y={'0'} width={'100'} height={'100'} />
      </svg>
    )
  }
  if (isLoading) {
    return (
      <svg
        className={`${style.icon}`}
        width={size}
        height={size}
        viewBox={'0 0 100 100'}
      >
        <rect x={'0'} y={'0'} width={'100'} height={'100'} />
      </svg>
    )
  }
  if (DynamicSvg) {
    return (
      <DynamicSvg
        className={`${style.icon} ${style[color]} ${classAppend}`}
        width={size}
        height={size}
        {...rest}
      />
    )
  }
  return null
}

Icon.displayName = 'Icon'
export default Icon
