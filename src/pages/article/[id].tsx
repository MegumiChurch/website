import { RichText, RichTextBlock } from 'prismic-reactjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getArticleById } from 'common/Prismic'
import Layout from 'components/Layout'
import Article from 'components/ArticleBase'

interface Document {
  ready: boolean
  header: string
  title: string
  body: RichTextBlock[]
  last_publication_date: string
}

export default function id() {
  const { isReady, query } = useRouter()
  const [article, setArticle] = useState<Document>()
  useEffect(() => {
    if (!isReady) return
    getArticleById(query.id!)
      .then(res => {
        const props = res.results[0].data.article ? `article` : `news`
        const { header, title, body } = res.results[0].data[props]
        setArticle({
          ready: true,
          header:
            header?.value?.main?.url ||
            `https://images.prismic.io/jgc-website/c78347c6-0240-4f73-b01c-179b45438a2a_placeholder.png?auto=compress,format`,
          title: RichText.asText(title.value),
          body: body.value,
          last_publication_date: (res.results[0].last_publication_date ?? ``)
            .substring(0, 10)
            .replaceAll(`-`, `/`)
        })
      })
      .catch(() => {
        window.location.href = `/404`
      })
  }, [isReady])
  return article?.ready ? (
    <Layout>
      <Article
        title={article.title}
        last_publication_date={article.last_publication_date}
        headerImageUrl={article.header}
      >
        <RichText render={article.body} />
      </Article>
    </Layout>
  ) : (
    <></>
  )
}
