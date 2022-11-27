import { getPagesByType } from 'common/Prismic'
import { fixFullWidth } from 'common/Util'
import Layout from 'components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import type { GetServerSidePropsContext } from 'next'
import type { ReactChild } from 'react'
import type { News } from 'types'
import styles from './index.module.scss'

interface Home {
  header: string
  subtitle: string
  title: string
  first_section_body: string
  zoom_link: string
  google_map_link: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const now = Date.now() - 86_400_000
  const news = ((await getPagesByType(`news`)) as News[]).filter(
    ({ display_until_date }) =>
      now <= new Date(display_until_date as unknown as string).getTime()
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
    first_section_body: fixFullWidth(RichText.asText(first_section_body.value)),
    zoom_link: zoom_link.value.url,
    google_map_link: google_map_link.value.url
  }
  return { props: { home, news } }
}

export default function Home({ home, news }: { home: any; news: News[] }) {
  return (
    <Layout
      title='ホーム'
      description='ニューヨークめぐみ教会は聖書信仰に立つプロテスタントの教会です。「教会はクリスチャンだけが行くところ」と思ってはいませんか。教会は全ての人に開かれています。聖書を学んでみたいと思っている方、米国の社会の基盤ともなっているキリスト教について知りたいと思っておられる方、是非気軽にお出かけ下さい。私たちの教会は皆様をお待ちしております！'
    >
      <header>
        <div
          className={styles.headerImage}
          // style={{
          //   backgroundImage: `url("${home.header}")`
          // }}
        >
          {/* <div className={styles.filter}> */}
          {/*  <div className={styles.titleText}> */}
          {/*    <h2>{home.subtitle}</h2> */}
          {/*    <br /> */}
          {/*    <h1>{home.title}</h1> */}
          {/*  </div> */}
          {/* </div> */}
        </div>
      </header>
      <main className={styles.main}>
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
                <a>過去のニュース</a>
              </Link>
              <span>|</span>
              <Link href='/archive/manamail'>
                <a>マナメールアーカイブ</a>
              </Link>
            </nav>
          </div>
        </Card>
        <Card title='Church & Zoom' subtitle='Join us'>
          {home.first_section_body}
          <br />
          <nav>
            <Link href={home.google_map_link}>GoogleMap</Link>
            <span>|</span>
            <Link href={home.zoom_link}>Zoomで参加</Link>
            <br />
            <Link href='/page/visit'>教会敷地内詳細案内</Link>
          </nav>
        </Card>
        <Card title='Contact' subtitle='Get in touch'>
          下記のメールアドレス、またはフォームよりお気軽にご連絡ください。
          <nav>
            <Link href='mailto:msasakawa@ridgewaychurch.com'>
              <a>メール</a>
            </Link>
            <span>|</span>
            {/* <Link href='https://forms.gle/QtPUQHhoznhJ7hAH9'> */}
            {/*  <a>お問い合わせフォーム</a> */}
            {/* </Link> */}
            <Link href='mailto:msasakawa@ridgewaychurch.com'>
              <a>お問い合わせ</a>
            </Link>
          </nav>
        </Card>
      </main>
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
