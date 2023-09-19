import style from './styles.module.scss'

interface IFProgress {
  total: number
  current: number
  caption?: boolean
}
const defaultProps: IFProgress = {
  total: 100,
  current: 0,
  caption: true
}

const Progress: React.FC<IFProgress> = ({ total, current, caption }) => {
  const precent = Math.round((current * 100) / total)
  const status = precent <= 50 ? 'success' : precent <= 75 ? 'warning' : 'error'

  return (
    <div className={style.container}>
      {caption && <div className={style.precent}>{precent}%</div>}
      <div
        className={`${style.progress} ${status}`}
        style={{ width: `${precent || 0.5}%` }}
      />
    </div>
  )
}

Progress.displayName = 'Progress'
Progress.defaultProps = defaultProps
export default Progress
