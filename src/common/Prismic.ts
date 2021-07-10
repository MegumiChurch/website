import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { News } from 'common/types'

export const client = Prismic.client(`https://jgc-website.prismic.io/api`)

export async function getContentById(id: string) {
  return (
    await client.query(Prismic.Predicates.at(`document.id`, id), { lang: `*` })
  ).results[0]
}

export function getContentByType(type: string) {
  return client.query(Prismic.Predicates.at(`document.type`, type), {
    lang: `*`
  })
}

export function asText(text: any) {
  return RichText.asText(text)
}

export async function getNews() {
  const { results } = await getContentByType(`news`)
  const temp: News[] = []
  results.forEach(article => {
    const { display_until_date, title } = article.data.news
    temp.push({
      title: asText(title.value),
      display_until_date: new Date(display_until_date.value.split(`-`)),
      last_publication_date: new Date(
        (article.last_publication_date ?? ``)
          .substring(0, 10)
          .split(`-`) as unknown as string
      ),
      id: article.id
    })
  })
  temp.sort((a, b) =>
    a.last_publication_date.getTime() < b.last_publication_date.getTime()
      ? 1
      : -1
  )
  return temp
}
