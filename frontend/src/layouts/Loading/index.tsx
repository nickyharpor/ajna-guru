import style from './styles.module.scss'

interface IFLoading {}
const defaultProps: IFLoading = {}

const LoadingLayout: React.FC<IFLoading> = () => {
  return (
    <div className={style.container}>
      <div className={style.loading}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

LoadingLayout.displayName = 'LoadingLayout'
LoadingLayout.defaultProps = defaultProps
export default LoadingLayout
