import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Page, { use100vh } from 'react-div-100vh'
import styles from '~/src/styles/Home.module.scss'
import { desktopQuery } from '~/src/common/Responsive'

export default function Home() {
  const [bodyWidth, setBodyWidth] = useState(`95vw`)
  const [topbarHeight, setTopbarHeight] = useState(0)
  const isDesktop = useMediaQuery(desktopQuery)
  useEffect(() => {
    setTopbarHeight(document.getElementById(`navbar`)!.clientHeight)
    function onResize() {
      const scrWidth = window.screen.width
      setBodyWidth(
        window.innerWidth > scrWidth / 2 + scrWidth * 0.025 && isDesktop
          ? `${window.screen.width / 2}px`
          : `95vw`
      )
    }
    onResize()
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
  })
  return (
    <main className={styles.main} style={{ width: bodyWidth }}>
      <Navbar id='navbar' />
    </main>
  )
}
