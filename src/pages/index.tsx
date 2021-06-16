import Navbar from 'components/Navbar'
import { useState } from 'react'
import styles from 'styles/Home.module.scss'
import { checkIsDesktop } from 'common/Responsive'
import { getDimensionsById, useResizeEffect } from 'common/Util'

export default function Home() {
  const [bodyWidth, setBodyWidth] = useState(`95vw`)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const isDesktop = checkIsDesktop()
  useResizeEffect(() => {
    const scrWidth = window.screen.width
    setBodyWidth(
      window.innerWidth > scrWidth / 2 + scrWidth * 0.025 && isDesktop
        ? `${window.screen.width / 2}px`
        : `100vw`
    )
  })
  return (
    <div id='main' className={styles.main} style={{ width: bodyWidth }}>
      <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div
        id='outer'
        className={styles.outerBody}
        style={{
          marginTop: `${getDimensionsById(`navbar`).height}px`
        }}
      />
    </div>
  )
}
