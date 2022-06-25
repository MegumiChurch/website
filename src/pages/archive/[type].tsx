import { getPagesByType } from 'common/Prismic'
import Layout from 'components/layout'
import readPdf from 'pdf-parse'
import { RichText } from 'prismic-reactjs'
import type { GetServerSidePropsContext } from 'next'
import type { ReactChild } from 'react'
import type { News } from 'types'
import styles from './[type].module.scss'

interface Props {
  date: number[]
  title: string
  subtitle: string
  about?: string
  link: {
    text: string
    route: string
  }
}

interface File {
  title: string
  pubDate: number[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.type as string
  if (query === `manamail`) {
    const { data } = (await getPagesByType(`manamail`, false))[0] as any
    const files = new Map<string, number[]>()
    await Promise.all(
      data.manamail.group.value.map(async (entry: any) => {
        if (entry.date) {
          files.set(
            RichText.asText(entry.title.value),
            entry.date.value.split(`-`).map((it: string) => parseInt(it, 10))
          )
          return
        }
        try {
          const res = await fetch(entry.pdf.value.file.url)
          const pdfData = await readPdf(
            Buffer.from(await res.arrayBuffer()),
            {}
          )
          const rawDate = pdfData.info.CreationDate.substring(2, 10)
          const year = rawDate.substring(0, 4)
          const month = rawDate.substring(4, 6) - 1
          const day = rawDate.substring(6, 8)
          const date = new Date(year, month, day)
          while (date.getDay() !== 0) {
            date.setDate(date.getDate() + 1)
          }
          files.set(RichText.asText(entry.title.value), [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ])
        } catch (e) {
          files.set(RichText.asText(entry.title.value), [2000, 1, 1])
        }
      })
    )
    return {
      props: {
        about: RichText.asText(data.manamail.about.value),
        data: data.manamail.group.value
          .reverse()
          .map(({ title, subtitle, pdf }: any) => ({
            title: RichText.asText(title?.value || ``),
            subtitle: RichText.asText(subtitle?.value || ``),
            date: files.get(RichText.asText(title?.value || ``)),
            link: {
              text: `ダウンロード`,
              route: pdf?.value?.file?.url || ``
            }
          }))
      }
    }
  }
  if (query === `news`) {
    return {
      props: {
        data: ((await getPagesByType(`news`)) as News[])
          .map(({ title, last_publication_date, display_until_date, id }) => ({
            title,
            subtitle: `${display_until_date.join(`/`)} に公開終了`,
            date: last_publication_date,
            link: {
              text: `さらに詳しく`,
              route: `/page/${id}`
            }
          }))
          .sort((a, b) =>
            new Date(a.date.join(`/`)) < new Date(b.date.join(`/`)) ? -1 : 1
          )
          .reverse()
      }
    }
  }
  return {}
}

export default function archive({
  about,
  data
}: {
  about: string
  data: Props[]
}) {
  return (
    <Layout title='アーカイブ'>
      <h1 className={styles.title}>アーカイブ</h1>
      <main>
        <p>{about}</p>
        {
          data.map(({ title, subtitle, date, link }) => (
            <Card title={title} subtitle={subtitle} date={date} link={link} />
          )) as unknown as ReactChild
        }
      </main>
    </Layout>
  )
}

function Card({ title, subtitle, date, link }: Props) {
  return (
    <section className={styles.card} key={link.route}>
      <div>
        <h4>{date.join(`/`)}</h4>
      </div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <a href={link.route}>{link.text}</a>
      </div>
    </section>
  )
}
