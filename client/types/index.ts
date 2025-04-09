export interface Product {
    id: number,
    name: string,
    price: number,
    img_url: string,
    quantity: number,
    power: string,
    description: string,
    brand: string,
    weight: number,
    height: number,
    width: number,
    length: number,
    model_code: string,
    colour: string,
}

export interface GraphQLResponse {
    Product: Product;
}