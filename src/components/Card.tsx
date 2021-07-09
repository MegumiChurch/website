import styles from 'styles/Card.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
  titles: string[]
}

export default function Card({ children, titles }: Props) {
  return (
    <div className={styles.root}>
      <div className={`${styles.card} center`}>
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
