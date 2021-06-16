import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from 'styles/Home.module.scss'
import { desktopQuery, maxMobileWidth } from 'common/Responsive'
import Page from 'react-div-100vh'
import {
  getDimensionsById,
  getElementByIdSafely,
  split,
  useResizeEffect
} from 'common/Util'
import Bookify from '~/src/components/Bookify'

export default function Home() {
  const [bodyWidth, setBodyWidth] = useState(`95vw`)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const isDesktop = useMediaQuery(desktopQuery)
  useResizeEffect(() => {
    const scrWidth = window.screen.width
    setBodyWidth(
      window.innerWidth > scrWidth / 2 + scrWidth * 0.025 && isDesktop
        ? `${window.screen.width / 2}px`
        : `100vw`
    )
  })
  return (
    <Page id='main' className={styles.main} style={{ width: bodyWidth }}>
      <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div
        id='outer'
        className={styles.outerBody}
        style={{
          marginTop: `${getDimensionsById(`navbar`).height}px`,
          height: `${getDimensionsById(`main`).height}px`
        }}
      />
    </Page>
  )
}
