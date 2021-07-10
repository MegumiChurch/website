import { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import styles from 'styles/NewsArchive.module.scss'
import { formatDate } from 'common/Util'
import { getNews } from 'common/Prismic'
import Article from 'components/Article'

export default function NewsArchive() {
  const [news, setNews] = useState<News[]>([])
  useEffect(() => {
    getNews().then(res => {
      setNews(res)
    })
  }, [])
  return (
    <Layout>
      <Article
        title='ニュースアーカイブ'
        last_publication_date={formatDate(news[0]?.last_publication_date)}
        headerImageUrl='https://spikesite-17132.kxcdn.com/wp-content/uploads/samuel-zeller-360588-unsplash-1024x645-1-1024x645.jpg'
      >
        {(news || []).map(
          ({ title, display_until_date, last_publication_date, id }) => (
            <div className={styles.entry}>
              <p>{formatDate(last_publication_date)}</p>
              <a href={`/article/${id}`}>{title}</a>
            </div>
          )
        )}
      </Article>
    </Layout>
  )
}
