import Product from "./product";

export default interface Ecommerce {
    total: number;
    count: number;
    products: Product[];
}