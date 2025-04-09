import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
    min: number,
    max: number,
    selectorValue: number,
    onReduce: () => void,
    onIncrement: () => void,
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ min, max, selectorValue, onReduce, onIncrement }) => (
    <div className={styles.container}>
        <button 
            className={selectorValue !== min ? styles.quantity_selector_button : styles.quantity_selector_button_disabled}
            onClick={onReduce}
        >-</button>
            <p 
                className={styles.quantity_selector_value}
            >{selectorValue}</p>
        <button 
            className={selectorValue !== max ? styles.quantity_selector_button : styles.quantity_selector_button_disabled}
            onClick={onIncrement}
        >+</button>
    </div>
);

export default QuantitySelector;