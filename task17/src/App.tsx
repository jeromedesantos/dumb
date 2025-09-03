import { type ProductData } from "./types/data";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/molecules/Navbar";
import data from "./data/products.json";
import "./assets/css/style.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [products, setProducts] = useState<ProductData[]>(data);
  const carts: ProductData[] = products.filter(
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

  return (
    <BrowserRouter>
      <div className="App bg-white w-full min-h-screen font-inter flex flex-col items-center">
        <Navbar carts={carts} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/product"
            element={<Product products={products} handleAdd={handleAdd} />}
          >
            <Route
              path=":productId"
              element={<ProductDetail products={products} />}
            />
          </Route>
          <Route
            path="/cart"
            element={<Cart carts={carts} handleAdd={handleAdd} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
