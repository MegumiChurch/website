import Navbar from 'components/Navbar'
import { useState } from 'react'
import styles from 'styles/Home.module.scss'
import { getDimensionsById, useResizeEffect } from 'common/Util'
import { useMediaQuery } from 'react-responsive'
import { desktopQuery } from '~/src/common/Responsive'
import MainSpace from '~/src/components/MainSpace'
import Icon from '~/src/components/Icon'
import Footer from '~/src/components/Footer'

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
      <div id='body' style={{ width: bodyWidth }}>
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
            <div className={`${styles.left}`}>
              <MainSpace />
            </div>
            <div className={styles.right}>
              <div className={`${styles.first} vertical-center`}>
                <div>
                  <h2>アクセス</h2>
                  <p>礼拝のZoomリンク・教会の場所はこちらから</p>
                  <div className={styles.iconSection}>
                    <Icon src='google-map.webp' />
                    <Icon src='zoom.webp' />
                  </div>
                </div>
              </div>
              <div className={`${styles.second} vertical-center`}>
                <div>
                  <h2>アクセス</h2>
                  <p>礼拝のZoomリンク・教会の場所はこちらから</p>
                  <div className={styles.iconSection}>
                    <Icon src='gmail.webp' />
                    <Icon src='line.webp' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer style={{ width: bodyWidth }} />
    </div>
  )
}
