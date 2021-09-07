import { getPagesByType } from 'common/Prismic'
import Layout from 'components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { useEffect } from 'react'
import type { GetServerSidePropsContext } from 'next'
import type { ReactChild } from 'react'
import type { News } from 'types'
import styles from './home.module.scss'

interface Home {
  header: string
  subtitle: string
  title: string
  first_section_body: string
  zoom_link: string
  google_map_link: string
}

export async function getServerSideProps(_: GetServerSidePropsContext) {
  const now = Date.now()
  const news = ((await getPagesByType(`news`)) as News[]).filter(
    ({ display_until_date }) =>
      now < new Date(display_until_date as unknown as string).getTime()
  )
  const {
    header,
    subtitle,
    title,
    first_section_body,
    zoom_link,
    google_map_link
  } = ((await getPagesByType(`home`, false))[0] as any).data.home
  const home = {
    header: header.value.main.url,
    subtitle: RichText.asText(subtitle.value),
    title: RichText.asText(title.value),
    first_section_body: RichText.asText(first_section_body.value),
    zoom_link: zoom_link.value.url,
    google_map_link: google_map_link.value.url
  }
  return { props: { home, news } }
}

export default function Home({ home, news }: { home: any; news: News[] }) {
  useEffect(() => {
    if (window.location.href.includes(`jgclmi.com`)) {
      window.location.href = `https://ljgc.vercel.app/`
    }
  }, [])
  return (
    <Layout
      title='ホーム'
      description='ニューヨークめぐみ教会は聖書信仰に立つプロテスタントの教会です。「教会はクリスチャンだけが行くところ」と思ってはいませんか。教会は全ての人に開かれています。聖書を学んでみたいと思っている方、米国の社会の基盤ともなっているキリスト教について知りたいと思っておられる方、是非気軽にお出かけ下さい。私たちの教会は皆様をお待ちしております！'
    >
      <div className={styles.root}>
        <header className={styles.header}>
          <div
            className={styles.headerImage}
            style={{
              backgroundImage: `url("${home.header}")`
            }}
          >
            <div className={styles.filter}>
              <div className={styles.titleText}>
                <h2>{home.subtitle}</h2>
                <br />
                <h1>{home.title}</h1>
              </div>
              <div className={styles.slash}>
                <p>{home.subtitle}</p>
              </div>
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <Card title='Church & Zoom' subtitle='Join us at'>
            {home.first_section_body}
            <br />
            <nav>
              <a href={home.google_map_link}>GoogleMapで表示</a>
              <span>|</span>
              <a href={home.zoom_link}>Zoomで参加</a>
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
              <nav>
                <Link href='/archive/news'>
                  <a>ニュースアーカイブ</a>
                </Link>
                <span>|</span>
                <Link href='/archive/manamail'>
                  <a>マナメールアーカイブ</a>
                </Link>
              </nav>
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
