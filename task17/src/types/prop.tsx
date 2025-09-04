import type { ProductData } from "./data";

export type ProductProp = {
  products: ProductData[];
  handleAdd: (id: number) => void;
};

export type ProductDetailProp = {
  products: ProductData[];
  handleAdd: (id: number) => void;
};

export type NavbarProp = {
  carts: ProductData[];
};

export type CartProp = {
  carts: ProductData[];
  handleAdd: (id: number) => void;
};
