import styles from 'styles/Bookify.module.scss'

interface Props {
  currentPage: number
  pages: JSX.Element[]
}

export default function Bookify({ currentPage, pages }: Props) {
  return <main className={styles.main}>{pages[currentPage]}</main>
}
