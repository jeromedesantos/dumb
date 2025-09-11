import type { ProductType } from "@/types/product";
import type { CartType } from "@/types/cart";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CircleX, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/molecules/Loading";
import ButtonLoading from "@/components/molecules/ButtonLoading";

function ProductDetail({
  products,
  loading,
  setProducts,
  setCarts,
}: {
  products: ProductType[];
  loading: boolean;
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  setCarts: Dispatch<SetStateAction<CartType[]>>;
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product: ProductType | undefined = products.find(
    (product) => product.id == parseInt(productId || "")
  );
  const [qty, setQty] = useState(0);
  const [loadingAdd, setLoadingAdd] = useState<number | null>(null);

  function handleAdd(id: number) {
    setLoadingAdd(id);
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
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, stock: product.stock - qty }
            : product
        )
      );
      setCarts((prev) => [newCart, ...prev]);
      setQty(0);
      setLoadingAdd(null);
    }, 500);
  }

  return (
    <div className="w-full min-h-screen fixed flex justify-center top-0 z-20 bg-black/70">
      {loading ? (
        <Loading />
      ) : product ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="w-3/4 flex flex-row-reverse ml-20">
            <CircleX
              className="size-10 text-cyan-700 dark:text-zinc-300 cursor-pointer"
              onClick={() => {
                setQty(0);
                navigate(`/product`);
              }}
            />
          </div>
          <div className="w-3/4 md:max-w-250 h-150 text-justify flex flex-col gap-5 bg-white dark:bg-zinc-900 shadow-lg py-15 px-10 rounded-2xl overflow-y-auto">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-black text-cyan-700 dark:text-zinc-300">
                {product.title}
              </h1>
              <p className="flex items-center gap-2 text-cyan-700 dark:text-cyan-500">
                {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                  <Star key={i} className="size-" />
                ))}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2 justify-center items-center dark:text-zinc-300 text-cyan-700">
                <Button
                  variant="ghost"
                  className="font-bold cursor-pointer"
                  onClick={() => setQty((prev) => Math.max(0, prev - 1))}
                >
                  -
                </Button>
                <p className="text-center font-bold">{qty}</p>
                <Button
                  variant="ghost"
                  className="font-bold cursor-pointer"
                  onClick={() =>
                    setQty((prev) => Math.min(prev + 1, product.stock))
                  }
                >
                  +
                </Button>
              </div>
              {loadingAdd ? (
                <ButtonLoading />
              ) : (
                <Button
                  variant={
                    product.stock === 0 || qty === 0 ? "ghost" : "default"
                  }
                  className={`cursor-pointer font-bold ${
                    product.stock === 0 || qty === 0
                      ? ""
                      : "bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-500 text-white"
                  }`}
                  disabled={product.stock === 0 || qty === 0}
                  onClick={() => handleAdd(product.id)}
                >
                  + ADD
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-5 mt-5">
              <img
                src={product.image}
                alt={product.image}
                className="rounded-2xl max-w-48 h-48 object-cover object-center"
              />
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/product" replace />
      )}
    </div>
  );
}

export default ProductDetail;
