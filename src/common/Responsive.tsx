import { CSSProperties, ReactChild } from 'react'
import MediaQuery from 'react-responsive'
import styles from 'styles/Enum.module.scss'
import { getDimensionsById } from '~/src/common/Util'

interface Props {
  children?: ReactChild | ReactChild[]
  style?: CSSProperties
  className?: string
}

export const maxMobileWidth = parseInt(styles.maxMobileWidth, 10)

export const desktopQuery = { query: `(min-width: ${maxMobileWidth + 1}px)` }

export function checkIsDesktop() {
  return getDimensionsById(`__next`).width > maxMobileWidth
}

export function Desktop({ className, style, children }: Props) {
  return (
    <MediaQuery query={`(min-width: ${maxMobileWidth + 1}px)`}>
      <div className={className} style={style}>
        {children}
      </div>
    </MediaQuery>
  )
}

export function Mobile({ className, style, children }: Props) {
  return (
    <MediaQuery query={`(max-width: ${maxMobileWidth}px)`}>
      <div className={className} style={style}>
        {children}
      </div>
    </MediaQuery>
  )
}
