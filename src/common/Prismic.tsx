import Prismic from '@prismicio/client'
import { Document as PrismicDocument } from '@prismicio/client/types/documents'
import { RichText } from 'prismic-reactjs'
import { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { Article, News } from 'types'
import { fixFullWidth } from 'common/Util'

const client = Prismic.client(`https://jgc-website.prismic.io/api`)

export async function getPageById(id: string, format = true) {
  const docs = (await client.query(Prismic.Predicates.at(`document.id`, id)))
    .results[0]
  return format ? extract(docs) : docs
}

export async function getPagesByType(type: string, format = true) {
  const { results } = await client.query(
    Prismic.Predicates.at(`document.type`, type)
  )
  return format
    ? Promise.all(results.map((document: PrismicDocument) => extract(document)))
    : results
}

async function extract(document: PrismicDocument): Promise<Article | News> {
  const { type, data, last_publication_date, id } = document
  const { header, title, body, display_until_date } = data[type]
  const baseRes = {
    id,
    last_publication_date: last_publication_date!.substring(0, 10).split(`-`),
    header: header.value.main.url,
    title: RichText.asText(title.value),
    body: fixFullWidth(
      renderToString((<RichText render={body.value} />) as ReactElement)
    )
  }
  return type === `news`
    ? {
        ...baseRes,
        display_until_date: display_until_date.value.split(`-`)
      }
    : baseRes
}
