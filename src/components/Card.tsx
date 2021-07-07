import { CSSProperties, ReactChild, ReactElement } from 'react'
import styles from 'styles/Card.module.scss'

interface Props {
  children: ReactChild | ReactChild[]
  titles: string[]
  space?: {
    style?: CSSProperties
    content: ReactElement | ReactElement[]
  }
  reverse?: boolean
}

export default function Card({ children, titles, space }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.space} style={space?.style || {}}>
          {space?.content}
        </div>
        <div className={styles.text}>
          <>
            <div>
              <h3>{titles[0]}</h3>
              <h4>{titles[1]}</h4>
            </div>
            <p>{children}</p>
          </>
        </div>
      </div>
    </div>
  )
}
