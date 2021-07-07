import { CSSProperties, ReactChild } from 'react'
import styles from 'styles/Util.module.scss'

interface Props {
  children?: ReactChild | ReactChild[]
  style?: CSSProperties
  className?: string
}

export const maxMobileWidth = parseInt(styles.maxMobileWidth, 10)

export const dquery = { query: `(min-width: ${maxMobileWidth + 1}px)` }
