import { RichText, RichTextBlock } from 'prismic-reactjs'
import { useEffect, useState } from 'react'

import Prismic from '@prismicio/client'
import styles from 'styles/[id].module.scss'
import { useRouter } from 'next/router'
import Navbar from 'components/Navbar'
import { client } from 'common/Prismic'
import Head from 'next/head'

interface Document {
  header: string
  title: RichTextBlock[]
  author: RichTextBlock[]
  body: RichTextBlock[]
  lastUpdate: string
}

export default function id() {
  const { isReady, query } = useRouter()
  const [doc, setDoc] = useState<Document>()
  useEffect(() => {
    if (!isReady) return
    client
      .query(Prismic.Predicates.at(`document.id`, query.id!), { lang: `*` })
      .then(response => {
        const { header, title, author, body } = response.results[0].data.article
        setDoc({
          header: header.value.main.url,
          title: title.value,
          author: author.value,
          body: body.value,
          lastUpdate: response.results[0].last_publication_date ?? ``
        })
      })
      .catch(() => {
        window.location.href = `/404`
      })
  }, [isReady])
  return (
    <>
      <Head>
        <title>{`${RichText.asText(doc?.title || [])} - NY めぐみ教会`}</title>
      </Head>
      <div className={styles.root}>
        <Navbar />
        <div className={`${styles.main} center`}>
          {doc?.body ? (
            <>
              <div
                className={styles.header}
                style={{
                  zIndex: -1,
                  backgroundImage: `url("${doc.header}")`
                }}
              />
              <div className={styles.text}>
                <span className={styles.title}>
                  {RichText.asText(doc.title)}
                </span>
                <div className={styles.info}>
                  <span className={styles.author}>
                    {RichText.asText(doc.author)}
                  </span>
                  <span className={styles.date}>
                    最終更新：
                    {doc.lastUpdate.substring(0, 10).replaceAll(`-`, `.`)}
                  </span>
                </div>
                <div className={styles.body}>
                  <RichText render={doc.body} />
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  )
}
