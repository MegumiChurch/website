import { getPagesByType } from 'common/Prismic'
import Layout from 'components/layout'
import Link from 'next/link'
import type { GetServerSidePropsContext } from 'next'
import type { ReactChild } from 'react'
import type { News } from 'types'
import styles from './home.module.scss'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const now = Date.now()
  const news = ((await getPagesByType(`news`)) as News[]).filter(
    ({ display_until_date }) =>
      now < new Date(display_until_date as unknown as string).getTime()
  )
  return { props: { news } }
}

export default function Home({ news }: { news: News[] }) {
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
            <div className={styles.news}>
              {news.map(({ last_publication_date, title, id }) => (
                <p>
                  <span>{last_publication_date.join(`.`)}</span>
                  <a href={`page/${id}`}>{title}</a>
                </p>
              ))}
              <Link href='/archive/news'>
                <a className={styles.newsArchive}>ニュースアーカイブ →</a>
              </Link>
            </div>
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

interface Props {
  title: string
  subtitle: string
  children: ReactChild | ReactChild[]
}

function Card({ title, subtitle, children }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.titles}>
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
