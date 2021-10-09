import { getPageById, getPagesByType } from 'common/Prismic'
import { dquery } from 'common/Responsive'
import Footer from 'components/footer'
import { Cross as Hamburger } from 'hamburger-react'
import { NextSeo } from 'next-seo'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import type { MutableRefObject, ReactChild } from 'react'
import type { Article } from 'types'
import styles from './layout.module.scss'

interface Props {
  title?: string
  description?: string
  children: ReactChild | ReactChild[]
}

export default function Layout({ title, description, children }: Props) {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const isDesktop = useMediaQuery(dquery)
  const [isOpen, setOpen] = useState(false)
  const [contents, setContents] = useState<JSX.Element[]>([])
  useEffect(() => {
    const temp = []
    getPagesByType(`menu`, false).then(articles => {
      ;(articles[0] as any).data.menu.item.value.forEach((article: any) => {
        const { id } = article.article.value.document
        getPageById(id).then(page => {
          temp.push(
            <a href={`/page/${id}`} key={id}>
              {(page as Article).title}
            </a>
          )
        })
      })
    })
    temp.push(<a href='/'>ホーム</a>)
    setContents(temp)
  }, [])
  return (
    <>
      <NextSeo
        title={`NY めぐみ教会 ${title && `| ${title}`}`}
        description={description}
      />
      <>
        <div className={styles.controls}>
          <div
            className={styles.backSection}
            onMouseDown={() => {
              ref.current.style.clipPath = `polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)`
              window.location.href = `/`
            }}
          >
            <div ref={ref} />
          </div>
          <div
            className={styles.menuButton}
            onMouseDown={() => {
              setOpen(!isOpen)
            }}
          >
            {isDesktop ? (
              <>
                <p>クリックして{isOpen ? `閉じる` : `開く`}</p>
                <p>Menu</p>
              </>
            ) : (
              <>
                <p>クリックして{isOpen ? `閉じる` : `開く`}</p>
                <p>Menu</p>
              </>
              // <Hamburger color='#FFF' toggle={setOpen} toggled={isOpen} />
            )}
          </div>
        </div>
      </>
      <>
        <div
          className={styles.menuBase}
          style={{
            width: `${isOpen ? 100 : 0}%`
          }}
        />
        <div
          className={styles.menu}
          style={{
            marginLeft: `${isOpen ? 0 : 100}%`
          }}
        >
          <div className={styles.contents}>{contents}</div>
        </div>
      </>
      <>
        <div className={styles.root}>
          {children}
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}
