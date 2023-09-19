import AboutContainer from '@containers/About'
import HeaderContainer from '@containers/Header'
import { useRef } from 'react'

interface IFHome {}
const defaultProps: IFHome = {}

const HomePage: React.FC<IFHome> = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <HeaderContainer targetRef={sectionRef} />
      <AboutContainer targetRef={sectionRef} />
    </>
  )
}

HomePage.displayName = 'HomePage'
HomePage.defaultProps = defaultProps
export default HomePage
