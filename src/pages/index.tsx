import Layout from 'components/layout'
import Card from 'components/card'
import styles from './home.module.scss'

export default function Home() {
  return (
    <Layout>
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.headerImage}>
            <div className={styles.filter}>
              <div className={styles.titleText}>
                <h2>Japanese Grace Church of New York</h2>
                <br />
                <h1>ニューヨークめぐみ教会</h1>
              </div>
              <div className={styles.slash}>
                <p>Japanese Grace Church of New York</p>
              </div>
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <Card title='Church & Zoom' subtitle='Join us at'>
            毎週日曜日午前９時より、リッジウェイ教会地下グリーン・ルームにて。コロナ禍にありますが、三密を避け、注意して行っています。Zoomを通してもご参加頂けます。
            <br />
            <nav>
              <a>さらに詳しく</a>
              <span>|</span>
              <a>Zoomで参加</a>
            </nav>
          </Card>
          <Card title='News' subtitle='Our latest'>
            毎週日曜日午前９時より、リッジウェイ教会地下グリーン・ルームにて。コロナ禍にありますが、三密を避け、注意して行っています。Zoomを通してもご参加頂けます。
          </Card>
          <Card title='Contact' subtitle='Get in touch'>
            下記のメールアドレス、またはフォームよりお気軽にご連絡ください。
            <nav>
              <a>メール</a>
              <span>|</span>
              <a>お問い合わせフォーム</a>
            </nav>
          </Card>
        </main>
      </div>
    </Layout>
  )
}
