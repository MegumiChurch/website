import styles from 'styles/Article.module.scss'

interface Props {
  headerImageUrl: string
  title: string
  last_publication_date: string
  children: JSX.Element | JSX.Element[]
}

export default function Article({
  headerImageUrl,
  title,
  last_publication_date,
  children
}: Props) {
  return (
    <>
      <div className={`${styles.headerSection} center`}>
        <div
          style={{
            backgroundImage: `url(${headerImageUrl})`
          }}
        />
      </div>
      <main className={`${styles.root} center`}>
        <div className={`${styles.title} center`}>
          <h1>{title}</h1>
        </div>
        <div className={styles.pubDate}>最終更新：{last_publication_date}</div>
        <div className={styles.body}>{children}</div>
      </main>
    </>
  )
}
