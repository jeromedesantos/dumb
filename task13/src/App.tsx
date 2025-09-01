import { useState } from "react";
import { type Product } from "./types/product";
import ProductList from "./components/ProductList";
import CartEmpty from "./components/CartEmpty";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import data from "./data/products.json";
import "./assets/css/style.css";

function App() {
  const [products, setProducts] = useState<Product[]>(data);
  const [icons, setIcons] = useState<boolean>(false);
  const carts: Product[] = products.filter(
    (product) => product.available === false
  );

  function handleAdd(id: number) {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, available: !product.available };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  function handleIcon() {
    setIcons((icon) => !icon);
  }

  return (
    <div className="App bg-[#43C5F5] w-full min-h-screen">
      <Navbar handleIcon={handleIcon} />
      {icons && (carts.length === 0 ? <CartEmpty /> : <Cart carts={carts} />)}
      <ProductList products={products} handleAdd={handleAdd} />
    </div>
  );
}

export default App;
