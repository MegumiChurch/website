import styles from './footer.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <ul>
            <li>ニューヨークめぐみ教会</li>
            <li>
              <a href='https://goo.gl/maps/tZb7swVVmkXuFxC27'>住所</a>
            </li>
          </ul>
          <ul>
            <li>牧師・笹川雅弘</li>
            <li>Masahiro Sasakawa</li>
            <li>
              <a href='mailto:msasakawa@ridgewaychurch.com'>メール</a>
            </li>
          </ul>
          <ul>
            <li>関連サイト</li>
            <li>
              <a href='https://nymissionsasakawa.wixsite.com/support'>
                笹川雅弘宣教師を支える会
              </a>
            </li>
            <li>
              <a href='https://twitter.com/SasakawaM'>Twitter</a>
            </li>
          </ul>
        </div>
        <div className={styles.copywrite}>
          {`Copyright © ${new Date().getFullYear()} `}
          <a>Shun Ueda</a>. All rights reserved.
          <div className={styles.legal}>
            <a>プライバシーポリシー</a>
            <span>|</span>
            <a>利用規約</a>
          </div>
        </div>
      </footer>
    </>
  )
}
