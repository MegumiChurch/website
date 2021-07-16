import { Document as PrismicDocument } from '@prismicio/client/types/documents'
import { GetServerSidePropsContext } from 'next'
import { RichText } from 'prismic-reactjs'
import { ReactChild } from 'react'
import Layout from 'components/layout'
import { getPagesByType } from 'common/Prismic'
import styles from './manamail.module.scss'

interface Props {
  title: string
  subtitle: string
  date: number[]
  pdf: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = (await getPagesByType(`manamail`, false))[0] as any
  return {
    props: {
      data: data.manamail.group.value.map(
        ({ title, subtitle, date, pdf }: any) => ({
          title: RichText.asText(title.value),
          subtitle: RichText.asText(subtitle.value),
          date: date.value.split(`-`),
          pdf: pdf.value.file.url
        })
      )
    }
  }
}

export default function Manamail({ data }: { data: Props[] }) {
  return (
    <Layout>
      <h1 className={styles.title}>マナメールアーカイブ</h1>
      <main className={styles.cards}>
        {
          data.map(({ title, subtitle, date, pdf }) => (
            <Card title={title} subtitle={subtitle} date={date} pdf={pdf} />
          )) as unknown as ReactChild
        }
      </main>
    </Layout>
  )
}

function Card({ title, subtitle, date, pdf }: Props) {
  return (
    <section className={styles.card} key={pdf}>
      <div>
        <h4>{date.join(`/`)}</h4>
      </div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <a href={pdf}>ダウンロード</a>
      </div>
    </section>
  )
}
