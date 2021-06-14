import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from 'styles/Home.module.scss'
import { desktopQuery } from 'common/Responsive'

export default function Home() {
  const [bodyWidth, setBodyWidth] = useState(`95vw`)
  const [topbarHeight, setTopbarHeight] = useState(0)
  const isDesktop = useMediaQuery(desktopQuery)
  function onResize() {
    const scrWidth = window.screen.width
    setBodyWidth(
      window.innerWidth > scrWidth / 2 + scrWidth * 0.025 && isDesktop
        ? `${window.screen.width / 2}px`
        : `100vw`
    )
  }
  useEffect(onResize)
  useEffect(() => {
    setTopbarHeight(document.getElementById(`navbar`)!.clientHeight)
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
  })
  return (
    <main id='main' className={styles.main} style={{ width: bodyWidth }}>
      <Navbar />
      <div
        className={styles.body}
        style={{
          marginTop: `${topbarHeight}px`
        }}
      >
        Hello
      </div>
    </main>
  )
}
