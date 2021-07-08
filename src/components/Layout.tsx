import styles from 'styles/Layout.module.scss'
import { ReactChild } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Layout({
  children
}: {
  children: ReactChild | ReactChild[]
}) {
  return (
    <>
      <Header />
      <main className={`${styles.root} center`}>{children}</main>
      <Footer />
    </>
  )
}
