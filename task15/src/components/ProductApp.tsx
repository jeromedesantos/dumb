import { fetchProduct } from "../api/product";
import { useDebounce } from "../hooks/useDebounce";
import { type Product } from "../types/product";
import { useState, useEffect } from "react";

function ProductApp() {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);

  useEffect(() => {
    // let isCancelled = false;

    async function fetchData() {
      setProducts([]);
      setError("");
      setLoading(true);
      try {
        const res = await fetchProduct(debouncedSearch);
        // if (!isCancelled) {
        setProducts(res);
        // }
      } catch (err) {
        // if (!isCancelled) {
        setError(
          (err as Error).message || "Terjadi kesalahan saat mengambil data."
        );
        // }
      } finally {
        // if (!isCancelled) {
        setLoading(false);
        // }
      }
    }
    if (!debouncedSearch) {
      setProducts([]);
      setError("");
      setLoading(false);
      return;
    }
    fetchData();

    // return () => {
    //   isCancelled = true;
    // };
  }, [debouncedSearch]);

  return (
    <>
      <h1>Product APP</h1>
      <input
        type="text"
        placeholder="Enter a product"
        value={search}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <h2>{product.price}€ </h2>
          </div>
        ))}
    </>
  );
}

export default ProductApp;
