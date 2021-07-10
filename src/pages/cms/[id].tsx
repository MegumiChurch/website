import { RichText } from 'prismic-reactjs'
import { Markup } from 'interweave'
import { GetServerSidePropsContext } from 'next'
import { renderToString } from 'react-dom/server'
import { getContentById } from 'common/Prismic'
import Layout from 'components/Layout'
import Article from 'components/Article'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const content = await getContentById(id!.toString())
  const { type, last_publication_date, data } = content
  const { header, title, body } = data[type]
  return {
    props: {
      title: RichText.asText(title.value),
      last_publication_date: (last_publication_date ?? ``)
        .substring(0, 10)
        .replaceAll(`-`, `/`),
      header: header.value.main.url,
      body: renderToString(<RichText render={body.value} />)
    }
  }
}

export default function id({
  title,
  body,
  header,
  last_publication_date
}: Record<string, string>) {
  return (
    <Layout>
      <Article
        title={title}
        last_publication_date={last_publication_date}
        headerImageUrl={header}
      >
        <Markup content={body} />
      </Article>
    </Layout>
  )
}
