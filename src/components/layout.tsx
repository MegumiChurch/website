import { MutableRefObject, ReactChild, useRef, useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import Footer from 'components/footer';
import styles from './layout.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
}

export default function Layout({ children }: Props) {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <>
        <div className={styles.controls}>
          <div
            className={styles.backSection}
            onMouseDown={() => {
              ref.current.style.clipPath = `polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)`;
              window.location.href = `/`;
            }}
          >
            <div ref={ref} />
          </div>
          <div className={styles.menuButton}>
            <Hamburger color="#FFF" toggle={setOpen} toggled={isOpen} />
          </div>
        </div>
      </>
      <>
        <div
          className={styles.menuBase}
          style={{
            width: `${isOpen ? 100 : 0}%`,
          }}
        />
        <div
          className={styles.menu}
          style={{
            marginLeft: `${isOpen ? 0 : 100}%`,
          }}
        />
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
  );
}
