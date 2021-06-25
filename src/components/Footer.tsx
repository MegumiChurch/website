import styles from 'styles/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`${styles.main}`}>
      <p>・・・</p>
      <p>
        Developed By <a>Shun Ueda</a>. Powered by <a>Vercel</a>.
      </p>
      <p>Copyright © 2021 New York Grace Church. All rights reserved.</p>
    </footer>
  )
}
