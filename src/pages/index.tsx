import styles from '~/src/styles/home.module.scss';
import Layout from '~/src/components/layout';

export default function Home() {
  return (
    <Layout>
      <>
        <header className={styles.header}>
          <div className={styles.headerImage}>
            <div className={styles.filter}>
              <div className={styles.titleText}>
                <h2>Japanese Grace Church of New York</h2>
                <br />
                <h1>ニューヨークめぐみ教会</h1>
              </div>
              <div className={styles.slash}>
                <p>Japanese Grace Church of New York</p>
              </div>
            </div>
          </div>
        </header>
        <div />
      </>
    </Layout>
  );
}
