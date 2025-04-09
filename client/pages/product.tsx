import { useEffect, useState } from "react";
import ProductCard from '../components/cards/ProductCard/ProductCard';
import { useBasket, BasketProvider } from "../context/BasketContext";
import { fetchGraphQL } from "../utils/fetchGraphQL";
import { Product, GraphQLResponse  } from "../types";
import styles from './product.module.css';

function ProductPageContent() {
    const [product, setProduct] = useState<Product | null>(null);
    const [productQuantity, setProductQuantity] = useState(1);
    const { basket, addToBasket } = useBasket();

    const MIN_QUANTITY = 1;
    const MAX_QUANTITY = 99;

    useEffect(() => {
        // when running tests, immediately set dummy data
        if (process.env.NODE_ENV === "test") {
            setProduct({
                id: 1,
                name: "Test Product",
                price: 10,
                img_url: "test.jpg",
                quantity: 10,
                power: "Test Power",
                description: "Test Description",
                brand: "Test Brand",
                weight: 12,
                height: 7,
                width: 12,
                length: 9,
                model_code: "Test Code",
                colour: "Test Colour"
            });
            return;
        }
        let isMounted = true;
        const getData = async () => {
            const data = await fetchGraphQL<GraphQLResponse>(`
                query($id: ID!) {
                    Product(id: $id) {
                        id
                        name
                        price
                        img_url,
                        quantity,
                        power,
                        description,
                        brand,
                        weight,
                        height,
                        width,
                        length,
                        model_code,
                        colour
                    }
                }`,
                { id: 1 }
            );
            if (isMounted) {
                setProduct(data.Product);
            }
        };
        getData();
        return () => { isMounted = false; };
    }, []);

    const decrease = () => {
        if (productQuantity > MIN_QUANTITY) {
            setProductQuantity(productQuantity - 1);
        }
    }

    const increase = () => {
        if (productQuantity < MAX_QUANTITY) {
            setProductQuantity(productQuantity + 1);
        }
    }

    const sendToBasket = () => {
        addToBasket(product!, productQuantity);
        setProductQuantity(1);
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const basketTotal = basket.reduce((sum, item) => sum + item.basket_quantity, 0);

    return (
        <div className="page-container">
            <div className={styles.productHeader}>
                <img
                    src="/octopus-logo.svg"
                    alt="Octopus Energy Logo"
                />
                <img
                    src="/basket.svg"
                    alt="Basket icon"
                />
                <div className={styles.basketCount} title="Basket items">
                    {basketTotal}
                </div>
            </div>
            <ProductCard
                productImage={product.img_url}
                productTitle={product.name}
                productDetails={`${product.power} // Packet of ${4}`}
                productAction={sendToBasket}
            >
                <div className={styles.quantityToggle}>
                    <span className={styles.totalPrice}>{`£${product.price * productQuantity}`}</span>
                    {/* needs a class and styling */}
                    <div className={styles.qualityControls}>
                        <button 
                            className={productQuantity === 1 ? styles.disabled : ""} 
                            onClick={decrease}
                        >-</button>
                        <span title="Current quantity">{productQuantity}</span>
                        <button 
                            className={productQuantity === 99 ? styles.disabled : ""} 
                            onClick={increase}
                        >+</button>
                    </div>
                </div>
            </ProductCard>
            <div className={styles.productDescriptionContainer}>
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>
            <div className={styles.productSpecifications}>
                <h2>Specifications</h2>
                <div className={styles.productSpecificationsRow}>
                    <div className={styles.productSpecificationsCol}>Brand</div>
                    <div className={styles.productSpecificationsCol}>{product.brand}</div>
                </div>
                <div className={styles.productSpecificationsRow}>
                    <div className={styles.productSpecificationsCol}>Item weight (g)</div>
                    <div className={styles.productSpecificationsCol}>{product.weight}</div>
                </div>
                <div className={styles.productSpecificationsRow}>
                    <div className={styles.productSpecificationsCol}>Dimensions (cm)</div>
                    <div className={styles.productSpecificationsCol}>{`${product.height} x ${product.width} x ${product.length}`}</div>
                </div>
                <div className={styles.productSpecificationsRow}>
                    <div className={styles.productSpecificationsCol}>Item Model Number</div>
                    <div className={styles.productSpecificationsCol}>{product.model_code}</div>
                </div>
                <div className={styles.productSpecificationsRow}>
                    <div className={styles.productSpecificationsCol}>Colour</div>
                    <div className={styles.productSpecificationsCol}>{product.colour}</div>
                </div>
            </div>
        </div>
    );
}

export default function ProductPage() {
    return (
        <BasketProvider>
            <ProductPageContent />
        </BasketProvider>
    );
}