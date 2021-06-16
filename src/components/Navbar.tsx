import { useEffect, useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { Desktop } from 'common/Responsive'
import { Squeeze as Hamburger } from 'hamburger-react'
import { client } from 'common/Prismic'
import { RichText } from 'prismic-reactjs'
import Page from 'react-div-100vh'
import { getDimensionsById } from '~/src/common/Util'

export default function Navbar({ isMenuOpen, setMenuOpen }: any) {
  const [items, setItems] = useState([])
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
  }, [])
  return (
    <Page
      id='100vh'
      className={styles.main}
      style={{
        width: getDimensionsById(`main`).width
      }}
    >
      <div id='navbar' className={styles.navbar}>
        <div className={styles.inner}>
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
          height: `${
            getDimensionsById(`window`).height -
            getDimensionsById(`navbar`).height
          }px`
        }}
      >
        <div className={styles.menu}>
          <div
            className={styles.content}
            style={{
              opacity: isMenuOpen ? 1 : 0
            }}
          >
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
