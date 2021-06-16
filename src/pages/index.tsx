import Navbar from 'components/Navbar'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from 'styles/Home.module.scss'
import { maxMobileWidth } from 'common/Responsive'
import Page from 'react-div-100vh'
import { split } from 'common/Util'
import Bookify from '~/src/components/Bookify'

export default function Home() {
  const [bodyWidth, setBodyWidth] = useState(`95vw`)
  const [topbarHeight, setTopbarHeight] = useState(0)
  const [windowsHeight, setWindowsHeight] = useState(0)
  const [windowsWidth, setWindowsWidth] = useState(0)
  const [mainHeight, setMainHeight] = useState(0)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  function onResize() {
    const scrWidth = window.screen.width
    setIsDesktop(window.screen.width > maxMobileWidth)
    setMainHeight(document.getElementById(`main`)!.clientHeight)
    setTopbarHeight(document.getElementById(`navbar`)!.clientHeight)
    setWindowsHeight(document.getElementById(`windows`)!.clientHeight)
    setWindowsWidth(document.getElementById(`windows`)!.clientWidth)
    setBodyWidth(
      window.innerWidth > scrWidth / 2 + scrWidth * 0.025 && isDesktop
        ? `${window.screen.width / 2}px`
        : `100vw`
    )
  }
  useEffect(onResize)
  useEffect(() => {
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
  }, [])
  return (
    <Page id='main' className={styles.main} style={{ width: bodyWidth }}>
      <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div
        className={styles.body}
        style={{
          marginTop: `${topbarHeight}px`,
          height: isDesktop ? `75%` : `${mainHeight - topbarHeight}px`
        }}
      >
        <div className={styles.windows}>
          <div
            className={styles.overlay}
            style={{
              opacity: isMenuOpen ? 0 : 1,
              height: windowsHeight,
              width: windowsWidth
              // paddingTop: `${windowsHeight / (isDesktop ? 4 : 15)}px`
            }}
          >
            <div
              className={`${styles.top} onlyDesktop`}
              style={{
                marginLeft: isDesktop ? 0 : `100vw`
              }}
            >
              <img src='corner.svg' alt='' className='onlyDesktop' />
              <img src='corner.svg' alt='' className='onlyDesktop' />
            </div>
            <div
              className={styles.text}
              style={{
                fontSize: isDesktop ? `500%` : `300%`,
                marginTop: isDesktop ? `initial` : `-50%`
              }}
            >
              <p>ニューヨークめぐみ教会</p>
              {`\n`}
              NY Megumi{`\n`}
              Church
            </div>
            <div
              className={styles.mainButton}
              style={{
                marginTop: isDesktop ? `initial` : `-80%`
              }}
            >
              <span>
                {split(`Connect →`.toUpperCase(), {
                  fontSize: isDesktop ? `250%` : `210%`,
                  backgroundPosition: `center`
                })}
              </span>
            </div>
            <div className={`${styles.bottom} onlyDesktop`}>
              <img className='onlyDesktop' src='corner.svg' alt='' />
              <img src='corner.svg' alt='' className='onlyDesktop' />
            </div>
          </div>
          <table
            id='windows'
            style={{
              opacity: isMenuOpen ? 0 : 1
            }}
          >
            <tbody>
              <tr>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  )
}
