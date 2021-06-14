import { useEffect, useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { Desktop, maxMobileWidth } from 'common/Responsive'
import { Squeeze as Hamburger } from 'hamburger-react'
import { client } from 'common/Prismic'
import { RichText } from 'prismic-reactjs'
import Page from 'react-div-100vh'

export default function Navbar() {
  const [isDesktop, setIsDesktop] = useState(true)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [items, setItems] = useState([])
  const [topbarHeight, setTopbarHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [mainWidth, setMainWidth] = useState(0)
  const padding = `${isDesktop ? 2 : 4}%`
  function onResize() {
    setIsDesktop(window.screen.width > maxMobileWidth)
    setTopbarHeight(document.getElementById(`navbar`)!.clientHeight)
    setWindowHeight(document.getElementById(`100vh`)!.clientHeight)
    setMainWidth(document.getElementById(`main`)!.clientWidth)
  }
  useEffect(onResize)
  useEffect(() => {
    client.getSingle(`navbar`, {}).then((r: any) => {
      setItems(
        r.data.navbar.element.value.map(
          (element: any) =>
            `${RichText.asText(element.name.value)}@${RichText.asText([
              element?.route?.value || ``
            ])}`
        )
      )
    })
    window.addEventListener(`resize`, onResize)
    return () => {
      window.removeEventListener(`resize`, onResize)
    }
  }, [])
  return (
    <Page
      id='100vh'
      className={styles.main}
      style={{
        width: mainWidth
      }}
    >
      <div
        id='navbar'
        className={styles.navbar}
        style={{
          width: isDesktop ? `100%` : `90%`
        }}
      >
        <div
          className={styles.inner}
          style={{
            paddingTop: padding,
            paddingBottom: padding
          }}
        >
          {/* ロゴ */}
          <div className={styles.logo}>
            <img src='logo.svg' alt='logo' />
            <div className={styles.caption}>
              <p>Megumi</p>
              <p>Church</p>
            </div>
          </div>

          {/* メニュー上部のショートカット */}
          <div className={styles.shortcuts}>
            {items.slice(0, 4).map((item: string) => {
              const [name, route] = item.split(`@`)
              return (
                <Desktop>
                  <a className='underline' href={`/${route}`}>
                    {name}
                  </a>
                </Desktop>
              )
            })}
          </div>

          {/* メニューを開閉するボタン */}
          <div
            className={styles.menuIcon}
            onMouseDown={() => {
              setMenuOpen(!isMenuOpen)
            }}
          >
            <p>Menu</p>
            <Hamburger size={27} toggled={isMenuOpen} distance='sm' />
          </div>
        </div>
      </div>
      <div
        id='menusection'
        className={styles.menuSection}
        style={{
          height: `${windowHeight - topbarHeight}px`
        }}
      >
        <div
          className={styles.menu}
          style={{
            height: `100%`,
            opacity: isMenuOpen ? 1 : 0
          }}
        >
          <div className={styles.content}>
            {/* TODO Support prismic */}
            <a>ホーム</a>
            <a>ようこそ</a>
            <a>集会案内</a>
            <a>礼拝メッセージ</a>
            <a>アクセス</a>
          </div>
        </div>
      </div>
    </Page>
  )
}
