import { useEffect, useState } from "react";
import ProductCard from '../components/cards/ProductCard/ProductCard';
import QuantitySelector from "../components/QuantitySelector/QuantitySelector";
import { useBasket } from "../context/BasketContext";
import { fetchGraphQL } from "../utils/fetchGraphQL";
import { Product, GraphQLResponse  } from "../types";

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [productQuantity, setProductQuantity] = useState(1);
    const { addToBasket } = useBasket();

    const MIN_QUANTITY = 1;
    const MAX_QUANITY = 99;

    useEffect(() => {
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

            setProduct(data.Product);
        };
        getData();
    }, []);

    const reduceQuantity = () => {
        if (!(productQuantity <= MIN_QUANTITY)) {
            let tempQuantity = productQuantity;
            setProductQuantity(tempQuantity-1);
        }
    }

    const incrementQuantity = () => {
        if (!(productQuantity >= MAX_QUANITY)) {
            let tempQuantity = productQuantity;
            setProductQuantity(tempQuantity+1);
        }
    }

    const sendToBasket = () => {
        addToBasket(product, productQuantity);
        setProductQuantity(1);
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <ProductCard
                productImage={product.img_url}
                productTitle={product.name}
                productDetails={`${product.power} // Packet of ${4}`}
                productAction={sendToBasket}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{`£${product.price*productQuantity}`}</span>
                    <QuantitySelector
                        min={MIN_QUANTITY}
                        max={MAX_QUANITY}
                        selectorValue={productQuantity} 
                        onReduce={reduceQuantity} 
                        onIncrement={incrementQuantity}
                    />
                </div>
            </ProductCard>
        </div>
    );
}
