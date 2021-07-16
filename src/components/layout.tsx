import {
  MutableRefObject,
  ReactChild,
  useEffect,
  useRef,
  useState
} from 'react'
import { Cross as Hamburger } from 'hamburger-react'
import Footer from 'components/footer'
import { getPagesByType } from 'common/Prismic'
import Link from 'next/link'
import styles from './layout.module.scss'

interface Props {
  children: ReactChild | ReactChild[]
}

export default function Layout({ children }: Props) {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const [isOpen, setOpen] = useState(false)
  const [contents, setContents] = useState<JSX.Element[]>([])
  useEffect(() => {
    getPagesByType(`article`).then(articles => {
      const temp = [<Link href='/'>ホーム</Link>]
      articles.forEach(({ title, id }: any) =>
        temp.push(
          <a href={`/page/${id}`} key={id}>
            {title}
          </a>
        )
      )
      setContents(temp)
    })
  }, [])
  return (
    <>
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
          <div className={styles.menuButton}>
            <Hamburger color='#FFF' toggle={setOpen} toggled={isOpen} />
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
