import styles from 'styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import Card from 'components/Card'
import Post from 'components/Post'
import { asText, getContentByType, getNews } from 'common/Prismic'
import Layout from 'components/Layout'
import { News } from 'common/types'
import { formatDate } from 'common/Util'

export default function Home() {
  const [article, setArticle] = useState({
    header: `https://images.prismic.io/jgc-website/2ef94315-f2e4-40a7-b167-d32f68d1de2d_meet.jpg?auto=compress,format`,
    title: `ニューヨークめぐみ教会`,
    subtitle: `NEW YORK GRACE CHURCH`,
    first_section_body: `毎週日曜日午前９時より、リッジウェイ教会地下グリーン・ルームにて。コロナ禍にありますが、三密を避け、注意して行っています。Zoomを通してもご参加頂けます。`,
    zoom_link: ``,
    google_map_link: ``
  })
  const [news, setNews] = useState<News[]>([])
  useEffect(() => {
    getContentByType(`home`)
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
    getNews().then(res => {
      const temp = res.filter(
        ({ display_until_date }) => display_until_date.getTime() > Date.now()
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
            <>
              {article.first_section_body}
              <br />
              <a href={article.zoom_link}>Zoomで参加</a>
              <span>|</span>
              <a href={article.google_map_link}>GoogleMapで表示</a>
            </>
          </Card>
          <Card titles={[`Our latest`, `News`]}>
            <>
              {(news || []).map(it => (
                <Post
                  title={it.title}
                  date={formatDate(it.last_publication_date)}
                  route={`/article/${it.id}`}
                />
              ))}
              <a href='/news-archive'>過去のニュース {` >`}</a>
            </>
          </Card>
          <Card titles={[`Get updates`, `Subscribe`]}>
            <>
              ニュースレターで最新情報をお届けします。メールアドレスは、ニュースレター以外の目的では使用しません。
              <br />
              <a href='/register'>登録</a>
              <span>|</span>
              <a href='/article/YOXClRMAACIAnGrd'>プライバシーポリシー</a>
            </>
          </Card>
        </article>
      </Layout>
    </>
  )
}
