import styles from 'styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Card from 'components/Card'
import Post from 'components/Post'
import { asText, getArticleByType } from 'common/Prismic'

export default function Home() {
  const [article, setArticle] = useState({
    header: `https://images.prismic.io/jgc-website/2ef94315-f2e4-40a7-b167-d32f68d1de2d_meet.jpg?auto=compress,format`,
    title: `NEW YORK GRACE CHURCH`,
    subtitle: `ニューヨークめぐみ教会`,
    first_section_body: `毎週日曜日午前９時より、リッジウェイ教会地下グリーン・ルームにて。コロナ禍にありますが、三密を避け、注意して行っています。Zoomを通してもご参加頂けます。`
  })
  useEffect(() => {
    getArticleByType(`home`)
      .then(res => {
        const { header, title, subtitle, first_section_body } =
          res.results[0].data.home
        setArticle({
          header: header.value.main.url,
          title: asText(title.value),
          subtitle: asText(subtitle.value),
          first_section_body: asText(first_section_body.value)
        })
      })
      .catch(() => {
        window.location.href = `/404`
      })
  }, [])
  return (
    <>
      <Header />
      <main className={`${styles.root} center`}>
        <div
          className={styles.title}
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
          <Card
            titles={[`Join us at`, `Church & Zoom`]}
            space={{
              content: <div className={styles.space1} />
            }}
          >
            {article.first_section_body}
            <br />
            <a>Zoomで参加</a>
            <span>|</span>
            <a>GoogleMapで表示</a>
          </Card>
          <Card titles={[`Our latest`, `News`]}>
            <Post title='最初のニュース' date='2021/07/06' route='google.com' />
            <Post
              title='サマースクール、開校します'
              date='2021/07/06'
              route='google.com'
            />
            <Post
              title='信徒会、やります'
              date='2021/07/06'
              route='google.com'
            />
            <a>過去のニュース {` >`}</a>
          </Card>
          <Card titles={[`Get updates`, `Subscribe`]}>
            ニュースレターで最新情報をお届けします。メールアドレスは、ニュースレター以外の目的では使用しません。
            <br />
            <a href=''>登録</a>
            <span>|</span>
            <a>プライバシーポリシー</a>
          </Card>
        </article>
      </main>
      <Footer />
    </>
  )
}
