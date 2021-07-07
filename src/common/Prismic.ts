import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'

export const client = Prismic.client(`https://jgc-website.prismic.io/api`)

export function getArticleById(id: string | string[]) {
  return client.query(Prismic.Predicates.at(`document.id`, id), { lang: `*` })
}

export function getArticleByType(type: string) {
  return client.query(Prismic.Predicates.at(`document.type`, type), {
    lang: `*`
  })
}

export function asText(text: any) {
  return RichText.asText(text)
}
