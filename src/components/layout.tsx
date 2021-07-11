import { ReactChild } from 'react';
import styles from './layout.module.scss';
import Footer from '~/src/components/footer';

interface Props {
  children: ReactChild | ReactChild[];
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      {children}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
