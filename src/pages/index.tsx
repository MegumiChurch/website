import styles from 'styles/Home.module.scss'
import React, { ReactChild, useEffect, useState } from 'react'
import Card from 'components/Card'
import Post from 'components/Post'
import { asText, getArticleByType } from 'common/Prismic'
import Layout from 'components/Layout'

export default function Home() {
  const [article, setArticle] = useState({
    header: `https://images.prismic.io/jgc-website/2ef94315-f2e4-40a7-b167-d32f68d1de2d_meet.jpg?auto=compress,format`,
    title: `NEW YORK GRACE CHURCH`,
    subtitle: `ニューヨークめぐみ教会`,
    first_section_body: `毎週日曜日午前９時より、リッジウェイ教会地下グリーン・ルームにて。コロナ禍にありますが、三密を避け、注意して行っています。Zoomを通してもご参加頂けます。`,
    zoom_link: ``,
    google_map_link: ``
  })
  const [news, setNews] = useState<
    {
      title: string
      last_publication_date: string
      id: string
    }[]
  >([])
  useEffect(() => {
    getArticleByType(`home`)
      .then(res => {
        const {
          header,
          title,
          subtitle,
          first_section_body,
          zoom_link,
          google_map_link
        } = res.results[0].data.home
        setArticle({
          header: header.value.main.url,
          title: asText(title.value),
          subtitle: asText(subtitle.value),
          first_section_body: asText(first_section_body.value),
          zoom_link: zoom_link.value.url,
          google_map_link: google_map_link.value.url
        })
      })
      .catch(() => {
        window.location.href = `/404`
      })
    getArticleByType(`news`).then(({ results }) => {
      const temp: any[] = []
      const now = Date.now()
      results.forEach(article => {
        const { display_until_date, title } = article.data.news
        if (new Date(display_until_date.value.split(`-`)).getTime() > now) {
          temp.push({
            title: asText(title.value),
            last_publication_date: (article.last_publication_date ?? ``)
              .substring(0, 10)
              .replaceAll(`-`, `/`),
            id: article.id
          })
        }
      })
      temp.sort((a, b) =>
        new Date(a.last_publication_date.split(`/`)).getTime() <
        new Date(b.last_publication_date.split(`/`)).getTime()
          ? 1
          : -1
      )
      setNews(temp)
    })
  }, [])
  return (
    <>
      <Layout>
        <div
          className={`${styles.title} center`}
          style={{
            backgroundImage: `url("${article.header}")`
          }}
        >
          <div className={styles.filter}>
            <div className={styles.textSection}>
              <div>
                <span>{article.subtitle}</span>
              </div>
              <div>
                <span>{article.title}</span>
              </div>
            </div>
            <div className={`${styles.decoration} vcenter_child`}>
              <h1>Japanese Grace</h1>
              <h1>Church Of New York</h1>
            </div>
          </div>
        </div>
        <article>
          <Card titles={[`Join us at`, `Church & Zoom`]}>
            {article.first_section_body}
            <br />
            <a href={article.zoom_link}>Zoomで参加</a>
            <span>|</span>
            <a href={article.google_map_link}>GoogleMapで表示</a>
          </Card>
          <Card titles={[`Our latest`, `News`]}>
            {
              (news || []).map(it => (
                <Post
                  title={it.title}
                  date={it.last_publication_date}
                  route={`/article/${it.id}`}
                />
              )) as unknown as ReactChild
            }
            <a>過去のニュース {` >`}</a>
          </Card>
          <Card titles={[`Get updates`, `Subscribe`]}>
            ニュースレターで最新情報をお届けします。メールアドレスは、ニュースレター以外の目的では使用しません。
            <br />
            <a href='/register'>登録</a>
            <span>|</span>
            <a href='/article/YOXClRMAACIAnGrd'>プライバシーポリシー</a>
          </Card>
        </article>
      </Layout>
    </>
  )
}
