import styles from 'styles/Footer.module.scss'
import { CSSProperties } from 'react'

interface Props {
  style?: CSSProperties
}

export default function Footer({ style }: Props) {
  return (
    <footer className={styles.main} style={style}>
      <p>・・・</p>
      <p>
        Developed By <a>Shun Ueda</a>. Powered by <a>Vercel</a>.
      </p>
      <p>Copyright © 2021 New York Grace Church. All rights reserved.</p>
    </footer>
  )
}
