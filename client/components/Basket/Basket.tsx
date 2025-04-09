import styles from './Basket.module.css';
import { useBasket } from '../../context/BasketContext';
export default function Basket() {
    const { basket } = useBasket();

    console.log(basket);

    return (
        <div className={styles.container}>
            <img
                src="/basket.svg"
                alt="Basket icon"
            />
        </div>
    );
}
