import styles from 'styles/Icon.module.scss'

interface Props {
  onClick?: () => void
  src: string
}

export default function Icon({ onClick, src }: Props) {
  return (
    <figure className={styles.main} onMouseDown={onClick}>
      <img src={src} alt='' />
    </figure>
  )
}
