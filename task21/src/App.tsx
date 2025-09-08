import type { ProductType } from "./types/product";
import type { CartType } from "./types/cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./lib/PrivateRoute";
import PublicRoute from "./lib/PublicRoute";
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import "./assets/css/style.css";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [carts, setCarts] = useState<CartType[]>([]);
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await api.get("/products");
      const updateRes = res.data.map((product: ProductType) => ({
        ...product,
        stock: 10,
      }));
      setProducts(updateRes);
    } catch (err) {
      console.log(err || "Failed Fetch Products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleAdd(id: number) {
    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) return;
    const newCart: CartType = {
      id: Date.now(),
      productId: findProduct.id,
      image: findProduct.image,
      title: findProduct.title,
      qty,
      total: findProduct.price * qty,
    };
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, stock: product.stock - qty } : product
      )
    );
    setCarts((prev) => [newCart, ...prev]);
    setQty(0);
  }

  // CRITICAL FIX: This function now requires the new quantity as a parameter
  function handleEdit(id: number, newQty: number) {
    const findCart = carts.find((cart) => cart.id === id);
    // Correctly find product using productId from cart
    const findProduct = products.find((p) => p.id === findCart?.productId);

    if (!findCart || !findProduct) {
      console.error("Item keranjang atau produk tidak ditemukan");
      return;
    }

    const diff = newQty - findCart.qty;

    if (diff > 0 && findProduct.stock < diff) {
      alert(`Stok tidak mencukupi! Sisa stok: ${findProduct.stock}`);
      return;
    }

    setProducts((prev) =>
      prev.map((product) =>
        product.id === findCart.productId
          ? { ...product, stock: product.stock - diff }
          : product
      )
    );

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === id
          ? {
              ...cart,
              qty: newQty, // Use newQty from parameter
              total: findProduct.price * newQty,
            }
          : cart
      )
    );
  }

  function handleDelete(id: number) {
    const findCart = carts.find((cart) => cart.id === id);
    if (!findCart) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === findCart.productId
          ? { ...product, stock: product.stock + findCart.qty }
          : product
      )
    );
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
  }

  console.log(products);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar carts={carts.length} />
        <div className="dark:bg-zinc-950 bg-white w-full min-h-screen font-inter flex flex-col items-center justify-center bg-blue-500">
          <Routes>
            <Route
              path="/"
              element={<Home products={products} loading={loading} />}
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/product"
              element={
                <PrivateRoute>
                  <ProductList products={products} loading={loading} />
                </PrivateRoute>
              }
            >
              <Route
                path=":productId"
                element={
                  <PrivateRoute>
                    <ProductDetail
                      products={products}
                      loading={loading}
                      qty={qty}
                      setQty={setQty}
                      handleAdd={handleAdd}
                    />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart
                    carts={carts}
                    loading={loading}
                    products={products}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
