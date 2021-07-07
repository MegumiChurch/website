import styles from 'styles/Header.module.scss'
import { Cross as Hamburger } from 'hamburger-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { dquery } from 'common/Responsive'
import { asText, getArticleByType } from 'common/Prismic'

export default function Header() {
  const [isOpen, setOpen] = useState(false)
  const desktop = useMediaQuery(dquery)
  const [contents, setContents] = useState([])
  useEffect(() => {
    const temp: any = []
    getArticleByType(`article`).then(({ results }) => {
      results.forEach(result => {
        temp.push({
          title: asText(result.data.article.title.value),
          id: result.id
        })
      })
      setContents(
        temp.filter(
          (it: { title: string }) =>
            ![`利用規約`, `プライバシーポリシー`].includes(it.title)
        )
      )
    })
  }, [])
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles.logo} />
        </div>
        <div className={styles.menuIcon}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </header>
      <div
        className={styles.filter}
        style={{
          marginLeft: `${isOpen ? 0 : 100}%`,
          transition: desktop ? `0.5s` : `0.5s ${isOpen ? `` : `0.08s`}`
        }}
      />
      <div
        className={styles.menu}
        style={{
          marginLeft: `${isOpen ? 0 : 100}%`,
          transition: desktop ? `0.5s` : `0.5s ${isOpen ? `0.08s` : ``}`
        }}
      >
        <a href='/'>ホーム{`\n`}</a>
        {contents.map(({ title, id }) => (
          <a href={`/article/${id}`}>
            {title}
            {`\n`}
          </a>
        ))}
      </div>
    </>
  )
}
