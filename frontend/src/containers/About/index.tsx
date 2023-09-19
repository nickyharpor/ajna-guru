import translate from '@languages/config'
import style from './styles.module.scss'

interface IFAbout {
  targetRef?: React.MutableRefObject<HTMLDivElement | null>
}
const defaultProps: IFAbout = {}

const AboutContainer: React.FC<IFAbout> = ({ targetRef }) => {
  return (
    <section className={style.container} ref={targetRef}>
      <h3 className={style.title}>{translate('about.title')}</h3>
      <div className={style.text}>{translate('about.text')}</div>
    </section>
  )
}

AboutContainer.displayName = 'AboutContainer'
AboutContainer.defaultProps = defaultProps
export default AboutContainer
