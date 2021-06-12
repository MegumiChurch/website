import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import styles from '~/src/styles/Home.module.scss'

export default function Home() {
  const [width, setWidth] = useState(`95vw`)
  useEffect(() => {
    function onResize() {
      setWidth(
        window.innerWidth > window.screen.width / 2
          ? `${window.screen.width / 2}px`
          : styles.mainWidth
      )
    }
    onResize()
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
  })
  return (
    <div
      className={styles.common}
      style={{
        width
      }}
    >
      <Navbar />
    </div>
  )
}
