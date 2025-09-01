import { type Product } from "./product";

export type NavbarProp = {
  carts: Product[];
  handleIcon: () => void;
};
