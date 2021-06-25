import { useEffect, useState } from 'react'

import { Squeeze as Hamburger } from 'hamburger-react'
import { RichText } from 'prismic-reactjs'
import styles from 'styles/Navbar.module.scss'
import { client } from '~/src/common/Prismic'

interface Link {
  name: string
  route: string
}

export default function Navbar() {
  const [items, setItems] = useState<Link[]>([])
  const [isMenuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    client.getSingle(`navbar`, {}).then((r: any) => {
      setItems(
        r.data.navbar.element.value.map(({ name, route }: any) => ({
          name: RichText.asText(name.value),
          route: route.value.document.id
        }))
      )
    })
  }, [])
  return (
    <>
      <div className={styles.root}>
        <section className='center'>
          <div
            className={`${styles.logoSection} clickAble`}
            onMouseDown={() => {
              window.location.href = `/`
            }}
          >
            <div className={styles.logo} />
            <span>Ridgeway</span>
          </div>
          <nav>
            {items.slice(0, 5).map(({ name, route }) => (
              <a className='clickAble' key={name} href={`/article/${route}`}>
                {name}
              </a>
            ))}
          </nav>
          <div
            className={`${styles.menuIcon} clickAble`}
            onMouseDown={() => {
              setMenuOpen(!isMenuOpen)
            }}
          >
            <p
              style={{
                transform: `scaleX(2.5) rotate(${isMenuOpen ? 0 : 180}deg)`
              }}
            >
              ∨
            </p>
          </div>
        </section>
      </div>
      <div
        className={styles.menu}
        style={{
          opacity: isMenuOpen ? 1 : 0
        }}
      >
        <div className='center'>
          {items.slice(5).map(({ name, route }) => (
            <a className='clickAble' key={name} href={`/article/${route}`}>
              {name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
