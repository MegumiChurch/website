import styles from 'styles/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`${styles.root} vcenter_child center`}>
      <section className='center'>
        <div className={`${styles.list} center donly`}>
          <hr />
          <div>
            <div>
              <ul>
                <li>ニューヨークめぐみ教会</li>
                <li>
                  <a href=''>住所</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>牧師・笹川雅弘</li>
                <li>Masahiro Sasakawa</li>
                <li>
                  <a href='mailto:msasakawa@ridgewaychurch.com'>メール</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>免責</li>
                <li>
                  <a href=''>プライバシーポリシー</a>
                </li>
                <li>
                  <a href=''>利用規約</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.copyright} vcenter_child center`}>
          <hr />
          <p>
            Copyright © {new Date().getFullYear()} Shun Ueda. All rights
            reserved.
          </p>
          <a className='monly'>プライバシーポリシー</a>
          <span className='monly'>|</span>
          <a className='monly'>利用規約</a>
        </div>
      </section>
    </footer>
  )
}
