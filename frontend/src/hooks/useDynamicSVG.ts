import { TIconName } from '@@types/icon'
import { useEffect, useRef, useState } from 'react'

const useDynamicSVG = (name: TIconName) => {
  const svgRef = useRef<React.FC<React.SVGProps<SVGElement>> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    const onHandleImport = async (): Promise<void> => {
      try {
        const icon = await import(`@assets/icons/${name}.svg`)
        svgRef.current = icon.ReactComponent
      } catch (e) {
        isMounted && setError(e)
      } finally {
        isMounted && setIsLoading(false)
      }
    }
    onHandleImport()

    return () => {
      isMounted = false
    }
  }, [name])

  return { error, isLoading, DynamicSvg: svgRef.current }
}

export default useDynamicSVG
