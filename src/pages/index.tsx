import Navbar from 'components/Navbar'
import { useState } from 'react'
import styles from 'styles/Home.module.scss'
import { getDimensionsById, useResizeEffect } from 'common/Util'
import { useMediaQuery } from 'react-responsive'
import { desktopQuery } from '~/src/common/Responsive'

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
    <div id='main' className={styles.main}>
      <div style={{ width: bodyWidth }}>
        <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        <div
          className={styles.outerBody}
          style={{ marginTop: `${getDimensionsById(`navbar`).height}px` }}
        >
          <div className={styles.mainSpace}>
            <div className={styles.filter}>
              <div className={styles.text}>
                <p className={styles.subtitle}>NY めぐみ教会</p>
                <p className={styles.title}>Megumi Church</p>
              </div>
            </div>
          </div>
          <div className={styles.contentSection}>
            <div className={`${styles.left} vertical-center`}>
              <div className='vertical-center'>
                <p>
                  <span>毎週日曜日</span>
                  <span>午前９時</span>
                  <span>より、</span>
                  <span>リッジウェイ</span>
                  <span>教会地下</span>
                  <span>グリーン・</span>
                  <span>ルームにて</span>
                </p>
                <span>Zoomによるオンライン礼拝も行っています。</span>
                <a>もっと詳しく</a>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.first} />
              <div className={styles.second} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
