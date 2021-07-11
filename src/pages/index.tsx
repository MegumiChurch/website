import styles from 'styles/home.module.scss';
import Layout from '~/src/components/layout';

export default function Home() {
  return (
    <Layout>
      <>
        <header className={styles.header}>
          <div className={styles.headerImage} />
        </header>
      </>
    </Layout>
  );
}
