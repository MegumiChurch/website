import { GetServerSidePropsContext } from 'next'
import { getPageById } from 'common/Prismic'
import { Article, News } from 'types'
import Layout from 'components/layout'
import { renderToElement } from 'common/Util'
import styles from './[id].module.scss'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: await getPageById(context.query.id as string) }
}

export default function Page({
  last_publication_date,
  header,
  title,
  body
}: Article | News) {
  return (
    <Layout>
      <header
        className={styles.header}
        style={{
          backgroundImage: `url("${header}")`
        }}
      />
      <div className={styles.top}>
        <h1>{title}</h1>
        <p>{`最終更新：${last_publication_date.join(`.`)}`}</p>
      </div>
      <main>{renderToElement(body, styles.body)}</main>
    </Layout>
  )
}
