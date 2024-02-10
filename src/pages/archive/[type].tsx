import { getPagesByType } from 'common/Prismic'
import Layout from 'components/layout'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-reactjs'
import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import type { ReactChild } from 'react'
import type { News } from 'types'
import styles from './[type].module.scss'
import { ScaleLoader } from 'react-spinners'

interface Data {
  date: number[]
  title: string
  subtitle: string
  about?: string
  link: {
    text: string
    route: string
  }
}

interface Props {
  baseDate: Date
}

export default function Archive() {
  const [pageTitle, setPageTitle] = useState(``)
  const [cardData, setCardData] = useState<Data[]>([])
  const router = useRouter()
  useAsyncEffect(async () => {
    setPageTitle(
      `${
        router.query.type === `manamail` ? `マナメール` : `ニュース`
      }アーカイブ`
    )
    if (router.query.type === `manamail`) {
      const { data } = (await getPagesByType(`manamail`, false))[0] as any
      // let baseDate: Date | null = null
      data.manamail.group.value.reverse()
      // const firstEntry = data.manamail.group.value.shift()
      // const res = await fetch(
      //   `/api/getCreationDateFromFileUrl?fileUri=${firstEntry.pdf.value.file.url
      //     .split(`/`)
      //     .at(-1)}`
      // )
      // const json = (await res.json()).map((it: string) => parseInt(it, 10))
      // baseDate = new Date(json[0], json[1], json[2])

      // baseDate is the nearest sunday before this date
      const baseDate = getPreviousSunday()
      setCardData(
        data.manamail.group.value
          .map(({ title, subtitle, pdf, date: dateOverride }: any, i: any) => {
            const date = new Date(baseDate!.getTime())
            if (dateOverride) {
              const [orYear, orMonth, orDate] = dateOverride.value
                .split(`-`)
                .map((it: string) => parseInt(it, 10))
              date.setFullYear(orYear)
              date.setMonth(orMonth)
              date.setDate(orDate)
            }
            date.setDate(date.getDate() - 7 * i)
            return {
              title: RichText.asText(title?.value || ``),
              subtitle: RichText.asText(subtitle?.value || ``),
              date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
              link: {
                text: `ダウンロード`,
                route: pdf?.value?.file?.url || ``
              }
            }
          })
          .sort((a: { date: any[] }, b: { date: any[] }) =>
            new Date(a.date.join(`/`)) < new Date(b.date.join(`/`)) ? 1 : -1
          )
      )
    } else if (router.query.type === `news`) {
      setCardData(
        ((await getPagesByType(`news`)) as News[])
          .map(
            ({ title, last_publication_date, display_until_date, id }) =>
              ({
                title,
                subtitle: `${display_until_date.join(`/`)} に公開終了`,
                date: last_publication_date,
                link: {
                  text: `さらに詳しく`,
                  route: `/page/${id}`
                }
              } as unknown as Data)
          )
          .sort((a, b) =>
            new Date(a.date.join(`/`)) < new Date(b.date.join(`/`)) ? 1 : -1
          )
      )
    }
  }, [router.query.type])
  return (
    <Layout title={pageTitle}>
      <h1 className={styles.title}>{pageTitle}</h1>
      <main>
        {cardData.length === 0 ? (
          <ScaleLoader />
        ) : (
          (cardData?.map(({ title, subtitle, date, link }) => (
            <Card title={title} subtitle={subtitle} date={date} link={link} />
          )) as unknown as ReactChild)
        )}
      </main>
    </Layout>
  )
}

function Card({ title, subtitle, date, link }: Data) {
  return (
    <section className={styles.card} key={link.route}>
      <div>
        <h4>{date.join(`/`)}</h4>
      </div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <a target='_blank' rel='noopener noreferrer' href={link.route}>
          {link.text}
        </a>
      </div>
    </section>
  )
}

function getPreviousSunday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  const difference = dayOfWeek === 0 ? 7 : dayOfWeek; // If today is Sunday, go back a full week
  const previousSunday = new Date(today);
  previousSunday.setDate(today.getDate() - difference);

  return previousSunday;
}
