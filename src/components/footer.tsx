import styles from './footer.module.scss';

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.inner} />
        <div className={styles.copywrite}>
          <p>{`Copyright ©${new Date().getFullYear()} Shun Ueda. All rights reserved.`}</p>
        </div>
      </div>
    </>
  );
}
