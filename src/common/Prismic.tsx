import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { renderToString } from 'react-dom/server'
import { Document as PrismicDocument } from '@prismicio/client/types/documents'
import { Article, News } from 'types'

const client = Prismic.client(`https://jgc-website.prismic.io/api`)

export async function getPageById(id: string): Promise<Article | News> {
  return extract(
    (await client.query(Prismic.Predicates.at(`document.id`, id))).results[0]
  )
}

export async function getPagesByType(type: string) {
  const { results } = await client.query(
    Prismic.Predicates.at(`document.type`, type)
  )
  return Promise.all(
    results.map((document: PrismicDocument) => extract(document))
  )
}

async function extract(document: PrismicDocument): Promise<Article | News> {
  const { type, data, last_publication_date, id } = document
  const { header, title, body, display_until_date } = data[type]
  const baseRes = {
    id,
    last_publication_date: last_publication_date!.substring(0, 10).split(`-`),
    header: header.value.main.url,
    title: RichText.asText(title.value),
    body: renderToString(<RichText render={body.value} />)
  }
  return type === `news`
    ? {
        ...baseRes,
        display_until_date: display_until_date.value.split(`-`)
      }
    : baseRes
}
