export interface Product {
    id: number,
    name: string,
    price: number,
    img_url: string,
    quantity: number,
    power: string
}

export interface GraphQLResponse {
    Product: Product;
}