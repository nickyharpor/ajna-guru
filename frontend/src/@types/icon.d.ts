export type TIconName =
  | 'add-fund'
  | 'arrow-bottom'
  | 'arrow-enter'
  | 'close'
  | 'cpu'
  | 'hdd'
  | 'network'
  | 'next'
  | 'notification'
  | 'previous'
  | 'ram'
  | 'wallet'

export interface TIcon extends React.SVGAttributes<SVGSVGElement> {
  name: TIconName
  size?: number
  color?: string
  classAppend?: string
}
