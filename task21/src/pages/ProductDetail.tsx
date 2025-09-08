import type { ProductType } from "@/types/product";
import type { Dispatch, SetStateAction } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CircleX, LoaderCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetail({
  products,
  loading,
  qty,
  setQty,
  handleAdd,
}: {
  products: ProductType[];
  loading: boolean;
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  handleAdd: (id: number) => void;
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product: ProductType | undefined = products.find(
    (product) => product.id == parseInt(productId || "")
  );

  return (
    <div className="w-full min-h-screen fixed top-0 z-20 bg-black/70">
      {loading ? (
        <p className="text-lg font-bold dark:text-zinc-300 text-center mt-50 flex justify-center items-center gap-2">
          <LoaderCircle className="animate-spin" /> loading...
        </p>
      ) : product ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="max-w-1/2 text-justify flex flex-col gap-5 bg-white dark:bg-zinc-900 shadow-lg p-10 rounded-2xl">
            <div className="flex justify-end">
              <CircleX
                className="size-10 text-cyan-700 dark:text-zinc-300 cursor-pointer"
                onClick={() => {
                  setQty(0);
                  navigate(`/product`);
                }}
              />
            </div>
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
              <div className="flex gap-2 justify-center items-center gap-2 dark:text-zinc-300 justify-center text-cyan-700">
                <Button
                  variant="ghost"
                  className="font-bold cursor-pointer"
                  onClick={() =>
                    setQty((prev) => (prev <= 0 ? prev : prev - 1))
                  }
                >
                  -
                </Button>
                <p className="text-center font-bold ">{qty}</p>
                <Button
                  variant="ghost"
                  className="font-bold cursor-pointer"
                  onClick={() =>
                    setQty((prev) => (product.stock <= prev ? prev : prev + 1))
                  }
                >
                  +
                </Button>
              </div>
              <Button
                variant={qty <= 0 ? "ghost" : "default"}
                className={`cursor-pointer font-bold ${
                  qty <= 0
                    ? ""
                    : "bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-500 text-white"
                }`}
                disabled={qty <= 0}
                onClick={() => handleAdd(product.id)}
              >
                + ADD
              </Button>
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <img
                src={product.image}
                alt={product.image}
                className="rounded-2xl h-50 object-cover object-center"
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
