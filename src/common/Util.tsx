import { CSSProperties, useState, useEffect } from 'react'

export const capitalizeFirstLetter = (s: string) =>
  s[0].toUpperCase() + s.substring(1)

export const split = (s: string, style?: CSSProperties) =>
  s.split(``).map(s => <span style={style}>{s}</span>)

export function getElementByIdSafely(id: string) {
  try {
    return document.getElementById(id)
  } catch (e: any) {
    return undefined
  }
}

export function getDimensionsById(id: string | 'window') {
  const [res, setRes] = useState({
    height: 0,
    width: 0
  })
  const handleResize = () => {
    if (id === `window`) {
      const { innerHeight, innerWidth } = window
      setRes({
        height: innerHeight,
        width: innerWidth
      })
    } else {
      const e = document.getElementById(id)
      setRes({
        height: e?.clientHeight || 0,
        width: e?.clientWidth || 0
      })
    }
  }
  useEffect(() => {
    setTimeout(handleResize, 4)
    window.addEventListener(`resize`, handleResize)
    return () => window.removeEventListener(`resize`, handleResize)
  }, [])
  return res
}

export function useResizeEffect(effect: () => void) {
  useEffect(() => {
    effect()
    window.onload = window.onresize = effect
  })
}
