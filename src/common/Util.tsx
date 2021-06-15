import { CSSProperties } from 'react'

export const capitalizeFirstLetter = (s: string) =>
  s[0].toUpperCase() + s.substring(1)

export const split = (s: string, style?: CSSProperties) =>
  s.split(``).map(s => <span style={style}>{s}</span>)
