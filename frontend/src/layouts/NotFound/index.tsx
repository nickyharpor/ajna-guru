import { Link } from 'react-router-dom'
import style from './styles.module.scss'
import Icon from '@components/Icon'

interface IFNotFound {}
const defaultProps: IFNotFound = {}

const NotFoundLayout: React.FC<IFNotFound> = () => {
  return (
    <div className={style.container}>
      <h2>404</h2>
      <h3>Not Found</h3>
      <Link className={style.link} to={'/'}>
        <Icon color={'dark'} name={'arrow-enter'} />
        Back to Home
      </Link>
    </div>
  )
}

NotFoundLayout.displayName = 'NotFoundLayout'
NotFoundLayout.defaultProps = defaultProps
export default NotFoundLayout
