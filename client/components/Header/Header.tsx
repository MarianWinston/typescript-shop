import Basket from '../Basket/Basket';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
        <div className={styles.header_logo}>
            <img
                src="/octopus-logo.svg"
                alt="Octopus Energy Logo"
            />
        </div>
        <div className={styles.header_basket}>
            <Basket />
        </div>
    </div>
  );
}
