import styles from 'styles/Navbar.module.scss';
import { desktopQuery } from 'common/Responsive';
import { useMediaQuery } from 'react-responsive';

export default function Navbar() {
  return (
    <div className={styles.main}>
      <div
        className={styles.logo}
        style={{
          marginLeft: `${useMediaQuery(desktopQuery) ? 14 : 7}%`,
        }}
      >
        <img src="logo.svg" alt="logo" />
        <div className={styles.caption}>
          <p>Megumi</p>
          <p>Church</p>
        </div>
      </div>
    </div>
  );
}
