interface Product {
  product_id: string;
  product: string;
  price: number;
}

const products: Product[] = [
  {
    product_id: "CD-1",
    product: "MJ Albums",
    price: 100,
  },
  {
    product_id: "CD-2",
    product: "Elvis Albums",
    price: 500,
  },
];

export { Product, products };
