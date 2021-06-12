import { useEffect, useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { Desktop, desktopQuery } from 'common/Responsive'
import { Squeeze as Hamburger } from 'hamburger-react'
import { client } from 'common/Prismic'
import { RichText } from 'prismic-reactjs'
import Page, { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'

export default function Navbar({ id }: { id?: string }) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [items, setItems] = useState([])
  const padding = `${useMediaQuery(desktopQuery) ? 2 : 4}%`
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
    <Page className={styles.main}>
      <div id={id} className={styles.navbar}>
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
      <div className={styles.menu}>
        1. メニューテキスト{`\n`}
        2. メニューテキスト{`\n`}
        3. メニューテキスト{`\n`}
        4. メニューテキスト{`\n`}
        5. メニューテキスト{`\n`}
      </div>
    </Page>
  )
}
