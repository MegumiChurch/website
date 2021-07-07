import { RichText, RichTextBlock } from 'prismic-reactjs'
import { useEffect, useState } from 'react'
import styles from 'styles/[id].module.scss'
import { useRouter } from 'next/router'
import { getArticleById } from 'common/Prismic'
import Header from 'components/Header'
import Footer from 'components/Footer'

interface Document {
  ready: boolean
  header: string
  title: string
  author: string
  body: RichTextBlock[]
  lastUpdate: string
}

export default function id() {
  const { isReady, query } = useRouter()
  const [article, setArticle] = useState<Document>()
  useEffect(() => {
    if (!isReady) return
    getArticleById(query.id!)
      .then(res => {
        const { header, title, author, body } = res.results[0].data.article
        setArticle({
          ready: true,
          header: header.value.main.url,
          title: RichText.asText(title.value),
          author: RichText.asText(author.value),
          body: body.value,
          lastUpdate: res.results[0].last_publication_date ?? ``
        })
      })
      .catch(() => {
        window.location.href = `/404`
      })
  }, [isReady])
  return article?.ready ? (
    <>
      <Header />
      <div className={`${styles.headerSection} center`}>
        <div
          style={{
            backgroundImage: `url(${article.header})`
          }}
        />
      </div>
      <main className={`${styles.root} center`}>
        <div className={`${styles.title} center`}>
          <h1>{article.title}</h1>
        </div>
        <div className={styles.info}>
          最終更新：{article.lastUpdate.substring(0, 10).replaceAll(`-`, `/`)}
        </div>
        <div className={styles.body}>
          <RichText render={article.body} />
        </div>
      </main>
      <Footer />
    </>
  ) : (
    <></>
  )
}
