import { ReactChild } from 'react'
import styles from './card.module.scss'

interface Props {
  title: string
  subtitle: string
  children: ReactChild | ReactChild[]
}

export default function Card({ title, subtitle, children }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.titles}>
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
