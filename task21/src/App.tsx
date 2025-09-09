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

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar carts={carts.length} />
        <div className="dark:bg-zinc-950 w-full min-h-screen font-inter flex flex-col items-center justify-center">
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
                      setProducts={setProducts}
                      setCarts={setCarts}
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
                    setProducts={setProducts}
                    setCarts={setCarts}
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
