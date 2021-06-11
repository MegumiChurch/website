import { useState } from 'react'
import styles from 'styles/Navbar.module.scss'
import { desktopQuery } from 'common/Responsive'
import { useMediaQuery } from 'react-responsive'
import { Squeeze as Hamburger } from 'hamburger-react'

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const isDesktop = useMediaQuery(desktopQuery)
  return (
    <div
      className={styles.main}
      style={{
        width: `${isDesktop ? 60 : 90}vw`
      }}
    >
      <div className={styles.logo}>
        <img src='logo.svg' alt='logo' />
        <div className={styles.caption}>
          <p>Megumi</p>
          <p>Church</p>
        </div>
      </div>
      <a>Hello</a>
      <a>Hello</a>
      <a>Hello</a>
      <div
        className={styles.menuIcon}
        onMouseDown={() => {
          setMenuOpen(!isMenuOpen)
        }}
      >
        <p>Menu</p>
        <Hamburger
          size={27}
          toggle={setMenuOpen}
          toggled={isMenuOpen}
          distance='sm'
        />
      </div>
    </div>
  )
}
