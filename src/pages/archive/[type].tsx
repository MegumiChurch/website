import { getPagesByType } from 'common/Prismic'
import Layout from 'components/layout'
import readPdf from 'pdf-parse'
import { RichText, RichTextBlock } from 'prismic-reactjs'
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
    let baseDate: Date | null = null
    data.manamail.group.value.reverse()
    const firstEntry = data.manamail.group.value.shift()
    const res = await fetch(firstEntry.pdf.value.file.url)
    const pdfData = await readPdf(Buffer.from(await res.arrayBuffer()), {})
    const rawDate = pdfData.info.CreationDate.substring(2, 10)
    const year = rawDate.substring(0, 4)
    const month = rawDate.substring(4, 6) - 1
    const day = rawDate.substring(6, 8)
    baseDate = new Date(year, month, day)
    while (baseDate.getDay() !== 0) {
      baseDate.setDate(baseDate.getDate() + 1)
    }
    let offset = 0
    return {
      props: {
        about: RichText.asText(data.manamail.about.value),
        data: [firstEntry, ...data.manamail.group.value].map(
          ({ title, subtitle, pdf, date: dateOverride }: any, i) => {
            const date = new Date(baseDate!.getTime())
            if (dateOverride) {
              offset = i
              const [orYear, orMonth, orDate] = dateOverride.value
                .split(`-`)
                .map((it: string) => parseInt(it, 10))
              date.setFullYear(orYear)
              date.setMonth(orMonth)
              date.setDate(orDate)
            }
            date.setDate(date.getDate() - 7 * (i - offset))
            return {
              title: RichText.asText(title?.value || ``),
              subtitle: RichText.asText(subtitle?.value || ``),
              date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
              link: {
                text: `ダウンロード`,
                route: pdf?.value?.file?.url || ``
              }
            }
          }
        )
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
