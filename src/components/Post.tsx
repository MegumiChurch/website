import styles from 'styles/Post.module.scss'

interface Props {
  title: string
  date: string
  route: string
}

export default function Post({ title, date, route }: Props) {
  return (
    <section className={styles.root}>
      <h6>{date}</h6>
      <a>
        {title}
        {`  >`}
      </a>
    </section>
  )
}
