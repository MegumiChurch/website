import Layout from 'components/Layout'
import styles from 'styles/NewsArchive.module.scss'
import { formatDate } from 'common/Util'
import { getNews } from 'common/Prismic'
import Article from 'components/Article'
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      news: JSON.stringify(await getNews())
    }
  }
}

export default function NewsArchive({ news }: { news: string }) {
  const newsArr = JSON.parse(news)
  return (
    <Layout>
      <Article
        title='ニュースアーカイブ'
        last_publication_date={formatDate(newsArr[0].last_publication_date)}
        headerImageUrl='https://spikesite-17132.kxcdn.com/wp-content/uploads/samuel-zeller-360588-unsplash-1024x645-1-1024x645.jpg'
      >
        {newsArr.map(
          ({ title, last_publication_date, id }: Record<string, string>) => (
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
