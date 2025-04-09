import styles from './ProductCard.module.css';
import Button from '../../Button/Button';

interface ProductCardProps {
    productImage: string, 
    productTitle: string,
    productDetails: string,
    productAction: () => void, 
    children?: React.ReactNode
}

const ProductCard: React.FC<ProductCardProps> = ({ productImage, productTitle, productDetails, productAction, children }) => (
    <div className={styles.container}>
        <img className={styles.product_image} src={productImage}></img>
        <h1>{productTitle}</h1>
        <p className={styles.product_details}>{productDetails}</p>
        {children}
        <Button buttonAction={productAction} buttonText='Add to cart'/>
    </div>
);

export default ProductCard;