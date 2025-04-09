import styles from './Button.module.css';

interface ButtonProps {
    buttonText: string,
    buttonAction: () => void,
}

const Button: React.FC<ButtonProps> = ({ buttonText, buttonAction }) => (
    <button className={styles.button_primary} onClick={buttonAction}>
        {buttonText}
    </button>
);

export default Button;