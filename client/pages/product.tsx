import { useEffect, useState } from "react";
import ProductCard from '../components/cards/ProductCard/ProductCard';
import { useBasket, BasketProvider } from "../context/BasketContext";
import { fetchGraphQL } from "../utils/fetchGraphQL";
import { Product, GraphQLResponse  } from "../types";

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
                power: "Test Power"
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
                        power
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
            <ProductCard
                productImage={product.img_url}
                productTitle={product.name}
                productDetails={`${product.power} // Packet of ${4}`}
                productAction={sendToBasket}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{`£${product.price * productQuantity}`}</span>
                    {/* needs a class and styling */}
                    <div>
                        <button onClick={decrease}>-</button>
                        <span title="Current quantity">{productQuantity}</span>
                        <button onClick={increase}>+</button>
                    </div>
                </div>
            </ProductCard>
            <div title="Basket items">
                {basketTotal}
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