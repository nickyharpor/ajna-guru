import { useRef } from 'react'
import style from './styles.module.scss'

enum ESpeed {
  slow = 100,
  medium = 50,
  fast = 25
}
interface IFTypewriter {
  title?: string
  subtitle?: string
  content: string[]
  speed?: ESpeed
  delay?: number
}
const defaultProps: IFTypewriter = {
  title: '',
  subtitle: '',
  content: [''],
  speed: ESpeed['medium'],
  delay: 2000
}

const Typewriter: React.FC<IFTypewriter> = ({
  title,
  subtitle,
  content,
  speed,
  delay
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const currentRef = useRef({
    text: '',
    index: 0,
    char: 0,
    isErasing: false
  })

  const onHandleType = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    const { text, index, char, isErasing } = currentRef.current
    const next = {
      ...currentRef.current,
      text: text + content[index].charAt(char),
      char: char + 1
    }
    const prev = {
      ...currentRef.current,
      text: content[index].substring(0, char - 1),
      char: char - 1
    }
    const erase = {
      ...currentRef.current,
      char: char - 1,
      isErasing: true
    }
    const rotate = {
      text: '',
      index: currentRef.current.index + 1,
      char: 0,
      isErasing: false
    }
    const reset = {
      text: '',
      index: 0,
      char: 0,
      isErasing: false
    }

    if (char < content[index].length) {
      currentRef.current = isErasing
        ? char !== 0
          ? prev
          : index === content.length - 1
          ? reset
          : rotate
        : next
    } else {
      currentRef.current = erase
    }
    if (textRef.current) {
      textRef.current.innerText = currentRef.current.text
    }
    timeoutRef.current = setTimeout(
      onHandleType,
      currentRef.current.char === content[currentRef.current.index].length
        ? delay
        : speed
    )
  }

  onHandleType()

  return (
    <div className={style.container}>
      {(title || subtitle) && (
        <div className={style.header}>
          {subtitle && <h3 className={style.subtitle}>{subtitle}</h3>}
          {title && <h2 className={style.title}>{title}</h2>}
        </div>
      )}
      <h4 ref={textRef} className={style.text}></h4>
    </div>
  )
}

Typewriter.displayName = 'Typewriter'
Typewriter.defaultProps = defaultProps
export default Typewriter
