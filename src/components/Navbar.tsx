import { useEffect, useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { Desktop, desktopQuery } from 'common/Responsive'
import { Squeeze as Hamburger } from 'hamburger-react'
import { client } from 'common/Prismic'
import { RichText } from 'prismic-reactjs'
import Page from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { capitalizeFirstLetter } from '~/src/common/Util'

export default function Navbar({ id }: { id?: string }) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [items, setItems] = useState([])
  const [topbarHeight, setTopbarHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [menuWidth, setMenuWidth] = useState(0)
  const [mainWidth, setMainWidth] = useState(0)
  const [menuDirection, setMenuDirection] = useState<'right' | 'left'>(`left`)
  const isDesktop = useMediaQuery(desktopQuery)
  const padding = `${isDesktop ? 2 : 4}%`
  useEffect(() => {
    setTopbarHeight(document.getElementById(`navbar`)!.clientHeight)
    setWindowHeight(document.getElementById(`100vh`)!.clientHeight)
    setMenuWidth(document.getElementById(`menusection`)!.clientWidth)
    setMainWidth(document.getElementById(`main`)!.clientWidth)
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
      setTopbarHeight(document.getElementById(`navbar`)!.clientHeight)
      setWindowHeight(document.getElementById(`100vh`)!.clientHeight)
      setMenuWidth(document.getElementById(`menusection`)!.clientWidth)
      setMainWidth(document.getElementById(`main`)!.clientWidth)
    }
    onResize()
    window.addEventListener(`resize`, onResize)
    return () => window.removeEventListener(`resize`, onResize)
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
        id={id}
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
              console.log(menuWidth)
              setMenuOpen(!isMenuOpen)
              if (isMenuOpen) {
                setMenuDirection(menuDirection === `right` ? `left` : `right`)
                setTimeout(() => {
                  setMenuDirection(`left`)
                }, 500)
              }
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
          height: `${(1 - topbarHeight / windowHeight) * 100}%`
        }}
      >
        <div
          className={styles.menu}
          style={{
            width: `${isMenuOpen ? 100 : 0}%`,
            ...Object.fromEntries([
              [`margin${capitalizeFirstLetter(menuDirection)}`, `auto`]
            ])
          }}
        >
          <div
            className={styles.top}
            style={{
              width: `${isDesktop ? 20 : 100}%`,
              ...Object.fromEntries([
                [`margin${capitalizeFirstLetter(menuDirection)}`, `auto`]
              ])
            }}
          />
        </div>
      </div>
    </Page>
  )
}
