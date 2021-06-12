import { useEffect, useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { Desktop } from 'common/Responsive'
import { Squeeze as Hamburger } from 'hamburger-react'
import { client } from 'common/Prismic'
import { RichText } from 'prismic-reactjs'

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [items, setItems] = useState([])
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
  }, [])
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
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
  )
}
