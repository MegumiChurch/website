import { useEffect, useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { desktopQuery, Desktop } from 'common/Responsive'
import { useMediaQuery } from 'react-responsive'
import { Squeeze as Hamburger } from 'hamburger-react'

import { client } from 'common/Prismic'
import { RichText } from 'prismic-reactjs'

export default function Navbar() {
  const isDesktop = useMediaQuery(desktopQuery)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [items, setItems] = useState([])
  const [topbarWidth, setTopbarWidth] = useState(styles.mainWidth)
  useEffect(() => {
    client.getSingle(`contents`, {}).then(r => {
      setItems(
        r.data.contents.element.value.map(
          (element: any) =>
            `${RichText.asText(element.name.value)}@${RichText.asText(
              element.route.value
            )}`
        )
      )
    })
    function onResize() {
      setTopbarWidth(
        window.innerWidth > window.screen.width / 2
          ? `${window.screen.width / 2}px`
          : styles.mainWidth
      )
    }
    onResize()
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
  }, [])
  return (
    <div
      className={styles.main}
      style={{
        width: topbarWidth,
        height: `${isDesktop ? 15 : 10}vh`
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
  )
}
