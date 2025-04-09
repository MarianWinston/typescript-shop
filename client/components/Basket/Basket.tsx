import styles from './Basket.module.css';
import { useBasket } from '../../context/BasketContext';

export default function Basket() {
    const { basket } = useBasket();
    return (
        <div className={styles.container} data-basketitems={basket[0] ? basket[0].basket_quantity : 0}>
            <img
                src="/basket.svg"
                alt="Basket icon"
            />
        </div>
    );
}
