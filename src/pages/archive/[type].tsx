import styles from './[type].module.scss'
import type { GetServerSidePropsContext } from 'next'
import type { ReactChild } from 'react'
import type { News } from 'types'
import { RichText } from 'prismic-reactjs'
import { getPagesByType } from 'common/Prismic'
import Layout from 'components/layout'

interface Props {
  date: number[]
  title: string
  subtitle: string
  link: {
    text: string
    route: string
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.type as string
  if (query === `manamail`) {
    const { data } = (await getPagesByType(`manamail`, false))[0] as any
    return {
      props: {
        data: data.manamail.group.value.map(
          ({ title, subtitle, date, pdf }: any) => ({
            title: RichText.asText(title.value),
            subtitle: RichText.asText(subtitle.value),
            date: date.value.split(`-`),
            link: {
              text: `ダウンロード`,
              route: pdf.value.file.url
            }
          })
        )
      }
    }
  }
  if (query === `news`) {
    return {
      props: {
        data: ((await getPagesByType(`news`)) as News[]).map(
          ({ title, last_publication_date, display_until_date, id }) => ({
            title,
            subtitle: `${display_until_date.join(`/`)} に公開終了`,
            date: last_publication_date,
            link: {
              text: `さらに詳しく`,
              route: `/page/${id}`
            }
          })
        )
      }
    }
  }
  return {}
}

export default function archive({ data }: { data: Props[] }) {
  return (
    <Layout>
      <h1 className={styles.title}>マナメールアーカイブ</h1>
      <main className={styles.cards}>
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
