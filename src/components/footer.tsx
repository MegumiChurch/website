import styles from './footer.module.scss';

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.inner}>
          <ul>
            <li>ニューヨークめぐみ教会</li>
            <li>住所</li>
          </ul>
          <ul>
            <li>牧師・笹川雅弘</li>
            <li>Masahiro Sasakawa</li>
            <li>メール</li>
          </ul>
          <ul>
            <li>免責</li>
            <li>プライバシーポリシー</li>
            <li>利用規約</li>
          </ul>
        </div>
        <div className={styles.copywrite}>
          {`Copyright ©${new Date().getFullYear()} Shun Ueda. All rights reserved.`}
        </div>
      </div>
    </>
  );
}
