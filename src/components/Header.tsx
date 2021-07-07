import styles from 'styles/Header.module.scss'
import { Cross as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { dquery } from 'common/Responsive'

export default function Header() {
  const [isOpen, setOpen] = useState(false)
  const desktop = useMediaQuery(dquery)
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles.logo} />
        </div>
        <div className={styles.menuIcon}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </header>
      <div
        className={styles.filter}
        style={{
          marginLeft: `${isOpen ? 0 : 100}%`,
          transition: desktop ? `0.5s` : `0.5s ${isOpen ? `` : `0.08s`}`
        }}
      />
      <div
        className={styles.menu}
        style={{
          marginLeft: `${isOpen ? 0 : 100}%`,
          transition: desktop ? `0.5s` : `0.5s ${isOpen ? `0.08s` : ``}`
        }}
      >
        <a href='/'>ホーム{`\n`}</a>
        <a href=''>沿革{`\n`}</a>
        <a href=''>牧師紹介{`\n`}</a>
        <a href=''>こんにちは、世界！</a>
      </div>
    </>
  )
}
