import { type Product } from "./product";

export type ProductProp = {
  products: Product[];
  handleAdd: (id: number) => void;
};
