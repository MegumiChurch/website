import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from '~/src/styles/Home.module.scss'
import { desktopQuery } from '~/src/common/Responsive'

export default function Home() {
  const [width, setWidth] = useState(`95vw`)
  const isDesktop = useMediaQuery(desktopQuery)
  useEffect(() => {
    function onResize() {
      setWidth(
        window.innerWidth > window.screen.width / 2 && isDesktop
          ? `${window.screen.width / 2}px`
          : `95vw`
      )
    }
    onResize()
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
  })
  return (
    <main className={styles.main} style={{ width }}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.body} />
    </main>
  )
}
