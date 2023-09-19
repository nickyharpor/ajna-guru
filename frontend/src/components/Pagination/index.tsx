import { useCallback, useMemo } from 'react'
import style from './styles.module.scss'
import Icon from '@components/Icon'

interface IFPagination {
  current: number
  total: number
  onChange: (page: number) => void
  isLoading: boolean
  isError: boolean
}
const defaultProps: IFPagination = {
  current: 1,
  total: 1,
  onChange: () => {},
  isLoading: true,
  isError: false
}

const Pagination: React.FC<IFPagination> = ({
  current,
  total,
  onChange,
  isLoading,
  isError
}) => {
  const onHandlePrevious = () => {
    if (!isLoading && current > 1) {
      onChange(current - 1)
    }
  }

  const onHandleNext = () => {
    if (!isLoading && current < total) {
      onChange(current + 1)
    }
  }

  const onHandleChange = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { innerText } = event.target as HTMLLIElement
      if (current !== parseInt(innerText) && !isLoading) {
        onChange(parseInt(innerText))
      }
    },
    [current, isLoading, onChange]
  )

  const onRenderPages = useMemo(() => {
    const pages = [...Array(total).keys()]
    return pages.map(item => (
      <li
        key={self.crypto.randomUUID()}
        className={current === item + 1 ? style.active : ''}
        onClick={onHandleChange}
      >
        {item + 1}
      </li>
    ))
  }, [current, onHandleChange, total])

  return (
    !isError && (
      <ul className={`${style.container} ${isLoading ? style.loading : ''}`}>
        {total > 1 && (
          <li
            className={current <= 1 ? style.hidden : ''}
            onClick={onHandlePrevious}
          >
            <Icon name={'previous'} size={18} color={'light'} />
          </li>
        )}
        {onRenderPages}
        {total > 1 && (
          <li
            className={current >= total ? style.hidden : ''}
            onClick={onHandleNext}
          >
            <Icon name={'next'} size={18} color={'light'} />
          </li>
        )}
      </ul>
    )
  )
}

Pagination.displayName = 'Pagination'
Pagination.defaultProps = defaultProps
export default Pagination
